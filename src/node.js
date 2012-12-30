define(["color", "matrix2d", "objectutil"], function (colorModule, matrix2dModule, objectUtilModule) {

    var Color = colorModule.Color;
    var Matrix2D = matrix2dModule.Matrix2D;
    var ObjectUtil = objectUtilModule;
    var DATA_ATTRS = ["position", "rotation", "scale", "skew", "size", "anchor", "color"];

    var Node = function (data) {
        // defaults
        this._position = [0, 0];
        this._rotation = 0;
        this._scale = [1, 1];
        this._skew = [0, 0];
        this._size = [0, 0];
        this._anchor = [0, 0];
        this._color = new Color(1, 1, 1, 1);
        this._children = [];
        this._xformDirty = true;

        // set attributes present on data
        if (data) {
            for (var i = 0; i < DATA_ATTRS.length; i++) {
                var value = data[DATA_ATTRS[i]];
                if (value)
                    this[DATA_ATTRS[i]] = value;
            }
        }
    };

    // xform attributes
    ObjectUtil.attr(Node.prototype, "position", "rw", "_position", "_xformDirty");
    ObjectUtil.attr(Node.prototype, "rotation", "rw", "_rotation", "_xformDirty");
    ObjectUtil.attr(Node.prototype, "scale", "rw", "_scale", "_xformDirty");
    ObjectUtil.attr(Node.prototype, "skew", "rw", "_skew", "_xformDirty");
    ObjectUtil.attr(Node.prototype, "size", "rw", "_size", "_xformDirty");
    ObjectUtil.attr(Node.prototype, "anchor", "rw", "_anchor", "_xformDirty");

    ObjectUtil.attr(Node.prototype, "color", "rw");
    ObjectUtil.attr(Node.prototype, "children", "rw");

    Node.prototype._updateXform = function () {
        if (this._xformDirty) {
            var ax = this._anchor[0] * this._size[0];
            var ay = this._anchor[1] * this._size[1];
            var theta = this._rotation * (Math.PI / 180);
            var sinTheta = Math.sin(theta);
            var cosTheta = Math.cos(theta);
            var hasSkew = this._skew[0] != 0 || this._skew[1] != 0;
            var x = this._position[0];
            var y = this._position[1];
            if (!hasSkew && (ax != 0 || ay != 0)) {
                x += (cosTheta * -ax * this._scale[0]) - (sinTheta * -ay * this._scale[1]);
                y += (sinTheta * -ax * this._scale[0]) + (cosTheta * -ay * this._scale[1]);
            }
            var trsXform = new Matrix2D(cosTheta * this._scale[0], sinTheta * this._scale[0],
                                        -sinTheta * this._scale[1], cosTheta * this._scale[1],
                                        x, y);
            if (hasSkew) {
                var skewXform = new Matrix2D(1, Math.tan(this._skew[1] * (Math.PI / 180)),
                                             Math.tan(this._skew[0] * (Math.PI / 180)), 1,
                                             0, 0);
                var trsSkewXform = Matrix2D.multiply(trsXform, skewXform);
                if (ax != 0 || ay != 0) {
                    var offset = new Matrix2D();
                    offset.setScaleRotTrans(1, 1, 0, -ax, -ay);
                    this._xform = Matrix2D.multiply(trsSkewXform, offset);
                } else {
                    this._xform = trsSkewXform;
                }
            } else {
                this._xform = trsXform;
            }
            this._xformDirty = false;
        }
    };

    Node.prototype.draw = function (ctx, parentXform) {
        this._updateXform();
        var xform;
        if (parentXform) {
            xform = Matrix2D.multiply(parentXform, this._xform);
        } else {
            xform = this._xform;
        }
        ctx.setTransform.apply(ctx, xform.m);
        ctx.fillStyle = this.color.toString();
        ctx.fillRect(0, 0, this._size[0], this._size[1]);

        for (var i = 0; i < this._children.length; i++) {
            this._children[i].draw(ctx, xform);
        }
    };

    return { Node: Node };
});

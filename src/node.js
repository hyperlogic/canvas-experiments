define(["color", "matrix2d", "objectutil"], function (colorModule, matrix2dModule, objectUtilModule) {

    var Color = colorModule;
    var Matrix2D = matrix2dModule.Matrix2D;
    var ObjectUtil = objectUtilModule;
    var DATA_ATTRS = ["position", "rotation", "scale", "skew", "size", "anchor", "color"];

    var Node = function (data) {
        var self = this;

        // defaults
        this._position = [0, 0];
        this._rotation = 0;
        this._scale = [1, 1];
        this._skew = [0, 0];
        this._size = [0, 0];
        this._anchor = [0, 0];
        this._color = [1, 1, 1, 1];
        this._children = [];
        this._xformDirty = true;

        // set attributes present on data
        ObjectUtil.initAttrsFromData(this, DATA_ATTRS, data);

        /*
        // AJT: REMOVE image test
        this._imageObj = new Image();
        this._imageObj.onload = function() {
            self._imageObjReady = true;
        };
        this._imageObj.src = 'img/html5-logo-512.png';
        */
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
            var ox = this._anchor[0] * this._size[0];
            var oy = this._anchor[1] * this._size[1];
            var offsetXform = new Matrix2D(1, 0, 0, 1, -ox, -oy);
            var theta = this._rotation * (Math.PI / 180);
            var sinTheta = Math.sin(theta);
            var cosTheta = Math.cos(theta);
            var trsXform = new Matrix2D(cosTheta * this._scale[0], sinTheta * this._scale[0],
                                        -sinTheta * this._scale[1], cosTheta * this._scale[1],
                                        this._position[0], this._position[1]);
            var hasSkew = this._skew[0] != 0 || this._skew[1] != 0;
            if (hasSkew) {
                var skewXform = new Matrix2D(1, Math.tan(this._skew[1] * (Math.PI / 180)),
                                         Math.tan(this._skew[0] * (Math.PI / 180)), 1,
                                         0, 0);
                this._xform = Matrix2D.multiply(trsXform, Matrix2D.multiply(skewXform, offsetXform));
            } else {
                this._xform = Matrix2D.multiply(trsXform, offsetXform);
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
        ctx.fillStyle = Color.toCssString(this._color);
        ctx.fillRect(0, 0, this._size[0], this._size[1]);
        ctx.strokeStyle = Color.toCssString([1, 0, 0, 1]);

        // AJT: REMOVE image stuff
        /*
        if (this._imageObjReady) {
            ctx.scale(this._size[0] / 512, this._size[1] / 512);
            ctx.drawImage(this._imageObj, 0, 0);
        }
        */

        for (var i = 0; i < this._children.length; i++) {
            this._children[i].draw(ctx, xform);
        }
    };

    return { Node: Node };
});

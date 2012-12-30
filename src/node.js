define(["color", "matrix2d"], function (colorModule, matrix2dModule) {

    var Color = colorModule.Color;
    var Matrix2D = matrix2dModule.Matrix2D;

	var Node = function () {
		this._position = [0, 0];
		this._rotation = 0;
		this._scale = [1, 1];
		this._anchor = [0, 0];
		this._size = [0, 0];
		this._skew = [0, 0];
		this._color = new Color(1, 1, 1, 1);
		this._xformDirty = true;
	};

	// position attribute
	Node.prototype.__defineGetter__("position", function () {
		return this._position.slice(0); // copy
	});
	Node.prototype.__defineSetter__("position", function (position) {
		this._position = position.slice(0); // copy
		this._xformDirty = true;
	});

	// rotation attribute
	Node.prototype.__defineGetter__("rotation", function () {
		return this._rotation;
	});
	Node.prototype.__defineSetter__("rotation", function (rotation) {
		this._rotation = rotation;
		this._xformDirty = true;
	});

	// scale attribute
	Node.prototype.__defineGetter__("scale", function () {
		return this._scale.slice(0); // copy
	});
	Node.prototype.__defineSetter__("scale", function (scale) {
		this._scale = scale.slice(0); // copy
		this._xformDirty = true;
	});

	// anchor attribute
	Node.prototype.__defineGetter__("anchor", function () {
		return this._anchor.slice(0); // copy
	});
	Node.prototype.__defineSetter__("anchor", function (anchor) {
		this._anchor = anchor.slice(0); // copy
		this._xformDirty = true;
	});

	// size attribute
	Node.prototype.__defineGetter__("size", function () {
		return this._size.slice(0); // copy
	});
	Node.prototype.__defineSetter__("size", function (size) {
		this._size = size.slice(0); // copy
		this._xformDirty = true;
	});

	// skew attribute
	Node.prototype.__defineGetter__("skew", function () {
		return this._skew.slice(0); // copy
	});
	Node.prototype.__defineSetter__("skew", function (skew) {
		this._skew = skew.slice(0); // copy
		this._xformDirty = true;
	});

	// color attribute
	Node.prototype.__defineGetter__("color", function () {
		return new Color(this._color.r, this._color.g, this._color.b, this._color.a); // copy
	});
	Node.prototype.__defineSetter__("color", function (color) {
		this._color = new Color(color.r, color.g, color.b, color.a); // copy
	});

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

	Node.prototype.draw = function (ctx) {
		this._updateXform();
		// TODO: mult by parent xform.
		ctx.setTransform.apply(ctx, this._xform.m);
        ctx.fillStyle = this.color.toString();
        ctx.fillRect(0, 0, this._size[0], this._size[1]);
	};

	return { Node: Node };
});

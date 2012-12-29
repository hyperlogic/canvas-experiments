define(function () {
    /**
     * this.m is set up so It can be used with a Canvas2d context using
     * ctx.setTransform.apply(ctx, matrix.m);
     * m is [a, b, c, d, e, f]
     *
     * | a c e |
     * | b d f |
     * | 0 0 1 |
     */
    var Matrix2D = function (a, b, c, d, e, f) {
        if (arguments.length === 6)
            this.m = [a, b, c, d, e, f];
        else
            this.m = [1, 0, 0, 1, 0, 0];
    };

    Matrix2D.prototype.setScaleRotTrans = function (sx, sy, rot, tx, ty) {
        var theta = rot * (Math.PI / 180.0);
        var sinTheta = Math.sin(theta);
        var cosTheta = Math.cos(theta);
        this.m = [sx * cosTheta, sx * sinTheta, -sy * sinTheta, sy * cosTheta, tx, ty];
    };

    Matrix2D.prototype.toString = function () {
        return "matrix(" + this.m.join(",") + ")";
    };

    return {Matrix2D: Matrix2D};
});
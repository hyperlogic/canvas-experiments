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
            this.m = [1, 0, 0, 1, 0, 0]; // identity
    };

    Matrix2D.prototype.setScaleRotTrans = function (sx, sy, rot, tx, ty) {
        var theta = rot * (Math.PI / 180.0);
        var sinTheta = Math.sin(theta);
        var cosTheta = Math.cos(theta);
        this.m = [sx * cosTheta, sx * sinTheta, -sy * sinTheta, sy * cosTheta, tx, ty];
    };

    Matrix2D.multiply = function (lhs, rhs) {
        var a = lhs.m, b = rhs.m;
        return new Matrix2D(a[0] * b[0] + a[2] * b[1],
                            a[1] * b[0] + a[3] * b[1],
                            a[0] * b[2] + a[2] * b[3],
                            a[1] * b[2] + a[3] * b[3],
                            a[0] * b[4] + a[2] * b[5] + a[4],
                            a[1] * b[4] + a[3] * b[5] + a[5]);
    };

    Matrix2D.prototype.toString = function () {
        return "matrix(" + this.m.join(",") + ")";
    };

    return {Matrix2D: Matrix2D};
});

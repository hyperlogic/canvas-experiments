define(["color", "matrix2d"], function (colorModule, matrix2dModule) {

    var Color = colorModule.Color;
    var Matrix2D = matrix2dModule.Matrix2D;

    var App = function (title, canvasId) {
        this.title = title;
        this.canvas = document.getElementById("canvas");
        this.width = canvas.width;
        this.height = canvas.height;
        this.ctx = canvas.getContext("2d");
        this.t = 0;
        this.backgroundColor = new Color(1, 1, 1, 1);

        // hook up rendering loop
        var FPS = 30;
        var self = this;
        setInterval(function () {
            self.update(1/FPS);
        }, 1000/FPS);
    };

    App.prototype.clear = function (color) {
        this.ctx.fillStyle = color.toString();
        this.ctx.fillRect(0, 0, this.width, this.height);
    };

    App.prototype.update = function (dt) {
        var ctx = this.ctx;
        this.t += dt;

        ctx.setTransform(1, 0, 0, 1, 0, 0); // ident

        this.clear(this.backgroundColor);

        var x = (Math.sin(this.t) * (this.width / 2)) + (this.width / 2);

        var mat = new Matrix2D();
        mat.setScaleRotTrans(1, 1, this.t * 30, x, 10);
        ctx.setTransform.apply(ctx, mat.m);

        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect(0, 0, 55, 50);

        ctx.setTransform(1, 0, 0, 1, 0, 0); // ident

        x = (Math.sin(this.t * 1.5) * (this.width / 2)) + (this.width / 2);
        ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        ctx.fillRect (x, 30, 55, 50);
    };

    return { App: App };
});
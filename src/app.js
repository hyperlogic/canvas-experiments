define(["color", "matrix2d", "node"], function (colorModule, matrix2dModule, nodeModule) {

    var Color = colorModule.Color;
    var Matrix2D = matrix2dModule.Matrix2D;
    var Node = nodeModule.Node;

    var App = function (title, canvasId) {
        this.title = title;
        this.canvas = document.getElementById("canvas");
        this.width = canvas.width;
        this.height = canvas.height;
        this.ctx = canvas.getContext("2d");
        this.t = 0;

        this.root = new Node({
            size: [this.width, this.height],
            color: new Color(0.4, 0.4, 0.4, 1)
        });

        this.blackBox = new Node({
            position: [100, 100],
            size: [30, 50],
            rotation: 45,
            anchor: [0.5, 0.25],
            skew: [0, 0],
            color: new Color(0, 0, 0, 1)
        });

        this.greenDot = new Node({
            anchor: [0.5, 0.5],
            position: [100, 100],
            size: [1, 1],
            color: new Color(0, 1, 0, 1)
        });

        this.redDot = new Node({
            position: [0, 0],
            anchor: [0, 0],
            size: [20, 10],
            color: new Color(1, 0, 0, 1)
        });

        this.blueDot = new Node({
            position: [30, 50],
            anchor: [1, 1],
            size: [20, 10],
            color: new Color(0.7, 0.7, 1, 1)
        });

        this.blackBox.children = [this.redDot, this.blueDot];
        this.root.children = [this.blackBox, this.greenDot];

        // hook up rendering loop
        var FPS = 30;
        var self = this;
        setInterval(function () {
            self.update(1/FPS);
        }, 1000/FPS);
    };

    App.prototype.update = function (dt) {
        var ctx = this.ctx;
        this.t += dt;

        ctx.setTransform(1, 0, 0, 1, 0, 0); // ident

        this.blackBox.rotation = this.t * 60;
        this.blackBox.anchor = [0.5, 0.5 + 0.5 * Math.sin(this.t)];

        this.root.draw(this.ctx);

        ctx.setTransform(1, 0, 0, 1, 0, 0); // ident
    };

    return { App: App };
});

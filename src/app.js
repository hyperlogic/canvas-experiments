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

		this.root = new Node();
		this.root.size = [this.width, this.height];
		this.root.color = new Color(0.4, 0.4, 0.4, 1);

		this.black = new Node();

		this.blackBox = new Node();
		this.blackBox.position = [100, 100];
		this.blackBox.size = [30, 50];
		this.blackBox.rotation = 45;
		this.blackBox.anchor = [0.5, 0.25];
		this.blackBox.skew = [0, 0];
		this.blackBox.color = new Color(0, 0, 0, 1);

		this.greenDot = new Node();
		this.greenDot.anchor = [0.5, 0.5]
		this.greenDot.position = [100, 100];
		this.greenDot.size = [1, 1];
		this.greenDot.color = new Color(0, 1, 0, 1);

		this.redDot = new Node();
		this.redDot.position = [0, 0];
		this.redDot.anchor = [0, 0];
		this.redDot.size = [20, 10];
		this.redDot.color = new Color(1, 0, 0, 1);

		this.blueDot = new Node();
		this.blueDot.position = [30, 50];
		this.blueDot.anchor = [1, 1];
		this.blueDot.size = [20, 10];
		this.blueDot.color = new Color(0.7, 0.7, 1, 1);

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

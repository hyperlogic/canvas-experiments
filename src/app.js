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
        this.backgroundColor = new Color(0.3, 0.3, 0.3, 1);

		this.nodes = [];
		this.nodes[0] = new Node();
		this.nodes[0].position = [100, 100];
		this.nodes[0].size = [10, 10];
		this.nodes[0].rotation = 45;
		this.nodes[0].anchor = [0.5, 0.5];
		this.nodes[0].skew = [0, 0];
		this.nodes[0].color = new Color(0, 0, 0, 1);

		this.nodes[1] = new Node();
		this.nodes[1].position = [100, 100];
		this.nodes[1].size = [1, 1];
		this.nodes[1].color = new Color(0, 1, 0, 1);

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

		this.nodes[0].rotation = this.t * 30;

		for (var i = 0; i < this.nodes.length; i++) {
			this.nodes[i].draw(this.ctx);
		}
    };

    return { App: App };
});

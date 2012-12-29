define(function () {
    var Color = function (r, g, b, a) {
        this.r = (r !== undefined) ? r : 1;
        this.g = (g !== undefined) ? g : 1;
        this.b = (b !== undefined) ? b : 1;
        this.a = (a !== undefined) ? a : 1;
    };

    Color.prototype.toString = function () {
        return "rgba(" + [Math.floor(this.r * 255), Math.floor(this.g * 255), Math.floor(this.b * 255), this.a].join(",") + ")";
    };

    return {Color: Color};
});
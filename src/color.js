define(function () {

	/**
	 * Converts a 4 element array [r, g, b, a] to a css string.
	 * elements are assumed to be in the interval [0, 1].
	 *
	 * @param {Array} ary - four element array of Numbers [0, 1].
	 * @returns {String} css string in the form "rgba(255, 255, 255, 1)"
	 */
	var toCssString = function (ary) {
		return "rgba(" + [Math.floor(ary[0] * 255), Math.floor(ary[1] * 255), Math.floor(ary[2] * 255), ary[3]].join(",") + ")";
	};

    return {toCssString: toCssString};
});

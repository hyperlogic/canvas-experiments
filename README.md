canvas-experiments
=====================
* rack middleware is used start a file server.  `rake server` to launch it.
* require.js is used to keep JavaScript modular.
* canvas is used for rendering.

Files
---------------------
* main.js - launches app
* app.js - initializes some nodes and hooks up self to setInterval for update callbacks.
* color.js - helper that converts colors to css style strings.
* matrix2d.js - helper to do some 3x3 homogeneous matrix multiplications etc.
* node.js - used to hierarchically manipulate and transform rectangles.

Experiments
---------------------
Experimenting with using getters & setters attribute style instead of get/set methods.

	// explicit set method
    node.setPosition(10, 10);

	// attribute style
    node.position = [10, 10];

So far it's mostly positive, the interface is clean, and more DOM like (for better or worse).

But there are some negatives, the interface is not discoverable. you can't just print the object out in the console to see the attributes.
Also, I miss the [fluent interface](http://en.wikipedia.org/wiki/Fluent_interface) that ngCore uses.

Experimenting with require.js style of requires instead of commonjs.

    define(["dep1", "dep2"], function (dep1, dep2) {
			return {dep3: dep3};
	});

Apparently, the commonjs style can't [easily be used in browsers](http://stackoverflow.com/questions/4773298/why-is-commonjs-only-said-to-be-suitable-for-non-browser-apps).
Not sure if I like it, it's a bit verbose.

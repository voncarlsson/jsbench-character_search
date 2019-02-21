"use strict";

(function (factory) {
	if (typeof Benchmark !== "undefined") {
		factory(Benchmark);
	} else {
		factory(require("benchmark"));
	}
})(function (Benchmark) {
	var suite = new Benchmark.Suite;

	Benchmark.prototype.setup = function () {
		function charFindWhileLoop(value, target) {
                        let i = (value.length - 1)|0;

                        do {
                                if (value[i] === target[0])
                                        return i;
                        } while (--i >= 0);

                        return -1;
                }

                function charFindForLoop(value, target) {
                        for (let i = 0; i < value.length; i++) {
                                if (value[i] === target[0])
                                        return i;
                        }

                        return -1;
                }

                const searchString = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	};

	suite.add("String.indexOf, near start", function () {
		/** String.indexOf **/

		return searchString.indexOf("d");
	});

	suite.add("String.indexOf, near middle", function () {
		/** String.indexOf **/

		return searchString.indexOf("5");
	});

	suite.add("String.indexOf, near end", function () {
		/** String.indexOf **/

		return searchString.indexOf("Y");
	});

	suite.add("While-loop, near start", function () {
		/** While-loop **/

		return charFindWhileLoop(searchString, "d");
	});

	suite.add("While-loop, near middle", function () {
		/** While-loop **/

		return charFindWhileLoop(searchString, "5");
	});

	suite.add("While-loop, near end", function () {
		/** While-loop **/

		return charFindWhileLoop(searchString, "Y");
	});

	suite.add("For-loop, near start", function () {
		/** For-loop **/

		return charFindForLoop(searchString, "d");
	});

	suite.add("For-loop, near middle", function () {
		/** For-loop **/

		return charFindForLoop(searchString, "5");
	});

	suite.add("For-loop, near end", function () {
		/** For-loop **/

		return charFindForLoop(searchString, "Y");
	});

	suite.on("cycle", function (evt) {
		console.log(" - " + evt.target);
	});

	suite.on("complete", function (evt) {
		console.log(new Array(30).join("-"));

		var results = evt.currentTarget.sort(function (a, b) {
			return b.hz - a.hz;
		});

		results.forEach(function (item) {
			console.log((idx + 1) + ". " + item);
		});
	});

	console.log("Character Search");
	console.log(new Array(30).join("-"));
	suite.run();
});

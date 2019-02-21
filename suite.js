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
		function stnd_tanh(x) {
		    return (Math.exp(x) - Math.exp(-x)) / (Math.exp(-x) + Math.exp(x));
		}
		
		function stnd_cached_tanh(x) {
		    const power = Math.exp(x);
		    
		    return (power - 1/power) / (1/power + power);
		}
		
		function stnd_dcached_tanh(x) {
		    const power = Math.exp(x);
		    const power2 = 1 / power;
		    
		    return (power - power2) / (power2 + power);
		}
		
		function simp_tanh(x) {
		    return 1 - (2 / (Math.exp(2*x) + 1));
		}
		
		function est_tanh(x) {
		    return 1 - (2 / (Math.pow(2*x, 2.71828182) + 1));
		}
	};


	suite.add("Standard", function () {
		/** Standard **/
		
		return stnd_tanh(Math.random());
	});

	suite.add("Standard + Cached", function () {
		/** Standard + Cached **/
		
		return stnd_cached_tanh(Math.random());
	});

	suite.add("Standard + Double Cached", function () {
		/** Standard + Double Cached **/
		
		return stnd_dcached_tanh(Math.random());
	});

	suite.add("Built-in function", function () {
		/** Built-in function **/
		
		return Math.tanh(Math.random());
	});

	suite.add("Simplified Math", function () {
		/** Simplified Math **/
		
		return simp_tanh(Math.random());
	});

	suite.add("Approximate tanh", function () {
		/** Approximate tanh **/
		
		return est_tanh(Math.random());
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

	console.log("Tanh implementations");
	console.log(new Array(30).join("-"));
	suite.run();
});

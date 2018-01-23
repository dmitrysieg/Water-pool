define(function() {
	var StandardGenerator = function(depth) {
		this.depth = depth;
	};

	StandardGenerator.prototype = {
		getHeight: function(x, y) {
			return 1 + this.getRandom(this.depth);
		},
		getRandom: function(n) {
			return Math.floor(Math.random() * n);
		}
	};
	
	return StandardGenerator;
});

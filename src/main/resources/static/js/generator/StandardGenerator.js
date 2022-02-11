define(function() {
	var StandardGenerator = function() {
	};

	StandardGenerator.prototype = {
		getHeight: function(x, y) {
			return 1 + this.getRandom(this.poolConfig.depth);
		},
		getRandom: function(n) {
			return Math.floor(Math.random() * n);
		}
	};
	
	return StandardGenerator;
});

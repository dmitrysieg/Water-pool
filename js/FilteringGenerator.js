define(function() {
	var FilteringGenerator = function(width, height, depth, blur) {
		this.width = width;
		this.height = height;
		this.depth = depth;
		this.blur = blur;
		this.map = [];
		this.tmpmap = [];
		// generate
		for (var j = 0; j < height; j++) {
		    this.map[j] = [];
		    this.tmpmap[j] = [];
		    for (var i = 0; i < width; i++) {
		        this.map[j][i] = 1 + this.getRandom(this.depth);
		        this.tmpmap[j][i] = this.map[j][i];
		    }
		}

		// blur
		for (var j = 1; j < height - 1; j++) {
            for (var i = 1; i < width - 1; i++) {
                var sum =
                    this.map[j - 1][i] +
                    this.map[j + 1][i] +
                    this.map[j][i - 1] +
                    this.map[j][i + 1];
                this.tmpmap[j][i] = Math.floor(sum / 4);
            }
        }
        for (var j = 1; j < height - 1; j++) {
            for (var i = 1; i < width - 1; i++) {
                this.map[j][i] = this.tmpmap[j][i];
            }
        }
	};

	FilteringGenerator.prototype = {

		getHeight: function(x, y) {
			return this.map[y][x];
		},
		getRandom: function(n) {
			return Math.floor(Math.random() * n);
		}
	};

	return FilteringGenerator;
});

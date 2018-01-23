define(function() {
	var FilteringGenerator = function(width, height, depth, blur) {
		this.width = width;
		this.height = height;
		this.depth = depth;
		this.blur = blur;
		this.map = [];
		this.tmpmap = [];
		// arrays init
		for (var j = 0; j < height; j++) {
		    this.map[j] = [];
		    this.tmpmap[j] = [];
		}
	};

	FilteringGenerator.prototype = {

        cycle: function(offset, action) {
            for (var j = offset; j < this.height - offset; j++) {
                for (var i = offset; i < this.width - offset; i++) {
                    action.call(this, i, j);
                }
            }
        },
        generate: function() {

            // randomize
            this.cycle(0, function(i, j) {
                this.map[j][i] = 1 + this.getRandom(this.depth);
                this.tmpmap[j][i] = this.map[j][i];
            });

            // blur
            for (var b = 0; b < this.blur; b++) {
                this.cycle(1, function(i, j) {
                    this.tmpmap[j][i] = this.mask2(i, j);
                });
                this.cycle(1, function(i, j) {
                    this.map[j][i] = this.tmpmap[j][i];
                });
            }

            return this;
        },
        mask: function(i, j) {
            var sum =
                this.map[j - 1][i] +
                this.map[j + 1][i] +
                this.map[j][i - 1] +
                this.map[j][i + 1];
            return Math.floor(sum / 4);
        },
        mask2: function(i, j) {
            var sum =
                this.map[j - 1][i - 1] +
                this.map[j    ][i - 1] +
                this.map[j + 1][i - 1] +
                this.map[j - 1][i    ] +
                this.map[j + 1][i    ] +
                this.map[j - 1][i + 1] +
                this.map[j    ][i + 1] +
                this.map[j + 1][i + 1];
            return Math.floor(sum / 8);
        },
		getHeight: function(x, y) {
			return this.map[y][x];
		},
		getRandom: function(n) {
			return Math.floor(Math.random() * n);
		}
	};

	return FilteringGenerator;
});

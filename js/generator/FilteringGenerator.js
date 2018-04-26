define(function() {
	var FilteringGenerator = function(blur) {
		this.blur = blur;
	};

	FilteringGenerator.prototype = {

        cycle: function(offset, action) {
            for (var j = offset; j < this.poolConfig.height - offset; j++) {
                for (var i = offset; i < this.poolConfig.width - offset; i++) {
                    action.call(this, i, j);
                }
            }
        },
        cycleOutline: function(offset, action) {

            var height = this.poolConfig.height;
            var width = this.poolConfig.width;

            for (var j = 0; j < offset; j++) {
                for (var i = 0; i < width; i++) {
                    action.call(this, i, j);
                    action.call(this, i, height - 1 - j);
                }
            }
            for (var j = offset; j < height - offset; j++) {
                for (var i = 0; i < offset; i++) {
                    action.call(this, i, j);
                    action.call(this, width - 1 - i, j);
                }
            }
        },
        init: function() {

            var height = this.poolConfig.height;
            var width = this.poolConfig.width;

            // arrays init
            this.map = [];
            this.tmpmap = [];
            for (var j = 0; j < height; j++) {
                this.map[j] = [];
                this.tmpmap[j] = [];
            }

            // randomize
            this.cycle(0, function(i, j) {
                this.map[j][i] = 1 + this.getRandom(this.poolConfig.depth);
                this.tmpmap[j][i] = this.map[j][i];
            });

            // blur
            var avg = 0.0;

            for (var b = 0; b < this.blur; b++) {
                this.cycle(1, function(i, j) {
                    this.tmpmap[j][i] = this.mask(i, j);
                });
                this.cycle(1, function(i, j) {
                    this.map[j][i] = this.tmpmap[j][i];

                    // calc average
                    avg += this.map[j][i];
                });
            }

            // smoothing edges
            avg /= (height - 1) * (width - 1) * this.blur;
            this.cycleOutline(5, function(i, j) {
                var ratio = this.map[j][i] / avg;
                if (ratio >= 1.08 || ratio <= 0.92) {
                    this.map[j][i] = Math.floor(avg);
                }
            });

            // cutting extra height
            var min = this.poolConfig.depth;
            var max = 0;
            this.cycle(0, function(i, j) {
                if (this.map[j][i] < min) {
                    min = this.map[j][i];
                }
                if (this.map[j][i] > max) {
                    max = this.map[j][i];
                }
            });

            this.cycle(0, function(i, j) {
                this.map[j][i] -= min - 1;
            });

            this.min = 1;
            this.max = max - min + 1;

            return this;
        },
        mask: function(i, j) {
            return this.mask8(i, j);
        },
        mask4: function(i, j) {
            var sum =
                this.map[j - 1][i] +
                this.map[j + 1][i] +
                this.map[j][i - 1] +
                this.map[j][i + 1];
            return Math.floor(sum / 4);
        },
        mask8: function(i, j) {
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
        stohasticMask: function(i, j) {
            var sums = [];
            sums.push(this.map[j - 1][i - 1]);
            sums.push(sums[0] + this.map[j    ][i - 1]);
            sums.push(sums[1] + this.map[j + 1][i - 1]);
            sums.push(sums[2] + this.map[j - 1][i    ]);
            sums.push(sums[3] + this.map[j + 1][i    ]);
            sums.push(sums[4] + this.map[j - 1][i + 1]);
            sums.push(sums[5] + this.map[j    ][i + 1]);
            sums.push(sums[6] + this.map[j + 1][i + 1]);
            var index = Math.floor(8 * Math.random());
            return sums[index] / (index + 1);
        },
		getHeight: function(x, y) {
			return this.map[y][x];
		},
        getColor: function(THREE, x, y) {
            var height = this.map[y][x];
            var h = (height - this.min) / (this.max - this.min); // todo catch division by zero
            var s = 0.8;
            var l = 0.3;
            return new THREE.Color("hsl({1}, {2}%, {3}%)"
                .replace("{1}", Math.floor(h * 100.0))
                .replace("{2}", Math.floor(s * 100.0))
                .replace("{3}", Math.floor(l * 100.0)));
        },
		getRandom: function(n) {
			return Math.floor(Math.random() * n);
		}
	};

	return FilteringGenerator;
});

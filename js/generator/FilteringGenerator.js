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
        init: function() {

            // arrays init
            this.map = [];
            this.tmpmap = [];
            for (var j = 0; j < this.poolConfig.height; j++) {
                this.map[j] = [];
                this.tmpmap[j] = [];
            }

            // randomize
            this.cycle(0, function(i, j) {
                this.map[j][i] = 1 + this.getRandom(this.poolConfig.depth);
                this.tmpmap[j][i] = this.map[j][i];
            });

            // blur
            for (var b = 0; b < this.blur; b++) {
                this.cycle(1, function(i, j) {
                    this.tmpmap[j][i] = this.mask(i, j);
                });
                this.cycle(1, function(i, j) {
                    this.map[j][i] = this.tmpmap[j][i];
                });
            }

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
		getRandom: function(n) {
			return Math.floor(Math.random() * n);
		}
	};

	return FilteringGenerator;
});

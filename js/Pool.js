define(function() {

    var opCounter = 0;

	/**
	 * Create a Pool object.
	 * @param width - Width of the surface in units.
	 * @param height - Another side length in units.
	 * @param depth - Max depth allowed for generator.
	 * @param generator - Generator interface object.
	 * * contract:
	 * * getHeight: function(x, y) - must return an integer between 1 and depth + 1.
	 */
	var Pool = function(width, height, depth, generator) {
		this.width = width;
		this.height = height;
		this.depth = depth;
		this.generator = generator;
		this.hasWater = false;

		this.poolHeights = [];
		for (var j = 0; j < this.height; j++) {
			this.poolHeights[j] = [];
			for (var i = 0; i < this.width; i++) {			
				this.poolHeights[j][i] = 0;
			}
		}

		this.waterHeights = [];
		for (var j = 0; j < this.height; j++) {
			this.waterHeights[j] = [];
			for (var i = 0; i < this.width; i++) {
				this.waterHeights[j][i] = -1;
			}
		}
	};

	Pool.prototype = {
	    cleanup: function() {
	        this.iterate(function(ph, i, j) {
	            this.waterHeights[j][i] = -1;
            });
	        this.hasWater = false;
	        return this;
	    },
	    /**
	     * Return data required for a generator, to limit access to pool fields.
	     */
	    getConfig: function() {
	        return {
	            width: this.width,
	            height: this.height,
	            depth: this.depth
	        };
	    },
		getGenerator: function() {
	    	return this.generator;
		},
	    /**
	     * Setup a generator to use.
	     */
	    setGenerator: function(generator) {
	        this.generator = generator;
	        this.generator.poolConfig = this.getConfig();
	        return this;
	    },
	    generate: function() {
	        if (this.hasWater) {
	            this.cleanup();
	        }
	        if (this.generator.init) {
	            this.generator.init();
	        }
	        this.iterate(function(ph, i, j) {
	            this.poolHeights[j][i] = this.generator.getHeight(i, j);
	        });
	        console.info(JSON.stringify(this.poolHeights));
	        return this;
	    },
		iterate: function(f) {
			for (var j = 0; j < this.height; j++) {
				for (var i = 0; i < this.width; i++) {
					f.call(this, this.poolHeights[j][i], i, j);
				}
			}
		},
		fill: function() {
			if (this.hasWater) {
				return this;
			}
			opCounter = 0;
			this.maxPHeight = -1;
			this.iterate(function(ph) {if (this.maxPHeight < ph) {this.maxPHeight = ph}});

			this.iterate(this.pourSingleColumn);
			this.hasWater = true;

            console.info(JSON.stringify(this.waterHeights));
			console.log("Operations amount: " + opCounter);

			return this;
		},
		pourSingleColumn: function(poolHeight, i, j) {

		    // guaranteed to be poured out
		    if (poolHeight == this.maxPHeight) {
                return;
            }

            var lowest = poolHeight + 1,
                highest = this.maxPHeight;

            var lastWaterLevel = -1;
            while (highest >= lowest) {

                var center = lowest + Math.floor((highest - lowest) / 2);
                if (this.isBoundary(i, j) || this.findBoundary(i, j, center)) {
                    highest = center - 1;
                } else {
                    lowest = center + 1;
                    lastWaterLevel = center;
                }
            }
            this.waterHeights[j][i] = lastWaterLevel;
		},
		findBoundary: function(x, y, h) {
			var passed = [];
			for (var j = 0; j < this.height; j++) {
				passed[j] = [];
				for (var i = 0; i < this.width; i++) {
					passed[j][i] = false;
				}
			}
			var stack = [];
			stack.push({_x: x, _y: y});
			while (stack.length > 0) {
				var curr = stack.pop();
				
				if (this.isBoundary(curr._x, curr._y)) {
					return true;
				}
				
				passed[curr._y][curr._x] = true;
				for (var next = this.getNext(curr._x, curr._y), k = 0; k < next.length; k++) {
				    opCounter++;
					if (this.poolHeights[next[k]._y][next[k]._x] < h && !passed[next[k]._y][next[k]._x]) {
						stack.push(next[k]);
					}
				}
			}
			return false;
		},
		getNext: function(x, y) {
			var next = [];
			if (x > 0)               {next.push({_x: x - 1, _y: y})}
			if (x < this.width - 1)  {next.push({_x: x + 1, _y: y})}
			if (y > 0)               {next.push({_x: x    , _y: y - 1})}
			if (y < this.height - 1) {next.push({_x: x    , _y: y + 1})}
			return next;
		},
		isBoundary: function(x, y) {
			return y == 0 || y == this.height - 1 || x == 0 || x == this.width - 1;
		}
	};
	
	return Pool;
});

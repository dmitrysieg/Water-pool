define(['stack'], function(Stack) {
	var Pool = function(w, h, d, generator) {
		this.width = w;
		this.height = h;
		this.depth = d;
		this.hasWater = false;
		this.poolHeights = [];
		for (var j = 0; j < this.height; j++) {
			this.poolHeights[j] = [];
			for (var i = 0; i < this.width; i++) {			
				this.poolHeights[j][i] = generator.getHeight(i, j);
			}
		}
		console.info(JSON.stringify(this.poolHeights));
		this.waterHeights = [];
		for (var j = 0; j < this.height; j++) {
			this.waterHeights[j] = [];
			for (var i = 0; i < this.width; i++) {
				this.waterHeights[j][i] = -1;
			}
		}
	};

	Pool.prototype = {
		iterate: function(f) {
			for (var j = 0; j < this.height; j++) {
				for (var i = 0; i < this.width; i++) {
					f.call(this, this.poolHeights[j][i], this.waterHeights[j][i]);
				}
			}
		},
		fill: function() {
			if (this.hasWater) {
				return;
			}
			var maxPHeight = -1;
			this.iterate(function(ph) {if (maxPHeight < ph) {maxPHeight = ph}});
			
			for (var j = 0; j < this.height; j++) {
				for (var i = 0; i < this.width; i++) {
					var lowest = this.poolHeights[j][i] + 1,
						highest = maxPHeight;
					var lastCenter = maxPHeight,
						center = Math.floor((lowest + highest) / 2);
						
					var lastResultPoored = true;
					while (Math.abs(lastCenter - center) > 0) {
						
						if (this.isBoundary(i, j) || this.findBoundary(i, j, center)) {
                            
                            console.log(j + " " + i + " " + center + " poored");
                            highest = center;
							lastCenter = center;
							center = Math.floor((lowest + highest) / 2);
                            
							lastResultPoored = true;
							
						} else {
							
                            console.log(j + " " + i + " " + center + " not poored");
                            lowest = center;
                            lastCenter = center;
							center = Math.floor((lowest + highest) / 2);
                            
							lastResultPoored = false;
						}
					}
					if (!lastResultPoored) {
						this.waterHeights[j][i] = lastCenter;
						console.log("WH " + this.waterHeights[j][i] + " PH " + this.poolHeights[j][i]);
					}
				}
			}
			this.hasWater = true;
		},
		findBoundary: function(x, y, h) {
			var passed = [];
			for (var j = 0; j < this.height; j++) {
				passed[j] = [];
				for (var i = 0; i < this.width; i++) {
					passed[j][i] = false;
				}
			}
			var stack = new Stack();
			stack.push({_x: x, _y: y});
			while (!stack.isEmpty()) {
				var curr = stack.pop();
				
				if (this.isBoundary(curr._x, curr._y)) {
					return true;
				}
				
				passed[curr._y][curr._x] = true;
				for (var next = this.getNext(curr._x, curr._y), k = 0; k < next.length; k++) {
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

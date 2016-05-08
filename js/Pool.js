var Pool = function(w, h, d, generator) {
	this.width = w;
	this.height = h;
	this.depth = d;
	this.hasWater = false;
	this.poolHeights = [];
	for (var i = 0; i < this.height; i++) {
		this.poolHeights[i] = [];
		for (var j = 0; j < this.width; j++) {			
			this.poolHeights[i][j] = generator.getHeight(j, i);
		}
	}
	this.waterHeights = [];
	for (var i = 0; i < this.height; i++) {
		this.waterHeights[i] = [];
		for (var j = 0; j < this.width; j++) {
			this.waterHeights[i][j] = -1;
		}
	}
};

Pool.prototype = {
	fill: function() {
		if (this.hasWater) {
			return;
		}
		for (var i = 0; i < this.height; i++) {
			for (var j = 0; j < this.width; j++) {
				if (!this.isBoundary(j, i)) {
					if (!this.findBoundary(j, i, this.poolHeights[i][j])) {
						this.waterHeights[i][j] = this.poolHeights[i][j] + 1;
					}
				}
			}
		}
		this.hasWater = true;
	},
	findBoundary: function(x, y, h) {
		var passed = [];
		for (var i = 0; i < this.height; i++) {
			passed[i] = [];
			for (var j = 0; j < this.width; j++) {
				passed[i][j] = false;
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
				if (this.poolHeights[next[k]._y][next[k]._x] <= this.poolHeights[curr._y][curr._x] && !passed[next[k]._y][next[k]._x]) {
					stack.push(next[k]);
				}
			}
		}
		return false;
	},
	getColor: function(x, y) {
		if (this.hasWater && this.waterHeights[y][x] > -1) {
			return "rgb(0,0,255)";
		} else {
			var comp = Math.floor(256.0 / this.depth * this.poolHeights[y][x]);
			return "rgb(" + comp + "," + comp + "," + comp + ")";
		}
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
	},
	render: function(el) {
		var table = document.createElement("table");
		table.setAttribute("cellpadding", "0");
		table.setAttribute("cellspacing", "0");
		el.appendChild(table);
		
		for (var i = 0; i < this.height; i++) {
			var tr = document.createElement("tr");
			table.appendChild(tr);
			for (var j = 0; j < this.width; j++) {
				var td = document.createElement("td");
				td.className = "cell";
				var div = document.createElement("div");			
				
				div.style["background-color"] = this.getColor(j, i);
				div.innerHTML = this.poolHeights[i][j];
				
				td.appendChild(div);
				tr.appendChild(td);
			}
		}
	}
};
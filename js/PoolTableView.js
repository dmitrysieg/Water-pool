define(function() {
	var PoolTableView = function(pool, el, w, h) {
		this.pool = pool;
		this.el = el;
		this.w = w;
		this.h = h;
	};

	PoolTableView.prototype = {
		getPool: function() {
			return this.pool;
		},
		getEl: function() {
			return this.el;
		},
		getColor: function(x, y) {
			if (this.getPool().hasWater && this.getPool().waterHeights[y][x] > -1) {
				return "rgb(0,0,255)";
			} else {
				var comp = Math.floor(256.0 / this.getPool().depth * this.getPool().poolHeights[y][x]);
				return "rgb(" + comp + "," + comp + "," + comp + ")";
			}
		},
		render: function() {
			var table = document.createElement("table");
			table.setAttribute("cellpadding", "0");
			table.setAttribute("cellspacing", "0");
			this.getEl().appendChild(table);
			
			for (var i = 0; i < this.getPool().height; i++) {
				var tr = document.createElement("tr");
				table.appendChild(tr);
				for (var j = 0; j < this.getPool().width; j++) {
					var td = document.createElement("td");
					td.className = "cell";
					var div = document.createElement("div");			
					
					div.style["background-color"] = this.getColor(j, i);
					div.innerHTML = this.getPool().poolHeights[i][j];
					
					td.appendChild(div);
					tr.appendChild(td);
				}
			}
		}
	};
	
	return PoolTableView;
});
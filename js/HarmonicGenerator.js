var HarmonicGenerator = function(w, h, depth, config) {
	this.w = w;
	this.h = h;
	this.depth = depth;
	this.config = config;
	if (config.randomize) {
		this.config.x = {};
		this.config.x.a = [];
		this.config.x.b = [];
		this.config.y = {};
		this.config.y.a = [];
		this.config.y.b = [];
		for (var i = 0; i < config.n; i++) {
			this.config.x.a[i] = Math.random();
			this.config.x.b[i] = Math.random();
			this.config.y.a[i] = Math.random();
			this.config.y.b[i] = Math.random();
		}
	}
};

HarmonicGenerator.prototype = {
	getHeight: function(x, y) {
		var vx = 0.0, vy = 0.0;
		for (var i = 0; i < this.config.n; i++) {
			vx += this.config.x.a[i] * Math.sin(Math.PI * (i + 1) * x / (this.w - 1)) +
				this.config.x.b[i] * Math.cos(Math.PI * (i + 1) * x / (this.w - 1));
			vy += this.config.y.a[i] * Math.sin(Math.PI * (i + 1) * y / (this.h - 1)) +
				this.config.y.b[i] * Math.cos(Math.PI * (i + 1) * y / (this.h - 1));
		}
		vx /= this.config.n;
		vy /= this.config.n;
		return 1 + Math.floor(this.depth * (2.0 + vx + vy) / 4.0);
	}
};
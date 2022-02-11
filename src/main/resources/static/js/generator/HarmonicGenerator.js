define(function() {
	var HarmonicGenerator = function(config) {
		this.config = config;
	};

	HarmonicGenerator.prototype = {
	    init: function() {
	        if (this.config.randomize) {
                this.config.x = {};
                this.config.x.a = [];
                this.config.x.b = [];
                this.config.y = {};
                this.config.y.a = [];
                this.config.y.b = [];
                for (var i = 0; i < this.config.n; i++) {
                    this.config.x.a[i] = Math.random();
                    this.config.x.b[i] = Math.random();
                    this.config.y.a[i] = Math.random();
                    this.config.y.b[i] = Math.random();
                }
            }
	    },
	    // todo remove duplicate code with FilteringGenerator
	    // and add actual implementation
        getColor: function(THREE, x, y) {
            var h = 0.5;
            var s = 0.8;
            var l = 0.3;
            return new THREE.Color("hsl({1}, {2}%, {3}%)"
                .replace("{1}", Math.floor(h * 100.0))
                .replace("{2}", Math.floor(s * 100.0))
                .replace("{3}", Math.floor(l * 100.0)));
        },
		getHeight: function(x, y) {
			var vx = 0.0, vy = 0.0;
			for (var i = 0; i < this.config.n; i++) {
				vx += this.config.x.a[i] * Math.sin(Math.PI * (i + 1) * x / (this.poolConfig.width - 1)) +
					this.config.x.b[i] * Math.cos(Math.PI * (i + 1) * x / (this.poolConfig.width - 1));
				vy += this.config.y.a[i] * Math.sin(Math.PI * (i + 1) * y / (this.poolConfig.height - 1)) +
					this.config.y.b[i] * Math.cos(Math.PI * (i + 1) * y / (this.poolConfig.height - 1));
			}
			vx /= this.config.n;
			vy /= this.config.n;
			return 1 + Math.floor(this.poolConfig.depth * (2.0 + vx + vy) / 4.0);
		}
	};
	
	return HarmonicGenerator;
});
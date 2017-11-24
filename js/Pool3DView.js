define(['./lib/three.min', './lib/OrbitControls'], function(THREE, oc) {
	var Pool3DView = function(pool, el, w, h) {
		this.pool = pool;
		this.el = el;
		this.w = w;
		this.h = h;
	};

	Pool3DView.prototype = {
		getPool: function() {
			return this.pool;
		},
		getEl: function() {
			return this.el;
		},
		getColor: function(x, y) {
			if (this.getPool().hasWater && this.getPool().waterHeights[y][x] > -1) {
				return 0x156289;
			} else {
				var comp = Math.floor(256.0 / this.getPool().depth * this.getPool().poolHeights[y][x]);
				return 0x808080;
			}
		},
		setupPool: function() {
			for (var i = 0; i < this.getPool().height; i++) {
				for (var j = 0; j < this.getPool().width; j++) {
					
					var wmaterial, wheight;
					var pmaterial = new THREE.MeshPhongMaterial({
						color: 0x808080,
						side: THREE.DoubleSide,
						shading: THREE.FlatShading
					});
					var pheight = this.getPool().poolHeights[j][i];
					if (this.getPool().hasWater && this.getPool().waterHeights[j][i] > -1) {
						wmaterial = new THREE.MeshPhongMaterial({
							color: 0x156289,
							side: THREE.DoubleSide,
							shading: THREE.FlatShading,
							transparent: true,
							opacity: 0.3
						});
						wheight = this.getPool().waterHeights[j][i] - this.getPool().poolHeights[j][i];
						//console.log("W" + height);
						var wgeometry = new THREE.BoxGeometry(1, wheight, 1);
						var wcube = new THREE.Mesh(wgeometry, wmaterial);
						this.scene.add(wcube);
						wcube.position.set(i, pheight + 0.5 * wheight, j);
					}
					
					var pgeometry = new THREE.BoxGeometry(1, pheight, 1);
					var pcube = new THREE.Mesh(pgeometry, pmaterial);
					this.scene.add(pcube);
					pcube.position.set(i, 0.5 * pheight, j);
				}
			}
		},
		setupScene: function() {
			this.renderer = new THREE.WebGLRenderer({antialias:true});
			this.renderer.setSize(window.innerWidth, window.innerHeight);
			this.getEl().appendChild(this.renderer.domElement);
			
			this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            this.camera.position.set(-15, 35, -7.5);
            this.camera.lookAt(new THREE.Vector3(0.56, -0.72, 0.40));

			this.scene = new THREE.Scene();

			var lights = [];
			lights[0] = new THREE.PointLight(0xffffff, 1, 0);
			lights[1] = new THREE.PointLight(0xffffff, 1, 0);
			lights[2] = new THREE.PointLight(0xffffff, 1, 0);

			lights[0].position.set(0, 200, 0);
			lights[1].position.set(100, 200, 100);
			lights[2].position.set(-100, -200, -100);

			this.scene.add(lights[0]);
			this.scene.add(lights[1]);
			this.scene.add(lights[2]);
			
			this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
		},
		init: function() {
			this.setupScene();
			this.setupPool();
		},
		animate: function() {
		    var self = this;
		    requestAnimationFrame(function() {self.animate();});
            this.renderer.render(this.scene, this.camera);
            this.controls.update();
            this.logPositions();
		},
		logPositions: function() {
			var el = document.getElementById('infotext');
			var dir = this.camera.getWorldDirection();
			el.innerHTML = "pos X: " + this.camera.position.x + "<br/>" +
						"pos Y: " + this.camera.position.y + "<br/>" +
						"pos Z: " + this.camera.position.z + "<br/>" +
						"dir X: " + dir.x + "<br/>" +
						"dir Y: " + dir.y + "<br/>" +
						"dir Z: " + dir.z;
		}
	};
	
	return Pool3DView;
});
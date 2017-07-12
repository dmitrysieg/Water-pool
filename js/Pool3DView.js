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
		setupPool: function(scene) {
			

			
			for (var i = 0; i < this.getPool().height; i++) {
				for (var j = 0; j < this.getPool().width; j++) {
					
					var geometry = new THREE.BoxGeometry(1, this.getPool().poolHeights[i][j], 1);
					var material = new THREE.MeshPhongMaterial({
						color: this.getColor(j, i),
						side: THREE.DoubleSide,
						shading: THREE.FlatShading
					});
					var cube = new THREE.Mesh(geometry, material);
					scene.add(cube);
					cube.position.set(i, 0.5 * this.getPool().poolHeights[i][j], j);
					
					//div.style["background-color"] = this.getColor(j, i);
					//div.innerHTML = this.getPool().poolHeights[i][j];
				}
			}
		},
		setupScene: function() {
			var scene = new THREE.Scene();
			var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
			this.camera = camera;

			var renderer = new THREE.WebGLRenderer();
			renderer.setSize(window.innerWidth, window.innerHeight);
			// todo this.getEl()
			document.body.appendChild(renderer.domElement);
			
			camera.position.set(-15, 35, -7.5);
			camera.lookAt(new THREE.Vector3(0.56, -0.72, 0.40));
			
			var lights = [];
			lights[0] = new THREE.PointLight(0xffffff, 1, 0);
			lights[1] = new THREE.PointLight(0xffffff, 1, 0);
			lights[2] = new THREE.PointLight(0xffffff, 1, 0);

			lights[0].position.set(0, 200, 0);
			lights[1].position.set(100, 200, 100);
			lights[2].position.set(-100, -200, -100);

			scene.add(lights[0]);
			scene.add(lights[1]);
			scene.add(lights[2]);
			
			var orbit = new THREE.OrbitControls(camera, renderer.domElement);
			orbit.enableZoom = false;
			
			var r = function () {
				requestAnimationFrame(r);
				//if (!options.fixed) {
					//cube.rotation.x += 0.005;
					//cube.rotation.y += 0.005;
				//}
				renderer.render(scene, camera);
			};
			
			r();
			var timerId = setInterval(this.startlogging, 1000, this.camera);
			
			return scene;
		},
		render: function() {
			this.scene = this.setupScene();
			this.setupPool(this.scene);
		},
		startlogging: function(camera) {
			var el = document.getElementById('infotext');
			var dir = camera.getWorldDirection();
			el.innerHTML = "pos: X: " + camera.position.x +
						"; Y: " + camera.position.y +
						"; Z: " + camera.position.z +
						"<br />" +
						"dir: X: " + dir.x +
						"; Y: " + dir.y +
						"; Z: " + dir.z;
		}
	};
	
	return Pool3DView;
});
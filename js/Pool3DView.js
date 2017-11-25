define(['./lib/three.min', './lib/OrbitControls'], function(THREE, oc) {
	var Pool3DView = function(pool, el) {
		this.pool = pool;
		this.el = el;
		this.materials = {
		    water: new THREE.MeshPhongMaterial({
                color: 0x156289,
                side: THREE.DoubleSide,
                shading: THREE.FlatShading,
                transparent: true,
                opacity: 0.3
            }),
            pool: new THREE.MeshPhongMaterial({
                color: 0x808080,
                side: THREE.DoubleSide,
                shading: THREE.FlatShading
            })
        };
	};

	Pool3DView.prototype = {
		getPool: function() {
			return this.pool;
		},
		getEl: function() {
			return this.el;
		},
		setupPool: function() {
		    this.groups = {
		        pool: new THREE.Group(),
		        water: new THREE.Group()
		    };

			for (var i = 0; i < this.getPool().height; i++) {
				for (var j = 0; j < this.getPool().width; j++) {
					
					var poolHeight = this.getPool().poolHeights[j][i];
					if (this.getPool().hasWater && this.getPool().waterHeights[j][i] > -1) {

						var waterHeight = this.getPool().waterHeights[j][i] - this.getPool().poolHeights[j][i];

						var waterGeometry = new THREE.BoxGeometry(1, waterHeight, 1);
						var waterMesh = new THREE.Mesh(waterGeometry, this.materials.water);
						this.groups.water.add(waterMesh);
						waterMesh.position.set(i, poolHeight + 0.5 * waterHeight, j);
					}
					
					var poolGeometry = new THREE.BoxGeometry(1, poolHeight, 1);
					var poolMesh = new THREE.Mesh(poolGeometry, this.materials.pool);
					this.groups.pool.add(poolMesh);
					poolMesh.position.set(i, 0.5 * poolHeight, j);
				}
			}
			this.scene.add(this.groups.pool);
			this.scene.add(this.groups.water);
		},
		setupScene: function() {
			var WIDTH = document.body.clientWidth,
			    HEIGHT = document.body.clientHeight;
			this.renderer = new THREE.WebGLRenderer({antialias:true});
			this.renderer.setSize(WIDTH, HEIGHT);
			this.getEl().appendChild(this.renderer.domElement);
			
			this.camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);
            this.camera.position.set(-15, 35, -7.5);
            this.camera.lookAt(new THREE.Vector3(0.56, -0.72, 0.40));

            var renderer = this.renderer,
                camera = this.camera;
            window.addEventListener('resize', function() {
                var WIDTH = document.body.clientWidth,
                    HEIGHT = document.body.clientHeight;
                renderer.setSize(WIDTH, HEIGHT);
                camera.aspect = WIDTH / HEIGHT;
                camera.updateProjectionMatrix();
            });

			this.scene = new THREE.Scene();

			var lights = [];
			lights[0] = new THREE.PointLight(0xDDDDDD, 1, 0);
			lights[1] = new THREE.PointLight(0xDDDDDD, 1, 0);
			lights[2] = new THREE.PointLight(0xDDDDDD, 1, 0);

			lights[0].position.set(0, 200, 0);
			lights[1].position.set(100, 200, 100);
			lights[2].position.set(-100, -200, -100);

			this.scene.add(lights[0]);
			this.scene.add(lights[1]);
			this.scene.add(lights[2]);
			
			this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
			this.controls.center = new THREE.Vector3(
			    0.5 * this.getPool().height,
			    0.0,
			    0.5 * this.getPool().width
            );
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
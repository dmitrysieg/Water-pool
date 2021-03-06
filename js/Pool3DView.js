define(['./lib/three.min', './lib/OrbitControls'], function(THREE, oc) {
	var Pool3DView = function(pool, el) {
		this.pool = pool;
		this.el = el;
		this.materials = {
		    stdColor: new THREE.Color(1, 1, 1),
		    water: new THREE.MeshPhongMaterial({
                color: 0x156289,
                shading: THREE.FlatShading,
                transparent: true,
                opacity: 0.3
            }),
            pool: new THREE.MeshStandardMaterial({
                //color: 0x808080,
                roughness: 0.9,
                shading: THREE.FlatShading,
                vertexColors: THREE.FaceColors
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
		/**
		 * @param faces - Array of geometry.faces.
		 * @param v - Array of vertices in a clockwise order.
         * @param color - Color
		 */
		drawFace4: function(faces, v, color) {
		    faces.push(new THREE.Face3(v[0], v[1], v[2], null, color || this.materials.stdColor));
            faces.push(new THREE.Face3(v[0], v[2], v[3], null, color || this.materials.stdColor));
		},
		setupPool: function() {
		    this.groups = {
		        pool: new THREE.Group(),
		        water: new THREE.Group()
		    };

			var poolGeometry = new THREE.Geometry();
			this.verticesIndices = {
			    top: []
			};
			var vi = 0;
			var height = this.getPool().height,
			    width = this.getPool().width;

			for (var i = 0; i < height; i++) {

			    // init 2d array
			    this.verticesIndices.top[i] = [];

                for (var j = 0; j < width; j++) {

                    var poolHeight = this.getPool().poolHeights[i][j];
                    var color = this.getPool().getGenerator().getColor(THREE, j, i);

                    // bypassing clockwise
                    poolGeometry.vertices.push(new THREE.Vector3(i    , poolHeight, j    ));
                    poolGeometry.vertices.push(new THREE.Vector3(i    , poolHeight, j + 1));
                    poolGeometry.vertices.push(new THREE.Vector3(i + 1, poolHeight, j + 1));
                    poolGeometry.vertices.push(new THREE.Vector3(i + 1, poolHeight, j    ));

                    this.verticesIndices.top[i][j] = [
                        vi++, vi++, vi++, vi++
                    ];

                    this.drawFace4(poolGeometry.faces, [
                        this.verticesIndices.top[i][j][0],
                        this.verticesIndices.top[i][j][1],
                        this.verticesIndices.top[i][j][2],
                        this.verticesIndices.top[i][j][3]
                    ], color);

                    // previous laying vertices exist, merging sides
                    // if pool heights match, skip this
                    if (i > 0 && this.getPool().poolHeights[i - 1][j] != poolHeight) {
                        this.drawFace4(poolGeometry.faces, [
                            this.verticesIndices.top[i    ][j][1],
                            this.verticesIndices.top[i    ][j][0],
                            this.verticesIndices.top[i - 1][j][3],
                            this.verticesIndices.top[i - 1][j][2]
                        ], color);
                    }

                    // the same for j
                    if (j > 0 && this.getPool().poolHeights[i][j - 1] != poolHeight) {
                        this.drawFace4(poolGeometry.faces, [
                            this.verticesIndices.top[i][j    ][0],
                            this.verticesIndices.top[i][j    ][3],
                            this.verticesIndices.top[i][j - 1][2],
                            this.verticesIndices.top[i][j - 1][1]
                        ], color);
                    }

                    // water in the same cycle
                    if (this.getPool().hasWater && this.getPool().waterHeights[i][j] > -1) {

                        var waterHeight = this.getPool().waterHeights[i][j] - this.getPool().poolHeights[i][j];

                        var waterGeometry = new THREE.BoxGeometry(1, waterHeight, 1);
                        var waterMesh = new THREE.Mesh(waterGeometry, this.materials.water);
                        this.groups.water.add(waterMesh);
                        waterMesh.position.set(i + 0.5, poolHeight + 0.5 * waterHeight, j + 0.5);
                    }
                }
            }

            // i == 0 and i == height side face
            for (var j = 0; j < width; j++) {
                poolGeometry.vertices.push(new THREE.Vector3(0, 0, j));
                poolGeometry.vertices.push(new THREE.Vector3(0, 0, j + 1));
                vi += 2;
                this.drawFace4(poolGeometry.faces, [
                    this.verticesIndices.top[0][j][1],
                    this.verticesIndices.top[0][j][0],
                    vi - 2, // j
                    vi - 1  // j + 1
                ]);

                poolGeometry.vertices.push(new THREE.Vector3(height, 0, j));
                poolGeometry.vertices.push(new THREE.Vector3(height, 0, j + 1));
                vi += 2;
                this.drawFace4(poolGeometry.faces, [
                    this.verticesIndices.top[height - 1][j][3],
                    this.verticesIndices.top[height - 1][j][2],
                    vi - 1, // j + 1
                    vi - 2  // j
                ]);
            }

            // j == 0 and j == width side face
            for (var i = 0; i < height; i++) {
                poolGeometry.vertices.push(new THREE.Vector3(i,     0, 0));
                poolGeometry.vertices.push(new THREE.Vector3(i + 1, 0, 0));
                vi += 2;
                this.drawFace4(poolGeometry.faces, [
                    this.verticesIndices.top[i][0][0],
                    this.verticesIndices.top[i][0][3],
                    vi - 1, // i + 1
                    vi - 2  // i
                ]);

                poolGeometry.vertices.push(new THREE.Vector3(i,     0, width));
                poolGeometry.vertices.push(new THREE.Vector3(i + 1, 0, width));
                vi += 2;
                this.drawFace4(poolGeometry.faces, [
                    this.verticesIndices.top[i][width - 1][2],
                    this.verticesIndices.top[i][width - 1][1],
                    vi - 2, // i
                    vi - 1  // i + 1
                ]);
            }

            // bottom, counterclockwise looking from above
            poolGeometry.vertices.push(new THREE.Vector3(0,      0, 0));
            poolGeometry.vertices.push(new THREE.Vector3(height, 0, 0));
            poolGeometry.vertices.push(new THREE.Vector3(height, 0, width));
            poolGeometry.vertices.push(new THREE.Vector3(0     , 0, width));
            this.drawFace4(poolGeometry.faces, [
                vi,
                vi + 1,
                vi + 2,
                vi + 3
            ]);

            var poolMesh = new THREE.Mesh(poolGeometry, this.materials.pool);
            this.groups.pool.add(poolMesh);

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

            this.scene.add(new THREE.AmbientLight(0x404040));
            this.scene.add(new THREE.HemisphereLight(0xffffbb, 0x080820, 0.8));
			
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
		update: function() {
		    this.scene.remove(this.groups.pool);
            this.scene.remove(this.groups.water);
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
			el.innerHTML =
                "pos X: " + this.camera.position.x + "<br/>" +
                "pos Y: " + this.camera.position.y + "<br/>" +
				"pos Z: " + this.camera.position.z + "<br/>" +
				"dir X: " + dir.x + "<br/>" +
				"dir Y: " + dir.y + "<br/>" +
				"dir Z: " + dir.z;
		}
	};
	
	return Pool3DView;
});
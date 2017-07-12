require(['standardgenerator', 'harmonicgenerator', 'pool', 'pool3dview', 'jsongenerator'],
	function(StandardGenerator, HarmonicGenerator, Pool, PoolView, JsonGenerator) {
		var pool = new Pool(
			16, 16, 5,
			new HarmonicGenerator(
				16, 16, 16, {
					n: 4,
					x: {a: [-0.5, -0.5, -0.8, -0.5], b: [0.0, 0.0, 0.0, 0.5]},
					y: {a: [-0.5, -0.5, -0.8, -0.5], b: [0.0, 0.0, 0.0, 0.5]},
					randomize: false
				}
			)
			//new StandardGenerator(2)
            /*new JsonGenerator("[[2,1,2,2,1,2,1,2,1,2,1,2,1,2,1,2],[2,2,2,1,2,1,2,1,2,1,1,1,2,2,2,2],[2,2,1,1,1,1,1,1,2,1,2,1,1,2,1,2],[2,2,2,2,2,2,2,2,1,1,2,2,1,1,1,2],[2,2,1,2,2,2,1,2,2,1,2,1,2,2,2,1],[1,2,2,2,1,1,1,1,2,2,1,1,2,2,1,1],[2,2,1,1,1,1,1,2,2,2,1,2,1,1,2,1],[1,1,1,2,1,1,1,2,2,1,1,2,2,1,2,2],[2,2,1,1,2,2,1,2,1,1,2,1,2,2,2,2],[1,1,1,2,2,1,1,2,1,2,2,2,2,2,1,1],[1,2,1,2,2,1,2,2,1,2,1,2,2,2,1,1],[1,1,2,1,2,2,2,2,1,2,1,1,2,2,2,1],[1,1,1,2,1,1,2,1,1,2,1,1,1,2,1,1],[1,1,2,1,1,1,1,2,1,2,2,2,1,1,1,2],[2,1,2,1,1,2,1,1,1,2,1,2,1,2,2,1],[1,1,1,2,2,1,2,2,1,1,2,2,1,2,2,2]]")*/
		);
		pool.fill();
		//new PoolTableView(pool, document.getElementById('pool'), 8, 8).render();
		new PoolView(pool, document.getElementById('pool'), 8, 8).render();
	}
);
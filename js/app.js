require(['standardgenerator', 'harmonicgenerator', 'pool', 'pool3dview'],
	function(StandardGenerator, HarmonicGenerator, Pool, PoolView) {
		var pool = new Pool(
			20, 20, 5,
		//	new HarmonicGenerator(
		//		64, 64, 16, {
		//			n: 5,
		//			//x: {a: [-1.0, 0.0], b: [0.0, 0.0]},
		//			//y: {a: [-1.0, 0.0], b: [0.0, 0.0]}
		//			randomize: true
		//		}
			//)
			new StandardGenerator(4)
		);
		pool.fill();
		//new PoolTableView(pool, document.getElementById('pool'), 8, 8).render();
		new PoolView(pool, document.getElementById('pool'), 8, 8).render();
	}
);
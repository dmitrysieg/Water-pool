require(['standardgenerator', 'harmonicgenerator', 'pool', 'pooltableview'],
	function(StandardGenerator, HarmonicGenerator, Pool, PoolTableView) {
		var pool = new Pool(
			64, 64, 2,
		//	new HarmonicGenerator(
		//		64, 64, 16, {
		//			n: 5,
		//			//x: {a: [-1.0, 0.0], b: [0.0, 0.0]},
		//			//y: {a: [-1.0, 0.0], b: [0.0, 0.0]}
		//			randomize: true
		//		}
			//)
			new StandardGenerator(2)
		);
		pool.fill();
		new PoolTableView(pool, document.getElementById('pool'), 8, 8).render();
	}
);
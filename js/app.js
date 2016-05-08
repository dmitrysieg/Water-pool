require(['standardgenerator', 'harmonicgenerator', 'pool'],
	function(StandardGenerator, HarmonicGenerator, Pool) {
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
		pool.render(document.getElementById('pool'));
	}
);
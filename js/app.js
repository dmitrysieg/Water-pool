require(['standardgenerator', 'harmonicgenerator', 'pool', 'pool3dview', 'jsongenerator'],
	function(StandardGenerator, HarmonicGenerator, Pool, PoolView, JsonGenerator) {

	    function createUI() {
	        var uiPanel = document.createElement("div");
	        uiPanel.id = "infopanel";

	        var textPanel = document.createElement("p");
	        textPanel.id = "infotext";
	        uiPanel.appendChild(textPanel);

	        return uiPanel;
	    };

		document.body.appendChild(createUI());
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
		var poolView = new PoolView(pool, document.body, 8, 8);
		poolView.init();
		poolView.animate();
	}
);
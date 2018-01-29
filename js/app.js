require([
    'generator/standardgenerator',
    'generator/harmonicgenerator',
    'generator/jsongenerator',
    'generator/filteringgenerator',
    'pool',
    'pool3dview',
    'controls'
], function(
    StandardGenerator,
    HarmonicGenerator,
    JsonGenerator,
    FilteringGenerator,
    Pool,
    PoolView,
    UIControls
) {

    var config = {
        width: 100,
        height: 100,
        "gen-harmonic": "gen-harmonic",
        "gen-json": "gen-json",
        "gen-filtering": "gen-filtering"
    };

    var pool = new Pool(100, 100, 0, new FilteringGenerator(100, 100, 20, 2).generate()).generate().fill();

    var uiControls = new UIControls(document.body, config, pool);

    //new PoolTableView(pool, document.getElementById('pool'), 8, 8).render();
    var poolView = new PoolView(pool, document.body);
    poolView.init();
    poolView.animate();
});
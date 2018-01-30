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

    var pool = new Pool(100, 100, 100)
        .setGenerator(new FilteringGenerator(2))
        .generate()
        .fill();

    //new PoolTableView(pool, document.getElementById('pool'), 8, 8).render();
    var poolView = new PoolView(pool, document.body);
    var uiControls = new UIControls(document.body, config, pool, poolView);

    poolView.init();
    poolView.animate();
});
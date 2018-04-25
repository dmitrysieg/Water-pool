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
    Controls
) {

    var config = {
        width: 100,
        height: 100,
        "gen-harmonic": "gen-harmonic",
        "gen-json": "gen-json",
        "gen-filtering": "gen-filtering"
    };

    var modal = new Controls.Modal(document.body);
    modal.show();

    var pool;
    var poolView;
    var uiControls;
    var thread = setTimeout(function() {
        pool = new Pool(100, 100, 100)
            .setGenerator(new FilteringGenerator(10))
            .generate()
            .fill();

        //new PoolTableView(pool, document.getElementById('pool'), 8, 8).render();
        poolView = new PoolView(pool, document.body);
        uiControls = new Controls.UIControls(document.body, config, pool, poolView);

        poolView.init();
        modal.hide();
    }, 0);

    poolView.animate();
});
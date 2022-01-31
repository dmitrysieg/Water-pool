require([
    'generator/StandardGenerator',
    'generator/HarmonicGenerator',
    'generator/JsonGenerator',
    'generator/FilteringGenerator',
    'Pool',
    'Pool3DView',
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

    var waiter = document.createElement("div");
    waiter.addEventListener("done", function() {
        poolView.animate();
    });

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
        waiter.dispatchEvent(new CustomEvent("done"));
    }, 0);
});
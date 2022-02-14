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
//        pool = new Pool(7, 7, 100)
//            .setGenerator(new JsonGenerator("[" +
//                "[12, 12, 12, 11, 12, 12, 12]," +
//                "[12, 12, 12, 12, 12, 12, 12]," +
//                "[12, 11, 11,  9, 12,  9, 11]," +
//                "[12,  8, 10, 11, 12, 12, 12]," +
//                "[12,  8, 10,  1, 12,  1, 12]," +
//                "[12, 12, 10,  1,  1, 12, 12]," +
//                "[12, 12, 12, 11, 12, 12, 12]"  +
//                "]"))
        var generationTime = Date.now();
        pool = new Pool(100, 100, 100)
            .setGenerator(new FilteringGenerator(10))
            .generate()
            .fill();
        generationTime = Date.now() - generationTime;
        console.log("Generation time: " + generationTime + " ms");

        var drawTime = Date.now();
        //new PoolTableView(pool, document.getElementById('pool'), 8, 8).render();
        poolView = new PoolView(pool, document.body);
        uiControls = new Controls.UIControls(document.body, config, pool, poolView);
        uiControls.setModal(modal);

        poolView.init();
        modal.hide();
        waiter.dispatchEvent(new CustomEvent("done"))
        drawTime = Date.now() - drawTime;
        console.log("Draw time: " + drawTime + " ms");
    }, 0);
});
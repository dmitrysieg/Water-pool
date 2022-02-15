require([
    'generator/StandardGenerator',
    'generator/HarmonicGenerator',
    'generator/JsonGenerator',
    'generator/FilteringGenerator',
    'PoolServer',
    'Pool3DView',
    'controls'
], function(
    StandardGenerator,
    HarmonicGenerator,
    JsonGenerator,
    FilteringGenerator,
    PoolServer,
    PoolView,
    Controls
) {

    var config = {
        width: 100,
        height: 100,
        depth: 100,
        generator: {
            name: "gen-filtering",
            params: {
                blur: 10
            }
        }
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

    let poolServer = new PoolServer("/pool");

    var thread = setTimeout(function() {

        poolServer.getPool(config, function(response) {

            if (!response.pool) {
                console.error("No pool information found in response");
                return;
            }

            response.pool.minHeight = response.maxFinder.minHeight;
            response.pool.maxHeight = response.maxFinder.maxHeight;

            //new PoolTableView(pool, document.getElementById('pool'), 8, 8).render();
            poolView = new PoolView(response.pool, poolServer, config, document.body);
            uiControls = new Controls.UIControls(document.body, config, poolView);
            uiControls.setModal(modal);
            poolView.setUI(uiControls);

            poolView.init();
            modal.hide();
            waiter.dispatchEvent(new CustomEvent("done"));
        });
    }, 0);
});
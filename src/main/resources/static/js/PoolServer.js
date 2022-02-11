define(function() {

    let PoolServer = function(url) {
        this.url = url;
    };

    PoolServer.prototype = {
        getPool: function(params, onLoad) {

            let xhr = new XMLHttpRequest();
            xhr.open("POST", this.url, true);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

            xhr.onload = function(e) {
                let jsonResponse = JSON.parse(e.target.response);
                onLoad.call(e, jsonResponse);
            };
            xhr.onerror = function () {
                console.error("** An error occurred during the XMLHttpRequest");
            };

            xhr.send(JSON.stringify(params));
        }
    };

    return PoolServer;
});
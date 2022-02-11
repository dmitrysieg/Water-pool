define(function() {

    let PoolServer = function(url) {
        this.url = url;
    };

    PoolServer.prototype = {
        getPool: function(params, onLoad) {
            let xhr = new XMLHttpRequest();
            xhr.open("POST", this.url, true);
            xhr.onload = function(e) {
                code = xhr.response;
            };
            xhr.onerror = function () {
                console.error("** An error occurred during the XMLHttpRequest");
            };
            xhr.send();
        }
    };

    return PoolServer;
});
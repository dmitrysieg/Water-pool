define([
    'generator/HarmonicGenerator',
    'generator/JsonGenerator',
    'generator/FilteringGenerator'
], function(
    HarmonicGenerator,
    JsonGenerator,
    FilteringGenerator
) {

    var UIControlPanel = function(parent, poolView, config) {
        this.parent = parent;
        this.poolView = poolView;
        this.config = config;
    };

    UIControlPanel.prototype = {

        init: function(el) {

            this.el = el;

            var self = this;
            this.el.querySelector("#ctl-gen-harmonic").onclick = function() {self.onRadioSelect.apply(self, arguments);};
            this.el.querySelector("#ctl-gen-json").onclick = function() {self.onRadioSelect.apply(self, arguments);};
            this.el.querySelector("#ctl-gen-filtering").onclick = function() {self.onRadioSelect.apply(self, arguments);};

            this.el.querySelector("#ctl-height").onchange = function() {self.onInputChange.apply(self, arguments);};
            this.el.querySelector("#ctl-width").onchange = function() {self.onInputChange.apply(self, arguments);};
            this.el.querySelector("#ctl-depth").onchange = function() {self.onInputChange.apply(self, arguments);};

            this.el.querySelector("#ctl-submit").onclick = function() {self.onSubmit.apply(self, arguments);};

            return this;
        },
        onRadioSelect: function(e) {
            var el = document.getElementById(e.target.id);
            if (!el) {
                throw "Invalid element triggered onRadioSelect";
            }
            if (el.value == "gen-harmonic") {

                this.config.generator = {
                    name: "harmonic",
                    params: {
                        n: 4,
                        x: {a: [-0.5, -0.5, -0.8, -0.5], b: [0.0, 0.0, 0.0, 0.5]},
                        y: {a: [-0.5, -0.5, -0.8, -0.5], b: [0.0, 0.0, 0.0, 0.5]},
                        randomize: false
                    }
                };


            } else if (el.value == "gen-json") {
                // todo
            } else if (el.value == "gen-filtering") {

                this.config.generator = {
                    name: "filtering",
                    params: {
                        blur: 2
                    }
                };
            }
        },
        onInputChange: function(e) {
            var el = document.getElementById(e.target.id);
            if (!el) {
                throw "Invalid element triggered onInputChange";
            }
            this.config[el.name] = el.value;
        },
        onSubmit: function(e) {
            this.poolView.queryPool(this.modal, this.parent);
        }
    };

    var UIControls = function(el, config, poolView) {

        this.poolView = poolView;

        this.el = el;
        this.positionEl = el.querySelector("#infopanel_position p");
        this.uiControlPanel = new UIControlPanel(this, poolView, config).init(document.getElementById("infopanel_control"));

        this.btnCopyPool = this.el.querySelector("#copy_pool");
        this.btnCopyWater = this.el.querySelector("#copy_water");

        let self = this;
        this.btnCopyPool.onclick = function() {self.copyPool.apply(self, arguments);};
        this.btnCopyWater.onclick = function() {self.copyWater.apply(self, arguments);};
    };

    UIControls.prototype = {
        cache: {},
        copyValue: function(value) {
            let textArea = document.createElement("textarea");
            textArea.value = value;

            textArea.style.top = "0";
            textArea.style.left = "0";
            textArea.style.position = "fixed";

            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
                var successful = document.execCommand('copy');
            } catch (err) {
                console.error('Unable to copy', err);
            }
            document.body.removeChild(textArea);
        },
        copyPool: function() {
            this.copyValue(JSON.stringify(this.cache.poolHeight));
        },
        copyWater: function() {
            this.copyValue(JSON.stringify(this.cache.waterHeight));
        },
        setModal: function(modal) {
            this.uiControlPanel.modal = modal;
        },
        update: function(response) {
            this.cache.poolHeight = response.pool.poolHeight;
            this.cache.waterHeight = response.pool.waterHeight;
        },
        updatePosition: function(html) {
            this.positionEl.innerHTML = html;
        },
        hide: function() {
            this.el.style.display = "none";
        },
        show: function() {
            this.el.style.display = "block";
        }
    };

    var Modal = function(el) {
        this.el = el;
    };

    Modal.prototype = {
        hide: function() {
            this.el.style.display = "none";
        },
        show: function() {
            this.el.style.display = "block";
        }
    };

    return {
        Modal: Modal,
        UIControls: UIControls
    };
});
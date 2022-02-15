define([
    'generator/HarmonicGenerator',
    'generator/JsonGenerator',
    'generator/FilteringGenerator'
], function(
    HarmonicGenerator,
    JsonGenerator,
    FilteringGenerator
) {

    var UIControlPanel = function(poolView, config) {
        this.poolView = poolView;
        this.config = config;
    };

    UIControlPanel.prototype = {

        tpl: [
            {id: "width", type: "number", lbl: "Width", name: "width"},
            {id: "height", type: "number", lbl: "Height", name: "height"},
            {id: "depth", type: "number", lbl: "Depth", name: "depth"},
            {id: "submit", type: "button", value: "Apply"},
            {id: "gen-harmonic", type: "radio", value: "gen-harmonic", name: "generator", lbl: "Harmonic"},
            {id: "gen-json", type: "radio", value: "gen-json", name: "generator", lbl: "JSON"},
            {id: "gen-filtering", type: "radio", value: "gen-filtering", name: "generator", lbl: "Filtering"}
        ],
        init: function(container, config) {

            this.container = container;
            this.input = {};

            this.form = document.createElement("form");
            this.container.appendChild(this.form);

            for (var i = 0; i < this.tpl.length; i++) {
                var tplEl = this.tpl[i];

                var input = document.createElement("input");
                this.input[tplEl.id] = input;

                input.type = tplEl.type;
                input.id = "ctl-" + tplEl.id;

                if (tplEl.value) {
                    input.value = tplEl.value;
                } else {
                    input.value = config[tplEl.id];
                }

                // adjust radio button selection
                if (tplEl.type == "radio" && config[tplEl.name] && config[tplEl.name].name == tplEl.value) {
                    input.setAttribute("checked", "true");
                }

                if (tplEl.name) {
                    input.name = tplEl.name;
                }

                if (tplEl.lbl) {
                    var l = document.createElement("label");
                    l["for"] = input.id;
                    if (tplEl.type != "radio") {
                        l.className = "label-left";
                    }
                    l.innerHTML = tplEl.lbl;
                    this.form.appendChild(l);
                }
                this.form.appendChild(input);
                this.form.appendChild(document.createElement("br"));
            }

            var self = this;
            this.input["gen-harmonic"].onclick = function() {self.onRadioSelect.apply(self, arguments);};
            this.input["gen-json"].onclick = function() {self.onRadioSelect.apply(self, arguments);};
            this.input["gen-filtering"].onclick = function() {self.onRadioSelect.apply(self, arguments);};

            this.input["height"].onchange = function() {self.onInputChange.apply(self, arguments);};
            this.input["width"].onchange = function() {self.onInputChange.apply(self, arguments);};
            this.input["depth"].onchange = function() {self.onInputChange.apply(self, arguments);};

            this.input["submit"].onclick = function() {self.onSubmit.apply(self, arguments);};

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
            this.poolView.queryPool(this.modal);
        }
    };

    var UIControls = function(container, config, poolView) {

        this.poolView = poolView;

        var uiPanel = document.createElement("div");
        uiPanel.id = "infopanel";

        var textPanel = document.createElement("p");
        textPanel.id = "infotext";
        uiPanel.appendChild(textPanel);

        var controlPanel = document.createElement("div");
        controlPanel.id = "controlpanel";
        uiPanel.appendChild(controlPanel);
        this.uiControlPanel = new UIControlPanel(poolView, config).init(controlPanel, config);

        this.container = container;
        container.appendChild(uiPanel);
    };

    UIControls.prototype = {
        setModal: function(modal) {
            this.uiControlPanel.modal = modal;
        }
    };

    var Modal = function(container) {
        this.modal = document.createElement("div");
        this.modal.className = "modal";
        container.appendChild(this.modal);

        this.modalIcon = document.createElement("i");
        this.modalIcon.className = "spinner";
        this.modal.appendChild(this.modalIcon);
    };

    Modal.prototype = {
        hide: function() {
            this.modal.style.display = "none";
        },
        show: function() {
            this.modal.style.display = "block";
        }
    };

    return {
        Modal: Modal,
        UIControls: UIControls
    };
});
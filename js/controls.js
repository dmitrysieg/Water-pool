define([
    './lib/three.min',
    'generator/harmonicgenerator',
    'generator/jsongenerator',
    'generator/filteringgenerator'
], function(
    THREE,
    HarmonicGenerator,
    JsonGenerator,
    FilteringGenerator
) {

    var UIControlPanel = function() {
        //
    };

    UIControlPanel.prototype = {

        tpl: [
            {id: "width", type: "number", lbl: "Width"},
            {id: "height", type: "number", lbl: "Height"},
            {id: "submit", type: "button", value: "Apply"},
            {id: "gen-harmonic", type: "radio", value: "gen-harmonic", name: "gen-group", lbl: "Harmonic"},
            {id: "gen-json", type: "radio", value: "gen-json", name: "gen-group", lbl: "JSON"},
            {id: "gen-filtering", type: "radio", value: "gen-filtering", name: "gen-group", lbl: "Filtering"}
        ],
        init: function(container, values) {

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
                    input.value = values[tplEl.id];
                }
                if (tplEl.name) {
                    input.name = tplEl.name;
                }

                var p = document.createElement("p");
                if (tplEl.lbl) {
                    var l = document.createElement("label");
                    l["for"] = input.id;
                    l.innerHTML = tplEl.lbl;
                    p.appendChild(l);
                }
                p.appendChild(input);

                this.form.appendChild(p)
            }

            var self = this;
            this.input["gen-harmonic"].onclick = function() {self.onRadioSelect.apply(self, arguments);};
            this.input["gen-json"].onclick = function() {self.onRadioSelect.apply(self, arguments);};
            this.input["gen-filtering"].onclick = function() {self.onRadioSelect.apply(self, arguments);};
        },
        onRadioSelect: function(e) {
            var el = document.findElementById(e.value);
            if (!el) {
                throw "Invalid element triggered onRadioSelect";
            }
            if (el.value == "gen-harmonic") {
                this.pool.generator = new HarmonicGenerator(this.pool.width, this.pool.height, this.pool.depth, {
                    n: 4,
                    x: {a: [-0.5, -0.5, -0.8, -0.5], b: [0.0, 0.0, 0.0, 0.5]},
                    y: {a: [-0.5, -0.5, -0.8, -0.5], b: [0.0, 0.0, 0.0, 0.5]},
                    randomize: false
                });
                this.pool.generate();
            } else if (el.value == "gen-json") {
                // todo
            } else if (el.value == "gen-filtering") {
                this.pool.generator = new FilteringGenerator(100, 100, 20, 2).generate();
                this.pool.generate();
            }
        }
    };

    var UIControls = function(container, values, pool) {

        this.pool = pool;

        var uiPanel = document.createElement("div");
        uiPanel.id = "infopanel";

        var textPanel = document.createElement("p");
        textPanel.id = "infotext";
        uiPanel.appendChild(textPanel);

        var controlPanel = document.createElement("div");
        controlPanel.id = "controlpanel";
        uiPanel.appendChild(controlPanel);
        this.uiControlPanel = new UIControlPanel().init(controlPanel, values);

        this.container = container;
        container.appendChild(uiPanel);
        return uiPanel;
    };

    return UIControls;
});
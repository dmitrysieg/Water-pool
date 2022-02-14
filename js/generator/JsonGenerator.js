define(function() {
	var JsonGenerator = function(json) {
		this.map = JSON.parse(json);
	};

	JsonGenerator.prototype = {
		getHeight: function(x, y) {
			return this.map[y][x];
		},
		getColor: function(THREE, x, y) {
		    return new THREE.Color("hsl(80, 80%, 30%)");
		}
	};
	
	return JsonGenerator;
});

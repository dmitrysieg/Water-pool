define(function() {
	var JsonGenerator = function(json) {
		this.map = JSON.parse(json);
	};

	JsonGenerator.prototype = {
		getHeight: function(x, y) {
			return this.map[y][x];
		},
	};
	
	return JsonGenerator;
});

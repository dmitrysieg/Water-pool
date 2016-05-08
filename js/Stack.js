define(function() {
	var Stack = function() {
		this._stack = [];
	};

	Stack.prototype = {
		isEmpty: function() {
			return this._stack.length == 0;
		},
		push: function(el) {
			this._stack.push(el);
		},
		pop: function() {
			if (this.isEmpty()) {
				return null;
			}
			var result = this._stack[this._stack.length - 1];
			this._stack.length--;
			return result;
		}
	};
	
	return Stack;
});
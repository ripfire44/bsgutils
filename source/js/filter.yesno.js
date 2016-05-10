(function(app) {
	var yesno = function() {
		return function(input) {
			input = typeof input === 'string' && input.length == 0 ? null : input;

			return input == null ? input : ((input === 1) || (input && typeof input === 'boolean') || (typeof input === 'string' && input.toString().toLowerCase() === 'y') ? 'Yes' : 'No');
		}
	};
	app.filter('bsgYesno', [yesno]);
}(function() {
	var m;
	try {
		m = angular.module('bsg');
	} catch (err) {
		m = angular.module('bsg', []);
	}
	return m;
}()));
(function(app) {
	var yesno = function() {
		return function(input) {
			if (typeof input === 'string') {
				if (input.length == 0) {
					return null;
				}
				return /^((yes)|(true)|y)$/i.test(input.trim()) ? 'Yes' : 'No';
			}
			return input == null ? null : input ? 'Yes' : 'No';
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
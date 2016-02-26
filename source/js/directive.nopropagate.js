(function(app) {
	var nopropagate = function($window){
		var link = function(scope, element) {
			if(element[0].tagName!=='A'){
				return;
			}
			element[0].onclick = function(e) {
				e.stopPropagation();
			};
		};
		var d = {
			restrict: 'A',
			link: link,
		};
		return d;
	};

	app.directive('bsgNopropagate', ['$window', nopropagate]);
}(function() {
	var m;
	try {
		m = angular.module('bsg');
	} catch (err) {
		m = angular.module('bsg', []);
	}
	return m;
}()));
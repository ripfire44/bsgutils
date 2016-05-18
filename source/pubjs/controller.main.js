(function(app) {
	var main = function($scope, $window, bsgUtils) {
		$scope.parm = {
			property1: 'hello',
			property2: 'world',
			property3: 'lorem ipsum / 2',
		};
		$scope.alert = function(string) {
			$window.alert(string);
		};
		$scope.triggerResize = function() {
			bsgUtils.triggerResize().then(function() {
				$window.alert('Window resized');
			});
		};
		$scope.parameterize = function() {
			return bsgUtils.param($scope.parm);
		};
		$scope.loadJquery = function() {
			if ($window.jQuery) {
				alert('jQuery already loaded');
			} else {
				bsgUtils.addScript(['https://code.jquery.com/jquery-2.2.1.min.js','https://code.jquery.com/ui/1.11.4/jquery-ui.min.js']).then(function() {
					$window.alert('jquery loaded using version ' + $window.jQuery.fn.jquery);
				});
			}

		}
	};
	app.controller('MainController', ['$scope', '$window', 'bsgUtils', main]);
}(myapp));
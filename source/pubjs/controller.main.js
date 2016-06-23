(function(app) {
	var main = function($scope, $window, $http, bsgUtils, bsgPager) {
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
		};
		$scope.datafilter = {};
		$scope.$watch('datafilter.last_name', function(newVal, oldVal){
			if(newVal===oldVal) {
				return;
			}
			$scope.dataset.setFilter($scope.datafilter);
		});
		$http.get('content/data.json').then(function(xhr){
			$scope.dataset = new bsgPager(xhr.data);
		});
	};
	app.controller('MainController', ['$scope', '$window', '$http', 'bsgUtils', 'bsgPager', main]);
}(myapp));
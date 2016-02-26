(function(app) {
	var utils = function($window, $q) {
		var triggerResize = function() {
			var resize = $q.defer();
			var we;
			try {
				we = new Event('resize');
			} catch (err) {
				// IE alternative
				we = $window.document.createEvent('UIEvents');
				we.initUIEvent('resize', true, false, $window, 0);
			}
			$window.onresize = function() {
				resize.resolve();
			}
			$window.dispatchEvent(we);
			return resize.promise;
		};
		var param = function(data) {
			if (!angular.isObject(data)) {
				return ((data == null) ? '' : data.toString());
			}
			var buffer = [];
			for (var name in data) {
				if (data.hasOwnProperty(name)) {
					var value = data[name];
					buffer.push($window.encodeURIComponent(name) + '=' + $window.encodeURIComponent(value ||  ''));
				}
			}
			return buffer.join('&').replace(/%20/g, '+');
		};
		var addScript = function(url) {
			var scriptTag = angular.element(document.createElement('script'));
            scriptTag.attr('charset', 'utf-8');
            scriptTag.attr('src', url);
            var element = angular.element($window.document.head);
            element.append(scriptTag);
            var load = $q.defer();
            scriptTag[0].onload = function() {
            	load.resolve();
            }
            return load.promise;
		};
		return {
			triggerResize: triggerResize,
			param: param,
			addScript: addScript
		}
	}
	app.factory('bsgUtils', ['$window', '$q', utils])
}(function() {
	var m;
	try {
		m = angular.module('bsg');
	} catch (err) {
		m = angular.module('bsg', []);
	}
	return m;
}()));
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
					buffer.push($window.encodeURIComponent(name) + '=' + $window.encodeURIComponent(value || ''));
				}
			}
			return buffer.join('&').replace(/%20/g, '+');
		};
		var addScript = function(source) {
			var sources = [];
			var sourcesLoaded = [];
			if (angular.isString(source)) {
				sources.push(source);
			} else if (angular.isArray(source) && angular.isString(source[0])) {
				sources.push.apply(sources, source);
			} else {
				return $q.reject();
			}
			angular.forEach(sources, function(src) {
				if (angular.isString(src)) {
					var scriptTag = angular.element(document.createElement('script'));
					scriptTag.attr('charset', 'utf-8');
					scriptTag.attr('src', src);
					var element = angular.element($window.document.head);
					element.append(scriptTag);
					var load = $q.defer();
					scriptTag[0].onload = function() {
						load.resolve();
					};
					scriptTag[0].onerror = function() {
						load.reject();
					};
					sourcesLoaded.push(load.promise);
				}
			});
			return $q.all(sourcesLoaded);
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
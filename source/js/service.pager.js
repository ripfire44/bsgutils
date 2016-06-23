(function(app) {
	var pager = function($filter) {
		var P = function(data, options) {
			// Setup properties
			var _data = [];
			Object.defineProperty(this, 'data', {
				get: function() {
					return _data;
				},
				set: function(val) {
					_data = val || [];
					this.pages = toPages(_data, opts.pageLength);
				}
			});
			var _pages = [];
			Object.defineProperty(this, 'pages', {
				get: function() {
					return _pages;
				},
				set: function(val) {
					_pages = val || [];
					this.currentPageIndex = 0;
					this.range = range(val.length);
				}
			});
			Object.defineProperty(this, 'currentRange', {
				get: function() {
					return this.range.slice(_offset, _offset + this.rangeLength);
				}
			});
			var _currentPageIndex = 0;
			Object.defineProperty(this, 'currentPageIndex', {
				get: function() {
					return _currentPageIndex;
				},
				set: function(val) {
					_currentPageIndex = clamp(val, 0, this.pages.length - 1);
					_offset = Math.floor(_currentPageIndex / this.rangeLength) * this.rangeLength;
				}
			});
			Object.defineProperty(this, 'lastPageIndex', {
				get: function() {
					return this.pages.length - 1;
				}
			});
			Object.defineProperty(this, 'currentPage', {
				get: function() {
					return this.pages[this.currentPageIndex];
				}
			});
			Object.defineProperty(this, 'rangeLength', {
				get: function() {
					return opts.rangeLength;
				}
			});
			Object.defineProperty(this, 'pageLength', {
				get: function() {
					return opts.pageLength;
				}
			});
			var _offset = 0;
			Object.defineProperty(this, 'offset', {
				get: function() {
					return _offset;
				}
			});
			Object.defineProperty(this, 'hasMultiplePage', {
				get: function() {
					return this.pages.length > 1;
				}
			});
			Object.defineProperty(this, 'currentRecordCount', {
				get: function() {
					return (isFiltered) ? filteredCount : this.data.length;
				}
			});

			// Setup methods
			this.getInfo = function() {
				if (!this.currentRecordCount) {
					return '';
				}
				var indexStart = (this.currentPageIndex * this.pageLength) + 1;
				var indexEnd = clamp(this.pageLength + indexStart - 1, 0, this.currentRecordCount);
				var msg = 'Showing ' + indexStart + ' to ' + indexEnd + ' of ' + this.currentRecordCount + ' entries.';
				var filter = '(filtered from ' + this.data.length + ' total entries)';

				return msg + (isFiltered ? filter : '');
			};
			this.shiftOffset = function(n) {
				if (!arguments.length) {
					_offset += this.rangeLength;
				} else {
					_offset -= this.rangeLength;
				}
				_offset = clamp(_offset, 0, this.getMaxOffset());
				this.currentPageIndex = clamp(this.currentPageIndex, _offset, Math.min(_offset + this.rangeLength, this.pages.length) - 1);
				return _offset;
			};
			this.getMaxOffset = function() {
				return Math.floor(this.lastPageIndex / this.rangeLength) * this.rangeLength;
			};
			this.isAtMaxOffset = function() {
				return _offset == this.getMaxOffset();
			};
			this.shiftPage = function(n) {
				if (!arguments.length) {
					this.currentPageIndex++;
					return;
				}
				this.currentPageIndex--;
			};
			this.setFilter = function(expression, comparator) {
				if (arguments.length == 0 || !expression) {
					this.pages = toPages(this.data, this.pageLength);
					isFiltered = false;
					filteredCount = this.data.length;
					return;
				}
				var arr = $filter('filter')(this.data, expression, comparator);
				isFiltered = true;
				filteredCount = arr.length;
				this.pages = toPages(arr, this.pageLength);
			};

			// Do constructor stuff
			var opts = {
				pageLength: 10,
				rangeLength: 7
			};
			var isFiltered, filteredCount;
			angular.extend(opts, options);
			this.data = data;
			isFiltered = false;
			filteredCount = this.data.length;

			// private methods
			function toPages(data, pageLength) {
				var d = data.slice();
				var p = [];
				do {
					p.push(pageLength ? d.splice(0, pageLength) : d.splice(0));
				} while (d.length);
				return p;
			}

			function clamp(n, min, max) {
				return Math.min(Math.max(n, min), max);
			}

			function range(n) {
				var r = [];
				for (var i = 0; i < n; i++) {
					r.push(i);
				}
				return r;
			}
		}
		return P;
	};
	app.factory('bsgPager', ['$filter', pager])
}(function() {
	var m;
	try {
		m = angular.module('bsg');
	} catch (err) {
		m = angular.module('bsg', []);
	}
	return m;
}()));
(function(app) {
	var pager = function($filter, bsgUtils) {
		var P = function(data, options) {
			// Setup properties
			var _this = this,
				_data = [],
				_view = [],
				_pages = [],
				_pageRange = [],
				_currentPageIndex = 0,
				_currentPageOffset = 0,
				_isFiltered = false,
				_expression,
				_comparator,
				_filteredCount,
				_isGrouped = false,
				_groupByField,
				_opts = {
					pageLength: 10,
					rangeLength: 7
				};

			Object.defineProperty(this, 'data', {
				get: function() {
					return _data;
				},
				set: function(val) {
					_data = val || [];
					_isFiltered = false;
					_isGrouped = false;
					refreshView();
				}
			});

			Object.defineProperty(this, 'pages', {
				get: function() {
					return _pages;
				},
				set: function(val) {
					_pages = val || [];
					this.currentPageIndex = 0;
					_pageRange = range(val.length);
				}
			});

			Object.defineProperty(this, 'currentRange', {
				get: function() {
					return _pageRange.slice(_currentPageOffset, _currentPageOffset + _opts.rangeLength);
				}
			});

			Object.defineProperty(this, 'currentPageIndex', {
				get: function() {
					return _currentPageIndex;
				},
				set: function(val) {
					_currentPageIndex = clamp(val, 0, this.pages.length - 1);
					_currentPageOffset = Math.floor(_currentPageIndex / _opts.rangeLength) * _opts.rangeLength;
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

			Object.defineProperty(this, 'pageLength', {
				get: function() {
					return _opts.pageLength;
				}
			});

			Object.defineProperty(this, 'currentPageOffset', {
				get: function() {
					return _currentPageOffset;
				}
			});

			Object.defineProperty(this, 'hasMultiplePage', {
				get: function() {
					return this.pages.length > 1;
				}
			});

			Object.defineProperty(this, 'currentRecordCount', {
				get: function() {
					return _isFiltered ? _filteredCount : _data.length;
				}
			});

			Object.defineProperty(this, 'isAtMaxOffset', {
				get: function() {
					return _currentPageOffset == this.currentMaxOffset;
				}
			});

			Object.defineProperty(this, 'currentMaxOffset', {
				get: function() {
					return Math.floor(this.lastPageIndex / _opts.rangeLength) * _opts.rangeLength;
				}
			});

			// Setup methods
			this.getInfo = function() {
				if (!this.data.length) {
					return '';
				}
				var rowStart = (this.currentPageIndex * _opts.pageLength) + 1;
				var rowEnd = clamp(_opts.pageLength + rowStart - 1, 0, this.currentRecordCount);
				var msg = 'Showing ' + rowStart + ' to ' + rowEnd + ' of ' + this.currentRecordCount + ' entries.';
				var filter = '(filtered from ' + this.data.length + ' total entries)';
				return msg + (_isFiltered ? filter : '');
			};

			this.setOffset = function(n) {
				n = typeof n == 'number' && n;
				_currentPageOffset = clamp(_currentPageOffset, 0, this.currentMaxOffset);
				this.currentPageIndex = clamp(this.currentPageIndex, _currentPageOffset, Math.min(_currentPageOffset + _opts.rangeLength, this.pages.length) - 1);
				return this.currentPageOffset;
			};

			this.shiftOffset = function() {
				return this.setOffset(_currentPageOffset+_opts.rangeLength);
			};

			this.unshiftOffset = function() {
				_currentPageOffset -= _opts.rangeLength;
				_currentPageOffset = clamp(_currentPageOffset, 0, this.currentMaxOffset);
				this.currentPageIndex = clamp(this.currentPageIndex, _currentPageOffset, Math.min(_currentPageOffset + _opts.rangeLength, this.pages.length) - 1);
				return this.currentPageOffset;
			}

			this.shiftPage = function(n) {
				this.currentPageIndex++;
			};

			this.unshiftPage = function() {
				this.currentPageIndex--;
			};

			this.setFilter = function(expression, comparator) {
				_expression = expression;
				_comparator = comparator;
				_isFiltered = true;
				refreshView();
			};

			this.clearFilter = function() {
				_isFiltered = false;
				refreshView();
			};

			this.setGroupBy = function(field) {
				_isGrouped = true;
				_groupByField = field;
				refreshView()
			}
			
			this.clearGroupBy = function() {
				_isGrouped = false;
				refreshView()
			}

			// Do constructor stuff
			angular.extend(_opts, options);
			this.data = data;

			// private methods
			function refreshView() {
				if (_isFiltered) {
					_view = $filter('filter')(_data, _expression, _comparator);
					_filteredCount = _view.length;
				} else {
					_view = _data;
					_filteredCount = _data.length;
				}
				if (_isGrouped) {
					var obj = $filter('groupBy')(_view, _groupByField);
					_view = Object.keys(obj).map(function(key) {
						return {
							'key': key,
							'rows': obj[key]
						};
					});
				}
				_this.pages = toPages(_view, _opts.pageLength);
			}

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
	app.factory('bsgPager', ['$filter', 'bsgUtils', pager])
}(function() {
	var m;
	try {
		m = angular.module('bsg');
	} catch (err) {
		m = angular.module('bsg', []);
	}
	return m;
}()));
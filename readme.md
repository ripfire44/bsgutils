# Angular bsg utils

**v.1.6.0**

Angular Assessor Utility service, directives and filters

- [`bsgUtils`](#bsgutils) service provides utility methods
- [`bsgNopropagate`](#bsgnopropagate) directive prevents click propagation on `a` tags
- [`bsgYesno`](#bsgyesno) filter returns "Yes" or "No"
- [`bsgPager`](#bsgpager) class creates Pager helper object

## Quick Start

Install and manage with bower

```sh
$ bower install http://bsggitlab/530594/bsgutils.git
```

Include the required JavaScript libraries in your `index.html`

```html
<script src="/lib/angular/angular.min.js"></script>
<script src="/lib/bsgutils/angular-bsg-utils.min.js"></script>
```

Add `bsg` as a dependency for your app.

```js
var myApp = angular.module('myApp', ['bsg']);
```

## <a name="bsgutils" />bsgUtils

This is a service that provides several utility methods.

### Methods

#### `triggerResize()`

This service utility will force a window resize event. The method returns a promise that will resolve on window resize.

#### <code>param(*obj*)</code>

This service utility will serialize the object, `obj`,  and return an encoded querystring. **Note:** This utility will not be able to encode nested properties

#### <code>addScript(*url*)</code>

This service utility will append a script with the URL, `url`, or an array of scripts URLs to the `head` and return a promise that will resolve once loaded.

### Example

```js
	var trigger = bsgUtils.triggerResize().then(function(){
		window.alert('Window resized');
	});

	var myobj = {
		prop1: 'hello',
		prop2: 'world'
	};

	var querystring = bsgUtils.param(myobj); // returns prop1=hello&prop2=world

	var myscripturl = 'js/myscript.js';

	var loadScript = bsgUtils.addScript(myscripturl).then(function(){
		window.alert('Script has been loaded');
	});

	var myscripts = ['js/myscript1.js', 'js/myscript2.js'];

	var loadScripts = bsgUtils.addScript(myscripts).then(function(){
		window.alert('All scripts has been loaded');
	})
```

## <a name="bsgnopropagate" />bsgNopropagate

This directive, which only applies to anchor tags, prevents propagation of click event down to the parent. Use the directive as an attribute on an anchor tag:

```html
<a href="#" bsg-nopropagate>Link</a>
```

## <a name="bsgyesno" />bsgYesno

This filter turns a boolean representation into a "Yes" or "No". The input can be `1` or `0`, `true` or `false`, `y` or `no`. A blank or `null` input will return null. Any other values will default to "No".

```html
<span>{{ 1 | bsgYesno }}</span>
<span>{{ false | bsgYesno }}</span>
<span>{{ 'n' | bsgYesno }}</span>
```

## <a name="bsgpager" />bsgPager

This service class allows the user to create a pager object. This utility will allow the user the easily create pagination on their dataset. 

### Example

```html
<script>
	angular.module('MyApp',['bsg']).controller('Main', function($scope, $http, bsgPager){
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
	});
</script>
<div ng-controller="Main">
	<div>
		<div class="form-inline pull-left">
			<div class="form-group">
				<label class="sr-only" for="tableFilter">Filter Last Name</label>
				<input type="text" class="form-control" id="tableFilter" placeholder="Filter Last Name" ng-model="datafilter.last_name" />
			</div>
		</div>
		<div class="pull-right"><strong>{{dataset.getInfo()}}</strong></div>
	</div>
	<table class="table">
		<thead>
			<tr>
				<th>First Name</th>
				<th>Last Name</th>
				<th>Email</th>
				<th>Gender</th>
				<th>IP Address</th>
			</tr>
		</thead>
		<tbody>
			<tr ng-repeat="row in dataset.currentPage">
				<td>{{row.first_name}}</td>
				<td>{{row.last_name}}</td>
				<td>{{row.email}}</td>
				<td>{{row.gender}}</td>
				<td>{{row.ip_address}}</td>
			</tr>
		</tbody>
	</table>
	<ul class="pagination">
		<li ng-class="{disabled:dataset.currentPageIndex==0}">
			<a aria-label="Previous" ng-click="dataset.unshiftPage()">
				<span aria-hidden="true">&laquo;</span>
			</a>
		</li>
		<li ng-hide="dataset.offset==0">
			<a ng-click="dataset.unshiftOffset()">&#8230;</a>
		</li>
		<li ng-repeat="pageIndex in dataset.currentRange" ng-class="{active:dataset.currentPageIndex==pageIndex}">
			<a ng-click="dataset.currentPageIndex = pageIndex">{{pageIndex+1}}</a>
		</li>
		<li ng-hide="dataset.isAtMaxOffset">
			<a ng-click="dataset.shiftOffset()">&#8230;</a>
		</li>
		<li ng-class="{disabled:dataset.currentPage==dataset.lastPageIndex}">
			<a aria-label="Next" ng-click="dataset.shiftPage()">
				<span aria-hidden="true">&raquo;</span>
			</a>
		</li>
	</ul>
</div>
```

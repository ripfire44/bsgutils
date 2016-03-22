# Angular bsg utils

**v.1.1.0**

Angular Assessor Utility service and directives

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

## bsgNopropagate

This directive, which only applies to anchor tags, prevents propagation of click event down to the parent. Use the directive as an attribute on an anchor tag:

```html
<a href="#" bsg-nopropagate>Link</a>
```

## bsgUtils

This is a service that provides several utility methods.

### Methods

#### `triggerResize()`

This service utility will force a window resize event. The method returns a promise that will resolve on window resize.

#### <code>param(*obj*)</code>

This service utility will serialize the object, `obj`,  and return an encoded querystring. **Note:** This utility will not be able to encode nested properties

#### <code>addScript(*url*)</code>

This service utility will append a script with the URL, `url`,  to the `head` and return a promise that will resolve once loaded.

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
```
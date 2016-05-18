# Angular bsg utils

**v.1.2.1**

Angular Assessor Utility service, directives and filters

- [`bsgUtils`](#bsgutils) service provides utility methods
- [`bsgNopropagate`](#bsgnopropagate) directive prevents click propagation on `a` tags
- [`bsgYesno`](#bsgyesno) filter returns "Yes" or "No"

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

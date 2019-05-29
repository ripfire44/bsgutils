/// <reference types="angular" />
import { module } from 'angular';
import YesNoFilter from './yesNo.filter';
// Create module
module('bsg', []);
// add module components
module('bsg').filter('bsgYesNo', YesNoFilter);
//# sourceMappingURL=index.js.map
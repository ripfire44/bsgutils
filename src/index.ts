import { module } from 'angular';

import UtilsService from './utils.service';
import PagerFactory from './pager.factory';
import YesNoFilter from './yesNo.filter';

// Create module
var app = module('bsg',[]);

// add module components
app.service('bsgUtils', UtilsService);
app.factory('bsgPager', PagerFactory);
app.filter('bsgYesNo', YesNoFilter);


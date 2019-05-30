import { module } from 'angular';

import UtilsService from './utils.service';
import PagerService from './pager.service';
import YesNoFilter from './yesNo.filter';

// Create module
var app = module('bsg',[]);

// add module components
app.service('bsgUtils', UtilsService);
app.service('bsgPager', PagerService);
app.filter('bsgYesNo', YesNoFilter);


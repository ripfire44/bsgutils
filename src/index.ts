import { module } from 'angular';

import UtilsService from './utils.service';
import PagerFactory from './pager.factory';
import YesNoFilter from './yesNo.filter';
import NoPropagateDirective from './noPropagate.directive';

// Create module
const Bsg = module('bsg',[]);

// add module components
Bsg.service('bsgUtils', UtilsService);
Bsg.factory('bsgPager', PagerFactory.factory());
Bsg.filter('bsgYesNo', YesNoFilter);
Bsg.directive('bsgNopropagate', NoPropagateDirective.Factory);
export default Bsg;

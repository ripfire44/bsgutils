import { module } from 'angular';
import YesNoFilter from './yesNo.filter';
import UtilsService from './utils.service';

// Create module
var app = module('bsg',[]);

// add module components
app.filter('bsgYesNo', YesNoFilter);
app.factory('bsgUtils', UtilsService);


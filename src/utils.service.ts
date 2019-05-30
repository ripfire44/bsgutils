import { IWindowService, IQService, IPromise } from "angular";
import * as angular from "angular";

export default class UtilsService {
    static $inject: string[] = ['$window', '$q'];
    constructor(private $window: IWindowService, private $q: IQService) { }
    triggerResize() {
        var resize = this.$q.defer();
        var we:any;
        try {
            we = new Event('resize');
        } catch (err) {
            // IE alternative
            we = this.$window.document.createEvent('UIEvents');
            we.initUIEvent('resize', true, false, this.$window, 0);
        }
        this.$window.onresize = function () {
            resize.resolve();
        }
        this.$window.dispatchEvent(we);
        return resize.promise;
    }
    param(data: any) {
        if (!angular.isObject(data)) {
            return ((data == null) ? '' : data.toString());
        }
        var buffer = [];
        for (var name in data) {
            if (data.hasOwnProperty(name)) {
                var value = data[name];
                buffer.push(this.$window.encodeURIComponent(name) + '=' + this.$window.encodeURIComponent(value || ''));
            }
        }
        return buffer.join('&').replace(/%20/g, '+');
    }
    addScript(source: string) {
        var sources: string[] = [];
        var sourcesLoaded: IPromise<any>[] = [];
        if (angular.isString(source)) {
            sources.push(source);
        } else if (angular.isArray(source) && angular.isString(source[0])) {
            sources.push.apply(sources, source);
        } else {
            return this.$q.reject();
        }
        angular.forEach(sources, function (src) {
            if (angular.isString(src)) {
                var scriptTag = angular.element(this.$window.document.createElement('script'));
                scriptTag.attr('charset', 'utf-8');
                scriptTag.attr('src', src);
                var element = angular.element(this.$window.document.head);
                element.append(scriptTag);
                var load = this.$q.defer();
                scriptTag[0].onload = function () {
                    load.resolve();
                };
                scriptTag[0].onerror = function () {
                    load.reject();
                };
                sourcesLoaded.push(load.promise);
            }
        });
        return this.$q.all(sourcesLoaded);
    }
}

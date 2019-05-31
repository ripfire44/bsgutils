import * as angular from "angular";

export default class NoPropagateDirective {
    constructor() { }
    readonly restrict: string = 'A';
    link(scope: angular.IScope, element: JQLite) {
        if (element[0].tagName !== 'A') {
            return;
        }
        element[0].onclick = function (e: MouseEvent) {
            e.stopPropagation();
        };
    }
    static Factory(){
        return new NoPropagateDirective();
    }
}
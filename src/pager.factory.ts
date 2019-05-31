import * as angular from 'angular';
import UtilsService from './utils.service';

interface PagerOptions {
    pageLength: number,
    rangeLength: number,
}
let _$filter: angular.IFilterService;
let _bsgUtils: UtilsService;
class Pager {
    private _data: object[] = [];
    private _view: object[] = [];
    private _pages: object[][] = [];
    private _pageRange: number[] = [];
    private _currentPageIndex: number = 0;
    private _currentPageOffset: number = 0;
    private _isFiltered: boolean = false;
    private _expression: any;
    private _comparator: Function;
    private _filteredCount: number;
    private _isGrouped: boolean = false;
    private _groupByField: string;
    private _opts: PagerOptions = {
        pageLength: 10,
        rangeLength: 7,
    };

    get data(): object[] {
        return this._data;
    }
    set data(val: object[]) {
        this._data = val || [];
        this._isFiltered = false;
        this._isGrouped = false;
        this.refreshView();
    }
    get pages(): object[][] {
        return this._pages;
    }
    set pages(val: object[][]) {
        this._pages = val || [];
        this.currentPageIndex = 0;
        this._pageRange = this._pageRange = this.range(val.length);
    }
    get currentPageIndex(): number {
        return this._currentPageIndex;
    }
    set currentPageIndex(val: number) {
        this._currentPageIndex = this.clamp(val, 0, this.pages.length - 1);
        this._currentPageOffset = Math.floor(this._currentPageIndex / this._opts.rangeLength) * this._opts.rangeLength;
    }

    constructor(data: object[], options: PagerOptions) {
        angular.extend(this._opts, options);
        this.data = data;
    }
    private refreshView() {

    }
    private range(n: number): number[] {
        let r = [];
        for (let i = 0; i < n; i++) {
            r.push(i);
        }
        return r;
    }
    private clamp(n: number, min: number, max: number): number {
        return Math.min(Math.max(n, min), max);
    }
}
function PagerFactory($filter: angular.IFilterService, bsgUtils: UtilsService): Pager {
    _$filter = $filter;
    _bsgUtils = bsgUtils;
    return Pager;
}
PagerFactory.$inject = ['$filter', 'bsgUtils'];
export default PagerFactory;

import * as angular from 'angular';

// Extend IFilterService to include groupBy
interface IFilterGroupBy {
    <T>(array: T[], expression: string): T[];
}
interface IFilterServiceLocal extends angular.IFilterService {
    (name: 'groupBy'): IFilterGroupBy;
}
interface PagerOptions {
    pageLength: number,
    rangeLength: number,
}
let _$filter: IFilterServiceLocal;
class Pager {
    private _data: object[] = [];
    private _view: object[] = [];
    private _pages: object[][] = [];
    private _pageRange: number[] = [];
    private _currentPageIndex: number = 0;
    private _currentPageOffset: number = 0;
    private _isFiltered: boolean = false;
    private _expression: any;
    private _comparator: angular.IFilterFilterComparatorFunc<any>;
    private _filteredCount: number;
    private _isGrouped: boolean = false;
    private _groupByField: string;
    private _opts: PagerOptions = {
        pageLength: 10,
        rangeLength: 7,
    };
    // getters/setters
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
    get currentRange(): number[] {
        return this._pageRange.slice(this._currentPageOffset, this._currentPageOffset + this._opts.rangeLength);
    }
    get currentPageIndex(): number {
        return this._currentPageIndex;
    }
    set currentPageIndex(val: number) {
        this._currentPageIndex = this.clamp(val, 0, this.pages.length - 1);
        this._currentPageOffset = Math.floor(this._currentPageIndex / this._opts.rangeLength) * this._opts.rangeLength;
    }
    get lastPageIndex(): number {
        return this.pages.length - 1;
    }
    get currentPage(): object[] {
        return this.pages[this.currentPageIndex];
    }
    get pageLength(): number {
        return this._opts.pageLength;
    }
    get currentPageOffset(): number {
        return this._currentPageOffset;
    }
    get hasMultiplePage(): boolean {
        return this.pages.length > 1;
    }
    get currentRecordCount(): number {
        return this._isFiltered ? this._filteredCount : this._data.length;
    }
    get currentMaxOffset(): number {
        return Math.floor(this.lastPageIndex / this._opts.rangeLength) * this._opts.rangeLength;
    }
    get isAtMaxOffset(): boolean {
        return this._currentPageOffset == this.currentMaxOffset;
    }

    // public methods
    getInfo() {
        if (!this.data.length) {
            return '';
        }
        let rowStart = (this.currentPageIndex * this._opts.pageLength) + 1;
        let rowEnd = this.clamp(this._opts.pageLength + rowStart - 1, 0, this.currentRecordCount);
        if (!rowEnd) {
            rowStart = 0;
        }
        let msg = 'Showing ' + rowStart + ' to ' + rowEnd + ' of ' + this.currentRecordCount + ' entries.';
        let filter = ' (Filtered from ' + this.data.length + ' total entries)';
        return msg + (this._isFiltered ? filter : '');
    }
    shiftOffset() {
        this._currentPageOffset += this._opts.rangeLength;
        this._currentPageOffset = this.clamp(this._currentPageOffset, 0, this.currentMaxOffset);
        this.currentPageIndex = this.clamp(this.currentPageIndex, this._currentPageOffset, Math.min(this._currentPageOffset + this._opts.rangeLength, this.pages.length) - 1);
        return this.currentPageOffset;
    }
    unshiftOffset() {
        this._currentPageOffset -= this._opts.rangeLength;
        this._currentPageOffset = this.clamp(this._currentPageOffset, 0, this.currentMaxOffset);
        this.currentPageIndex = this.clamp(this.currentPageIndex, this._currentPageOffset, Math.min(this._currentPageOffset + this._opts.rangeLength, this.pages.length) - 1);
        return this.currentPageOffset;
    }
    shiftPage() {
        this.currentPageIndex++;
    }
    unshiftPage() {
        this.currentPageIndex--;
    }
    setFilter(expression: any, comparator?: angular.IFilterFilterComparatorFunc<any>) {
        this._expression = expression;
        this._comparator = comparator;
        this._isFiltered = true;
        this.refreshView();
    }
    clearFilter() {
        this._isFiltered = false;
        this.refreshView();
    }
    setGroupBy(field: string) {
        this._isGrouped = true;
        this._groupByField = field;
        this.refreshView()
    }
    clearGroupBy() {
        this._isGrouped = false;
        this.refreshView();
    }

    constructor(data: object[], options: PagerOptions) {
        angular.extend(this._opts, options);
        this.data = data;
    }
    private refreshView() {
        if (this._isFiltered) {
            this._view = _$filter('filter')(this._data, this._expression, this._comparator);
            this._filteredCount = this._view.length;
        } else {
            this._view = this._data;
            this._filteredCount = this._data.length;
        }
        if (this._isGrouped) {
            let obj = _$filter('groupBy')(this._view, this._groupByField);
            this._view = Object.keys(obj).map(function (key: any) {
                return {
                    'key': key,
                    'rows': obj[key]
                };
            });
        }
        this.pages = this.toPages(this._view, this._opts.pageLength);
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
    private toPages(data: object[], pageLength: number) {
        let d = data.slice();
        let p = [];
        do {
            p.push(pageLength ? d.splice(0, pageLength) : d.splice(0));
        } while (d.length);
        return p;
    }
}
function PagerFactory($filter: IFilterServiceLocal): Function {
    _$filter = $filter;
    return Pager;
}
PagerFactory.$inject = ['$filter'];
export default PagerFactory;

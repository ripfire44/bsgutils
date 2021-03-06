describe('Service: Pager', function() {

	beforeEach(function() {
		module('bsg');
		module('angular.filter');
	});

	var bsgPager;
	jasmine.getJSONFixtures().fixturesPath = "base/test/";
	var sampleData = getJSONFixture('mockdata.json');

	beforeEach(inject(function(_bsgPager_) {
		bsgPager = _bsgPager_;
	}));

	it('should initialize when instantiated with no data', function() {
		var pager = new bsgPager();
		expect(pager).toBeDefined();
		expect(pager.data.length).toBe(0);
	});

	it('should initialize when instantiated with data', function() {
		var pager = new bsgPager(sampleData);
		expect(pager).toBeDefined();
		expect(pager.data.length).toBe(100);
	});

	var pager;

	beforeEach(function() {
		pager = new bsgPager(sampleData);
	});

	it('should have 5 pages with sample data (100 rows) and default pagelength of 10', function() {
		expect(pager.pages.length).toBe(10);
	});

	it('should have first page, first row,  first name of "Donna"', function() {
		expect(pager.pages[0][0]['first_name']).toBe('Donna');
	});

	it('should have last page, last row, first name of "Cheryl"', function() {
		var lastRowIndex = pager.pages[pager.lastPageIndex].length - 1;
		expect(pager.pages[pager.lastPageIndex][lastRowIndex]['first_name']).toBe('Cheryl');
	});

	it('should have initial current range of 0-6 (default pager rangeLength is 7)', function() {
		expect(pager.currentRange.length).toBe(7);
		expect(pager.currentRange[0]).toBe(0);
		expect(pager.currentRange[1]).toBe(1);
		expect(pager.currentRange[2]).toBe(2);
		expect(pager.currentRange[3]).toBe(3);
		expect(pager.currentRange[4]).toBe(4);
		expect(pager.currentRange[5]).toBe(5);
		expect(pager.currentRange[6]).toBe(6);
	});

	it('should have initial current page index of 0', function() {
		expect(pager.currentPageIndex).toBe(0);
	});

	it('should have a last page index of 9', function() {
		expect(pager.lastPageIndex).toBe(9);
	});

	it('should have initial current page, last row, first name of "Craig"', function() {
		var lastRowIndex = pager.currentPage.length - 1;
		expect(pager.currentPage[lastRowIndex]['first_name']).toBe('Craig');
	});

	it('should have initial pageLength of 10 (default) on the first page', function() {
		expect(pager.pageLength).toBeDefined(10);
	});

	it('should have initial currentPageOffset of 0', function() {
		expect(pager.currentPageOffset).toBe(0);
	});

	it('should indicate hasMultiplePage is true', function() {
		expect(pager.hasMultiplePage).toBeTruthy();
	});

	it('should have initial currentRecordCount of 100', function() {
		expect(pager.currentRecordCount).toBe(100);
	});

	it('should have range of 7-9, currentPageOffset of 7, and currentPageIndex of 7 when shiftOffset forward', function() {
		pager.shiftOffset();
		expect(pager.currentRange[0]).toBe(7);
		expect(pager.currentRange[1]).toBe(8);
		expect(pager.currentRange[2]).toBe(9);
		expect(pager.currentPageOffset).toBe(7);
		expect(pager.currentPageIndex).toBe(7);
	});

	it('should have range of 0-6, currentPageOffset of 0, and currentPageIndex of 6 when shiftOffset forward, then backward', function() {
		pager.shiftOffset();
		pager.unshiftOffset();
		expect(pager.currentRange[0]).toBe(0);
		expect(pager.currentRange[1]).toBe(1);
		expect(pager.currentRange[2]).toBe(2);
		expect(pager.currentRange[3]).toBe(3);
		expect(pager.currentRange[4]).toBe(4);
		expect(pager.currentRange[5]).toBe(5);
		expect(pager.currentRange[6]).toBe(6);
		expect(pager.currentPageOffset).toBe(0);
		expect(pager.currentPageIndex).toBe(6);
	});

	it('should return currentMaxOffset of 7', function() {
		expect(pager.currentMaxOffset).toBe(7);
	});

	it('should indicate isAtMaxOffset to be true when shiftOffset forward once (reach limit)', function() {
		pager.shiftOffset();
		expect(pager.isAtMaxOffset).toBeTruthy();
	});

	it('should indicate currentPageIndex of 7, currentPageOffset of 7, and maxOffset to be true when shiftPage forwards from page 6', function() {
		pager.shiftOffset();
		pager.unshiftOffset();
		pager.shiftPage();
		expect(pager.currentPageIndex).toBe(7);
		expect(pager.currentPageOffset).toBe(7);
		expect(pager.isAtMaxOffset).toBeTruthy();
	});

	it('should stay at page index 0 when unshiftPage from page index 0', function() {
		pager.unshiftPage();
		expect(pager.currentPageIndex).toBe(0);
	});

	it('should have a 55 count and 6 pages if setFilter is set to female only ', function() {
		pager.setFilter({
			gender: 'Female'
		});
		expect(pager.currentRecordCount).toBe(55);
		expect(pager.pages.length).toBe(6);
	});

	it('should have 100 count if clearFilter is called after being filtered', function() {
		pager.setFilter({
			gender: 'Female'
		});
		pager.clearFilter();
		expect(pager.currentRecordCount).toBe(100);
		expect(pager.pages.length).toBe(10);
	});

	it('should group by property', function() {
		pager.setGroupBy('gender');
		expect(pager.pages.length).toBe(1);
	});

	it('should filter and group at the same time', function() {
		pager.setFilter({
			gender: 'Female'
		});
		pager.setGroupBy('last_name');
		expect(pager.currentRecordCount).toBe(55);
		expect(pager.pages.length).toBe(5);
	});

	it('should produce correct values when grouping is turned off after filtering and paging', function() {
		pager.setFilter({
			gender: 'Female'
		});
		pager.setGroupBy('last_name');
		pager.clearGroupBy();
		expect(pager.currentRecordCount).toBe(55);
		expect(pager.pages.length).toBe(6);
	});

});
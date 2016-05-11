describe('Filter: bsgYesno', function() {

	beforeEach(function() {
		module('bsg');
	});

	var bsgYesnoFilter;

	beforeEach(inject(function(_bsgYesnoFilter_) {
		bsgYesnoFilter = _bsgYesnoFilter_;
	}));

	it('should return null if input is null', function() {
		var val = bsgYesnoFilter(null);
		expect(val).toBeNull();
	});

	it('should return null if input is empty string', function() {
		var val = bsgYesnoFilter('');
		expect(val).toBeNull();
	});

	it('should return Yes if input is 1', function() {
		var val = bsgYesnoFilter(1);
		expect(val).toBe('Yes');
	});

	it('should return Yes if input is boolean true', function() {
		var val = bsgYesnoFilter(true);
		expect(val).toBe('Yes');
	});

	it('should return Yes if input is string true', function() {
		var val = bsgYesnoFilter('true');
		expect(val).toBe('Yes');
	});

	it('should return Yes if input is Y', function() {
		var val = bsgYesnoFilter('Y');
		expect(val).toBe('Yes');
	});

	it('should return No if input is false', function() {
		var val = bsgYesnoFilter(false);
		expect(val).toBe('No');
	});

	it('should return No if input is N', function() {
		var val = bsgYesnoFilter('N');
		expect(val).toBe('No');
	});

	it('should return No if input is 0', function() {
		var val = bsgYesnoFilter(0);
		expect(val).toBe('No');
	});

	it('should return No if input is any other string value', function() {
		var val = bsgYesnoFilter('test');
		expect(val).toBe('No');
	});


});
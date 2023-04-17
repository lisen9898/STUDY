const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
	suite("Function convertHandlergetNum(input)", function() {
		test("whole number input", function(done) {
			let input = "9898lbs";
			assert.equal(convertHandler.getNum(input), 9898);
			done();
		});

		test("decimal number input", function(done) {
			let input = "98.98km";
			assert.equal(convertHandler.getNum(input), 98.98);
			done();
		});

		test("fractional input", function(done) {
			let input = "3/2km";
			assert.equal(convertHandler.getNum(input), 1.5);
			done();
		});

		test("fractional input with a decimal", function(done) {
			let input = "98.98/98km";
			assert.equal(convertHandler.getNum(input), 1.01);
			done();
		});

		test("double-fraction input", function(done) {
			let input = "98/98/98km";
			assert.equal(convertHandler.getNum(input), undefined);
			done();
		});

		test("no numerical input", function(done) {
			let input = "mi";
			assert.equal(convertHandler.getNum(input), 1);
			done();
		});
	});

	suite("Function convertHandler.getUnit(input)", function() {
		test("for each valid input unit", function(done) {
			let input  = ["km", "kg", "l", "lbs", "mi", "gal"];
			let output = ["km", "kg", "L", "lbs", "mi", "gal"];
			input.forEach((element, index) => {
				assert.equal(convertHandler.getUnit(element), output[index]);
			});
			done();
		});

		test(" invalid input unit", function(done) {
			assert.equal(convertHandler.getUnit("9898nOtAuNiT"), undefined);
			done();
		});
	});

	suite("Function convertHandler.getReturnUnit(initUnit)", function() {
		test("For each valid input unit", function(done) {
			let input  = ["km", "kg", "L", "lbs", "mi", "gal"];
			let output = ["mi", "lbs", "gal", "kg", "km", "L"];
			input.forEach((element, index) => {
				assert.equal(convertHandler.getReturnUnit(element), output[index]);
			});
			done(); 
		});
	});

	suite("Function convertHandler.spellOutUnit(unit)", function() {
		test("For each valid input unit", function(done) {
			let input = ["km", "kg", "L", "lbs", "mi", "gal"];
			let output = ["kilometers","kilograms", "liters", "pounds", "miles", "gallons"];
			input.forEach((element, index) => {
				assert.equal(convertHandler.spellOutUnit(element), output[index]);
			});
			done();
		});
	});

	suite("Function convertHandler.convert(initNum, initUnit)", function() {
	// galToL  = 3.78541;
  // lbsTokg = 0.453592;
  // miTokm  = 1.60934;
		test("Gal to L", function(done) {
			let input = [1, "gal"];
			let expected = 1 * 3.78541;
			assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
			done();
		});
		test("L to gal", function(done) {
			let input = [2, "L"];
			let expected = 2 / 3.78541;
			assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
			done();
		});
		test("mi to km", function(done) {
			let input = [3, "mi"];
			let expected = 3 * 1.60934;
			assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
			done();
		});
		test("km to mi", function(done) {
			let input = [4, "km"];
			let expected = 4 / 1.60934;
			assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
			done();
		});
		test("lbs to kg", function(done) {
			let input = [5, "lbs"];
			let expected = 5 * 0.453592;
			assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
			done();
		});
		test("kg to lbs", function(done) {
			let input = [6, "kg"];
			let expected = 6 / 0.453592;
			assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
			done();
		});
	});
	
});

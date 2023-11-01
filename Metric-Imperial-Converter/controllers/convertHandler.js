/*
 *
 *
 *       Complete the handler logic below
 *
 *
 */
function numberStringSplitter(input) {
	let number = input.match(/^\d+(\.\d+)?(\/\d+(\.\d+)?)?(?=[a-zA-z]|$)/);
	let string = input.match(/[a-zA-Z]+$/);

	if (string) {
		if (input === string[0]) {
			number = '1';
		} else if (number) {
			number = number[0];
		}
		return [number, string[0].toLowerCase()]
	} else {
		return [number, null];
	}
}



function ConvertHandler() {
  this.getNum = function(input) {
		let result = numberStringSplitter(input)[0];
		if (result) {
			if (result.includes('/')) {
					let nums = result.split('/');
					result = parseFloat(nums[0]) / parseFloat(nums[1]);
			}
		return parseFloat(result);
		
		}
  };
  
  this.getUnit = function(input) {
    let result = numberStringSplitter(input)[1];
	if (result) {
		switch (result) {
			case "km":
				return "km";
			case "kg":
				return "kg";
			case "l":
				return "L";
			case "lbs":
				return "lbs";
			case "mi":
				return "mi";
			case "gal":
				return "gal";
			default:
				return undefined;
		}
	}
  };
  
  this.getReturnUnit = function(initUnit) {
    switch (initUnit) {
			case "km":
				return "mi";
			case "kg":
				return "lbs";
			case "L":
				return "gal";
			case "lbs":
				return "kg";
			case "mi":
				return "km";
			case "gal":
				return "L";
			default:
				return undefined;
		}
  };

  this.spellOutUnit = function(unit) {
    switch (unit) {
			case "km":
				return "kilometers";
			case "kg":
				return "kilograms";
			case "L":
				return "liters";
			case "lbs":
				return "pounds";
			case "mi":
				return "miles";
			case "gal":
				return "gallons";
			default:
				return undefined;
		}
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsTokg = 0.453592;
    const miTokm = 1.60934;

		let result;
		switch (initUnit) {
			case "km":
				result = initNum / miTokm;
				break;
			case "kg":
				result = initNum / lbsTokg;
				break;
			case "L":
				result = initNum / galToL ;
				break;
			case "lbs":
				result = initNum * lbsTokg;
				break;
			case "mi":
				result = initNum * miTokm;
				break;
			case "gal":
				result = initNum * galToL;
				break;
			default:
				result = undefined;
		}
		return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
  };
  
}

module.exports = ConvertHandler;

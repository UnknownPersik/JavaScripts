var fs = require('fs');
var arg = process.argv;
var Magnitude = 8;
var MantissaAccuracy = 23;
var nan = "11111111100000000000000000000001";
var unsignedInfinity = "1111111100000000000000000000000";

function InternalRepresentationNumbers(number){
	let numb = Number(number);
	if(isNaN(numb)) return nan;
	let result = "";
	if(numb < 0)
		result += "1";
	else
		result += "0";
	numb = Math.abs(numb);
	let num = GetBinStandardTypeNumber(numb);
	if(num[1] >= 255)
		result += unsignedInfinity;
	else{
		let pow = ConvertNumToBinPow(num[1]);
		result += pow + num[0];
	}
	return result;
}

function ConvertIternalNumToDec(number){
	if (IsNaN(number))
		return "NaN";
	if (number == "0" + unsignedInfinity) 
		return "+Inf";
	if (number == "1" + unsignedInfinity) 
		return "-Inf";
	let pow = ConvertBinToDec(number.substr(1, Magnitude)) - 127;
	let num = number.substr(Magnitude + 1);
	let res = 0;
	if(pow == -127)
		num = "0" + num
	else
		num = "1" + num;
	let p = Math.pow(2, pow);
	for (let i = 0; i < MantissaAccuracy + 1; i++){
		res += num.charAt(i) * p;
		p /= 2;
	}
	return res * (number.charAt(0) == '0' ? 1 : -1);
}

function GetBinStandardTypeNumber(num){
	let pow = -1;
	while (num >= 1){
		num /= 2;
		pow++;
	}
	while (num < 0.5 && pow > -127){
		num *= 2;
		pow--;
	}
	let result = "";
	for (let i = 0; i < MantissaAccuracy + 1; i++){
		num *= 2;
		if (num >= 1){
			result += "1";
			num -= 1;
		} 
		else
			result += "0";
	}
	return [result.substr(1), pow + 127];
}

function ConvertBinToDec(number){
	let res = 0;
	let maxPowNum = number.length - 1;
	for (let i = 0; i < number.length; i++)
		res += number.charAt(i) << (maxPowNum - i);
	return res;
}

function ConvertNumToBinPow(number){
	let res = "";
	for (let i = 0; i < Magnitude; i++){
		res = (number % 2) + res;
		number >>= 1;
	}
	return res;
}

function IsNaN(number){
	if (number.substr(0, Magnitude + 1) != "111111111")
		return false;
	let lengthNum = Magnitude + MantissaAccuracy + 1;
	for (let i = Magnitude + 1; i < lengthNum; i++)
		if(number.charAt(i) == "1")	return true;
	return false;
}

function AddMantissa(num1, num2){
	let temp = 0;
	let result = "";
	let deltaPow = 0;
	for (let i = MantissaAccuracy; i >= 0; i--){
		result = ((temp + Number(num1.charAt(i)) + Number(num2.charAt(i))) % 2) + result;
		temp = (temp + Number(num1.charAt(i)) + Number(num2.charAt(i))) >> 1;
	}
	while (temp != 0){
		result = (temp % 2) + result;
		temp >>= 1;
		deltaPow++;
	}
	return [result, deltaPow];
}

function SubMantissa(num1, num2){
	let temp = 0;
	let result = "";
	for (let i = MantissaAccuracy; i >= 0; i--){
		let a = Number(num1.charAt(i));
		let b = temp + Number(num2.charAt(i));
		result = (Math.abs(a - b) % 2).toString() + result;
		if (a - b >= 0)
			temp = 0;
		else
			temp = 1;
	}
	let pow = 0;
	for (let i = 0; result.charAt(i) == "0" && i < MantissaAccuracy + 1; i++)
		pow++;
	return [result, pow];
}

function Plus(num1, num2){
	if (IsNaN(num1) || IsNaN(num2)) 
		return nan;
	let arg1 = num1.charAt(0);
	let arg2 = num2.charAt(0);
	let pow1 = ConvertBinToDec(num1.substr(1, Magnitude));
	let pow2 = ConvertBinToDec(num2.substr(1, Magnitude));
	let number1 = "";
	let number2 = "";
	if (pow1 == 0)
		number1 = "0" + num1.substr(Magnitude + 1);
	else
		number1 = "1" + num1.substr(Magnitude + 1);
	if(pow2 == 0)
		number2 = "0" + num2.substr(Magnitude + 1);
	else
		number2 = "1" + num2.substr(Magnitude + 1);
	let d = "";
	let deltaPow = Math.abs(pow1 - pow2);
	for (let i = 0; i < deltaPow; i++)
		d += "0";
	if (pow1 > pow2)
		number2 = (d + number2).substr(0, MantissaAccuracy + 1);
	else
		number1 = (d + number1).substr(0, MantissaAccuracy + 1);
	
	if (arg1 != arg2){
		if (arg1 == 0)
			return Minus(arg1, number1, pow1, arg2, number2, pow2);
		return Minus(arg2, number2, pow2, arg1, number1, pow1);
	}
	if (pow1 == 255 || pow2 == 255)
		return arg1 + unsignedInfinity;
	let pow = Math.max(pow1, pow2);
	let mantissa = AddMantissa(number1, number2);
	pow += mantissa[1];
	let add = mantissa[0].substr(1, MantissaAccuracy);
	if (pow >= 255)
		return arg1 + unsignedInfinity;
	return arg1 + ConvertNumToBinPow(pow) + add;	
}

function Minus(arg1, mantissa1, pow1, arg2, mantissa2, pow2){
	if (pow1 == 255 && pow2 == 255)
		return nan;
	if (pow1 == 255)
		return arg1 + unsignedInfinity;
	if (pow2 == 255)
		return arg2 + unsignedInfinity;
	let minus = "";
	let arg = "";
	if (Search(mantissa1, mantissa2) < 0){
		minus = SubMantissa(mantissa2, mantissa1);
		arg = "1";
	}
	else{
		minus = SubMantissa(mantissa1, mantissa2);
		arg = "0";
	}
	if (minus[1] == 24)
		return "00000000000000000000000000000000";
	let pow = Math.max(pow1, pow2);
	let deltaPow = pow - Math.max(0, pow - minus[1]);
	pow -= deltaPow;
	let res = minus[0].substr(deltaPow + 1);
	while (res.length < 23)
		res += "0";
	return arg + ConvertNumToBinPow(pow) + res;
}

function Search(num1, num2){
	for (let i = 0; i < MantissaAccuracy + 1; i++){
		if (num1.charAt(i) == "1" && num2.charAt(i) == "0")
			return 1;
		if (num1.charAt(i) == "0" && num2.charAt(i) == "1")
			return -1;
	}
	return 0;
}

function SignChange(num){
	return (num.charAt(0) == "0" ? "1" : "0") + num.substr(1, Magnitude + MantissaAccuracy);	
}

if (arg[3] == "conv"){
	let num = fs.readFileSync(arg[2]).toString();
	let conv = InternalRepresentationNumbers(num);
	conv += " ~ " + ConvertIternalNumToDec(conv);
	fs.writeFileSync(arg[4], conv);
	console.log(conv);
}

if (arg[3] == "calc"){
	let str = fs.readFileSync(arg[2]).toString().split(" ");
	let num1 = InternalRepresentationNumbers(str[0]);
	let num2 = InternalRepresentationNumbers(str[2]);
	let num2_1;
	if(str[1] == "-") 
		num2_1 = SignChange(num2);
	else 
		num2_1 = num2;
	let calc = Plus(num1, num2_1);
	calc += " ~ " + ConvertIternalNumToDec(calc);
	fs.writeFileSync(arg[4], calc);
	console.log(calc);
}

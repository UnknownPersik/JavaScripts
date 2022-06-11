let fs = require('fs');
let arg = process.argv;
let inputString = fs.readFileSync(arg[2]).toString();
let outputString = "";
let stack=new Array();
for (var i = 0; i < inputString.length; i++) {
	if (inputString.charAt(i) != ' ') {
	if ((inputString.charAt(i) >= '0' && inputString.charAt(i) <= '9')) {
		outputString += " ";
		while ((inputString.charAt(i) >= '0' && inputString.charAt(i) <= '9') || (inputString.charAt(i) == '.') || (inputString.charAt(i) == ',')) {
			outputString += inputString.charAt(i);
			i++;
		}
		i--;
		outputString += " ";
	}
	else 
		if (inputString.charAt(i) == '('){
			stack.push('(');
		}
		else if (inputString.charAt(i) == ')') {
				while (stack[stack.length - 1] != '('){
					if (stack.length == 0){
						console.log('Closing bracket error')
						return 0;
					}
					outputString += stack.pop();
				}
			if (stack[stack.length - 1] == '(')			
				stack.pop();
			}
			else if (priority(inputString.charAt(i)) > priority(stack[stack.length-1]))
	        		stack.push(inputString.charAt(i)); 
	    	else {
	        	while (priority(inputString.charAt(i)) <= priority(stack[stack.length-1]))
	           	    outputString += stack.pop();
				stack.push(inputString.charAt(i));
			}
	}
}
while (stack.length>0){
	if (stack[stack.length - 1] == '('){
		console.log('Opening bracket error');
		return 0;
	}
    outputString += stack.pop();
}
stack = new Array();
for (var i = 0; i < outputString.length; i++) {
    if (outputString.charAt(i) == " ") {
        i++;
        temp = '';
        while ((outputString.charAt(i) != " ")) {
            temp += outputString.charAt(i);
            i++;
        }
        stack.push(temp);
    }
    else {
        let secondNumber = stack.pop();
		let firstNumber = stack.pop();
		if (outputString.charAt(i) == '/' && secondNumber == 0){
			console.log('It is impossible to divide by zero, check the correctness of the entered data');
			return 0;
		}
		if (outputString.charAt(i) != '^') 
            var result = 'parseFloat('+firstNumber+')' + outputString.charAt(i) + 'parseFloat('+secondNumber+')';
        else 
            result = 'Math.pow('+firstNumber+','+secondNumber+')';
        stack.push(eval(result));
    }
}
for (var i = 0; i < inputString.length; i++){
	inputString = inputString.replace("^", "**");
}
function priority(x) {  
	switch (x) {
		case '(' : return 0;
		case ')' : return 1;
		case '+' : return 2;
		case '-' : return 2;
		case '*' : return 3;
		case '/' : return 3;
		case '^' : return 4;
	}
	return -1;
}
if (eval(inputString) == eval(result))
	console.log("Correct answer");
else
	console.log("Wrong answer");
console.log(outputString);
console.log(stack.pop());

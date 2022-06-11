var fs = require('fs');
var arg = process.argv;
var inputText = fs.readFileSync(arg[2]).toString().toLowerCase();
var textForCanonicFrequency = fs.readFileSync(arg[3]).toString().toLowerCase();
var decryptedText = "";
var min = Number.POSITIVE_INFINITY;
var shift = 0;

function findFrequency(text){
    let frequency = new Array();
    let totalFrequency = 0;
    for (let i = 0; i < text.length; i++){
	if (text.charAt(i).match(/[a-z]/)){
    	frequency[text.charAt(i)] = 0;
		totalFrequency++;
	    }
    }   

    for (let i = 0; i < text.length; i++){
	    if (text.charAt(i).match(/[a-z]/))
        	frequency[text.charAt(i)]++;
    }

    for (i in frequency){
	    frequency[i] /= totalFrequency;
    }
    
    return frequency;
}

var factFreq = findFrequency(inputText);
var canonFreq = findFrequency(textForCanonicFrequency);

for (let k = 0; k < 26; k++){
    let dif = 0;
    let sum = 0;
    for (let c = 97; c < 123; c++){
        if (c + k > 122)
            dif = Math.abs(canonFreq[String.fromCharCode(c)] - factFreq[String.fromCharCode(c + k - 26)]);
        else 
            dif = Math.abs(canonFreq[String.fromCharCode(c)] - factFreq[String.fromCharCode(c + k)]);
        sum += dif;
    }
    if (sum < min){
        min = sum;
        shift = k;
    }            
}
console.log(shift);

for (let i = 0; i < inputText.length; i++){
    if (inputText.charAt(i).match(/[a-z]/)){
        if (inputText.charAt(i).charCodeAt() - shift < 97)
            decryptedText += String.fromCharCode(inputText.charAt(i).charCodeAt() - shift + 26);
        else
            decryptedText += String.fromCharCode(inputText.charAt(i).charCodeAt() - shift); 
    }
    else
        decryptedText += inputText.charAt(i);
}
fs.writeFileSync('result.txt', decryptedText);

var fs = require('fs');
var arg = process.argv;
var inputText = fs.readFileSync(arg[2]).toString().toLowerCase();
var shift = parseInt(arg[3]);
var encrypted = "";

for (let i = 0; i < inputText.length; i++)
	if (inputText.charAt(i).match(/[a-z]/))
		if ((inputText.charCodeAt(i) + shift) > 122)
			encrypted += String.fromCharCode(inputText.charCodeAt(i) + shift - 26);
		else
			encrypted += String.fromCharCode(inputText.charCodeAt(i) + shift);
	else
		encrypted += inputText.charAt(i);

fs.writeFileSync('encrypted_text.txt', encrypted);

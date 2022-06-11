let fs = require('fs');
let inText;
let entropy = 0;
let counter = 0;
inText = fs.readFileSync('forentropy.txt');
inText = inText.toString();
let alphabet = new Array();
for (i = 0; i < inText.length; i++)
    alphabet[inText.charAt(i)] = 0;
for (i = 0; i < inText.length; i++)
    alphabet[inText.charAt(i)]++;
for (i in alphabet){
    alphabet[i] /= inText.length;
    counter++;
}
if (counter != 1){
    for (i in alphabet)
        entropy += (alphabet[i]) * (Math.log2(alphabet[i]) / Math.log2(counter)) * (-1);
    console.log(entropy);
}
else 
    console.log(0);
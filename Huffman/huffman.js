var fs = require('fs');
var arg = process.argv;
var testString = fs.readFileSync(arg[2]).toString();
var alaphabet= new Array();
var count = 0;
var tree = new Array();
var code_tab = new Array();
var codedString='';
var stringInStr=''; 
var codeSymbol = '';
var decodedString = '';

function node(name, frequency, used, code, link)
{
	this.name = name;
	this.fr = frequency;
	this.used = used;
	this.code = code;
	this.link = link;
}

for(i = 0; i < testString.length; i++)
	alphabet[testString.charAt(i)] = 0;

for(i = 0; i < testString.length; i++)
	alphabet[testString.charAt(i)]++;

for(i in alphabet) {
	n = new node(i, alphabet[i], 0, '', null);
	tree.push(n);
	count++;
}

if (count == 1)
	tree[0].code = 0;

for(k = 1; k < count; k++)
{
	fr1 = testString.length;
	num1 = 0;
	for(i = 0; i < tree.length; i++)
		if((tree[i].fr < fr1) && (tree[i].used == 0))
		{
			fr1 = tree[i].fr;
			num1 = i;
		}
	tree[num1].used = 1;
	tree[num1].code = 0;
	tree[num1].link = tree.length;
	fr2 = testString.length;
	num2 = 0;
	for(i = 0; i < tree.length; i++)
		if((tree[i].fr < fr2) && (tree[i].used == 0)){
			fr2 = tree[i].fr;
			num2 = i;
		}
	tree[num2].used = 1;
	tree[num2].code = 1;
	tree[num2].link = tree.length;
	n = new node(tree[num1].name + tree[num2].name, tree[num1].fr + tree[num2].fr, 0, '', null);
	tree.push(n);
}

for(i = 0; i < count; i++){
	j = i;
	code_tab[tree[j].name] = '';
	if (count == 1)
		code_tab[tree[j].name] = tree[j].code;
	while(tree[j].link)
	{
		code_tab[tree[i].name] = tree[j].code + code_tab[tree[i].name];
		j = tree[j].link;
	}
}
console.log(code_tab);

for(i in code_tab)
{	
	console.log("Code" + i,' ',code_tab[i]);
}
for(i = 0; i < testString.length; i++)
{
    stringInStr=testString.substr(i,1); 
    codedString+=code_tab[stringInStr];
}
console.log("Coded string:" + codedString);

for (var i = 0; i < codedString.length; i++)
{
    codeSymbol += codedString.charAt(i);
    for (var j in code_tab)
	{
        if (code_tab[j] == codeSymbol)
		{
            decodedString += j;
            codeSymbol = '';   
        }
    }		
}
console.log("Decoded string:" + decodedString);

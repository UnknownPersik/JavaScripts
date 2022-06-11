let fs = require('fs');
let arg = process.argv;
var escapeSym = "#";
var counter = 1;
var letters = new Array();
var codedString = "";
var decodedString = "";
fs.readFile(arg[2], (err, data) => {
	if (err){
		console.log(err)
		return;
	}
	text = data.toString()
	letters = text.split('');
	var compareSymbol = letters[0];
	for (s = 1; s <= letters.length; s++)
	{
		if ((s != letters.length) && (letters[s] == compareSymbol))
		{
			counter++;
		}
		else
		{
			if (counter <= 3)
			{
				if (compareSymbol == escapeSym)
				{
					codedString += escapeSym + String.fromCharCode(counter) + escapeSym;
				}
				else
				{
					for (i = 0; i < counter; i++)
						codedString += compareSymbol;						
				}
				counter = 1;
				compareSymbol = letters[s];
			}
			else
			{
				var spec = counter / 255;
				spec = parseInt(spec);
				var ostatok = counter - spec * 255
				if (spec > 0)
				{
					while (spec > 0)
					{
						codedString += escapeSym + String.fromCharCode(255) + compareSymbol;
						spec--;
					}
				}
				if (ostatok > 3)
				{
					codedString += escapeSym + String.fromCharCode(ostatok) + compareSymbol;
				}
				else
				{
					for (i = 0; i < ostatok; i++)
						codedString += compareSymbol;
				}
				counter = 1;
				compareSymbol = letters[s];		
			}
		}
	}
	console.log(codedString);
	fs.writeFileSync(arg[3], codedString);
	letters = codedString.split('');
	for (i = 0; i < letters.length; i++)
	{
		if (letters[i] == escapeSym)
		{
			var compareSymbol = letters[i + 2];
			var solve = letters[i + 1].charCodeAt();
			for (j = 0; j < solve; j++)
			decodedString += compareSymbol;
			i += 2;
		}
		else
			decodedString += letters[i];
	}
	console.log(decodedString);
	if (text === decodedString)
		console.log("True")
	else
		console.log("False")
	fs.writeFileSync(arg[4], decodedString);
})

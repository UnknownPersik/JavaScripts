var fs = require('fs');
var readLineSync = require('readline-sync');
let arg = process.argv;
let lines = fs.readFileSync(arg[2]).toString().split("\n");
var mem = new Array();

for(var i = 0; i < lines.length; i++)
{
    var words = lines[i].split(" ");
    for(var j = 0; j < words.length; j++)
    {
        mem.push(words[j]);
    }
}

var memLength = mem.length;
for(var i = 0; i < memLength; i++)
{
    switch (mem[i])
    {
        case "in" :
            var inp = readLineSync.questionInt("Input number:");
            mem[parseInt(mem[i + 1]) + memLength] = Math.floor(inp);
        break;

        case "out" :
            console.log(mem[Number(mem[i + 1]) + memLength]);
            i++;
        break;

        case "sum" :
            mem[Number(mem[i + 3]) + memLength] = Number(mem[Number(mem[i + 2]) + memLength]) + Number(mem[Number(mem[i + 1]) + memLength]);
            if(Number.POSITIVE_INFINITY == (mem[Number(mem[i + 3]) + memLength]))
            {
                console.log("Error");
                i = memLength;
            }
            i += 3;
        break;

        case "umn" :
            mem[Number(mem[i + 3]) + memLength]=mem[Number(mem[i + 2]) + memLength] * mem[Number(mem[i + 1]) + memLength];
            if(Number.POSITIVE_INFINITY == (mem[Number(mem[i + 3]) + memLength]))
            {
                console.log("Error");
                i = memLength;
            }
            i += 3;
        break;

        case "mod" :
            mem[Number(mem[i + 3]) + memLength] = mem[Number(mem[i + 1]) + memLength] % mem[Number(mem[i + 2]) + memLength];
            i += 3;
        break;

        case "pr" :
            mem[Number(mem[i + 2]) + memLength] = mem[i + 1];
            i += 2;
        break;

        case "if<" :
            if(mem[Number(mem[i + 1]) + memLength] < mem[Number(mem[i + 2]) + memLength])
            {
                i += 2;
            }
            else
            {       
                var end = mem[i + 3]   
                i += 4; 
                while (mem[i] != end && i < memLength)
                {
                    i++;
                }
            }
        break;

        case "if<=" :
            if(mem[Number(mem[i + 1]) + memLength] <= mem[Number(mem[i + 2]) + memLength])
            {
                i += 2;
            }
            else
            {       
                var end=mem[i + 3]
                i += 4;
                while (mem[i] != end && i < memLength)
                {
                    i++;
                }
            }
        break;

        case "if==" :
            if(mem[Number(mem[i + 1]) + memLength] == mem[Number(mem[i + 2]) + memLength])
            {
                i += 2;
            }
            else
            {       
                var end=mem[i + 3]   
                i += 4;
                while (mem[i] != end && i < memLength)
                {
                    i++;
                }
            }           
        break;
        
        case "goto" :
            var point = mem[i+1];
            while(mem[i] != point)
            {
                i--;
            }
        break;     
    }
}

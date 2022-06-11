let fs = require('fs');
let arg = process.argv;
let string = fs.readFileSync(arg[2]).toString();
let substring = fs.readFileSync(arg[3]).toString();
let subLen = substring.length;
let N = new Array();
let resultArray = new Array();
let sym = substring.charAt(subLen - 1);
let startTime = new Date();
for (i = 1; i < subLen; i++)
{
    if (!(N[substring.charAt(subLen - 1 - i)]))
        N[substring.charAt(subLen - 1 - i)] = i;
}
let v = 0;
for (e in N)
{
    if (e == sym)
        v++;
}
if (v == 0)
    N[sym] = subLen;
for (i = subLen - 1; i < string.length; i++)
{
    if (N[string.charAt(i)] == undefined || N[string.charAt(i)] == null)
            i += subLen - 1;
    else if (string.charAt(i) == sym)
    {
        k = 1;
        for (j = 1; j < subLen; j++)
        {
            if (string.charAt(i - j) == substring.charAt(substring.length - 1 - j))
            {
                k++
                if (k == subLen)
                {
                    resultArray.push(i - subLen + 1);
                    i += subLen;
                }
            }
            else
            {
                if (N[string.charAt(i - j)] == undefined || N[string.charAt(i - j)] == null)	
                    i += subLen - 1;
                else
                    i = i + N[string.charAt(i - j)] - 1;
                break;
            }
        }
    }
    else
        i += N[string.charAt(i)] - 1;
}
console.log(resultArray.length);
console.log(resultArray);
let endTime = new Date();
console.log("Time: " + (endTime - startTime) / 1000);

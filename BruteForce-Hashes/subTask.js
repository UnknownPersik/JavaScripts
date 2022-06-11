let fs = require('fs');
let arg = process.argv;
var string = fs.readFileSync(arg[2], "utf8").toString();
var substring = fs.readFileSync(arg[3], "utf8").toString();
var stringLen = string.length;
var substrLen = substring.length;
var countArray = new Array();

if (arg[4] == 'Brute'){
    let  j = 0;
    let startTime = new Date();
    for (let i = 0; i < stringLen - substrLen + 1; i++){
        j = 0;
        while (string[i + j] == substring[j] && j < substrLen)
            j++;
        if (j == substrLen)
            countArray.push(i);
    }
    if (countArray.length > 10)
        var min = 10;
    else    
        var min = countArray.length;
    for (let y = 0; y < min; y++)
        console.log(countArray[y]);
    console.log("Count:" + countArray.length);
    let endTime = new Date();
    console.log("Time:" + ((endTime - startTime) / 1000));
}
else if (arg[4] == "SimpleHash")
{
    let i = 0, hash = 0, substringHash = 0, collisions = 0;
    let startTime = new Date();
    for (y = 0; y < substrLen; y++)
    {
        substringHash += substring.charCodeAt(y);
        hash += string.charCodeAt(y);
    }
    while (i < stringLen - substrLen + 1)
    {
        if (hash == substringHash)
        {
            j = 0;
            while (string[i + j] == substring[j] && j < substrLen)
                j++;
            if (j == substrLen)
                countArray.push(i);
            else 
                collisions++;
            i++;
        }
        else
        {
            hash += string.charCodeAt(i + substrLen) - string.charCodeAt(i);
            i++
        }   
    }
    let endTime = new Date();
    if (countArray.length > 10)
        var min = 10;
    else        
        var min = countArray.length;
    for (let y = 0; y < min; y++)
        console.log(countArray[y]);
    console.log("Count:" + " " + countArray.length);
    console.log("Collisions:" + " " + collisions);
    console.log("Time:" + " " + ((endTime - startTime) / 1000));
}
else if (arg[4] == "SquareHash")
{
    let i = 0, hash = 0, substringHash = 0, collisions = 0;
    let startTime = new Date();
    for (y = 0; y < substrLen; y++)
    {
        substringHash += Math.pow(substring[y].charCodeAt(), 2);
        hash += Math.pow(string[y].charCodeAt(), 2);
    }
    while (i < stringLen - substrLen + 1)
    {
        if (hash == substringHash)
        {
            j = 0;
            while (string[i + j] == substring[j] && j < substrLen)
                j++;
            if (j == substrLen)
                countArray.push(i);
            else 
                collisions++;
            i++;
        }
        else
        {
            hash += Math.pow(string[i + substring.length].charCodeAt(), 2) - Math.pow(string[i].charCodeAt(), 2);
            i++
        }
    }
    let endTime = new Date();
    if (countArray.length > 10)
        var min = 10;
    else        
        var min = countArray.length;
    for (let y = 0; y < min; y++)
        console.log(countArray[y]);
    console.log("Count:" + " " + countArray.length);
    console.log("Collisions:" + " " + collisions);
    console.log("Time:" + " " + ((endTime - startTime) / 1000));
}
else if (arg[4] == "RabinKarp")
{
    let i = 0, hash = 0, substringHash = 0, collisions = 0;
    let startTime = new Date();
    for (y = 0; y < substrLen; y++)
    {
        substringHash += substring.charCodeAt(y) * Math.pow(2, substrLen - y - 1);
        hash += string.charCodeAt(y) * Math.pow(2, substrLen - y - 1);
    }
    while (i < stringLen - substrLen + 1)
    {
        if (hash == substringHash)
        {
            j = 0;
            while (string[i + j] == substring[j] && j < substrLen)
                j++;
            if (j == substrLen)
                countArray.push(i);
            else 
                collisions++;
            i++;
        }
        else
        {
            hash = (hash - string.charCodeAt(i) * Math.pow(2, substrLen - 1)) * 2 + string.charCodeAt(i + substrLen);
            i++
        }
    }
    let endTime = new Date();
    if (countArray.length > 10)
        var min = 10;
    else        
        var min = countArray.length;
    for (let y = 0; y < min; y++)
        console.log(countArray[y]);
    console.log("Count:" + " " + countArray.length);
    console.log("Collisions:" + " " + collisions);
    console.log("Time:" + " " + ((endTime - startTime) / 1000));
}

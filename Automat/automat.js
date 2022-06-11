let fs = require('fs');
let arg = process.argv;
fs.readFile(arg[2], (err, data) =>{
    if (err){
        console.log(err);
        return;
    }
    var testString = data.toString();
    let inputString = "abaxabaz";
    let stringLength = inputString.length;
    let alphabet = new Array();
    let counterMatch = 0;
    for (i = 0; i < stringLength; i++)
        alphabet[inputString.charAt(i)]=0;
    delta = new Array();
    for (j = 0; j <= stringLength; j++)
        delta[j] = new Array();
    for (i in alphabet)
        delta[0][i] = 0;
    for(j = 0; j < stringLength; j++){
        prev = delta[j][inputString.charAt(j)];
        delta[j][inputString.charAt(j)] = j + 1;
        for(i in alphabet)
            delta[j+1][i] = delta[prev][i];
    }
    for(j = 0; j <= stringLength; j++){
            out= ' ';
            for (i in alphabet)
                out += delta[j][i] + ' ';
    }
    var ar = new Array();
    let delta1 = 0;
    for(i = 0; i < testString.length; i++){
        if(delta[delta1][testString.charAt(i)] != 0)
        {
            delta1 = delta[delta1][testString.charAt(i)];
            if (delta1 == stringLength)
            {
                if (ar.length <= 10)
                    ar.push(i - stringLength + 1);
                counterMatch++;
            }
        }
        else 
            a = 0;
    }
    console.log(ar);
    console.log(counterMatch);
}
)

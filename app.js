var readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var input = []; // the input of the program
var i = 0; // sequence iterator


console.log('Please start adding sequences in this format p,q and type -1 to exit')
asyncReadLine();


//this function will help reading the inputs from the console
function asyncReadLine () {
    rl.question('sequence ' + (i + 1) + ' : ', function (answer) {

        if (answer == '-1') {
            rl.close();
            return start(input);
             
        }
        var seq = answer.split(',');
        if(seq[0]=='0'){
            seq[0]=parseInt(seq[0]);
        }else{
            seq[0]=parseInt(seq[0]);
            seq[1]=parseInt(seq[1]);
        }
        pushArray(input, seq);
        i++;
        asyncReadLine();
    });

};

function start(input) {
    const hex = decode(input);
    console.log('result = ' ,hexToString(hex));
}

// the principal function where we convert the whole sequeces into bytes
function decode(input) {
    for (var bytes = [], i = 0; i < input.length; i += 2) {
        pushArray(bytes, convert(bytes, input.slice(i, i + 2)));
    }
    return bytes;
}

// this function will allow us to convert a sequence to a byte
function convert(bytes, seq) {
    if (seq[0] == 0)
        return [seq[1]]
    else if (seq[1] <= seq[0] && seq[1] > 0) {
        const fromIndex = bytes.length - seq[0];
        const toIndex = bytes.length - seq[0] + seq[1];
        for (var nbytes = [], i = fromIndex; i < toIndex; i++)
            nbytes.push(bytes[i]);
        return nbytes;
    } else {
        return ['3f'];
    }

}

// converts each byte into equivalent ASCII code
function hexToString(hex) {
    var str = ''
    for (var i = 0; i < hex.length; i++)
        str += String.fromCharCode(parseInt(hex[i], 16));
    return str;
}

// to push array in an other array
function pushArray(arr, arr2) {
    arr.push.apply(arr, arr2);
}
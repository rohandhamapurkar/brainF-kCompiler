let fs = require('fs');
let mem = new Uint8Array(3000);
ptr = 0;

function interpret(path) {
    let code = fs.readFileSync(process.cwd()+path,{encoding:'utf-8'});
    for(let i=0;i<code.length;i++){
        let l = 0;
        if(code.charAt(i) == '>'){
            ptr += 1;
        } else if(code.charAt(i) == '<'){
            ptr -= 1;
        } else if(code.charAt(i) == '+'){
            mem[ptr]++;
        } else if(code.charAt(i) == '-'){
            mem[ptr]--;
        } else if(code.charAt(i) == '.'){
            process.stdout.write(String.fromCharCode(mem[ptr]))
        } else if(code.charAt(i) == '['){
            if(mem[ptr] == 0){
                i++;
                while(l > 0 || code.charAt(i) != ']') {
                    if(code.charAt(i) == '[') l++;
                    if(code.charAt(i) == ']') l--;
                    i++;
                }
            }            
        } else if(code.charAt(i) == ']'){
            i--;
            while(l > 0 || code.charAt(i) != '[') {
                if(code.charAt(i) == ']') l++;
                if(code.charAt(i) == '[') l--;
                i--;
            }
            i--;
        } 
    }
    process.stdout.write('\n');
}

module.exports = interpret(process.argv[2]);
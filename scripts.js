let result = 0;
let num1 = 0;
let num2 = 0;
let memoryFlag = false;
let finalResult = false; // Becomes true if 'enter' or 'equals' has been entered, because it is the final result.
let previousOperation = '';
let memory = 0;

function addMemory(){
    memory += +document.querySelector('#bottomRight').textContent;
    document.querySelector('#topLeft').textContent = 'M';
}

function substractMemory(){
    memory -= +document.querySelector('#bottomRight').textContent;
    document.querySelector('#topLeft').textContent = 'M';
}

function clearMemory(){
    memory = 0;
    document.querySelector('#topLeft').textContent = '';
}

function retrieveMemory(){
    document.querySelector('#bottomRight').textContent = memory;
}

function add(num1,num2){
    return (num1+num2).toFixed(2);
}

function substract(num1,num2){
    return (num1-num2).toFixed(2);
}

function multiply(num1,num2){
    return (num1*num2).toFixed(2);
}

function divide(num1,num2){
    return (num1/num2).toFixed(2);
}

function sqrt(num){
    let sqrtResult = Math.sqrt(num).toFixed(2);
    if(sqrtResult.toString().endsWith('00')){
        sqrtResult = sqrtResult.toString().substring(0,sqrtResult.toString().length-3);
    }
    document.querySelector('#bottomRight').textContent = sqrtResult;
}

function operate(operator){
    updateNumbers();
    switch(operator){
        case '+':
            result = add(num1,num2);
            break;
        case '-':
            result = substract(num1,num2);
            break;
        case '*':
            result = multiply(num1,num2);
            break;
        case '/':
            if(document.querySelector('#bottomRight').textContent==='0'){
                result = "ERROR: Can't divide by zero";
            }else{
                result = divide(num1,num2);
            }
            break;
        default:
            break
    }
    let stringResult = result.toString()
    if(stringResult.endsWith('00')){
        stringResult = stringResult.substring(0,stringResult.length-3);
    }
    return stringResult;
}

function clearScreen(){
    document.querySelectorAll('p').forEach(element => {
        if(element.id==='topLeft'){
            return;
        }
        element.textContent='';
    });
    previousOperation = '';
    document.querySelector('#bottomRight').textContent = '0';
}

function cleanResult(){
    result = 0;
}

function changeSign(){
    bottomLine = document.querySelector('#bottomRight');
    if(!bottomLine.textContent.includes('-')){
        bottomLine.textContent = '-'.concat(bottomLine.textContent);
    }else{
        bottomLine.textContent = bottomLine.textContent.substring(1);
    }
}

function moveLinesUp(){
    document.querySelector('#centerRight').textContent = document.querySelector('#bottomRight').textContent;
    document.querySelector('#bottomRight').textContent = 0;
}

function percentage(){
    bottomLine = document.querySelector('#bottomRight');
    bottomLine.textContent = bottomLine.textContent/100;
}

function updateNumbers(){
    if(document.querySelector('#centerRight')!=''){
        num1 = +document.querySelector('#centerRight').textContent;
    }
    if(document.querySelector('#bottomRight')!=''){
        num2 = +document.querySelector('#bottomRight').textContent;
    }
}

function writeOnScreen(text){
    let bottomLine = document.querySelector('#bottomRight');
    let bottomLeft = document.querySelector('#bottomLeft');
    let centerLine = document.querySelector('#centerRight');
    if(text.search(/\d/)===0 || text===('.')){
        if(finalResult){
            bottomLine.textContent = '0';
            result = 0;
            finalResult = false;
        }
        if(bottomLine.textContent==='0'){
            bottomLine.textContent = text;
        } else if(!bottomLine.textContent.includes('.') && text==='.'){
            bottomLine.textContent += text;
        }else if(text!=='.'){
            bottomLine.textContent += text;
        }
    } else if(previousOperation==='+'||previousOperation==='-'|| 
            previousOperation==='/'||previousOperation==='*'){
                result = operate(previousOperation);
                let stringResult = result.toString()
                if(stringResult.endsWith('00')){
                    bottomLine.textContent = stringResult.substring(0,stringResult.length-3);
                }else{
                    bottomLine.textContent = result;
                }
                moveLinesUp();
                document.querySelector('#bottomLeft').textContent = text;
                if(centerLine.textContent.includes('ERROR')){
                    clearScreen();
                    bottomLine.textContent = result;
                }
            }
    if(bottomLeft.textContent==='' && (text==='+' || text==='-' || text==='*' || 
        text==='/') && !bottomLine.textContent.includes('ERROR')){
        previousOperation = text;
        bottomLeft.textContent = text;
        moveLinesUp();
    } else{
        previousOperation = bottomLeft.textContent;
    }
}

function del(){
    let line = document.querySelector('#bottomRight');
    line.textContent = line.textContent.substring(0,line.textContent.length-1);
}

function buttonClick(element){
    if(element.id==='C'){
        clearScreen();
        cleanResult();
    } else if(element.id==='equals'){
        result = operate(document.querySelector('#bottomLeft').textContent);
        clearScreen();
        document.querySelector('#bottomRight').textContent = (result.toString());
        finalResult = true;
    }else if(element.id==='delete'){
        del();
    }else if(element.id==='sign'){
        changeSign();
    }else if(element.id==='percentage'){
        percentage();
    }else if(element.id==='sqrt'){
        sqrt(document.querySelector('#bottomRight').textContent);
    }else if(element.id==='Mc'){
        clearMemory();
    }else if(element.id==='Mr'){
        retrieveMemory();
    }else if(element.id==='M+'){
        addMemory();
    }else if(element.id==='M-'){
        substractMemory();
    }else{
        writeOnScreen(element.textContent);
    }
}

function keyboardPress(key){
    console.log(key);
    switch(key){
        case 'Enter':
            result = operate(document.querySelector('#bottomLeft').textContent);
            clearScreen();
            document.querySelector('#bottomRight').textContent = (result.toString());
            finalResult = true;
            break;
        case 'Backspace':
            del();
            break;
        default:
            writeOnScreen(key);
            break;

    }
}

function generateButtons(){
    const textContent = ['Mc','Mr','M+','M-','C',
                        '7','8','9','/','√',
                        '4','5','6','*','%',
                        '1','2','3','-','+','0','.',
                        '+/-','=','Del']
    const ids = ['Mc','Mr','M+','M-','C',
                'seven','eight','nine','division','sqrt',
                'four','five','six','multiplication','percentage',
                'one','two','three','substraction','addition','zero','decimal',
                'sign','equals','delete']
    let myButton;
    let buttonsArea = document.querySelector('.wrapper');
    for(let i = 0; i<ids.length; i++){
            myButton = document.createElement('button');
            if(ids[i]==='Mc'||ids[i]==='Mr'||ids[i]==='M-'||ids[i]==='C'||
                ids[i]==='division'||ids[i]==='sqrt'||ids[i]==='multiplication'||
                ids[i]==='percentage'||ids[i]==='substraction'||ids[i]==='addition'||
                ids[i]==='equals'||ids[i]==='M+'|| ids[i]==='delete'){
                myButton.className = 'special-buttons';
                        } else {
                            myButton.className = 'number-buttons';
                        }
                myButton.addEventListener('click', function(e){buttonClick(e.target);});
            myButton.id = ids[i];
            myButton.innerText = textContent[i];
            buttonsArea.appendChild(myButton);
    }
}

generateButtons();
window.addEventListener('keydown',(e) => keyboardPress(e.key));

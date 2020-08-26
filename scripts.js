let result = 0;
let num1 = 0;
let num2 = 0;
let firstTimeFlag = true;
let previousOperation = '';

function add(num1,num2){
    return num1+num2;
}

function substract(num1,num2){
    return num1-num2;
}

function multiply(num1,num2){
    return num1*num2;
}

function divide(num1,num2){
    return num1/num2;
}

function operate(operator){
    updateNumbers();
    switch(operator){
        case '+':
            return add(num1,num2);
            break;
        case '-':
            return substract(num1,num2);
            break;
        case '*':
            return multiply(num1,num2);
            break;
        case '/':
            return divide(num1,num2);
            break;
    }
}

function clear(){
    document.querySelectorAll('p').forEach(element => element.textContent='');
    previousOperation = '';
    result = 0;
    document.querySelector('#bottomRight').textContent = '0';
}

function moveLinesUp(){
    //document.querySelector('#topRight').textContent = document.querySelector('#centerRight').textContent;
    document.querySelector('#centerRight').textContent = document.querySelector('#bottomRight').textContent;
    //document.querySelector('#centerLeft').textContent = document.querySelector('#bottomLeft').textContent;
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
    let centerLine = document.querySelector('#centerRight');
    let bottomLeft = document.querySelector('#bottomLeft');
    if(text.search(/\d/)===0){
        if(bottomLine.textContent==='0'){
            bottomLine.textContent = text;
        } else{
            bottomLine.textContent += text;
        }
    } else if(previousOperation==='+'||previousOperation==='-'|| 
            previousOperation==='/'||previousOperation==='*'){
                result = operate(text);
                moveLinesUp();
                bottomLine.textContent = 0;
                // if(firstTimeFlag){
                //     bottomLine.textContent = 0;
                //     firstTimeFlag = false;
                // } else{
                //     centerLine.textContent = result;
                // }
                document.querySelector('#bottomLeft').textContent = text;
            }
    if (text==='+' || text==='-' || text==='*' || text==='/'){
        console.log(previousOperation);
        previousOperation = text;
        console.log(previousOperation);
        bottomLeft.textContent = text;
        moveLinesUp();
        bottomLine.textContent = 0;
    } else{
        previousOperation = document.querySelector('#bottomLeft').textContent;
    }
}

function buttonClick(element){
    if(element.id==='C'){
        clear();
    } else if(element.id==='equals'){
        clear();
        writeOnScreen(result.toString());
    }else{
        writeOnScreen(element.textContent);
    }
}

function generateButtons(){
    const textContent = ['Mc','Mr','M+','M-','C',
                        '7','8','9','/','√',
                        '4','5','6','*','%',
                        '1','2','3','-','+','0','.',
                        '+/-','=']
    const ids = ['Mc','Mr','M+','M-','C',
                'seven','eight','nine','division','sqrt',
                'four','five','six','multiplication','percentage',
                'one','two','three','substraction','addition','zero','decimal',
                'sign','equals']
    let myButton;
    let buttonsArea = document.querySelector('.wrapper');
    for(let i = 0; i<24; i++){
            myButton = document.createElement('button');
            if(ids[i]==='Mc'||ids[i]==='Mr'||ids[i]==='M-'||ids[i]==='C'||
                ids[i]==='division'||ids[i]==='sqrt'||ids[i]==='multiplication'||
                ids[i]==='percentage'||ids[i]==='substraction'||ids[i]==='addition'||
                ids[i]==='equals'||ids[i]==='M+'){
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


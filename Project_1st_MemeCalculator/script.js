let numStr = "";
let calcu = [];
let storeString="";

// function storeVal(el) {
//   btnVal = el.getAttribute("value");
//   const operators = ["+", "-", "*", "/",'=', '(', ')'];
//   const lastChar = numStr[numStr.length - 1];
//   // this is to check not two operator is entered
//   if (operators.includes(lastChar) && operators.includes(btnVal)) {
//     console.log("Can't enter operator twice");
//     return; 
//     }
//     numStr += btnVal;
//    if (!isNaN(btnVal) && btnVal !== '') {
//         // If it's a number, convert the string to a number before pushing
//         calcu.push(Number(btnVal));
//     } else {
//         // If it's an operator, push it as a string
//         calcu.push(btnVal);
//     }
//   document.getElementById("num-input").textContent = numStr;
// }

function resVal(el) {
  // result = eval(numStr);
  // document.getElementById("num-result").textContent = "=" + result;
  // if(result==150){document.getElementById("myImage").src = "./img/150.png";}
  // [2, '*', 4, '+', '(', 3, '*', 5, '/', 3, '+', 4, '-', 2, '*', '(', 8, '-', 2, ')', ')', '+', 3, '-', 2, '*', 4]
  // numStr = "";
  // console.log(calcu);
  calcu.push(Number(numStr));
  console.log("This is the LAsT array:"+calcu);
  const rpnExpression =shuntingYard(calcu);
  console.log("This is the LAsT  Rpn Expression:"+rpnExpression);
  const finalResult=calculateRpn(rpnExpression)
  console.log("This is the LAsT  final Result:"+finalResult);
  document.getElementById("num-result").textContent = "=" + finalResult;
  numStr="";
  calcu=[];

}

function clearScreen(el){
    document.getElementById("num-result").textContent = "";
    document.getElementById("num-input").textContent = "";
    numStr='';
    storeString='';
    calcu=[];

    console.log("Clear Funtion");
    console.log("Numstr :"+ numStr);
    console.log(" calcuArray :" + calcu);
      // document.getElementById("myImage").src = "./img/aayein.webp";
}

function onNumberClick(el){
  btnVal = el.getAttribute("value");
  numStr += btnVal;
  storeString +=btnVal;
  document.getElementById("num-input").textContent = storeString;
  console.log(numStr);

}
function onOperatorClick(el){
  
  btnVal = el.getAttribute("value");
  if(numStr===''){
    alert('Please enter an operation or dont press same operatoin twice');
    return;
  }
  const operators = ["+", "-", "*", "/",'=', '(', ')'];
  const lastChar = numStr[numStr.length - 1];
  if (operators.includes(lastChar) && operators.includes(btnVal)) {
    console.log("Can't enter operator twice");
    return; 
    }
    else{
      console.log("this is inside op function" + numStr);
      calcu.push(Number(numStr));
      numStr+=btnVal;
      calcu.push(btnVal); 
      storeString+=btnVal;
      document.getElementById("num-input").textContent = storeString;

      numStr="";
      console.log(calcu);
    }

}

/* chatgpt help

let currentString= "";
let expressionArray= [];

function onNumberClick(num){
  currentString += num;
  updateDisplay(currentString);
}

function onOperatorClick(op){
  if(currentString !== ""){
    expressionArray.push(currentString);
    currentString="";
  }
  expressionArray.push(op);
  updateDisplay(expressionArray.join(" "));
}

function onEqualClick(){
  if(currentString !== ""){
    expressionArray.push(currentString);
  }

  let expression = expressionArray.join(" ");
  let result= shuntingYard(expression);
  updateDisplay(result);
  currentString=result.toString();
  expressionArray=[];
}

function updateDisplay(content){
  document.getElementById("num-result").textContent = "=" + content;

}
*/



// const rpnExpression =shuntingYard(calcu);
function shuntingYard(infixArray){

  const outputQueue = [];
  const operatorStack = [];

  const precedence= {
    '+':1,
    '-':1,
    '*':2,
    '/':2
  };

  for(const token of infixArray){
    if(typeof token === 'number'){
      outputQueue.push(token);
    }
    else if( token in precedence){

      const currentPrecedence =precedence[token];
      
      while(operatorStack.length>0
            && operatorStack[operatorStack.length-1] !== '('
            && precedence[operatorStack[operatorStack.length-1]]>= currentPrecedence)
            {
            
              outputQueue.push(operatorStack.pop());

            }
      operatorStack.push(token);
    }
    else if(token === '('){
      operatorStack.push(token);
    }
    else if(token ===')'){
      while(operatorStack.length >0 && operatorStack[operatorStack.length-1]!=='('){
        outputQueue.push(operatorStack.pop());
      }

      if(operatorStack[operatorStack.length -1]=== '('){
        operatorStack.pop();
      }
    }
  }
while(operatorStack.length>0){
  outputQueue.push(operatorStack.pop());
}

return outputQueue;
}



function calculateRpn(rpnArray){
  const stack=[];
  for (const token of rpnArray){
    if(typeof token === 'number'){
      stack.push(token);
    }
    else{
      const operand2 = stack.pop();
      const operand1 = stack.pop();
      let result;
      
      switch(token){
        case '+':
          result =operand1 + operand2;
          break;
        case '-':
          result =operand1 - operand2;
          break;
        case '*':
          result =operand1 * operand2;
          break;
        case '/':
          result =operand1 / operand2;
          break;
        default:
          throw new Error('Invalid Operator'+ token);

      }

      stack.push(result);

    }

  }

  return stack.pop();
}








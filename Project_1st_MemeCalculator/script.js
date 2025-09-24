let numStr = "";
let calcu = [];

function storeVal(el) {
  btnVal = el.getAttribute("value");

  //Array to 
  const operators = ["+", "-", "*", "/",'=', '(', ')'];
  const lastChar = numStr[numStr.length - 1];

  document.getElementById("myImage").src = "./img/61.thumb128.png";

  if (operators.includes(lastChar) && operators.includes(btnVal)) {
    console.log("hi");
    document.getElementById("myImage").src = "./img/pakistaniguy.webp";
    return; 
    }
    
    numStr += btnVal;

   if (!isNaN(btnVal) && btnVal !== '') {
        // If it's a number, convert the string to a number before pushing
        calcu.push(Number(btnVal));
    } else {
        // If it's an operator, push it as a string
        calcu.push(btnVal);
    }
 
  
  console.log(calcu);
  document.getElementById("num-input").textContent = numStr;
}

function resVal(el) {
  // result = eval(numStr);
  // document.getElementById("num-result").textContent = "=" + result;
  // if(result==150){document.getElementById("myImage").src = "./img/150.png";}
  // [2, '*', 4, '+', '(', 3, '*', 5, '/', 3, '+', 4, '-', 2, '*', '(', 8, '-', 2, ')', ')', '+', 3, '-', 2, '*', 4]
  // numStr = "";
  // console.log(calcu);

  const rpnExpression =shuntingYard(calcu);
  console.log(rpnExpression);
  const finalResult=calculateRpn(rpnExpression)
  console.log(finalResult);
  document.getElementById("num-result").textContent = "=" + finalResult;

}

function clearScreen(el){
    document.getElementById("num-result").textContent = "";
    document.getElementById("num-input").textContent = "";
      document.getElementById("myImage").src = "./img/aayein.webp";
}


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

// function shuntingYard(infixArray) {
//   const outputQueue = [];
//   const operatorStack = [];
  
//   // Define operator precedence
//   const precedence = {
//     '+': 1,
//     '-': 1,
//     '*': 2,
//     '/': 2
//   };
  
//   for (const token of infixArray) {
//     if (typeof token === 'number') {
//       // If the token is a number, add it to the output queue.
//       outputQueue.push(token);
//     } else if (token in precedence) {
//       // If the token is an operator, check the stack.
//       const currentPrecedence = precedence[token];
//       while (
//         operatorStack.length > 0 &&
//         operatorStack[operatorStack.length - 1] !== '(' &&
//         precedence[operatorStack[operatorStack.length - 1]] >= currentPrecedence
//       ) {
//         // Pop operators from the stack to the output as long as they have higher or equal precedence.
//         outputQueue.push(operatorStack.pop());
//       }
//       operatorStack.push(token);
//     } else if (token === '(') {
//       // If a left parenthesis, push it onto the stack.
//       operatorStack.push(token);
//     } else if (token === ')') {
//       // If a right parenthesis, pop operators from the stack to the output
//       // until a left parenthesis is found.
//       while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
//         outputQueue.push(operatorStack.pop());
//       }
//       // Discard the left parenthesis.
//       if (operatorStack[operatorStack.length - 1] === '(') {
//         operatorStack.pop();
//       }
//     }
//   }

//   // After processing all tokens, pop any remaining operators from the stack to the output.
//   while (operatorStack.length > 0) {
//     outputQueue.push(operatorStack.pop());
//   }
  
//   return outputQueue;
// }

// const finalResult=calculateRpn(rpnExpression)

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








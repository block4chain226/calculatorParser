let expressionString = "(8-(-1*(2*(23-12)+(23+23))*(44-23)+1)-10)";
const specialChars = ["+", "-", "/", "*", "(", ")"];
let expressionArray;
let count = 1;
checkDigit(expressionString);

main();

////String expression to Array expression
function checkDigit(expressionString) {
  expressionArray = expressionString.split("");
  expressionArray.forEach((element, index) => {
    if (
      index < expressionArray.length - 1 &&
      !specialChars.includes(expressionArray[index])
    ) {
      while (
        index < expressionArray.length - 1 &&
        !specialChars.includes(expressionArray[index + 1])
      ) {
        expressionArray[index] += expressionArray[index + 1];
        expressionArray.splice(index + 1, 1);
      }
    } else {
      expressionArray[index] = expressionArray[index];
    }
  });
  negativeSign(expressionArray);

  return expressionArray;
}

/////////////////////////////////Check signs
function negativeSign(expressionArray) {
  expressionArray.forEach((element, index) => {
    if (
      (expressionArray[index] === "-" && index === 0) ||
      (expressionArray[index] === "-" && expressionArray[index - 1] == "(") ||
      (expressionArray[index] === "-" && expressionArray[index - 1] === "-")
    ) {
      expressionArray[index] += expressionArray[index + 1];
      expressionArray.splice(index + 1, 1);
    }
    if (
      (expressionArray[index] === "*" ||
        expressionArray[index] === "+" ||
        expressionArray[index] === "/") &&
      expressionArray[index + 1] === "-"
    ) {
      expressionArray[index + 1] += expressionArray[index + 2];
      expressionArray.splice(index + 2, 1);
    }
    //no * before scope
    if (
      expressionArray[index] ===
        /(^-?0\.[0-9]*[1-9]+[0-9]*$)|(^-?[1-9]+[0-9]*((\.[0-9]*[1-9]+[0-9]*$)|(\.[0-9]+)))|(^-?[1-9]+[0-9]*$)|(^0$){1}/ &&
      expressionArray[index + 1] === "("
    ) {
      expressionArray.splice(index + 1, 0, "*");
    }
  });
  console.log(expressionArray);
  //return expressionArray;
}
//save index of the first group scope in other const then
//count quantity of inner pairs
//then give scope expressions to scopefunction
////Count of open and closed scopes
function scopesCount(expressionArray) {
  let count = 0;
  const scopesMap = getScopesMap(expressionArray);
  expressionArray.forEach((element, index) => {
    if (element === "(") {
      count++;
    } else if (element === ")") {
      count++;
    }
  });
  if (count % 2 == 0) {
    console.log(`scopes count = ${count}`);
    return count;
  } else if (count === 0) {
    console.log(`scopes count = ${count}`);
    return 0;
  }
  console.log("scopes error");
  return null;
}

////all scopes with indexes
// function getScopesMap(expressionArray) {
//   let scopesStack = {
//     scope: {},
//     index: {},
//   };
//   let i = 0;
//   expressionArray.forEach((element, index) => {
//     if (element === "(" || element === ")") {
//       scopesStack.scope[i] = element;
//       scopesStack.index[i] = index;
//       i++;
//     }
//   });
//   return scopesStack;
// }

function getScopesMap(expressionArray) {
  let scopesStack = [];
  let stack = [];
  let scopesObj = {
    index: [],
    scope: [],
    //openClose: [],
  };
  let j = 0;
  expressionArray.forEach((element, index) => {
    if (element === "(" || element === ")") {
      ///////
      // scopesObj.index[j] = index;
      // scopesObj.scope[j] = element;
      scopesObj.index[j] = element;
      scopesObj.scope[j] = [index, element];
      // if (scopesObj.scope[j] === "(") {
      //   scopesObj.openClose[j] = "open";
      // } else if (scopesObj.scope[j] === ")") {
      //   scopesObj.openClose[j] = "closed";
      // }
      ////////
      scopesStack.push(index);
      j++;
    }
  });
  ////////compare i with i-1, if no i-1 to stack, if yes i and i-1 delete
  let notClosedCount = 0;
  //for (let i = 0; i < scopesObj.openClose.length; i++) {}

  // scopesObj.openClose.forEach((element, index) => {
  //   if (
  //     scopesObj.openClose[index] === scopesObj.openClose[index + 1] ||
  //     scopesObj.openClose[index] === stack[stack.length - 1]
  //   ) {
  //     stack.push(scopesObj.openClose[index]);
  //     scopesObj.openClose.splice(index, 1);
  //   } else if (
  //     scopesObj.openClose[index] != stack[stack.length - 1] &&
  //     stack.length !== 0
  //   ) {
  //     stack.pop();
  //     scopesObj.openClose.splice(index, 1);
  //   }
  //   if (scopesObj.openClose[index] !== scopesObj.openClose[index + 1]) {
  //     scopesObj.openClose.splice(index, 2);
  //   }
  // });

  return scopesObj;
}

function scopesAlgorithm(scopesObj, array) {
  //let scope = ["(8-(-1*(2*(23-12)+(23+23))*(44-23)+1)-10)"];
  let temp = [];
  let stack = [];
  let j = 0;
  for (let index = 0; index < scopesObj.scope.length; index++) {
    if (scopesObj.scope.length !== 0) {
      if (stack.length !== 0) {
        if (scopesObj.scope[index][1] !== stack[stack.length - 1][1]) {
          scopesObj.scope.splice(index, 1);
          stack.pop();
          j++;
          index--;
          console.log(stack);
          console.log(scopesObj.scope);
          continue;
        }
      }
      if (scopesObj.scope[index][1] === scopesObj.scope[index + 1][1]) {
        stack.push(scopesObj.scope[index]);
        scopesObj.scope.splice(index, 1);
        index--;
        j++;
        console.log(stack);
        console.log(scopesObj.scope);
        continue;
      } else if (scopesObj.scope[index][1] !== scopesObj.scope[index + 1][1]) {
        scopesObj.scope.splice(index, 2);
        j++;
        index--;
        console.log(stack);
        console.log(scopesObj.scope);
        continue;
      }
    } else {
      break;
    }
  }
}

////begining function
// function main() {
//   if (scopesCount(expressionArray) !== 0) {
//     scopesCalculation(expressionArray);
//   } else {
//     noScopesCalculation(expressionArray);
//   }
// }

function main() {
  if (scopesCount(expressionArray) !== 0) {
    scopesCalculation(expressionArray, count);
  } else {
    noScopesCalculation(expressionArray);
  }
}

////all single scope calculation
// function scopesCalculation(expressionArray) {
//   let tempArray;
//   let beginingScope;
//   let endScope;
//   //while (scopesCount !== 0) {
//   beginingScope = expressionArray.indexOf("(");
//   endScope = expressionArray.indexOf(")");
//   tempArray = expressionArray.slice(beginingScope + 1, endScope);
//   let tempArrayLength = tempArray.length;

//   expressionArray[beginingScope] = String(mainCalculation(tempArray));
//   expressionArray.splice(beginingScope + 1, tempArrayLength + 1);
//   //console.log(expressionArray);
//   main();
//   //}
// }

// function
// scopesCalculation(expressionArray, count) {
//   const scopesMap = getScopesMap(expressionArray);
//   let tempArray;
//   let gBeginingScope, gEndScope, openScope, closedScope;

//   //while (scopesCount !== 0) {
//   //global scopes(first and last)
//   gBeginingScope = scopesMap.index[0];
//   gEndScope = Object.keys(scopesMap.index).length;
//   gEndScope = scopesMap.index[gEndScope - 1];
//   openScope = scopesMap.index[count + 1];
//   closedScope = scopesMap.index[count + 2];
//   tempArray = expressionArray.slice(openScope + 1, closedScope);
//   let tempArrayLength = tempArray.length;
//   count++;
//   expressionArray[openScope] = String(mainCalculation(tempArray));
//   expressionArray.splice(openScope + 1, tempArrayLength + 1);
//   delete scopesMap.index[count - 1];
//   delete scopesMap.index[count];
//   scopesMap.index = {};
//   //console.log(expressionArray);
//   main();
//   //}
// }

function scopesCalculation(expressionArray, count) {
  const scopesMap = scopesAlgorithm(
    getScopesMap(expressionArray),
    expressionArray
  );
  let tempArray;
  let gBeginingScope, gEndScope, openScope, closedScope;
  while (scopesMap.length > 2) {
    gBeginingScope = scopesMap[0];
    gEndScope = scopesMap[scopesMap.length - 1];
    openScope = scopesMap[count];
    closedScope = scopesMap[count + 1];
    //////////////////////////////////////
    tempArray = expressionArray.slice(openScope + 1, closedScope);
    let tempArrayLength = tempArray.length;
    scopesMap.splice(scopesMap.indexOf(openScope), 2);
    count++;
    expressionArray[openScope] = String(mainCalculation(tempArray));
    expressionArray.splice(openScope + 1, tempArrayLength + 1);
    main();
  }
  gBeginingScope = scopesMap[0];
  gEndScope = scopesMap[scopesMap.length - 1];
  openScope = scopesMap[count];
  closedScope = scopesMap[count + 1];
  tempArray = expressionArray.slice(gBeginingScope + 1, gEndScope);
  let tempArrayLength = tempArray.length;
  scopesMap.splice(scopesMap.indexOf(gBeginingScope), 2);
  count++;
  expressionArray[gBeginingScope] = String(mainCalculation(tempArray));
  expressionArray.splice(gBeginingScope + 1, tempArrayLength + 1);
  main();
}

////expression without scopes calculation
function noScopesCalculation(expressionArray) {
  const result = String(mainCalculation(expressionArray));
  //console.log(expressionArray);
}

//do all calculations, with and without scopes
function mainCalculation(array) {
  let result;
  for (let index = 0; index < array.length; index++) {
    switch (array[index]) {
      case "*":
        result = multiply(array[index - 1], array[index + 1]);
        array[index - 1] = result;
        array.splice(index, 2);
        index = index - 1;
        console.log(expressionArray);
        break;

      case "/":
        result = devision(array[index - 1], array[index + 1]);
        array[index - 1] = result;
        array.splice(index, 2);
        index = index - 1;
        console.log(expressionArray);
        break;
    }
  }
  for (let index = 0; index < array.length; index++) {
    switch (array[index]) {
      case "+":
        result = addition(array[index - 1], array[index + 1]);
        array[index - 1] = result;
        array.splice(index, 2);
        index = index - 1;
        console.log(expressionArray);
        break;
      case "-":
        result = substruct(array[index - 1], array[index + 1]);
        array[index - 1] = result;
        array.splice(index, 2);
        index = index - 1;
        console.log(expressionArray);
        break;
    }
  }
  return array;
}

///////////////////////////////////////////////////////Calculations
/////////////////////////////////Multiply
function multiply(beforeElement, afterElement) {
  return +beforeElement * +afterElement;
}

/////////////////////////////////Addition
function addition(beforeElement, afterElement) {
  return +beforeElement + +afterElement;
}

/////////////////////////////////Substruct
function substruct(beforeElement, afterElement) {
  return +beforeElement - +afterElement;
}

/////////////////////////////////Devision
function devision(beforeElement, afterElement) {
  return +beforeElement / +afterElement;
}

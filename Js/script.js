let expressionString = "24-45*2/34";
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
      !specialChars.includes(expressionArray[index]) &&
      expressionArray[index + 1] === "("
    ) {
      expressionArray.splice(index + 1, 0, "*");
    }
  });
  console.log(expressionArray);
}

////Count of open and closed scopes
function scopesCount(expressionArray) {
  let count = 0;

  expressionArray.forEach((element, index) => {
    if (element === "(") {
      count++;
    } else if (element === ")") {
      count++;
    }
  });
  if (count > 0) {
    ///////////////////////////////////////////////////problem!!!!!!!!!!!!
    const scopesMap = getScopesMap(expressionArray);
  }
  if (count % 2 === 0 && count !== 0) {
    console.log(`scopes count = ${count}`);
    return true;
  } else if (count % 2 !== 0) {
    console.log("scopes error");
    return null;
  }
  if (count === 0) {
    console.log(`scopes count = ${count}`);
    return false;
  }
}

function getScopesMap(expressionArray) {
  let scopesStack = [];
  let stack = [];
  let scopesObj = {
    index: [],
    scope: [],
  };
  let j = 0;
  expressionArray.forEach((element, index) => {
    if (element === "(" || element === ")") {
      scopesObj.index[j] = element;
      scopesObj.scope[j] = [index, element];
      scopesStack.push(index);
      j++;
    }
  });
  return scopesObj;
}

function scopesAlgorithm(scopesObj, array) {
  let temp = [];
  let nextScope;
  let stack = [];
  for (let index = 0; index < scopesObj.scope.length; index++) {
    if (scopesObj.scope.length !== 0) {
      if (stack.length !== 0) {
        if (scopesObj.scope[index][1] !== stack[stack.length - 1][1]) {
          temp = expressionArray.slice(
            stack[stack.length - 1][0],
            scopesObj.scope[index][1]
          );
          scopesObj.scope.splice(index, 1);
          stack.pop();
          scopesObj = getScopesMap(expressionArray);
          stack.length = 0;
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
        console.log(stack);
        console.log(scopesObj.scope);
        continue;
      } else if (scopesObj.scope[index][1] !== scopesObj.scope[index + 1][1]) {
        temp = expressionArray.slice(
          scopesObj.scope[index][0] + 1,
          scopesObj.scope[index + 1][0]
        );
        expressionArray[scopesObj.scope[index][0]] = String(
          mainCalculation(temp)
        );
        //expressionArray.splice(openScope + 1, tempArrayLength + 1);
        nextScope = expressionArray.indexOf(")", scopesObj.scope[index][0]);
        let numb = scopesObj.scope[index][0];
        expressionArray.splice(scopesObj.scope[index][0] + 1, nextScope - numb);
        ////find index next scope and minus index of result
        scopesObj.scope.splice(index, 2);
        scopesObj = getScopesMap(expressionArray);
        stack.length = 0;
        index--;
        console.log(stack);
        console.log(scopesObj.scope);
        continue;
      }
    } else {
      break;
    }
  }
  main();
}

function main() {
  let result = "";
  result = scopesCount(expressionArray);
  if (result === true) {
    scopesAlgorithm(getScopesMap(expressionArray), expressionArray);
  }
  if (result === null) {
    alert("skobochki sychara!!!");
  } else if (result === false) {
    noScopesCalculation(expressionArray);
  }
}

////expression without scopes calculation
function noScopesCalculation(expressionArray) {
  const result = String(mainCalculation(expressionArray));
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

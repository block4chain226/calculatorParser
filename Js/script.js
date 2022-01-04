let expressionString = "-1*(-34-56*-2)/-3+(-1+40/2*3)-45";
const specialChars = ["+", "-", "/", "*", "(", ")"];
let expressionArray;
checkDigit(expressionString);

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
scopesCount(expressionArray);

////begining function
function main() {
  if (scopesCount(expressionArray) !== 0) {
    scopesCalculation(expressionArray);
  } else {
    noScopescalculation();
  }
}
main();
function scopesCalculation(expressionArray) {
  let tempArray;
  let beginingScope;
  let endScope;
  //while (scopesCount !== 0) {
  beginingScope = expressionArray.indexOf("(");
  endScope = expressionArray.indexOf(")");
  tempArray = expressionArray.slice(beginingScope + 1, endScope);
  const tempArrayLength = tempArray.length;

  expressionArray[beginingScope] = String(mainCalculation(tempArray));
  expressionArray.splice(beginingScope + 1, tempArrayLength + 1);
  main();
  //}
}

//do all calculations, with and without scopes
function mainCalculation(tempArray) {
  let result;
  for (let index = 0; index < tempArray.length; index++) {
    switch (tempArray[index]) {
      case "*":
        result = multiply(tempArray[index - 1], tempArray[index + 1]);
        tempArray[index - 1] = result;
        tempArray.splice(index, 2);
        index = index - 1;
        break;

      case "/":
        result = devision(tempArray[index - 1], tempArray[index + 1]);
        tempArray[index - 1] = result;
        tempArray.splice(index, 2);
        index = index - 1;
        break;
    }
  }
  for (let index = 0; index < tempArray.length; index++) {
    switch (tempArray[index]) {
      case "+":
        result = addition(tempArray[index - 1], tempArray[index + 1]);
        tempArray[index - 1] = result;
        tempArray.splice(index, 2);
        index = index - 1;
        break;
      case "-":
        result = substruct(tempArray[index - 1], tempArray[index + 1]);
        tempArray[index - 1] = result;
        tempArray.splice(index, 2);
        index = index - 1;
        break;
    }
  }
  return tempArray;
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

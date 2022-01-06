let scope = ["(", "(", "(", ")", ")", "(", ")", "(", "(", ")", ")", ")"];
let stack = [];
for (let index = 0; index < scope.length; index++) {
  if (scope.length !== 0) {
    if (stack.length !== 0) {
      if (scope[index] !== stack[stack.length - 1]) {
        scope.splice(index, 1);
        stack.pop();
        index--;
        console.log(stack);
        console.log(scope);
        continue;
      }
    }
    if (scope[index] === scope[index + 1]) {
      stack.push(scope[index]);
      scope.splice(index, 1);
      index--;
      console.log(stack);
      console.log(scope);
      continue;
    } else if (scope[index] !== scope[index + 1]) {
      scope.splice(index, 2);
      index--;
      console.log(stack);
      console.log(scope);
      continue;
    }
  } else {
    break;
  }
}

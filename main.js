import React from 'react';
import ReactDOM from 'react-dom';
import "./styles.css";

//keysPressed situation
let keysPressed = {'Meta': true,};

//generic functions
const count = (string, target) => {
  let count = 0;
  for (let x in string) {
    if (string[x] === target) {
      count += 1;
    }
  } return count
}

const getLetter = (string, index) => {
  let reverseIndex = 0;

  if (string === undefined) {
    console.log("getLetter got received an undefined string again for some reason\n" + string);
    return null;
  }
  if (index < 0) {
    for (let x = string.length - 1; x >= 0; x--) {
      reverseIndex = reverseIndex - 1;
      if (reverseIndex === index) {
        return string[x];
        break;
      }
    }
  } else {
    for (let x in string) {
      if (parseInt(x) === index) {
        return string[x]
      }
    }
  } return null;
}

const isNumber = (string) => {
  return /^-?[\d.]+(?:e-?\d+)?$/.test(string);
}

const includesDivOrMulti = (string) => {
  const operators = ['*','÷'];
  for (let x in string) {
    if (operators.includes(string[x])) {
      return true;
      break;
    }
  } return false;
}

const integerInString = (string) => {
  for (let x in string) {
    if ((isNumber(string[x]))) {
      return true;
      break;
    }
  } return false;
}

const negativeChecker = (string) => {
  const operators = ['+','*','÷','^']
  for (let x in string) {
    if (string[x] === '-' && (operators.includes(string[parseInt(x) - 1]) || parseInt(x) === 0 || string[parseInt(x) - 1] === '(')) {
      return true;
      break;
    }
  } return false;
}

const checkForLegitMinusSigns = (string) => {
  let operatorsForCheck = ['+','*','÷'];
  let operatorsToCheckAgainst = ['+','-'];
  let count = 0;

  for (let x in string) {
    if (operatorsToCheckAgainst.includes(string[x]) && x != 0) {
      if (operatorsForCheck.includes(string[parseInt(x) - 1]) === true) {
        //do nothing
      } else {
        count += 1;
      }
    }
  } if (count > 0) {
    return true;
  } else {
    return false;
  }
}

/*
if ya'll are talent people and wanna see something I'm proud of, this one
below's pretty cool IMO.
the replace method in JavaScript defaults to replace only one value, unless you
add these /replaceValue/g or /replaceValue/gi things. But the /rV/ thing doesn't
work for non-alphabet characters for some reason, so I tried to re-write it.
it may not be the fastest time complexity possible. I'd love to have someone
refractor it to make it better.
*/

const replaceAll = (string, target, replaceValue = false) => {
  let splitString = [];
  let returnS = '';
  let targetLength = target.length;

  /*
  split continued to leave some elements like this: "", and others like " ",
  and yet others completely out of the array... so i did this
  */

  const isItTheTarget = (string, target, currentIndex) => {
    let targetLength = target.length;
    let targetIndex = 0;
    let x = parseInt(currentIndex);
    let count = 0;

    while (count < target.length) {
      if (string[x] != target[targetIndex]) {
        return false;
        break;
      }
      x += 1;
      targetIndex += 1;
      count += 1;
    }
    return true;
  }

  let count = 0;
  let tempS = '';

  for (let x in string) {
    if (string[x] === target[0]) {
      if (isItTheTarget(string, target, x)) {
        if (tempS != '') {
          splitString.push(tempS);
        }
        count = target.length;
        tempS = '';
        splitString.push('');
      }
    }
    if (count === 0) {
      tempS += string[x];
    }
    if (count > 0) {
      count -= 1;
    }
  } if (tempS != '') {
    splitString.push(tempS);
  }

  if (replaceValue) {
    for (let x in splitString) {
      if (splitString[x] === "") {
        splitString[x] = replaceValue;
      }
    }
    return splitString.join('');
  } else {
    return splitString.join('');
  }
}

const replaceOne = (string, target) => {
  let list = string.split('');

  for (let x = list.length - 1; x >= 0; x--) {
    if (list[x] === target) {
      list.splice(x, 1);
      break;
    }
  } return list.join('');
}

const getExponent = (number, exponent) => {
  return Math.pow(number, exponent)
}

const reciprocal = (number, negativeExponent) => {
  let denominator = Math.pow(number,(negativeExponent * -1));
  return 1/denominator
}

const sqrt = (number) => {
  return Math.sqrt(number);
}

const log10 = (number) => {
  return Math.log10(number)
}

const sin = (number) => {
  return Math.sin(number);
}

const cos = (number) => {
  return Math.cos(number);
}

const tan = (number) => {
  return Math.tan(number);
}

const findIfPreviousNumberIsADecimal = (string) => {
  const stuffToSplitStringWith = ['+','*','÷','^','-','√','(',')'];
  let tempL = [];
  let tempS = '';

  for (let x in string) {
    if (stuffToSplitStringWith.includes(string[x])) {
      if (tempS != '') {
        tempL.push(tempS);
      }
      tempL.push(string[x]);
      tempS = ''
    } else {
      tempS += string[x];
    }
  } if (tempS != '') {
    tempL.push(tempS);
  }
  if (tempL[tempL.length - 2].includes('.')) {
    return true
  } else {
    return false
  }
}

const findNumberInString = (string) => {
  const digits = ['0','1','2','3','4','5','6','7','8','9'];

  for (let x in string) {
    if (digits.includes(string[x])) {
      return true;
      break;
    }
  } return false;
}

const findNumberOfParentheses = (string) => {
  let count = 0;

  for (let x in string) {
    if (string[x] === '(') {
      count += 1;
    }
  } return count
}

//functions for program
const checkForAns = (string, total) => {
  let returnS = '';
  const digits = ['0','1','2','3','4','5','6','7','8','9'];

  for (let x in string) {
    if (string[x] === 'A' && string[parseInt(x) + 1] === "N" && string[parseInt(x) + 2] === "S") {
      if (digits.includes(string[parseInt(x) - 1])) {
        returnS += "*" + total;
        returnS += string[x];
      } else if (digits.includes(string[parseInt(x) + 3])) {
        returnS += total + "*";
        returnS += string[x];
      } else if (string[x] === "A" && string[parseInt(x) - 1] === "S" && string[parseInt(x) - 2] === "N" && string[parseInt(x) - 3] === "A") {
        returnS += "*" + total;
        returnS += string[x];
      } else {
        returnS += total;
        returnS += string[x];
      }
    } else {
      returnS += string[x];
    }
  }
  returnS = replaceAll(returnS, "ANS");
  return returnS;
}

const checkForPi = (string) => {
  let returnS = '';
  const digits = ['0','1','2','3','4','5','6','7','8','9'];

  for (let x in string) {
    if (string[x] === 'π') {
      console.log([string[x], string[parseInt(x) + 1]]);
      if ((string[parseInt(x) + 1] === "." || digits.includes(string[parseInt(x) + 1]) || string[parseInt(x) + 1] === "π") && (digits.includes(string[parseInt(x) - 1]) === false)) {
        console.log("hello here");
        returnS += '3.141592654*';
      } else if (digits.includes(string[parseInt(x) - 1])) {
        if (string[parseInt(x) + 1] === "." || digits.includes(string[parseInt(x) + 1]) || string[parseInt(x) + 1] === "π") {
          console.log('hello');
          returnS += '*3.141592654*';
        } else {
          returnS += '*3.141592654';
        }
      } else {
        returnS += '3.141592654';
      }
    } else {
      returnS += string[x];
    }
  }
  returnS = replaceAll(returnS, 'π');
  return returnS;
}

const calculatePercentExponents = (string) => {
  let tempL = [];
  let tempS = '';
  let thingsToSplit = ['%','^',')'];
  let operators = ['+','-','÷','*']
  const digits = ['0','1','2','3','4','5','6','7','8','9'];
  let exponentCounter = 0;
  let parentheseCounter = 0;

  const doesItNeedIt = (string) => {
    for (let x in string) {
      if (string[x] === "%" && string[parseInt(x) + 1] === "^") {
        return true;
        break;
      }
    }
    return false;
  }

  if (doesItNeedIt(string)) {
    for (let x in string) {
      if (string[x] === "^" && string[parseInt(x) + 1] === "(") {
        parentheseCounter += 1;
      } else if (parentheseCounter > 0 && string[x] === "(" && string[parseInt(x) - 1] != "^") {
        parentheseCounter += 1;
      } else if (string[x] === ")" && parentheseCounter > 0) {
        parentheseCounter -= 1;
      }
      if (thingsToSplit.includes(string[x])) {
        console.log("this is tempS\n" + tempS);
        if (string[x] === ')' && parentheseCounter === 0) {
          if (tempS.includes('(') === false) {
            if (tempS != '') {
              tempL.push(tempS);
            }
            tempL.push(string[x]);
            tempS = '';
          } else {
            tempS += string[x];
            tempL.push(tempS);
            tempS = '';
          }
        } else if (tempS != '' && parentheseCounter === 0) {
          tempL.push(tempS);
          tempL.push(string[x]);
          tempS = ''
        } else if (string[x] === "^" && parentheseCounter === 1) {
          tempL.push(string[x]);
        } else if ((string[x] === "^" || string[x] === ")") && parentheseCounter > 0) {
          tempS += string[x];
        } else if (parentheseCounter === 0) {
          tempL.push(string[x]);
        }
      } else if (operators.includes(string[x]) && parentheseCounter === 0) {
        if (string[x] === "-" && string[parseInt(x) - 1] === "^") {
          tempS += string[x];
        } else {
          if (tempS != '') {
            tempL.push(tempS);
          }
          tempL.push(string[x]);
          tempS = '';
          }
      } else {
        tempS += string[x];
      }
    }
    if (tempS != '') {
      tempL.push(tempS);
    }
    console.log("calculateForPercentExponents\n" + tempL);

    for (let x in tempL) {
      if (tempL[x] === "^") {
        if (tempL[parseInt(x) + 1].includes("(")) {
          tempL[parseInt(x) + 1] = buildListToSendToGoodbyeParentheses(tempL[parseInt(x) + 1]);
          tempL[parseInt(x) + 1] = goodbyeParentheses(tempL[parseInt(x) + 1]);
          tempL[parseInt(x) + 1] = calculateOutside(tempL[parseInt(x) + 1]);
          tempL[parseInt(x) + 1] = getExponent(.01, tempL[parseInt(x) + 1]).toString()
          tempL.splice(x, 1);
          tempL.splice(parseInt(x) - 1, 1);
          console.log("tempL after splice percentExponents\n" + tempL);
          console.log(getLetter(tempL[parseInt(x) - 2], -1))
          if (digits.includes(getLetter(tempL[parseInt(x) - 2], -1))) {
            tempL[parseInt(x) - 2] += "*"
          }
        } else {
          tempL[parseInt(x) + 1] = calculateOutside(tempL[parseInt(x) + 1]);
          tempL[parseInt(x) + 1] = getExponent(.01, tempL[parseInt(x) + 1]).toString();
          tempL.splice(x, 1);
          tempL.splice(parseInt(x) - 1, 1);
          console.log("tempL after splice percentExponents\n" + tempL);
          if (digits.includes(getLetter(tempL[parseInt(x) - 2], -1))) {
            console.log("Hello from percentExponents")
            tempL[parseInt(x) - 2] += "*"
          }
        }
      }
    }
  console.log(tempL);
  return tempL.join('');
  }
  return string;
}

const checkForPercents = (string) => {
  let tempL = [];
  let tempS = '';
  let returnS = '';

  console.log('checkForPercents at start\n' + string);

  const signsToSplitString = ['+','-','÷','*','^','(',')','√','%'];
  const digits = ['0','1','2','3','4','5','6','7','8','9'];

  if (string.includes('^')) {
    string = calculatePercentExponents(string);
  }

  for (let x in string) {
    if (signsToSplitString.includes(string[x]) && string[parseInt(x) - 1] != "e") {
      if (tempS != '') {
        tempL.push(tempS)
      }
      tempL.push(string[x]);
      tempS = '';
    } else {
      tempS += string[x];
    }
  } if (tempS != '') {
    tempL.push(tempS);
  }

  console.log("tempL for percents\n" + tempL);

  let countOfPercentIterations = 0;

  const calculatePercents = (number, numberOfCalculations) => {
    let total = parseFloat(number);
    for (let x = 0; x < numberOfCalculations; x++) {
      total *= .01;
    }
    return total.toString();
  }

  for (let x = tempL.length - 1; x >= 0; x--) {
    if (tempL[x] === "%") {
      countOfPercentIterations += 1;
    } else if (findNumberInString(tempL[x]) || tempL[x].includes('.') && countOfPercentIterations > 0) {
      if (tempL[parseInt(x) - 1] === "%") {
        tempL[x] = "*" + calculatePercents(tempL[x], countOfPercentIterations);
      } else {
        tempL[x] = calculatePercents(tempL[x], countOfPercentIterations);
      }
      countOfPercentIterations = 0;
    }
  }
  returnS = replaceAll(tempL.join(''),'%');
  return returnS;
}

const addParentheses = (string) => {
  let countInner = count(string, "(");
  let countOuter = count(string, ")");

  while (countInner != countOuter) {
    string = string + ")";
    countOuter += 1;
  } return string;
}

const checkForParenthesesMultiplication = (string) => {
  const digits = ['0','1','2','3','4','5','6','7','8','9'];

  let listToCheck = string.split('');

  console.log(listToCheck);

  for (let x in listToCheck) {
    if ((digits.includes(listToCheck[x]) && listToCheck[parseInt(x) + 1] === "(") || (digits.includes(listToCheck[x]) && listToCheck[parseInt(x) + 1] === "√") || (listToCheck[x] === ")" && listToCheck[parseInt(x) + 1] === "√")) {
      listToCheck.splice(x, 1, listToCheck[x] + '*');
    } else if (listToCheck[x] === ')' && (listToCheck[parseInt(x) + 1] === "(" || digits.includes(listToCheck[parseInt(x) + 1]) || listToCheck[parseInt(x) + 1] === ".")) {
      listToCheck.splice(x, 1, listToCheck[x] + '*');
    }
    console.log('listToCheck\n' + listToCheck);
  } return listToCheck.join('');
}

const checkForLogSinCosTanMultiplication = (string) => {
  let tempL = [];
  let tempS = '';
  const checkLetters = ['S','C','T','L'];
  const digits = ['0','1','2','3','4','5','6','7','8','9']

  for (let x in string) {
    if (string[x] === ")" || digits.includes(string[x])) {
      if (tempS != '') {
        tempL.push(tempS);
      }
      tempL.push(string[x]);
      tempS = '';
    } else {
      tempS += string[x]
    }
  } if (tempS != '') {
    tempL.push(tempS);
  }
  console.log("checkForSinCosTanMultiplication\n" + tempL);
  for (let x in tempL) {
    if ((tempL[x] === ")" || digits.includes(tempL[x])) && checkLetters.includes(getLetter(tempL[parseInt(x) + 1], 0))) {
      tempL[x] += "*";
    }
  }
  console.log("after checkForSinCosTanMultiplication\n" + tempL.join(''));
  return tempL.join('');
}

const buildStringForCalculation = (string) => {
  let tempL = [];
  let tempS = '';
  const operators = ['+','*','÷','^'];
  const allOperators = ['+','-','*','÷','^'];

  if (negativeChecker(string)) {
    for (let x in string) {
      if (allOperators.includes(string[x])) {
        if (tempS != '') {
          tempL.push(tempS);
        }
        tempL.push(string[x]);
        tempS = '';
      } else if (string[x] === "(") {
        if (tempS != '') {
          tempL.push(tempS);
        }
        tempL.push(string[x]);
        tempS = '';
      } else if (string[x] === ')') {
        if (tempS != '') {
          tempL.push(tempS);
        }
        tempL.push(string[x]);
        tempS = '';
      } else {
        tempS += string[x];
      }
    } if (tempS != '') {
      tempL.push(tempS);
    }

    for (let x in tempL) {
      if (tempL[x] === '-' && (operators.includes(tempL[parseInt(x) - 1]) || (parseInt(x) === 0 && tempL[parseInt(x) + 1] != '(') || tempL[parseInt(x) - 1] === '(')) {
        console.log('triggers heree')
        tempL.splice(x, 1, "[" + tempL[x] + tempL[parseInt(x) + 1] + "]");
        tempL.splice(parseInt(x) + 1, 1);
      } else if (tempL[x] === '-' && tempL[parseInt(x) + 1] === '(') {
        console.log('tigger below');
        tempL[x] = "[" + tempL[x] + "]";
      }
    }
  } else {
    for (let x in string) {
      if (string[x] === '+' && string[parseInt(x) - 1] != 'e') {
        tempL.push(tempS);
        tempS = '';
        tempL.push(string[x]);
      } else if (string[x] === '-' && string[parseInt(x) - 1] != 'e') {
        tempL.push(tempS);
        tempS = '';
        tempL.push(string[x]);
      } else {
        tempS += string[x];
      }
    } if (tempS != '') {
      tempL.push(tempS);
    }
  } return tempL.join('');
}

const calculateExponents = (list) => {
  let tempTotal = 0;
  const operators = ['*','÷'];

  console.log("current method to calculateExponents\n" + list);

  for (let x in list) {
    if (list[x].includes('^')) {
      list[x] = replaceAll(list[x],'[');
      list[x] = replaceAll(list[x],']');
      let tempL = list[x].split('^');
      let number = tempL[0];
      let exponent = tempL[tempL.length - 1];
      if (exponent > 0) {
        tempTotal = getExponent(number, exponent);
      } else {
        tempTotal = reciprocal(number, exponent);
      }
      list.splice(x, 1, tempTotal.toString());
    }
  }
   return list;
}

const removeNegativeHolders = (list) => {
  const operatorsForCheck = ['*','÷','+'];
  const operatorsToSplitUpReturnList = ['+','-'];
  let tempL = [];
  let tempS = '';
  let tempS2 = '';

  tempS = list.join('');

  for (let x in tempS) {
    if (tempS[x] === '[') {
      if (tempS2 != '') {
        tempL.push(tempS2);
      }
      tempL.push(tempS[x]);
      tempS2 = ''
    } else if (tempS[x] === ']') {
      if (tempS2 != '') {
        tempL.push(tempS2);
      }
      tempL.push(tempS[x]);
      tempS2 = ''
    } else {
      tempS2 += tempS[x]
    }
  } if (tempS2 != '') {
    tempL.push(tempS2);
  }

  for (let x in tempL) {
    if (tempL[x] === '[') {
      tempL.splice(x, 2, tempL[parseInt(x) + 1]);
    } else if (tempL[x] === ']') {
      tempL.splice(x, 1);
    }
  }

  tempS = '';
  tempS = tempL.join('');

  tempS2 = '';
  tempL = [];

  console.log("before tempS iteration\n" + tempS);

  for (let x in tempS) {
    if (operatorsToSplitUpReturnList.includes(tempS[x]) && operatorsForCheck.includes(tempS[parseInt(x) - 1]) === false && x != 0 && tempS[parseInt(x) - 1].includes('e') === false && tempS[parseInt(x) - 1] != '-') {
      if (tempS2 != '') {
        tempL.push(tempS2);
      }
      tempL.push(tempS[x]);
      tempS2 = '';
    } else {
      tempS2 += tempS[x];
    }
  } if (tempS2 != '') {
    tempL.push(tempS2);
  }

  return tempL;
}

const calculateOutside = (string) => {
  let total = 0;
  let tempL = [];
  let tempS = '';
  const operatorsForExponentRemoval = ['+','*','÷','-'];
  const operatorsForOtherCalculation = ['+','-'];

  if (string.includes('^')) {
    for (let x in string) {
      if (operatorsForExponentRemoval.includes(string[x]) && string[parseInt(x) - 1] != '[' && string[parseInt(x) -1] != '^') {
        if (tempS != '') {
          tempL.push(tempS);
        }
        tempL.push(string[x]);
        tempS = '';
      } else {
        tempS += string[x];
      }
    } if (tempS != '') {
      tempL.push(tempS);
    }
    tempL = calculateExponents(tempL);
    string = tempL.join('');
  }

  let countForChanges = 0;
  tempL = [];
  tempS = '';

  console.log("before tempL\n" + string);

  if (string.includes("div0")) {
    return "div0";
  } else if (string.includes("Infinity")) {
    return "Infinity";
  }

  if (string.includes('+') || string.includes('-')) {
    for (let x in string) {
      if (operatorsForOtherCalculation.includes(string[x]) && string[parseInt(x) - 1] != 'e' && string[parseInt(x) - 1] != '-') {
        countForChanges = countForChanges + 1;
        if (tempS != '') {
          tempL.push(tempS);
        }
        tempL.push(string[x]);
        tempS = '';
      } else {
        tempS += string[x];
      }
    } if (tempS != '') {
      tempL.push(tempS);
    }

  console.log("before removeNegativeHolders\n" + tempL);

  tempL = removeNegativeHolders(tempL);

  console.log('after removeNegativeHolders\n' + tempL);


  let negativesRemovedString = '';
  if (tempL.length === 1 && tempL[0].slice(0,2) === "--") {
    return tempL[0].slice(2);
  } else {
    negativesRemovedString = tempL.join('');
  }

  let count = 0;
  let booleanOfCheckForLegitMinusSign = checkForLegitMinusSigns(negativesRemovedString);

  for (let x in tempL) {
    count = count + 1;
    if (operatorsForOtherCalculation.includes(tempL[x]) && booleanOfCheckForLegitMinusSign === true) {
      if (tempL[x] === '+') {
        if (total === 0) {
          if (includesDivOrMulti(tempL[parseInt(x) - 1]) && includesDivOrMulti(tempL[parseInt(x) + 1])) {
            total = divAndMulti(tempL[parseInt(x) - 1]) + divAndMulti(tempL[parseInt(x) + 1]);
          } else if (includesDivOrMulti(tempL[parseInt(x) - 1]) === false && includesDivOrMulti(tempL[parseInt(x) + 1])) {
            total = parseFloat(tempL[parseInt(x) - 1]) + divAndMulti(tempL[parseInt(x) + 1])
          } else if (includesDivOrMulti(tempL[parseInt(x) - 1]) && includesDivOrMulti(tempL[parseInt(x) + 1]) === false) {
            total = divAndMulti(tempL[parseInt(x) - 1]) + parseFloat(tempL[parseInt(x) + 1]);
          } else {
            total = parseFloat(tempL[parseInt(x) - 1]) + parseFloat(tempL[parseInt(x) + 1]);
          }
        } else {
          if (tempL[parseInt(x) + 1].includes('[')) {
            tempL.splice(parseInt(x) + 1, 1, tempL[parseInt(x)].replace(']','-' + tempL[parseInt(x) - 1]));
          }
          if (includesDivOrMulti(tempL[parseInt(x) + 1])) {
            total += divAndMulti(tempL[parseInt(x) + 1]);
          } else {
            total += parseFloat(tempL[parseInt(x) + 1]);
          }
        }
      } else if (tempL[x] === '-') {
        if (total === 0) {
          if (includesDivOrMulti(tempL[parseInt(x) - 1]) && includesDivOrMulti(tempL[parseInt(x) + 1])) {
            total = divAndMulti(tempL[parseInt(x) - 1]) - divAndMulti(tempL[parseInt(x) + 1]);
          } else if (includesDivOrMulti(tempL[parseInt(x) - 1]) === false && includesDivOrMulti(tempL[parseInt(x) + 1])) {
            total = parseFloat(tempL[parseInt(x) - 1]) - divAndMulti(tempL[parseInt(x) + 1])
          } else if (includesDivOrMulti(tempL[parseInt(x) - 1]) && includesDivOrMulti(tempL[parseInt(x) + 1]) === false) {
            total = divAndMulti(tempL[parseInt(x) - 1]) - parseFloat(tempL[parseInt(x) + 1]);
          } else {
            total = parseFloat(tempL[parseInt(x) - 1]) - parseFloat(tempL[parseInt(x) + 1]);
          }
        } else {
          if (includesDivOrMulti(tempL[parseInt(x) + 1])) {
            total -= divAndMulti(tempL[parseInt(x) + 1]);
          } else {
            total -= parseFloat(tempL[parseInt(x) + 1]);
          }
        }
      }
    } else if (tempL.length === 1 && tempL[x].includes('e') && tempL[x].includes('*') === false && tempL[x].includes('÷') === false && checkForLegitMinusSigns(tempL[x]) === false && tempL[x].includes('+') === false && tempL[x].includes('√') === false) {
      total = parseFloat(tempL[x]);
    } else if(tempL.length === 1 && getLetter(tempL[x], 0) === '-' && tempL[x].includes('*') === false && tempL[x].includes('÷') === false && tempL[x].includes('+') === false) {
      total = parseFloat(tempL[x]);
    }
  }
  if (negativesRemovedString.includes('*') || negativesRemovedString.includes('÷')) {
    console.log('this should trigger');
    console.log(total);
    console.log(negativesRemovedString);
    console.log(total);
    if (total === 0) {
      total = divAndMulti(negativesRemovedString);
      console.log(total);
      return total.toString();
      }
    }
  }

  if (countForChanges === 0) {
    if (string.includes('*') || string.includes('÷')) {
      total = divAndMulti(string);
    } else {
      total = parseFloat(string);
    }
  }
  return total.toString();
}

const goodbyeParentheses = (list) => {
  let stringToReturn = '';
  let goodbyeParenthesesList2 = [];
  let tempS = '';
  const digits = ['0','1','2','3','4','5','6','7','8','9'];

  console.log('goodbyeParentheses list\n' + list);

  for (let x in list) {
    if (list[x].includes('(')) {
      if (list[x].includes(')')) {
        list[x] = removeNegativeHolders([list[x]]).join('')
        list[x] = replaceAll(list[x], '(');
        list[x] = replaceAll(list[x], ')');
        list[x] = calculateOutside(list[x]);

        if (getLetter(list[parseInt(x) - 1], -1) === "N" || getLetter(list[parseInt(x) - 1], -1) === "S" || getLetter(list[parseInt(x) - 1], -1) === "G") {
          list[x] = calculateOutside(list[x]);
          if (list[parseInt(x) - 1].includes("SIN")) {
            list[x] = sin(list[x]);
            list[parseInt(x) - 1] = replaceAll(list[parseInt(x) - 1], "SIN");
          } else if (list[parseInt(x) - 1].includes("COS")) {
            list[x] = cos(list[x]);
            list[parseInt(x) - 1] = replaceAll(list[parseInt(x) - 1], "COS");
          } else if (list[parseInt(x) - 1].includes("TAN")) {
            list[x] = tan(list[x]);
            list[parseInt(x) - 1] = replaceAll(list[parseInt(x) - 1], "TAN");
          } else if (list[parseInt(x) - 1].includes("LOG")) {
            if (list[x][0] === '-') {
              return "nonreal";
            }
            list[x] = log10(list[x]);
            list[parseInt(x) - 1] = replaceAll(list[parseInt(x) - 1], "LOG");
          }
        } else if (getLetter(list[parseInt(x) - 1], -1) === "√" || (getLetter(list[parseInt(x) - 1], -1) === "(" && getLetter(list[parseInt(x) - 1], -2) === "√") || (getLetter(list[parseInt(x) - 1], -1) === "(" && getLetter(list[parseInt(x) - 1], -2) === "√")) {
            list[x] = calculateOutside(list[x]);
            if (list[parseInt(x) - 1].includes("√") && list[parseInt(x) - 1] != "√" && list[parseInt(x) - 1] != "(√") {
              list[x] = sqrt(list[x]);
              list[parseInt(x) - 1] = replaceAll(list[parseInt(x) - 1], "√");
            } else {
              console.log('here\n' + list[x]);
              console.log('current\n' + list);
              list[x] = calculateOutside(list[x]);
              console.log(list[x][0]);
              if (list[x][0] === "-") {
                return 'nonreal';
              }
              list[x] = sqrt(list[x]);
              console.log("after\n" + list[x]);
              if (list[parseInt(x) - 1] === "(√") {
                console.log("TRIGGERED here");
                list[parseInt(x) - 1] = replaceAll(list[parseInt(x) - 1],'√');
              } else {
                list.splice(parseInt(x) - 1, 1);
              }
            }
          } else {
            list[x] = calculateOutside(list[x]);
          }
      }
    }
  }

  stringToReturn = list.join('');
  console.log('stringToReturn here\n' + stringToReturn);

  if (count(stringToReturn, '(') > 0 || count(stringToReturn, ')') > 0) {
    goodbyeParenthesesList2 = buildListToSendToGoodbyeParentheses(stringToReturn);
    stringToReturn = goodbyeParentheses(goodbyeParenthesesList2)
    if (count(stringToReturn,'(') === 0 && count(stringToReturn, ')') === 0) {
      return stringToReturn.toString();
    }
  } else {
    if (stringToReturn.includes('√')) {
      if (getLetter(stringToReturn, 0) === '√') {
        stringToReturn = replaceAll(stringToReturn, '√');
        stringToReturn = calculateOutside(stringToReturn);
        stringToReturn = sqrt(stringToReturn);
        return stringToReturn.toString();
      }
    }
    return stringToReturn.toString();
  }
}

const buildListToSendToGoodbyeParentheses = (string) => {
  let tempL = [];
  let tempS = '';
  let parenthesesChecker = 0;
  for (let x in string) {
    if (string[x] === '(' && string[parseInt(x) + 1] != '(') {
      if (tempS != '') {
        tempL.push(tempS);
      }
      tempS = '';
      tempS = string[x];
    } else if (string[x] === ')') {
      tempS = tempS + string[x];
      tempL.push(tempS);
      tempS = '';
    } else if (string[x] === "√") {
      if (tempS != '') {
        tempL.push(tempS);
      }
      tempS = '';
      tempL.push(string[x])
    } else {
      tempS += string[x];
    }
  } if (tempS != '') {
    tempL.push(tempS);
  }
  return tempL;
}

const divAndMulti = (string) => {
  console.log("divAndMulti\n" + string);
  let total = 0;
  let tempL = [];
  let tempS = '';

  string = replaceAll(string, '(');
  string = replaceAll(string, ')');
  string = replaceAll(string, '[');
  string = replaceAll(string, ']');

  for (let x in string) {
    if (string[x] === '÷' || string[x] === '*') {
      tempL.push(tempS);
      tempS = '';
      tempL.push(string[x]);
    } else {
      tempS += string[x];
    }
  } tempL.push(tempS);

  console.log(tempL);

  for (let x in tempL) {
    if (tempL[x].includes('√')) {
      console.log('hi');
      if (getLetter(tempL[x], 0) === '√') {
        tempL[x] = replaceAll(tempL[x], '√');
        tempL[x] = calculateOutside(tempL[x]);
        tempL[x] = sqrt(tempL[x]).toString();
      }
    }
  }

  console.log(tempL);

  calculateExponents(tempL);



  for (let x in tempL) {
    if (total === 0) {
      if (tempL[x] === '÷' ) {
        if (tempL[parseInt(x) + 1] == "0") {
          return 'div0'
        }
        total = tempL[parseInt(x) - 1] / tempL[parseInt(x) + 1];
      } else if (tempL[x] === '*') {
        total = tempL[parseInt(x) - 1] * tempL[parseInt(x) + 1];
      }
    } else {
      if (tempL[x] === '÷' ) {
        if (tempL[parseInt(x) + 1] == 0) {
          return 'div0';
        }
        total /= tempL[parseInt(x) + 1];
      } else if (tempL[x] === '*') {
        total *= tempL[parseInt(x) + 1];
      }
    }
  }

  console.log(total);

  return total
}

//MAIN FUNCTION
const calculate = (string, stateTotal) => {
  let total = 0;
  let tempL = [];

  if (string.includes('(')) {
    string = addParentheses(string);
    string = checkForParenthesesMultiplication(string);
    string = checkForLogSinCosTanMultiplication(string);
  }

  string = checkForAns(string, stateTotal);
  console.log("after checkForAns\n" + string);
  string = checkForLogSinCosTanMultiplication(string);
  string = checkForPi(string);
  console.log('after checkForPi\n' + string);
  string = checkForPercents(string);
  console.log('aftercheckForPercents\n' + string);
  string = checkForParenthesesMultiplication(string);

  if (string.includes("Infinity")) {
    alert("Overflow");
    return '';
  } else if (string.includes("div0")) {
    alert("Divide by 0");
    return '';
  }
  console.log('sent to buildStringForCalculation\n' + string);
  string = buildStringForCalculation(string);
  console.log('sent to buildListToSendToGoodbyeParentheses\n' + string);
  tempL = buildListToSendToGoodbyeParentheses(string);
  console.log('sent to goodbyeParentheses\n' + tempL);
  string = goodbyeParentheses(tempL);
  if (string === 'nonreal') {
    alert("Nonreal answer");
    return '';
  } else if (string.includes("Infinity")) {
    alert("Overflow");
    return '';
  }
  console.log('sent to calculateOutside\n' + string);
  total = calculateOutside(string);

  console.log(total);
  console.log(total.toString().includes("div0"));
  if (isNaN(total) || total == 'Infinity' || total.toString().includes("Infinity") || total == '-Infinity' || total.toString().includes("div0")) {
    if (total.includes("Infinity")) {
      alert("Overflow");
      return '';
    } else if (total == '-Infinity') {
      alert("Domain");
      return '';
    } else if (total.toString().includes("div0")) {
      alert("Divide by 0");
      return '';
    } else {
      alert("Invalid Entry");
      return '';
    }
  } else if (total.toString().includes("div0")) {
    alert("Divide by 0");
    return '';
  } else {
    return total.toString();
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      string: '',
      total: '',
      disabled: true,
      disabled_operators: true,
      disabled_minus: false,
      disabled_dot: false,
      dot_operator_check: false,
      disabled_counter: 0,
      disabled_percent: true,
      disabled_pi: false,
      disabled_trig: false,
      disabled_enter: true,
    }; this.handleClick = this.handleClick.bind(this);
    this.programKeyboard = this.programKeyboard.bind(this);
  } handleClick(e) {
    const digits = ['0','1','2','3','4','5','6','7','8','9'];
    const operators = ['+','-','÷','*','^','('];

    if (e.target.value === "√") {
      this.setState({
        string: this.state.string + e.target.value + "(",
        disabled: false,
        disabled_counter: this.state.disabled_counter + 1,
        disabled_operators: true,
        disabled_minus: false,
        disabled_dot: false,
        disabled_enter: true,
      })
    } else if (e.target.value === "7") {
      this.setState({
        string: (this.state.string + e.target.value),
        disabled_operators: false,
        disabled_minus: false,
        disabled_percent: false,
        disabled_enter: false,
        disabled_trig: false,
        disabled_pi: false,
      })
      if (getLetter(this.state.string, -1) === "%" && findIfPreviousNumberIsADecimal(this.state.string) === false) {
        this.setState({
          disabled_dot: false,
        })
      }
    } else if (e.target.value === "8") {
      this.setState({
        string: (this.state.string + e.target.value),
        disabled_operators: false,
        disabled_minus: false,
        disabled_percent: false,
        disabled_enter: false,
        disabled_trig: false,
        disabled_pi: false,
      })
      if (getLetter(this.state.string, -1) === "%" && findIfPreviousNumberIsADecimal(this.state.string) === false) {
        this.setState({
          disabled_dot: false,
        })
      }
    } else if (e.target.value === "9") {
      this.setState({
        string: (this.state.string + e.target.value),
        disabled_operators: false,
        disabled_minus: false,
        disabled_percent: false,
        disabled_enter: false,
        disabled_trig: false,
        disabled_pi: false,
      })
      if (getLetter(this.state.string, -1) === "%" && findIfPreviousNumberIsADecimal(this.state.string) === false) {
        this.setState({
          disabled_dot: false,
        })
      }
    } else if (e.target.value === "÷") {
      if (this.state.disabled_operators === false) {
        if (this.state.string === '' && this.state.total != '') {
          this.setState({
            string: "ANS" + e.target.value,
            disabled_operators: true,
            disabled_dot: false,
            disabled_percent: true,
            disabled_enter: true,
            disabled_pi: false,
          })
        } else {
            this.setState({
              string: this.state.string + e.target.value,
              disabled_operators: true,
              disabled_dot: false,
              disabled_percent: true,
              disabled_enter: true,
              disabled_pi: false,
          })
        }
      }
    } else if (e.target.value === "^") {
      if (this.state.string === '') {
        this.setState({
          string: "ANS" + e.target.value,
          disabled_operators: true,
          disabled_minus: false,
          disabled_dot: false,
          disabled_percent: true,
          disabled_enter: true,
          disabled_pi: false,
        })
      } else {
      this.setState({
        string: this.state.string + e.target.value,
        disabled_operators: true,
        disabled_minus: false,
        disabled_dot: false,
        disabled_percent: true,
        disabled_enter: true,
        disabled_pi: false,
      })
      }
    } else if (e.target.value === "π") {
      if (this.state.string === '' && this.state.total === '') {
        this.setState({
          string: e.target.value,
          disabled_operators: false,
          disabled_minus: false,
          disabled_dot: false,
          disabled_percent: false,
          disabled_enter: false,
        })
      } else if (this.state.string != '') {
        this.setState({
          string: this.state.string + e.target.value,
          disabled_operators: false,
          disabled_minus: false,
          disabled_dot: false,
          disabled_percent: false,
          disabled_enter: false,
        })
      } else if (this.state.string === '' && this.state.total != '') {
        this.setState({
          string: e.target.value,
          disabled_operators: false,
          disabled_minus: false,
          disabled_dot: false,
          disabled_percent: false,
          disabled_enter: false,
        })
      }
      if (getLetter(this.state.string, -1) === "%" && findIfPreviousNumberIsADecimal(this.state.string) === false) {
        this.setState({
          disabled_dot: false,
        })
      }
    } else if (e.target.value === "(") {
      if (this.state.string === '' && this.state.total != '') {
        this.setState({
          string: e.target.value,
          disabled: false,
          disabled_counter: this.state.disabled_counter + 1,
          disabled_minus: false,
          disabled_dot: false,
          disabled_percent: true,
          disabled_enter: true,
          disabled_pi: false,
        })
      } else {
        this.setState({
          string: (this.state.string + e.target.value),
          disabled: false,
          disabled_counter: this.state.disabled_counter + 1,
          disabled_minus: false,
          disabled_dot: false,
          disabled_operators: true,
          disabled_percent: true,
          disabled_enter: true,
          disabled_pi: false,
        });
      }
    } else if (e.target.value === "4") {
      this.setState({
        string: (this.state.string + e.target.value),
        disabled_operators: false,
        disabled_minus: false,
        disabled_percent: false,
        disabled_enter: false,
        disabled_trig: false,
        disabled_pi: false,
      })
      if (getLetter(this.state.string, -1) === "%" && findIfPreviousNumberIsADecimal(this.state.string) === false) {
        this.setState({
          disabled_dot: false,
        })
      }
    } else if (e.target.value === "5") {
      this.setState({
        string: (this.state.string + e.target.value),
        disabled_operators: false,
        disabled_minus: false,
        disabled_percent: false,
        disabled_enter: false,
        disabled_trig: false,
        disabled_pi: false,
      })
      if (getLetter(this.state.string, -1) === "%" && findIfPreviousNumberIsADecimal(this.state.string) === false) {
        this.setState({
          disabled_dot: false,
        })
      }
    } else if (e.target.value === "6") {
      this.setState({
        string: (this.state.string + e.target.value),
        disabled_operators: false,
        disabled_minus: false,
        disabled_percent: false,
        disabled_enter: false,
        disabled_trig: false,
        disabled_pi: false,
      })
      if (getLetter(this.state.string, -1) === "%" && findIfPreviousNumberIsADecimal(this.state.string) === false) {
        this.setState({
          disabled_dot: false,
        })
      }
    } else if (e.target.value === "x") {
      if (this.state.string === '' && this.state.total != '') {
        this.setState({
          string: 'ANS' + '*',
          disabled_operators: true,
          disabled_minus: false,
          disabled_dot: false,
          disabled_percent: true,
          disabled_enter: true,
          disabled_pi: false,
        })
      } else {
        this.setState({
          string: (this.state.string + '*'),
          disabled_operators: true,
          disabled_minus: false,
          disabled_dot: false,
          disabled_percent: true,
          disabled_enter: true,
          disabled_pi: false,
        })
      }
    } else if (e.target.value === "LOG") {
      this.setState({
        string: this.state.string + e.target.value + "(",
        disabled: false,
        disabled_counter: this.state.disabled_counter + 1,
        disabled_minus: true,
        disabled_operators: true,
        disabled_enter: true,
        disabled_pi: false,
      })
    } else if (e.target.value === "SIN") {
      if (digits.includes(getLetter(this.state.string, -1)) === false) {
        this.setState({
          string: this.state.string + e.target.value + "(",
          disabled: false,
          disabled_counter: this.state.disabled_counter + 1,
          disabled_operators: true,
          disabled_enter: true,
          disabled_pi: false,
        })
      }
    } else if (e.target.value === ")") {
      if (count(this.state.string, '(') >= 1) {
        this.setState({
          string: (this.state.string + e.target.value),
          disabled_counter: (this.state.disabled_counter - 1),
        })
        if (this.state.disabled_counter === 1) {
          this.setState({
            disabled: true,
          })
        }
      }
    } else if (e.target.value === "1") {
      this.setState({
        string: (this.state.string + e.target.value),
        disabled_operators: false,
        disabled_minus: false,
        disabled_percent: false,
        disabled_enter: false,
        disabled_trig: false,
        disabled_pi: false,
      })
      if (getLetter(this.state.string, -1) === "%" && findIfPreviousNumberIsADecimal(this.state.string) === false) {
        this.setState({
          disabled_dot: false,
        })
      }
    } else if (e.target.value === "2") {
      this.setState({
        string: (this.state.string + e.target.value),
        disabled_operators: false,
        disabled_minus: false,
        disabled_percent: false,
        disabled_enter: false,
        disabled_trig: false,
        disabled_pi: false,
      })
      if (getLetter(this.state.string, -1) === "%" && findIfPreviousNumberIsADecimal(this.state.string) === false) {
        this.setState({
          disabled_dot: false,
        })
      }
    } else if (e.target.value === "3") {
      this.setState({
        string: (this.state.string + e.target.value),
        disabled_operators: false,
        disabled_minus: false,
        disabled_percent: false,
        disabled_enter: false,
        disabled_trig: false,
        disabled_pi: false,
      })
      if (getLetter(this.state.string, -1) === "%" && findIfPreviousNumberIsADecimal(this.state.string) === false) {
        this.setState({
          disabled_dot: false,
        })
      }
    } else if (e.target.value === "-") {
      if (this.state.string === '' && this.state.total != '') {
        this.setState({
          string: "ANS" + e.target.value,
          disabled_minus: true,
          disabled_operators: true,
          disabled_dot: false,
          disabled_percent: true,
          disabled_enter: true,
          disabled_pi: false,
        })
      } else {
        this.setState({
          string: this.state.string + e.target.value,
          disabled_minus: true,
          disabled_operators: true,
          disabled_dot: false,
          disabled_percent: true,
          disabled_enter: true,
          disabled_pi: false,
        })
      }
    } else if (e.target.value === "%") {
      if (this.state.string === '') {
        this.setState({
          string: "ANS" + e.target.value,
          disabled_minus: true,
          disabled_operators: false,
          disabled_dot: false,
          disabled_enter: false,
          disabled_pi: false,
        })
      } else {
        this.setState({
          string: this.state.string + e.target.value,
          disabled_minus: true,
          disabled_operators: false,
          disabled_dot: false,
          disabled_enter: false,
          disabled_pi: false,
        })
      }
      if (getLetter(this.state.string, -1) === "%" && findIfPreviousNumberIsADecimal(this.state.string) === false) {
        this.setState({
          disabled_dot: false,
        })
      }
    } else if (e.target.value === "COS") {
      this.setState({
        string: this.state.string + e.target.value + "(",
        disabled: false,
        disabled_counter: this.state.disabled_counter + 1,
        disabled_operators: true,
        disabled_enter: true,
        disabled_pi: false,
      })
    } else if (e.target.value === "AC") {
      if (this.state.total === '') {
        this.setState({
          string: '',
          disabled_minus: false,
          disabled_operators: true,
          disabled_dot: false,
          dot_operator_check: false,
          disabled: true,
          disabled_counter: 0,
          disabled_percent: true,
          disabled_enter: true,
          disabled_trig: false,
        })
      } else {
        this.setState({
          string: '',
          disabled_minus: false,
          disabled_operators: false,
          disabled_dot: false,
          dot_operator_check: false,
          disabled: true,
          disabled_counter: 0,
          disabled_percent: true,
          disabled_pi: false,
          disabled_trig: false,
          disabled_enter: true,
        })
      }
    } else if (e.target.value === "0") {
      this.setState({
        string: (this.state.string + e.target.value),
        disabled_operators: false,
        disabled_minus: false,
        disabled_percent: false,
        disabled_enter: false,
        disabled_trig: false,
        disabled_pi: false,
      })
      if (getLetter(this.state.string, -1) === "%" && findIfPreviousNumberIsADecimal(this.state.string) === false) {
        this.setState({
          disabled_dot: true,
        })
      }
    } else if (e.target.value === ".") {
      this.setState({
        string: (this.state.string + e.target.value),
        disabled_dot: true,
        disabled_operators: true,
        disabled_minus: true,
        disabled_percent: true,
        disabled_pi: true,
        disabled_enter: true,
        disabled_trig: true,
      })
    } else if (e.target.value === "=") {
      if (this.state.disabled_enter === false) {
        if (calculate(this.state.string, this.state.total) === '') {
          this.setState({
            disabled: true,
            disabled_operators: false,
            disabled_dot: false,
            disabled_minus: false,
            disabled_counter: 0,
            disabled_percent: true,
            disabled_enter: true,
            disabled_pi: false,
          })
        } else {
          this.setState({
            total: calculate(this.state.string, this.state.total),
            disabled: true,
            disabled_operators: false,
            disabled_dot: false,
            disabled_minus: false,
            disabled_counter: 0,
            disabled_percent: false,
            disabled_enter: true,
            disabled_pi: false,
          })
        }
        this.setState({
          string: '',
        })
      }
    } else if (e.target.value === "+") {
      if (this.state.string === '' && this.state.total != '') {
        this.setState({
          string: "ANS" + e.target.value,
          disabled_operators: true,
          disabled_dot: false,
          disabled_percent: true,
          disabled_enter: true,
          disabled_pi: false,
        })
      } else {
        this.setState({
          string: (this.state.string + e.target.value),
          disabled_operators: true,
          disabled_dot: false,
          disabled_percent: true,
          disabled_enter: true,
          disabled_pi: false,
        })
      }
    } else if (e.target.value === 'clear total') {
      if (this.state.string === '') {
        this.setState({
          disabled_operators: true,
          disabled_minus: false,
          disabled_dot: false,
          dot_operator_check: false,
          disabled_exponent: true,
          disabled: true,
          disabled_counter: 0,
          disabled_percent: true,
          disabled_enter: true,
          disabled_trig: false,
          disabled_pi: false,
        })
      }
      this.setState({
        total: '',
      })
    } else if (e.target.value === "TAN") {
      this.setState({
        string: this.state.string + e.target.value + "(",
        disabled: false,
        disabled_counter: this.state.disabled_counter + 1,
        disabled_operators: true,
        disabled_enter: true,
        disabled_pi: false,
      })
    } else if (e.target.value === "ANS") {
      if (this.state.total != '') {
        this.setState({
          string: (this.state.string + "ANS"),
          disabled_operators: false,
          disabled_dot: true,
          disabled_minus: false,
          disabled_percent: false,
          disabled_pi: false,
          disabled_enter: false,
          disabled_pi: false,
        })
      }
    } else if (e.target.value === "del") {
      this.setState({
        string: this.state.string.slice(0, -1),
      })
      if (getLetter(this.state.string, -1) === ")") {
        this.setState({
          disabled: false,
          disabled_counter: this.state.disabled_counter + 1,
        })
      }
      if (this.state.string.length === 1 && this.state.total === "") {
        this.setState({
          disabled: true,
          disabled_operators: true,
          disabled_minus: false,
          disabled_dot: false,
          dot_operator_check: false,
          disabled_counter: 0,
          disabled_percent: true,
          disabled_pi: false,
          disabled_trig: false,
          disabled_enter: true,
        })
      } else if (this.state.string.length === 1 && this.state.total != '') {
        console.log("it runs");
        this.setState({
          disabled: true,
          disabled_operators: false,
          disabled_minus: false,
          dot_operator_check: false,
          disabled_counter: 0,
          disabled_percent: true,
          disabled_pi: false,
          disabled_trig: false,
          disabled_enter: true,
        })
      }
      if (['+','*','÷','^'].includes(getLetter(this.state.string, -2))) {
        this.setState({
          disabled_operators: true,
          disabled_minus: false,
        })
      }
      if (getLetter(this.state.string, -1) === 'S' && getLetter(this.state.string, -2) === "N") {
        this.setState({
          string: this.state.string.slice(0, -3),
        })
        if (this.state.string.length === 3 && this.state.total === "") {
          this.setState({
            disabled: true,
            disabled_operators: true,
            disabled_minus: false,
            disabled_dot: false,
            dot_operator_check: false,
            disabled_counter: 0,
            disabled_percent: true,
            disabled_pi: false,
            disabled_trig: false,
            disabled_enter: true,
          })
        } else if (this.state.string.length === 3 && this.state.total != '') {
          this.setState({
            disabled: true,
            disabled_operators: false,
            disabled_minus: false,
            dot_operator_check: false,
            disabled_counter: 0,
            disabled_percent: true,
            disabled_pi: false,
            disabled_trig: false,
            disabled_enter: true,
          })
        } else if (['0','1','2','3','4','5','6','7','8','9'].includes(getLetter(this.state.string, -4))) {
            this.setState({
            disabled_operators: false,
            disabled_minus: false,
            disabled_percent: false,
            disabled_pi: false,
            disabled_trig: false,
            disabled_enter: false,
          })
        }
      } else if (getLetter(this.state.string, -1) === 'S' && getLetter(this.state.string, -2) === "O") {
        this.setState({
          string: this.state.string.slice(0, -3),
        })
        if (this.state.string.length === 3 && this.state.total === "") {
          this.setState({
            disabled: true,
            disabled_operators: true,
            disabled_minus: false,
            disabled_dot: false,
            dot_operator_check: false,
            disabled_counter: 0,
            disabled_percent: true,
            disabled_pi: false,
            disabled_trig: false,
            disabled_enter: true,
          })
        } else if (this.state.string.length === 3 && this.state.total != '') {
          this.setState({
            disabled: true,
            disabled_operators: false,
            disabled_minus: false,
            dot_operator_check: false,
            disabled_counter: 0,
            disabled_percent: true,
            disabled_pi: false,
            disabled_trig: false,
            disabled_enter: true,
          })
        } else if (['0','1','2','3','4','5','6','7','8','9'].includes(getLetter(this.state.string, -4))) {
            this.setState({
            disabled_operators: false,
            disabled_minus: false,
            disabled_percent: false,
            disabled_pi: false,
            disabled_trig: false,
            disabled_enter: false,
          })
        }
      } else if (getLetter(this.state.string, -1) === 'N' && getLetter(this.state.string, -2) === "I") {
        this.setState({
          string: this.state.string.slice(0, -3),
        })
        if (this.state.string.length === 3 && this.state.total === "") {
          this.setState({
            disabled: true,
            disabled_operators: true,
            disabled_minus: false,
            disabled_dot: false,
            dot_operator_check: false,
            disabled_counter: 0,
            disabled_percent: true,
            disabled_pi: false,
            disabled_trig: false,
            disabled_enter: true,
          })
        } else if (this.state.string.length === 3 && this.state.total != '') {
          this.setState({
            disabled: true,
            disabled_operators: false,
            disabled_minus: false,
            dot_operator_check: false,
            disabled_counter: 0,
            disabled_percent: true,
            disabled_pi: false,
            disabled_trig: false,
            disabled_enter: true,
          })
        } else if (['0','1','2','3','4','5','6','7','8','9'].includes(getLetter(this.state.string, -4))) {
            this.setState({
            disabled_operators: false,
            disabled_minus: false,
            disabled_percent: false,
            disabled_pi: false,
            disabled_trig: false,
            disabled_enter: false,
          })
        }
      } else if (getLetter(this.state.string, -1) === 'G' && getLetter(this.state.string, -2) === "O") {
        this.setState({
          string: this.state.string.slice(0, -3),
        })
        if (this.state.string.length === 3 && this.state.total === "") {
          this.setState({
            disabled: true,
            disabled_operators: true,
            disabled_minus: false,
            disabled_dot: false,
            dot_operator_check: false,
            disabled_counter: 0,
            disabled_percent: true,
            disabled_pi: false,
            disabled_trig: false,
            disabled_enter: true,
          })
        } else if (this.state.string.length === 3 && this.state.total != '') {
          this.setState({
            disabled: true,
            disabled_operators: false,
            disabled_minus: false,
            dot_operator_check: false,
            disabled_counter: 0,
            disabled_percent: true,
            disabled_pi: false,
            disabled_trig: false,
            disabled_enter: true,
          })
        } else if (['0','1','2','3','4','5','6','7','8','9'].includes(getLetter(this.state.string, -4))) {
            this.setState({
            disabled_operators: false,
            disabled_minus: false,
            disabled_percent: false,
            disabled_pi: false,
            disabled_trig: false,
            disabled_enter: false,
          })
        }
      } else if (getLetter(this.state.string, -1) === 'N' && getLetter(this.state.string, -2) === "A") {
        this.setState({
          string: this.state.string.slice(0, -3),
        })
        if (this.state.string.length === 3 && this.state.total === "") {
          this.setState({
            disabled: true,
            disabled_operators: true,
            disabled_minus: false,
            disabled_dot: false,
            dot_operator_check: false,
            disabled_counter: 0,
            disabled_percent: true,
            disabled_pi: false,
            disabled_trig: false,
            disabled_enter: true,
          })
        } else if (this.state.string.length === 3 && this.state.total != '') {
          this.setState({
            disabled: true,
            disabled_operators: false,
            disabled_minus: false,
            dot_operator_check: false,
            disabled_counter: 0,
            disabled_percent: true,
            disabled_pi: false,
            disabled_trig: false,
            disabled_enter: true,
          })
        } else if (['0','1','2','3','4','5','6','7','8','9'].includes(getLetter(this.state.string, -4))) {
            this.setState({
            disabled_operators: false,
            disabled_minus: false,
            disabled_percent: false,
            disabled_pi: false,
            disabled_trig: false,
            disabled_enter: false,
          })
        }
      }
      if (['0','1','2','3','4','5','6','7','8','9'].includes(getLetter(this.state.string, -2))) {
        this.setState({
          disabled_operators: false,
          disabled_minus: false,
        })
        if (getLetter(this.state.string, -1) === ".") {
          this.setState({
            disabled_dot: false,
            dot_operator_check: false,
          })
        } if (['+','*','÷','^','-'].includes(getLetter(this.state.string, -1)))  {
          if (findIfPreviousNumberIsADecimal(this.state.string)) {
            this.setState({
              disabled_dot: true,
            })
          }
          this.setState({
            disabled_operators: false,
          })
        }
      }
      if (getLetter(this.state.string, -1) === "+" || getLetter(this.state.string, -1) === "*" || getLetter(this.state.string, -1) === "÷") {
        this.setState({
          disabled_operators: false,
        })
      } else if (getLetter(this.state.string, -2) === "-") {
        this.setState({
          disabled_minus: true,
          disabled_operators: true,
        })
      } else if (getLetter(this.state.string, -1) === "-") {
        this.setState({
          disabled_minus: false,
        })
        if (['0','1','2','3','4','5','6','7','8','9'].includes(getLetter(this.state.string, -2))) {
          this.setState({
            disabled_operators: false,
          })
        }
      } else if (getLetter(this.state.string, -2) === ".") {
        this.setState({
          disabled_dot: true,
          dot_operator_check: true,
          disabled_operators: true,
          disabled_minus: true,
          disabled_percent: true,
        })
      }
      if (getLetter(this.state.string, -1) === ")") {
        if (this.state.disabled === true) {
          this.setState({
            disabled: false,
          })
        }
        this.setState({
          disabled_counter: this.state.disabled_counter + 1,
        })
      } else if (getLetter(this.state.string, -1) === "(") {
        this.setState({
          disabled_counter: (this.state.disabled_counter - 1),
          disabled_operators: true,
        })
      } else if (getLetter(this.state.string, -2)) {
        this.setState({
          disabled_operators: true,
        })
      } else if (this.state.disabled_counter === 1) {
        this.setState({
          disabled: true,
        })
      } else if (['+','-','÷'].includes((getLetter(this.state.string, -2)))) {
        this.setState({
          disabled_minus: false,
        })
      } else if (this.state.string.length === 1) {
        this.setState({
          disabled: true,
          disabled_operators: true,
          disabled_minus: false,
          disabled_dot: false,
          dot_operator_check: false,
        })
      } else if (getLetter(this.state.string, -1) === '.') {
        this.setState({
          disabled_dot: false,
        })
      }
      if (["÷","*","+","^"].includes(getLetter(this.state.string, -1))) {
        if (this.state.string.length > 1) {
          this.setState({
            disabled_operators: false,
            disabled_enter: false,
            disabled_minus: false,
          })
        }
      } else if (getLetter(this.state.string, -1) === "-") {
        if (["÷","*","+","^"].includes(getLetter(this.state.string, -2)) === false) {
          this.setState({
            disabled_operators: false,
            disabled_enter: false,
            disabled_minus: false,
          })
        } else {
          this.setState({
            disabled_minus: false,
          })
        }
      }
      if (['0','1','2','3','4','5','6','7','8','9'].includes(getLetter(this.state.string, -2))) {
        this.setState({
          disabled_enter: false,
          disabled_operators: false,
          disabled_minus: false,
          disabled_trig: false,
          disabled_pi: false,
        })
      } else if (getLetter(this.state.string, -2) === "(") {
        this.setState({
          disabled_enter: true,
        })
      }
      if (getLetter(this.state.string, -2) === ".") {
        this.setState({
          disabled_trig: true,
          disabled_enter: true,
          disabled_pi: true,
        })
      }
    }
  }
  programKeyboard(e) {
    const charactersToDisableOperatorKeys = ['+','^','-','÷','*'];
    const digits = ['0','1','2','3','4','5','6','7','8','9'];


    const input = document.querySelector('input');


    input.addEventListener('keydown', e => {
      keysPressed[e.key] = true;
    })

    console.log(keysPressed);

    input.addEventListener('keyup', e => {
      keysPressed = {};
    })


    if (e.key === "q") {
      this.setState({
        string: this.state.string + "√(",
        disabled: false,
        disabled_counter: this.state.disabled_counter + 1,
        disabled_operators: true,
        disabled_minus: false,
        disabled_dot: false,
        disabled_enter: true,
      })
    } else if (e.key === "7") {
      this.setState({
        string: this.state.string + e.key,
        disabled_operators: false,
        disabled_minus: false,
        disabled_percent: false,
        disabled_enter: false,
        disabled_trig: false,
        disabled_pi: false,
      })
      if (getLetter(this.state.string, -1) === "%" && findIfPreviousNumberIsADecimal(this.state.string) === false) {
        this.setState({
          disabled_dot: false,
        })
      }
    } else if (e.key === "8") {
      this.setState({
        string: this.state.string + e.key,
        disabled_operators: false,
        disabled_minus: false,
        disabled_percent: false,
        disabled_enter: false,
        disabled_trig: false,
        disabled_pi: false,
      })
      if (getLetter(this.state.string, -1) === "%" && findIfPreviousNumberIsADecimal(this.state.string) === false) {
        this.setState({
          disabled_dot: false,
        })
      }
    } else if (e.key === "9") {
      this.setState({
        string: this.state.string + e.key,
        disabled_operators: false,
        disabled_minus: false,
        disabled_percent: false,
        disabled_enter: false,
        disabled_trig: false,
        disabled_pi: false,
      })
      if (getLetter(this.state.string, -1) === "%" && findIfPreviousNumberIsADecimal(this.state.string) === false) {
        this.setState({
          disabled_dot: false,
        })
      }
    } else if (e.key === "/") {
      if (charactersToDisableOperatorKeys.includes(getLetter(this.state.string, -1)) === false && this.state.disabled_operators === false) {
        if (this.state.string === '' && this.state.total != '') {
          this.setState({
            string: "ANS" + "÷",
            disabled_operators: true,
            disabled_dot: false,
            disabled_percent: true,
            disabled_enter: true,
          })
        } else {
          if (this.state.string != '') {
            this.setState({
              string: this.state.string + "÷",
              disabled_operators: true,
              disabled_dot: false,
              disabled_percent: true,
              disabled_enter: true,
            })
          }
        }
      }
    } else if (e.key === "^") {
      if (charactersToDisableOperatorKeys.includes(getLetter(this.state.string, -1)) === false && this.state.disabled_operators === false) {
        if (this.state.string === '' && this.state.total != '') {
          this.setState({
            string: "ANS" + e.key,
            disabled_operators: true,
            disabled_dot: false,
            disabled_percent: true,
            disabled_enter: true,
          })
        } else {
          if (this.state.string != '') {
            this.setState({
              string: this.state.string + e.key,
              disabled_operators: true,
              disabled_dot: false,
              disabled_percent: true,
              disabled_enter: true,
            })
          }
        }
      }
    } else if (e.key === "p") {
      if (this.state.disabled_pi === false) {
        if (this.state.string === '' && this.state.total === '') {
          this.setState({
            string: "π",
            disabled_operators: false,
            disabled_minus: false,
            disabled_percent: true,
            disabled_dot: false,
            disabled_enter: false,
          })
        } else if (this.state.string != '') {
          this.setState({
            string: this.state.string + "π",
            disabled_operators: false,
            disabled_minus: false,
            disabled_percent: true,
            disabled_false: false,
            disabled_enter: false,
          })
        } else if (this.state.string === '' && this.state.total != '') {
          this.setState({
            string: "π",
            disabled_operators: false,
            disabled_minus: false,
            disabled_percent: true,
            disabled_dot: false,
            disabled_enter: false,
          })
        }
        if (getLetter(this.state.string, -1) === "%" && findIfPreviousNumberIsADecimal(this.state.string) === false) {
          this.setState({
            disabled_dot: false,
          })
        }
      }
    } else if (e.key === "(") {
      if (this.state.string === '' && this.state.total != '') {
        this.setState({
          string: e.key,
          disabled: false,
          disabled_counter: this.state.disabled_counter + 1,
          disabled_minus: false,
          disabled_dot: false,
          disabled_operators: true,
          disabled_percent: true,
          disabled_enter: true,
          disabled_pi: false,
        })
      } else {
        this.setState({
          string: this.state.string + e.key,
          disabled: false,
          disabled_counter: this.state.disabled_counter + 1,
          disabled_minus: false,
          disabled_dot: false,
          disabled_operators: true,
          disabled_percent: true,
          disabled_enter: true,
          disabled_pi: false,
        });
      }
    } else if (e.key === "4") {
      this.setState({
        string: this.state.string + e.key,
        disabled_operators: false,
        disabled_minus: false,
        disabled_percent: false,
        disabled_enter: false,
        disabled_trig: false,
        disabled_pi: false,
      })
      if (getLetter(this.state.string, -1) === "%" && findIfPreviousNumberIsADecimal(this.state.string) === false) {
        this.setState({
          disabled_dot: false,
        })
      }
    } else if (e.key === "5") {
      this.setState({
        string: this.state.string + e.key,
        disabled_operators: false,
        disabled_minus: false,
        disabled_percent: false,
        disabled_enter: false,
        disabled_trig: false,
        disabled_pi: false,
      })
      if (getLetter(this.state.string, -1) === "%" && findIfPreviousNumberIsADecimal(this.state.string) === false) {
        this.setState({
          disabled_dot: false,
        })
      }
    } else if (e.key === "6") {
      this.setState({
        string: this.state.string + e.key,
        disabled_operators: false,
        disabled_minus: false,
        disabled_percent: false,
        disabled_enter: false,
        disabled_trig: false,
        disabled_pi: false,
      })
      if (getLetter(this.state.string, -1) === "%" && findIfPreviousNumberIsADecimal(this.state.string) === false) {
        this.setState({
          disabled_dot: false,
        })
      }
    } else if (e.key === "*") {
      if (charactersToDisableOperatorKeys.includes(getLetter(this.state.string, -1)) === false && this.state.disabled_operators === false) {
        if (this.state.string === '' && this.state.total != '') {
          this.setState({
            string: "ANS" + e.key,
            disabled_operators: true,
            dot_operator_check: false,
            disabled_dot: false,
            disabled_percent: true,
            disabled_enter: true,
            disabled_pi: false,
          })
        } else {
          if (this.state.string != '') {
            this.setState({
              string: this.state.string + e.key,
              disabled_operators: true,
              dot_operator_check: false,
              disabled_dot: false,
              disabled_percent: true,
              disabled_enter: true,
              disabled_pi: false,
            })
          }
        }
      }
    } else if (e.key === "l") {
      if (this.state.disabled_trig === false) {
        this.setState({
          string: this.state.string + "LOG(",
          disabled: false,
          disabled_counter: this.state.disabled_counter + 1,
          disabled_minus: true,
          disabled_operators: true,
          disabled_enter: true,
          disabled_pi: false,
        })
      }
    } else if (e.key === "s") {
      if (this.state.disabled_trig === false) {
        this.setState({
          string: this.state.string + "SIN(",
          disabled: false,
          disabled_counter: this.state.disabled_counter + 1,
          disabled_operators: true,
          disabled_enter: true,
          disabled_pi: false,
        })
      }
    } else if (e.key === ")") {
      if (this.state.disabled_counter >= 1) {
        if (count(this.state.string, '(') >= 1) {
          this.setState({
            string: this.state.string + e.key,
            disabled_counter: this.state.disabled_counter - 1,
          })
          if (this.state.disabled_counter === 1) {
            this.setState({
              disabled: true,
            })
          }
        }
      }
    } else if (e.key === "1") {
      this.setState({
        string: this.state.string + e.key,
        disabled_operators: false,
        disabled_minus: false,
        disabled_percent: false,
        disabled_enter: false,
        disabled_trig: false,
        disabled_pi: false,
      })
      if (getLetter(this.state.string, -1) === "%" && findIfPreviousNumberIsADecimal(this.state.string) === false) {
        this.setState({
          disabled_dot: false,
        })
      }
    } else if (e.key === "2") {
      this.setState({
        string: this.state.string + e.key,
        disabled_operators: false,
        disabled_minus: false,
        disabled_percent: false,
        disabled_enter: false,
        disabled_trig: false,
        disabled_pi: false,
      })
      if (getLetter(this.state.string, -1) === "%" && findIfPreviousNumberIsADecimal(this.state.string) === false) {
        this.setState({
          disabled_dot: false,
        })
      }
    } else if (e.key === "3") {
      this.setState({
        string: this.state.string + e.key,
        disabled_operators: false,
        disabled_minus: false,
        disabled_percent: false,
        disabled_enter: false,
        disabled_trig: false,
        disabled_pi: false,
      })
      if (getLetter(this.state.string, -1) === "%" && findIfPreviousNumberIsADecimal(this.state.string) === false) {
        this.setState({
          disabled_dot: false,
        })
      }
    } else if (e.key === "-") {
      if (getLetter(this.state.string,-1) != "-" && this.state.disabled_minus === false)
        if (this.state.string === '' && this.state.total != '') {
          this.setState({
            string: "ANS" + e.key,
            disabled_minus: true,
            disabled_operators: true,
            disabled_dot: false,
            disabled_percent: false,
            disabled_enter: true,
            disabled_pi: false,
          })
        } else {
          this.setState({
            string: this.state.string + e.key,
            disabled_minus: true,
            disabled_operators: true,
            disabled_dot: false,
            disabled_percent: false,
            disabled_enter: true,
            disabled_pi: false,
          })
        }
    } else if (e.key === "%") {
      if (this.state.disabled_percent === false) {
        if (this.state.string === '' && this.state.total != '') {
          this.setState({
            string: "ANS" + e.key,
            disabled_minus: true,
            disabled_operators: true,
            disabled_dot: false,
            disabled_enter: false,
            disabled_pi: false,
          })
        } else if (this.state.string != '') {
          this.setState({
            string: this.state.string + e.key,
            disabled_minus: true,
            disabled_operators: true,
            disabled_dot: false,
            disabled_enter: false,
            disabled_pi: false,
          })
        }
        if (getLetter(this.state.string, -1) === "%" && findIfPreviousNumberIsADecimal(this.state.string) === false) {
          this.setState({
            disabled_dot: false,
          })
        }
      }
    } else if (e.key === "c" && Object.keys(keysPressed).length <= 1) {
      if (this.state.disabled_trig === false) {
        this.setState({
          string: this.state.string + "COS(",
          disabled: false,
          disabled_counter: this.state.disabled_counter + 1,
          disabled_operators: true,
          disabled_enter: true,
          disabled_pi: false,
        })
      }
    } else if (e.key === "C" && Object.keys(keysPressed).length <= 2) {
      if (this.state.total === '') {
        this.setState({
          string: '',
          disabled_minus: false,
          disabled_operator: true,
          disabled_dot: false,
          disabled: true,
          disabled_counter: 0,
          disabled_percent: true,
          disabled_enter: true,
          disabled_trig: false,
        })
      } else {
        this.setState({
          string: '',
          disabled_minus: false,
          disabled_operator: false,
          disabled_dot: false,
          disabled: true,
          disabled_counter: 0,
          disabled_percent: true,
          disabled_trig: false,
        })
      }
    } else if (e.key === "T") {
      if (this.state.string === "") {
        this.setState({
          disabled: true,
          disabled_operators: true,
          disabled_minus: false,
          disabled_dot: false,
          dot_operator_check: false,
          disabled_counter: 0,
          disabled_percent: true,
          disabled_trig: false,
        })
      }
      this.setState({
        total: '',
      })
    } else if (e.key === "t") {
      if (this.state.disabled_trig === false) {
        this.setState({
          string: this.state.string + "TAN(",
          disabled: false,
          disabled_counter: this.state.disabled_counter + 1,
          disabled_operators: true,
          disabled_enter: true,
        })
      }
    } else if (e.key === "0") {
      this.setState({
        string: this.state.string + e.key,
        disabled_operators: false,
        disabled_minus: false,
        disabled_percent: false,
        disabled_enter: false,
        disabled_trig: false,
        disabled_pi: false,
      })
      if (getLetter(this.state.string, -1) === "%" && findIfPreviousNumberIsADecimal(this.state.string) === false) {
        this.setState({
          disabled_dot: false,
        })
      }
    } else if (e.key === ".") {
      if (getLetter(this.state.string, -1) != ".") {
        if (this.state.disabled_dot === false) {
          this.setState({
              string: this.state.string + e.key,
              disabled_dot: true,
              disabled_operators: true,
              disabled_minus: true,
              disabled_percent: true,
              disabled_pi: true,
              disabled_enter: true,
              disabled_trig: true,
          })
        }
      }
    } else if (e.key === "Enter") {
      if (this.state.disabled_enter === false) {
        if (calculate(this.state.string, this.state.total) === '') {
          this.setState({
            disabled: true,
            disabled_operators: false,
            disabled_dot: false,
            disabled_minus: false,
            disabled_counter: 0,
            disabled_percent: true,
            disabled_enter: true,
            disabled_trig: false,
          })
        } else {
          this.setState({
            total: calculate(this.state.string, this.state.total),
            disabled: true,
            disabled_operators: false,
            disabled_dot: false,
            disabled_minus: false,
            disabled_counter: 0,
            disabled_percent: false,
            disabled_enter: true,
            disabled_trig: false,
          })
        }
        this.setState({
          string: '',
        })
      }
    } else if (e.key === "+") {
      if (this.state.disabled_operators === false) {
        if (charactersToDisableOperatorKeys.includes(getLetter(this.state.string, -1)) === false) {
          if (this.state.string === '' && this.state.total != '') {
            this.setState({
              string: "ANS" + e.key,
              disabled_operators: true,
              disabled_dot: true,
              disabled_percent: true,
              disabled_enter: true,
              disabled_pi: false,
            })
          } else {
            if (this.state.string != '') {
              this.setState({
                string: this.state.string + e.key,
                disabled_operators: true,
                disabled_dot: false,
                disabled_percent: true,
                disabled_enter: true,
                disabled_pi: false,
              })
            }
          }
        }
      }
    } else if (e.key === 'C') {
      if (this.state.string === '') {
        this.setState({
          disabled_operators: true,
          disabled_minus: false,
          disabled_dot: false,
          disabled_exponent: true,
          dot_operator_check: false,
          disabled_percent: true,
          disabled_enter: true,
          disabled_trig: false,
          disabled_pi: true,
        })
      }
      this.setState({
        total: '',
      })
    } else if (e.key === "a" && Object.keys(keysPressed).length <= 1) {
      if (this.state.total != '') {
        this.setState({
          string: this.state.string + "ANS",
          disabled_operators: false,
          disabled_dot: true,
          disabled_minus: false,
          disabled_percent: false,
          disabled_pi: false,
          disabled_enter: false,
        })
      }
    } else if (e.key === "Backspace") {
      this.setState({
        string: this.state.string.slice(0, -1),
      })
      if (getLetter(this.state.string, -1) === ")") {
        this.setState({
          disabled: false,
          disabled_counter: this.state.disabled_counter + 1,
        })
      }
      if (this.state.string.length === 1 && this.state.total === "") {
        this.setState({
          disabled: true,
          disabled_operators: true,
          disabled_minus: false,
          disabled_dot: false,
          dot_operator_check: false,
          disabled_counter: 0,
          disabled_percent: true,
          disabled_pi: false,
          disabled_trig: false,
          disabled_enter: true,
        })
      } else if (this.state.string.length === 1 && this.state.total != '') {
        console.log("it runs");
        this.setState({
          disabled: true,
          disabled_operators: false,
          disabled_minus: false,
          dot_operator_check: false,
          disabled_counter: 0,
          disabled_percent: true,
          disabled_pi: false,
          disabled_trig: false,
          disabled_enter: true,
        })
      }
      if (['+','*','÷','^'].includes(getLetter(this.state.string, -2))) {
        this.setState({
          disabled_operators: true,
          disabled_minus: false,
        })
      }
      if (getLetter(this.state.string, -1) === 'G' && getLetter(this.state.string, -2) === "O") {
        console.log(this.state.string);
        if (['0','1','2','3','4','5','6','7','8','9'].includes(getLetter(this.state.string, -4))) {
          console.log("This triggereddd");
          console.log(this.state.disabled_operators);
          this.setState({
            disabled_operators: false,
            string: this.state.string.slice(0, -3),
          })
          console.log(this.state.disabled_operators);
        }
        if (this.state.string.length === 3 && this.state.total === "") {
          this.setState({
            string: this.state.string.slice(0, -3),
            disabled: true,
            disabled_operators: true,
            disabled_minus: false,
            disabled_dot: false,
            dot_operator_check: false,
            disabled_counter: 0,
            disabled_percent: true,
            disabled_pi: false,
            disabled_trig: false,
            disabled_enter: true,
          })
        } else if (this.state.string.length === 3 && this.state.total != '') {
          this.setState({
            string: this.state.string.slice(0, -3),
            disabled: true,
            disabled_operators: false,
            disabled_minus: false,
            dot_operator_check: false,
            disabled_counter: 0,
            disabled_percent: true,
            disabled_pi: false,
            disabled_trig: false,
            disabled_enter: true,
          })
        }
      } else if (getLetter(this.state.string, -1) === 'N' && getLetter(this.state.string, -2) === "I") {
        this.setState({
          string: this.state.string.slice(0, -3),
        })
        if (this.state.string.length === 3 && this.state.total === "") {
          this.setState({
            disabled: true,
            disabled_operators: true,
            disabled_minus: false,
            disabled_dot: false,
            dot_operator_check: false,
            disabled_counter: 0,
            disabled_percent: true,
            disabled_pi: false,
            disabled_trig: false,
            disabled_enter: true,
          })
        } else if (this.state.string.length === 3 && this.state.total != '') {
          this.setState({
            disabled: true,
            disabled_operators: false,
            disabled_minus: false,
            dot_operator_check: false,
            disabled_counter: 0,
            disabled_percent: true,
            disabled_pi: false,
            disabled_trig: false,
            disabled_enter: true,
          })
        }
        if (['0','1','2','3','4','5','6','7','8','9'].includes(getLetter(this.state.string, -4))) {
            this.setState({
            disabled_operators: false,
            disabled_minus: false,
            disabled_percent: false,
            disabled_pi: false,
            disabled_trig: false,
            disabled_enter: false,
          })
        }
      } else if (getLetter(this.state.string, -1) === 'S' && getLetter(this.state.string, -2) === "O") {
        this.setState({
          string: this.state.string.slice(0, -3),
        })
        if (this.state.string.length === 3 && this.state.total === "") {
          this.setState({
            disabled: true,
            disabled_operators: true,
            disabled_minus: false,
            disabled_dot: false,
            dot_operator_check: false,
            disabled_counter: 0,
            disabled_percent: true,
            disabled_pi: false,
            disabled_trig: false,
            disabled_enter: true,
          })
        } else if (this.state.string.length === 3 && this.state.total != '') {
          this.setState({
            disabled: true,
            disabled_operators: false,
            disabled_minus: false,
            dot_operator_check: false,
            disabled_counter: 0,
            disabled_percent: true,
            disabled_pi: false,
            disabled_trig: false,
            disabled_enter: true,
          })
        }
        if (['0','1','2','3','4','5','6','7','8','9'].includes(getLetter(this.state.string, -4))) {
            this.setState({
            disabled_operators: false,
            disabled_minus: false,
            disabled_percent: false,
            disabled_pi: false,
            disabled_trig: false,
            disabled_enter: false,
          })
        }
      } else if (getLetter(this.state.string, -1) === 'N' && getLetter(this.state.string, -2) === "A") {
        this.setState({
          string: this.state.string.slice(0, -3),
        })
        if (this.state.string.length === 3 && this.state.total === "") {
          this.setState({
            disabled: true,
            disabled_operators: true,
            disabled_minus: false,
            disabled_dot: false,
            dot_operator_check: false,
            disabled_counter: 0,
            disabled_percent: true,
            disabled_pi: false,
            disabled_trig: false,
            disabled_enter: true,
          })
        } else if (this.state.string.length === 3 && this.state.total != '') {
          this.setState({
            disabled: true,
            disabled_operators: false,
            disabled_minus: false,
            dot_operator_check: false,
            disabled_counter: 0,
            disabled_percent: true,
            disabled_pi: false,
            disabled_trig: false,
            disabled_enter: true,
          })
        }
        if (['0','1','2','3','4','5','6','7','8','9'].includes(getLetter(this.state.string, -4))) {
            this.setState({
            disabled_operators: false,
            disabled_minus: false,
            disabled_percent: false,
            disabled_pi: false,
            disabled_trig: false,
            disabled_enter: false,
          })
        }
      } else if (getLetter(this.state.string, -1) === 'N' && getLetter(this.state.string, -2) === "A") {
        this.setState({
          string: this.state.string.slice(0, -3),
        })
        if (this.state.string.length === 3 && this.state.total === "") {
          this.setState({
            disabled: true,
            disabled_operators: true,
            disabled_minus: false,
            disabled_dot: false,
            dot_operator_check: false,
            disabled_counter: 0,
            disabled_percent: true,
            disabled_pi: false,
            disabled_trig: false,
            disabled_enter: true,
          })
        } else if (this.state.string.length === 3 && this.state.total != '') {
          this.setState({
            disabled: true,
            disabled_operators: false,
            disabled_minus: false,
            dot_operator_check: false,
            disabled_counter: 0,
            disabled_percent: true,
            disabled_pi: false,
            disabled_trig: false,
            disabled_enter: true,
          })
        }
        if (['0','1','2','3','4','5','6','7','8','9'].includes(getLetter(this.state.string, -4))) {
            this.setState({
            disabled_operators: false,
            disabled_minus: false,
            disabled_percent: false,
            disabled_pi: false,
            disabled_trig: false,
            disabled_enter: false,
          })
        }
      }
      if (['0','1','2','3','4','5','6','7','8','9'].includes(getLetter(this.state.string, -2))) {
        this.setState({
          disabled_operators: false,
          disabled_minus: false,
        })
        if (getLetter(this.state.string, -1) === ".") {
          this.setState({
            disabled_dot: false,
            dot_operator_check: false,
          })
        } if (['+','*','÷','^','-'].includes(getLetter(this.state.string, -1)))  {
          if (findIfPreviousNumberIsADecimal(this.state.string)) {
            this.setState({
              disabled_dot: true,
            })
          }
          this.setState({
            disabled_operators: false,
          })
        }
      }
      if (getLetter(this.state.string, -1) === "+" || getLetter(this.state.string, -1) === "*" || getLetter(this.state.string, -1) === "÷") {
        this.setState({
          disabled_operators: false,
        })
      } else if (getLetter(this.state.string, -2) === "-") {
        this.setState({
          disabled_minus: true,
          disabled_operators: true,
        })
      } else if (getLetter(this.state.string, -1) === "-") {
        this.setState({
          disabled_minus: false,
        })
        if (['0','1','2','3','4','5','6','7','8','9'].includes(getLetter(this.state.string, -2))) {
          this.setState({
            disabled_operators: false,
          })
        }
      } else if (getLetter(this.state.string, -2) === ".") {
        this.setState({
          disabled_dot: true,
          dot_operator_check: true,
          disabled_operators: true,
          disabled_minus: true,
          disabled_percent: true,
        })
      }
      if (getLetter(this.state.string, -1) === ")") {
        if (this.state.disabled === true) {
          this.setState({
            disabled: false,
          })
        }
        this.setState({
          disabled_counter: this.state.disabled_counter + 1,
        })
      } else if (getLetter(this.state.string, -1) === "(") {
        this.setState({
          disabled_counter: (this.state.disabled_counter - 1),
          disabled_operators: true,
        })
      } else if (getLetter(this.state.string, -2)) {
        this.setState({
          disabled_operators: true,
        })
      } else if (this.state.disabled_counter === 1) {
        this.setState({
          disabled: true,
        })
      } else if (['+','-','÷'].includes((getLetter(this.state.string, -2)))) {
        this.setState({
          disabled_minus: false,
        })
      } else if (this.state.string.length === 1) {
        this.setState({
          disabled: true,
          disabled_operators: true,
          disabled_minus: false,
          disabled_dot: false,
          dot_operator_check: false,
        })
      } else if (getLetter(this.state.string, -1) === '.') {
        this.setState({
          disabled_dot: false,
        })
      }
      if (["÷","*","+","^"].includes(getLetter(this.state.string, -1))) {
        if (this.state.string.length > 1) {
          this.setState({
            disabled_operators: false,
            disabled_enter: false,
            disabled_minus: false,
          })
        }
      } else if (getLetter(this.state.string, -1) === "-") {
        if (["÷","*","+","^"].includes(getLetter(this.state.string, -2)) === false) {
          this.setState({
            disabled_operators: false,
            disabled_enter: false,
            disabled_minus: false,
          })
        } else {
          this.setState({
            disabled_minus: false,
          })
        }
      }
      if (['0','1','2','3','4','5','6','7','8','9'].includes(getLetter(this.state.string, -2))) {
        this.setState({
          disabled_enter: false,
          disabled_operators: false,
          disabled_minus: false,
          disabled_trig: false,
          disabled_pi: false,
        })
      } else if (getLetter(this.state.string, -2) === "(") {
        this.setState({
          disabled_enter: true,
        })
      }
      if (getLetter(this.state.string, -2) === ".") {
        this.setState({
          disabled_trig: true,
          disabled_enter: true,
          disabled_pi: true,
        })
      }
    }
  }

  render() {
    return (
      <div id="calculator">
      <form>
        <table id="table" align="center">
          <tr>
            <td colSpan="7"><h1 id="table_title">Calculator</h1></td>
          </tr>
          <tr>
            <td colSpan="7"><input id="number_box" type="text" placeholder="shift + c to clear" value={this.state.string} onClick={this.handleClick} onKeyDown={this.programKeyboard} /></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td><input className="buttons" name="√" type="button" value="√" onClick={this.handleClick} /></td>
            <td><input className="buttons" type="button" value="7" onClick={this.handleClick} /></td>
            <td><input className="buttons" type="button" value="8" onClick={this.handleClick} /></td>
            <td><input className="buttons" type="button" value="9" onClick={this.handleClick} /></td>
            <td><input className="buttons" type="button" value="÷" onClick={this.handleClick} disabled={this.state.disabled_operators} /></td>
            <td><input className="buttons" type="button" value="^" onClick={this.handleClick} disabled={this.state.disabled_operators} /></td>
            <td><input className="buttons" type="button" value="π" onClick={this.handleClick} disabled={this.state.disabled_pi} /></td>
          </tr>
          <tr>
            <td><input className="buttons" type="button" value="(" onClick={this.handleClick} /></td>
            <td><input className="buttons" type="button" value="4" onClick={this.handleClick} /></td>
            <td><input className="buttons" type="button" value="5" onClick={this.handleClick} /></td>
            <td><input className="buttons" type="button" value="6" onClick={this.handleClick} /></td>
            <td><input className="buttons" type="button" value="x" onClick={this.handleClick} disabled={this.state.disabled_operators} /></td>
            <td><input className="buttons" type="button" value="LOG" onClick={this.handleClick} disabled={this.state.disabled_trig} /></td>
            <td><input className="buttons" type="button" value="SIN" onClick={this.handleClick} disabled={this.state.disabled_trig}  /></td>
          </tr>
          <tr>
            <td><input className="buttons" type="button" value=")" onClick={this.handleClick} disabled={this.state.disabled} /></td>
            <td><input className="buttons" type="button" value="1" onClick={this.handleClick} /></td>
            <td><input className="buttons" type="button" value="2" onClick={this.handleClick} /></td>
            <td><input className="buttons" type="button" value="3" onClick={this.handleClick} /></td>
            <td><input className="buttons" type="button" value="-" onClick={this.handleClick} disabled={this.state.disabled_minus} /></td>
            <td><input className="buttons" type="button" value="%" onClick={this.handleClick} disabled={this.state.disabled_percent} /></td>
            <td><input className="buttons" type="button" value="COS" onClick={this.handleClick} disabled={this.state.disabled_trig} /></td>
          </tr>
          <tr>
            <td><input className="buttons" type="button" value="AC" onClick={this.handleClick} /></td>
            <td><input className="buttons" type="button" value="0" onClick={this.handleClick} /></td>
            <td><input className="buttons" type="button" value="." onClick={this.handleClick} disabled={this.state.disabled_dot} /></td>
            <td><input className="buttons" type="button" value="=" onClick={this.handleClick} disabled={this.state.disabled_enter} /></td>
            <td><input className="buttons" type="button" value="+" onClick={this.handleClick} disabled={this.state.disabled_operators} /></td>
            <td><input className="clearTotal" type="button" value="clear total" onClick={this.handleClick} /></td>
            <td><input className="buttons" type="button" value="TAN" onClick={this.handleClick} disabled={this.state.disabled_trig} /></td>
          </tr>
          <tr>
            <td><input className="buttons" type="button" value="ANS" onClick={this.handleClick} /></td>
            <td><input className="buttons" type="button" value="del" onClick={this.handleClick} /></td>
            <td colSpan="5"><input id="answer_box" type="text" placeholder="shift + t to clear/ a to use ANS" value={this.state.total} /></td>
          </tr>
        </table>
      </form>
    </div>
    )
  }
}

ReactDOM.render(<Calculator />, document.getElementById('root'));

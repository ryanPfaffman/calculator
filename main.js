import React from 'react';
import ReactDOM from 'react-dom';
import TextField from '@material-ui/core/TextField';
import "./styles.css";

//generic functions
const count = (string, target) => {
  let count = 0;
  for (let x in string) {
    if (string[x] === target) {
      count = count + 1;
    }
  } return count
}

const getLetter = (string, index) => {
  let reverseIndex = 0;
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
        count = count + 1;
      }
    }
  } if (count > 0) {
    return true;
  } else {
    return false;
  }
}

const replaceAll = (string, target) => {
  let tempL = [];
  let returnS = '';
  tempL = string.split(target);
  returnS = tempL.join('');

  return returnS;
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
      tempS = tempS + string[x];
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
      count = count + 1;
    }
  } return count
}

console.log(findNumberInString('(('))
/*
const toBinaryNumber = (string) => {
  let stringToNum = 0;

  if (string.includes('.')) {
    stringToNum = parseFloat(string);
  } else {
    stringToNum = parseInt(string);
  }

  let binaryString = stringToNum.toString(2);
  return parseInt(binaryString);
}

console.log(toBinaryNumber('130.56'));
const binaryToNumber = (string) => {
  //not yet
}
*/

//functions for program
const addParentheses = (string) => {
  let countInner = count(string, "(");
  let countOuter = count(string, ")");

  while (countInner != countOuter) {
    string = string + ")";
    countOuter = countOuter + 1;
  } return string;
}

const fixString = (string) => {
  let countInner = count(string, "(");
  let countOuter = count(string, ")");

  const operators = ['+','-','*','÷','^'];

  if (countInner === 0) {
    string = replaceAll(string, ')');
    return string
  } else {
    if (countInner != countOuter) {
      if (countInner > countOuter) {
        string = string + ")";
        string = fixString(string);
      } else {
        string = string.replace(')','');
        string = fixString(string);
      }
    }
    console.log("fix string after\n" + string);
      return string;
  }
}

console.log(fixString("(1+3+4))"))

const checkForParenthesesMultiplication = (string) => {
  const digits = ['0','1','2','3','4','5','6','7','8','9'];

  let listToCheck = string.split('');

  console.log(listToCheck);

  for (let x in listToCheck) {
    if ((digits.includes(listToCheck[x]) && listToCheck[parseInt(x) + 1] === "(") || (digits.includes(listToCheck[x]) && listToCheck[parseInt(x) + 1] === "√") || (listToCheck[x] === ")" && listToCheck[parseInt(x) + 1] === "√")) {
      listToCheck.splice(x, 1, listToCheck[x] + '*');
    } else if (listToCheck[x] === ')' && listToCheck[parseInt(x) + 1] === "(") {
      listToCheck.splice(x, 1, listToCheck[x] + '*');
    }
    console.log('listToCheck\n' + listToCheck);
  } return listToCheck.join('');
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
        tempS = tempS + string[x];
      }
    } if (tempS != '') {
      tempL.push(tempS);
    }

    for (let x in tempL) {
      if (tempL[x] === '-' && (operators.includes(tempL[parseInt(x) - 1]) || parseInt(x) === 0 || tempL[parseInt(x) - 1] === '(')) {
        tempL.splice(x, 1, "[" + tempL[x] + tempL[parseInt(x) + 1] + "]");
        tempL.splice(parseInt(x) + 1, 1);
      }
    }
  } else {
    for (let x in string) {
      if (string[x] === '+') {
        tempL.push(tempS);
        tempS = '';
        tempL.push(string[x]);
      } else if (string[x] === '-') {
        tempL.push(tempS);
        tempS = '';
        tempL.push(string[x]);
      } else {
        tempS = tempS + string[x];
      }
    } if (tempS != '') {
      tempL.push(tempS);
    }
  } return tempL.join('');
}

const calculateExponents = (list) => {
  let tempTotal = 0;
  const operators = ['*','÷'];

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
      tempS2 = tempS2 + tempS[x]
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
      tempS2 = tempS2 + tempS[x];
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
        tempS = tempS + string[x];
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
        tempS = tempS + string[x];
      }
    } if (tempS != '') {
      tempL.push(tempS);
    }

  console.log("before removeNegativeHolders\n" + tempL);

  tempL = removeNegativeHolders(tempL);

  console.log('after removeNegativeHolders\n' + tempL);

  let count = 0;
  const negativesRemovedString = tempL.join('');
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
            total = total + divAndMulti(tempL[parseInt(x) + 1]);
          } else {
            total = total + parseFloat(tempL[parseInt(x) + 1]);
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
            total = total - divAndMulti(tempL[parseInt(x) + 1]);
          } else {
            total = total - parseFloat(tempL[parseInt(x) + 1]);
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
    if (total === 0) {
      total = divAndMulti(negativesRemovedString);
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

  let checkForExtraParentheses = list.join('');

  let countInner = count(checkForExtraParentheses,'(');
  let countOuter = count(checkForExtraParentheses,')');

  if (countInner != countOuter) {
    console.log('checkForExtraParentheses triggered\n' + checkForExtraParentheses);
    checkForExtraParentheses = fixString(checkForExtraParentheses)
    list = buildListToSendToGoodbyeParentheses(checkForExtraParentheses);
  }

  console.log('goodbyeParentheses list\n' + list);

  for (let x in list) {
    if (list[x].includes('(')) {
      if (list[x].includes(')')) {
        list[x] = removeNegativeHolders([list[x]]).join('')
        list[x] = replaceAll(list[x], '(');
        list[x] = replaceAll(list[x], ')');
        if (getLetter(list[x], 0) === '√') {
          list[x] = replaceAll(list[x], '√');
          list[x] = calculateOutside(list[x]);
          list[x] = sqrt(list[x]);
        } else {
          list[x] = calculateOutside(list[x]);
        }
        console.log('goodbyeParentheses\n' + list[x]);
        if (list.join('').includes('√')) {
          if (list[parseInt(x) - 1] === "√" || list[parseInt(x) - 1] === "(√" || list[parseInt(x) - 1].includes("√")) {
            if (list[parseInt(x) - 1].includes("√") && list[parseInt(x) - 1] != "√" && list[parseInt(x) - 1] != "(√") {
              list[x] = calculateOutside(list[x])
              list[x] = sqrt(list[x]);
              list[parseInt(x) - 1] = replaceAll(list[parseInt(x) - 1], "√");
            } else {
              console.log('here\n' + list[x]);
              list[x] = sqrt(list[x])
              if (list[parseInt(x) - 1] === "(√") {
                list[parseInt(x) - 1] = replaceAll(list[parseInt(x) - 1],'√');
              } else {
                list.splice(parseInt(x) - 1, 1);
              }
            }
          }
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
    } else {
      tempS = tempS + string[x];
    }
  } if (tempS != '') {
    tempL.push(tempS);
  }
  return tempL;
}

const divAndMulti = (string) => {
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
      tempS = tempS + string[x];
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
        total = tempL[parseInt(x) - 1] / tempL[parseInt(x) + 1];
      } else if (tempL[x] === '*') {
        total = tempL[parseInt(x) - 1] * tempL[parseInt(x) + 1];
      }
    } else {
      if (tempL[x] === '÷' ) {
        total = total / tempL[parseInt(x) + 1];
      } else if (tempL[x] === '*') {
        total = total * tempL[parseInt(x) + 1];
      }
    }
  } return total
}

//MAIN FUNCTION
const calculate = (string) => {
  let total = 0;
  let tempL = [];

  if (string.includes('(')) {
    string = addParentheses(string);
    string = checkForParenthesesMultiplication(string);
  }

  console.log('sent to buildStringForCalculation\n' + string);
  string = buildStringForCalculation(string);
  console.log('sent to buildListToSendToGoodbyeParentheses\n' + string);
  tempL = buildListToSendToGoodbyeParentheses(string);
  console.log('sent to goodbyeParentheses\n' + tempL);
  string = goodbyeParentheses(tempL);
  console.log('sent to calculateOutside\n' + string);
  total = calculateOutside(string);

  if (isNaN(total) || total == 'Infinity') {
    alert("Invalid Entry");
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
    }; this.handleClick = this.handleClick.bind(this);
    this.programKeyboard = this.programKeyboard.bind(this);
  } handleClick(e) {
    if (e.target.value === "√") {
      this.setState({
        string: (this.state.string + e.target.value + "("),
        disabled: false,
        disabled_counter: (this.state.disabled_counter + 1),
        disabled_operators: false,
        disabled_minus: false,
        disabled_dot: false,
      })
    } else if (e.target.value === "7") {
      this.setState({
        string: (this.state.string + e.target.value),
        disabled_operators: false,
        disabled_minus: false,
      })
    } else if (e.target.value === "8") {
      this.setState({
        string: (this.state.string + e.target.value),
        disabled_operators: false,
        disabled_minus: false,
      })
    } else if (e.target.value === "9") {
      this.setState({
        string: (this.state.string + e.target.value),
        disabled_operators: false,
        disabled_minus: false,
      })
    } else if (e.target.value === "÷") {
      if (this.state.string === '' && this.state.total != '') {
        this.setState({
          string: (this.state.total + e.target.value),
          disabled_operators: true,
          disabled_dot: false,
        })
      } else {
        this.setState({
          string: (this.state.string + e.target.value),
          disabled_operators: true,
          disabled_dot: false,
        })
      }
    } else if (e.target.value === "^") {
      if (this.state.string === '') {
        this.setState({
          string: this.state.total + e.target.value,
          disabled_operators: true,
          disabled_minus: false,
          disabled_dot: false,
        })
      } else {
      this.setState({
        string: this.state.string + e.target.value,
        disabled_operators: true,
        disabled_minus: false,
        disabled_dot: false,
      })
      }
    } else if (e.target.value === "(") {
      if (this.state.string === '' && this.state.total != '') {
        this.setState({
          string: this.state.total + e.target.value,
          disabled: false,
          disabled_counter: (this.state.disabled_counter + 1),
          disabled_minus: false,
          disabled_dot: false,
        })
      } else {
        this.setState({
          string: (this.state.string + e.target.value),
          disabled: false,
          disabled_counter: (this.state.disabled_counter + 1),
          disabled_minus: false,
          disabled_dot: false,
        });
      }
    } else if (e.target.value === "4") {
      this.setState({
        string: (this.state.string + e.target.value),
        disabled_operators: false,
        disabled_minus: false,
      })
    } else if (e.target.value === "5") {
      this.setState({
        string: (this.state.string + e.target.value),
        disabled_operators: false,
        disabled_minus: false,
      })
    } else if (e.target.value === "6") {
      this.setState({
        string: (this.state.string + e.target.value),
        disabled_operators: false,
        disabled_minus: false,
      })
    } else if (e.target.value === "x") {
      if (this.state.string === '' && this.state.total != '') {
        this.setState({
          string: (this.state.total + '*'),
          disabled_operators: true,
          disabled_minus: false,
          disabled_dot: false,
        })
      } else {
        this.setState({
          string: (this.state.string + '*'),
          disabled_operators: true,
          disabled_minus: false,
          disabled_dot: false,
        })
      }
    } else if (e.target.value === ")") {
      this.setState({
        string: (this.state.string + e.target.value),
        disabled_counter: (this.state.disabled_counter - 1),
      })
      if (this.state.disabled_counter === 1) {
        this.setState({
          disabled: true,
        })
      }
    } else if (e.target.value === "1") {
      this.setState({
        string: (this.state.string + e.target.value),
        disabled_operators: false,
        disabled_minus: false,
      })
    } else if (e.target.value === "2") {
      this.setState({
        string: (this.state.string + e.target.value),
        disabled_operators: false,
        disabled_minus: false,
      })
    } else if (e.target.value === "3") {
      this.setState({
        string: (this.state.string + e.target.value),
        disabled_operators: false,
        disabled_minus: false,
      })
    } else if (e.target.value === "-") {
      if (this.state.string === '') {
        this.setState({
          string: this.state.total + e.target.value,
          disabled_minus: true,
          disabled_operators: true,
          disabled_dot: false,
        })
      } else {
        this.setState({
          string: this.state.string + e.target.value,
          disabled_minus: true,
          disabled_operators: true,
          disabled_dot: false,
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
        })
      }
      this.setState({
        total: '',
      })
    } else if (e.target.value === "AC") {
      if (this.state.total === '') {
        this.setState({
          string: '',
          disabled_minus: false,
          disabled_operators: true,
          disabled_dot: false,
          dot_operator_check: false,
        })
      } else {
        this.setState({
          string: '',
          disabled_minus: false,
          disabled_operators: false,
          disabled_dot: false,
          dot_operator_check: false,
        })
      }
    } else if (e.target.value === "0") {
      this.setState({
        string: (this.state.string + e.target.value),
        disabled_operators: false,
        disabled_minus: false,
      })
    } else if (e.target.value === ".") {
      this.setState({
        string: (this.state.string + e.target.value),
        disabled_dot: true,
        disabled_operators: true,
        disabled_minus: true,
      })
    } else if (e.target.value === "=") {
      if (calculate(this.state.string) === '') {
        this.setState({
          disabled: true,
          disabled_operators: false,
          disabled_dot: false,
          disabled_minus: false,
          disabled_counter: 0,
        })
      } else {
        this.setState({
          total: calculate(this.state.string),
          disabled: true,
          disabled_operators: false,
          disabled_dot: false,
          disabled_minus: false,
          disabled_counter: 0,
        })
      }
      this.setState({
        string: '',
      })
    } else if (e.target.value === "+") {
      if (this.state.string === '' && this.state.total != '') {
        this.setState({
          string: (this.state.total + e.target.value),
          disabled_operators: true,
          disabled_dot: false,
        })
      } else {
        this.setState({
          string: (this.state.string + e.target.value),
          disabled_operators: true,
          disabled_dot: false,
        })
      }
    } else if (e.target.value === "ANS") {
      this.setState({
        string: (this.state.string + this.state.total),
        disabled_operators: false,
        disabled_dot: false,
        disabled_minus: false,
      })
    } else if (e.target.value === "del") {
      if (['+','*','÷','^'].includes(getLetter(this.state.string, -2))) {
        this.setState({
          disabled_operators: true,
          string: this.state.string.slice(0,-1),
          disabled_minus: false,
        })
      } else if (['0','1','2','3','4','5','6','7','8','9'].includes(getLetter(this.state.string, -2))) {
        this.setState({
          disabled_operators: false,
          disabled_minus: false,
          string: this.state.string.slice(0,-1),
        })
        if (getLetter(this.state.string, -1) === ".") {
          this.setState({
            disabled_dot: false,
          })
        } else if (['+','*','÷','^','-'].includes(getLetter(this.state.string, -1)))  {
          if (findIfPreviousNumberIsADecimal(this.state.string)) {
            this.setState({
              disabled_dot: true,
            })
          }
          this.setState({
            disabled_operators: false,
            string: this.state.string.slice(0,-1),
          })
        }
      } else if (getLetter(this.state.string, -2) === "-") {
        this.setState({
          disabled_minus: true,
          disabled_operators: true,
          string: this.state.string.slice(0,-1),
        })
      } else if (getLetter(this.state.string, -1) === "-") {
        this.setState({
          disabled_minus: false,
          string: this.state.string.slice(0,-1),
        })
        if (['0','1','2','3','4','5','6','7','8','9'].includes(getLetter(this.state.string, -2))) {
          this.setState({
            disabled_operators: false,
          })
        }
      } else if (getLetter(this.state.string, -2) === ".") {
        this.setState({
          disabled_dot: true,
          string: this.state.string.slice(0,-1),
        })
      } else if (getLetter(this.state.string, -1) === ".") {
        this.setState({
          disabled_dot: false,
          dot_operator_check: false,
          string: this.state.string.slice(0, -1),
        })
      } else if (getLetter(this.state.string, -1) === ")") {
        if (this.state.disabled === true) {
          this.setState({
            disabled: false,
          })
        }
        this.setState({
          disabled_counter: this.state.disabled_counter + 1,
          string: this.state.string.slice(0,-1),
        })
      } else if (getLetter(this.state.string, -1) === "(") {
        this.setState({
          disabled_counter: (this.state.disabled_counter - 1),
          string: this.state.string.slice(0,-1),
        })
        if (this.state.disabled_counter === 1) {
          this.setState({
            disabled: true,
          })
        }
      } else if (['+','-','÷'].includes((getLetter(this.state.string, -2)))) {
        this.setState({
          disabled_minus: false,
          string: this.state.string.slice(0, -1),
        })
      } else if (this.state.string.length === 1) {
        this.setState({
          string: this.state.string.slice(0, -1),
          disabled: true,
          disabled_operators: true,
          disabled_minus: false,
          disabled_dot: false,
          dot_operator_check: false,
        })
      } else if (getLetter(this.state.string, -1) === '.') {
        this.setState({
          string: this.state.string.slice(0, -1),
          disabled_dot: false,
        })
      } else if (getLetter(this.state.string, -2) === "(") {
        this.setState({
          disabled_operators: true,
          disabled_minus: false,
          disabled_dot: false,
          string: this.state.string.slice(0,-1),
        })
        if (this.state.disabled_counter === 1) {
          this.setState({
            disabled: true,
          })
        }
      } else {
        this.setState({
          string: this.state.string.slice(0, -1),
        })
      }
    }
  }
  programKeyboard(e) {
    const charactersToDisableOperatorKeys = ['+','^','-','÷','*'];

    if (e.key === "q") {
      this.setState({
        string: this.state.string + "√(",
        disabled: false,
        disabled_counter: (this.state.disabled_counter + 1),
        disabled_operators: true,
        disabled_minus: false,
      })
    } else if (e.key === "7") {
      this.setState({
        string: this.state.string + e.key,
        disabled_operators: false,
        disabled_minus: false,
      })
    }
    else if (e.key === "8") {
      this.setState({
        string: this.state.string + e.key,
        disabled_operators: false,
        disabled_minus: false,
      })
    }
     else if (e.key === "9") {
      this.setState({
        string: this.state.string + e.key,
        disabled_operators: false,
        disabled_minus: false,
      })
    } else if (e.key === "/") {
      if (charactersToDisableOperatorKeys.includes(getLetter(this.state.string, -1)) === false) {
        if (this.state.string === '' && this.state.total != '') {
          this.setState({
            string: this.state.total + "÷",
            disabled_operators: true,
            disabled_dot: false,
          })
        } else {
          if (this.state.string != '') {
            this.setState({
              string: this.state.string + "÷",
              disabled_operators: true,
              disabled_dot: false,
            })
          }
        }
      }
    } else if (e.key === "^") {
      if (charactersToDisableOperatorKeys.includes(getLetter(this.state.string, -1)) === false) {
        if (this.state.string === '' && this.state.total != '') {
          this.setState({
            string: this.state.total + e.key,
            disabled_operators: true,
            disabled_dot: false,
          })
        } else {
          if (this.state.string != '') {
            this.setState({
              string: this.state.string + e.key,
              disabled_operators: true,
              disabled_dot: false,
            })
          }
        }
      }
    } else if (e.key === "(") {
      if (this.state.string === '' && this.state.total != '') {
        this.setState({
          string: this.state.total + e.key,
          disabled: false,
          disabled_counter: this.state.disabled_counter + 1,
          disabled_minus: false,
          disabled_dot: false,
        })
      } else {
        this.setState({
          string: this.state.string + e.key,
          disabled: false,
          disabled_counter: this.state.disabled_counter + 1,
          disabled_minus: false,
          disabled_dot: false,
        });
      }
    } else if (e.key === "4") {
      this.setState({
        string: this.state.string + e.key,
        disabled_operators: false,
        disabled_minus: false,
      })
    } else if (e.key === "5") {
      this.setState({
        string: this.state.string + e.key,
        disabled_operators: false,
        disabled_minus: false,
      })
    } else if (e.key === "6") {
      this.setState({
        string: this.state.string + e.key,
        disabled_operators: false,
        disabled_minus: false,
      })
    } else if (e.key === "*") {
      if (charactersToDisableOperatorKeys.includes(getLetter(this.state.string, -1)) === false) {
        if (this.state.string === '' && this.state.total != '') {
          this.setState({
            string: this.state.total + e.key,
            disabled_operators: true,
            dot_operator_check: false,
            disabled_dot: false,
          })
        } else {
          if (this.state.string != '') {
            this.setState({
              string: this.state.string + e.key,
              disabled_operators: true,
              dot_operator_check: false,
              disabled_dot: false,
            })
          }
        }
      }
    } else if (e.key === ")") {
      if (this.state.disabled_counter >= 1) {
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
    } else if (e.key === "1") {
      this.setState({
        string: this.state.string + e.key,
        disabled_operators: false,
        disabled_minus: false,
      })
    } else if (e.key === "2") {
      this.setState({
        string: this.state.string + e.key,
        disabled_operators: false,
        disabled_minus: false,
      })
    } else if (e.key === "3") {
      this.setState({
        string: this.state.string + e.key,
        disabled_operators: false,
        disabled_minus: false,
      })
    } else if (e.key === "-") {
      if (getLetter(this.state.string,-1) != "-")
        if (this.state.string === '') {
          this.setState({
            string: this.state.total + e.key,
            disabled_minus: true,
            disabled_operators: true,
            disabled_dot: false,
          })
        } else {
          this.setState({
            string: this.state.string + e.key,
            disabled_minus: true,
            disabled_operators: true,
            disabled_dot: false,
          })
        }
    } else if (e.key === 'C') {
      if (this.state.string === '') {
        this.setState({
          disabled_operators: true,
          disabled_minus: false,
          disabled_dot: false,
          disabled_exponent: true,
          dot_operator_check: false,
        })
      }
      this.setState({
        total: '',
      })
    } else if (e.key === "c") {
      if (this.state.total === '') {
        this.setState({
          string: '',
          disabled_minus: false,
          disabled_operator: true,
          disabled_dot: false,
        })
      } else {
        this.setState({
          string: '',
          disabled_minus: false,
          disabled_operator: false,
          disabled_dot: false,
        })
      }
    } else if (e.key === "0") {
      this.setState({
        string: this.state.string + e.key,
        disabled_operators: false,
        disabled_minus: false,
      })
    } else if (e.key === ".") {
      if (getLetter(this.state.string, -1) != ".") {
        if (this.state.disabled_dot === false) {
          this.setState({
              string: this.state.string + e.key,
              disabled_dot: true,
              disabled_operators: true,
              disabled_minus: true,
          })
        }
      }
    } else if (e.key === "Enter") {
      if (calculate(this.state.string) === '') {
        this.setState({
          disabled: true,
          disabled_operators: false,
          disabled_dot: false,
          disabled_minus: false,
          disabled_counter: 0,
        })
      } else {
        this.setState({
          total: calculate(this.state.string),
          disabled: true,
          disabled_operators: false,
          disabled_dot: false,
          disabled_minus: false,
          disabled_counter: 0,
        })
      }
      this.setState({
        string: '',
      })
    } else if (e.key === "+") {
      if (charactersToDisableOperatorKeys.includes(getLetter(this.state.string, -1)) === false) {
        if (this.state.string === '' && this.state.total != '') {
          this.setState({
            string: this.state.total + e.key,
            disabled_operators: true,
            disabled_dot: false,
          })
        } else {
          if (this.state.string != '') {
            this.setState({
              string: this.state.string + e.key,
              disabled_operators: true,
              disabled_dot: false,
            })
          }
        }
      }
    } else if (e.key === "a") {
      this.setState({
        string: this.state.string + this.state.total,
        disabled_operators: false,
        dot_operator_check: false,
        disabled_minus: false,
      })
    } else if (e.key === "Backspace") {
      if (['+','*','÷','^'].includes(getLetter(this.state.string, -2))) {
        this.setState({
          disabled_operators: true,
          string: this.state.string.slice(0,-1),
          disabled_minus: false,
        })
      } else if (['0','1','2','3','4','5','6','7','8','9'].includes(getLetter(this.state.string, -2))) {
        this.setState({
          disabled_operators: false,
          disabled_minus: false,
          string: this.state.string.slice(0,-1),
        })
        if (getLetter(this.state.string, -1) === ".") {
          this.setState({
            disabled_dot: false,
            dot_operator_check: false,
          })
        } else if (['+','*','÷','^','-'].includes(getLetter(this.state.string, -1)))  {
          if (findIfPreviousNumberIsADecimal(this.state.string)) {
            this.setState({
              disabled_dot: true,
            })
          }
          this.setState({
            disabled_operators: false,
            string: this.state.string.slice(0,-1),
          })
        }
      } else if (getLetter(this.state.string, -1) === "+" || getLetter(this.state.string, -1) === "*" || getLetter(this.state.string, -1) === "÷") {
        this.setState({
          disabled_operators: false,
          string: this.state.string.slice(0,-1),
        })
      } else if (getLetter(this.state.string, -2) === "-") {
        this.setState({
          disabled_minus: true,
          disabled_operators: true,
          string: this.state.string.slice(0,-1),
        })
      } else if (getLetter(this.state.string, -1) === "-") {
        this.setState({
          disabled_minus: false,
          string: this.state.string.slice(0,-1),
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
          string: this.state.string.slice(0,-1),
        })
      } else if (getLetter(this.state.string, -1) === ")") {
        if (this.state.disabled === true) {
          this.setState({
            disabled: false,
          })
        }
        this.setState({
          disabled_counter: this.state.disabled_counter + 1,
          string: this.state.string.slice(0,-1),
        })
      } else if (getLetter(this.state.string, -1) === "(") {
        this.setState({
          disabled_counter: (this.state.disabled_counter - 1),
          string: this.state.string.slice(0,-1),
        })
        if (this.state.disabled_counter === 1) {
          this.setState({
            disabled: true,
          })
        }
      } else if (['+','-','÷'].includes((getLetter(this.state.string, -2)))) {
        this.setState({
          disabled_minus: false,
          string: this.state.string.slice(0, -1),
        })
      } else if (this.state.string.length === 1) {
        this.setState({
          string: this.state.string.slice(0, -1),
          disabled: true,
          disabled_operators: true,
          disabled_minus: false,
          disabled_dot: false,
          dot_operator_check: false,
        })
      } else if (getLetter(this.state.string, -1) === '.') {
        this.setState({
          string: this.state.string.slice(0, -1),
          disabled_dot: false,
        })
      } else if (getLetter(this.state.string, -1) === '√') {
        this.setState({
          string: this.state.string.slice(0, -1),
        })
      } else {
        this.setState({
          string: this.state.string.slice(0, -1),
        })
      }
    }
  }

  render() {
    return (
      <div id="calculator">
      <form>
        <table id="table">
          <tr>
            <td colSpan="6"><h1 id="table_title">Calculator</h1></td>
          </tr>
          <tr>
            <td colSpan="6"><input id="number_box" type="text" placeholder="lower case c to clear" value={this.state.string} onClick={this.handleClick} onKeyDown={this.programKeyboard} /></td>
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
          </tr>
          <tr>
            <td><input className="buttons" type="button" value="(" onClick={this.handleClick} /></td>
            <td><input className="buttons" type="button" value="4" onClick={this.handleClick} /></td>
            <td><input className="buttons" type="button" value="5" onClick={this.handleClick} /></td>
            <td><input className="buttons" type="button" value="6" onClick={this.handleClick} /></td>
            <td><input className="buttons" type="button" value="x" onClick={this.handleClick} disabled={this.state.disabled_operators} /></td>
          </tr>
          <tr>
            <td><input className="buttons" type="button" value=")" onClick={this.handleClick} disabled={this.state.disabled} /></td>
            <td><input className="buttons" type="button" value="1" onClick={this.handleClick} /></td>
            <td><input className="buttons" type="button" value="2" onClick={this.handleClick} /></td>
            <td><input className="buttons" type="button" value="3" onClick={this.handleClick} /></td>
            <td><input className="buttons" type="button" value="-" onClick={this.handleClick} disabled={this.state.disabled_minus} /></td>
            <td><input className="clearTotal" type="button" value="clear total" onClick={this.handleClick} /></td>
          </tr>
          <tr>
            <td><input className="buttons" type="button" value="AC" onClick={this.handleClick} /></td>
            <td><input className="buttons" type="button" value="0" onClick={this.handleClick} /></td>
            <td><input className="buttons" type="button" value="." onClick={this.handleClick} disabled={this.state.disabled_dot} /></td>
            <td><input className="buttons" type="button" value="=" onClick={this.handleClick} /></td>
            <td><input className="buttons" type="button" value="+" onClick={this.handleClick} disabled={this.state.disabled_operators} /></td>
            <td></td>
          </tr>
          <tr>
            <td><input className="buttons" type="button" value="ANS" onClick={this.handleClick} /></td>
            <td><input className="buttons" type="button" value="del" onClick={this.handleClick} /></td>
            <td colSpan="4"><input id="answer_box" type="text" placeholder="shift + c to clear/ a to use ANS" value={this.state.total} /></td>
          </tr>
        </table>
      </form>
    </div>
    )
  }
}

ReactDOM.render(<Calculator />, document.getElementById('root'));
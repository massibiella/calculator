function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 <= 0)
        return "Error";
    else
        return num1 / num2;
}

function operate(operator, num1, num2) {
    let result;
    switch (operator) {
        case '+':
            result = add(num1, num2);
            break;
        case '-':
            result = subtract(num1, num2);
            break;
        case '*':
            result = multiply(num1, num2);
            break;
        case '/':
            result = divide(num1, num2);
            break;
        default:
            alert('Operator not valid.');
    }
    return result;
}


const display = document.querySelector('#result');
let currentNum = '';
let previousNum = '';
let operator = '';

const currentDisplayedNumber = document.querySelector(".currentNumber");
const previouslyDisplayedNumber = document.querySelector(".previousNumber")

const clear = document.querySelector('.clear');
clear.addEventListener('click', clearOutput);

const numberButtons = document.querySelectorAll('.number');

const operators = document.querySelectorAll('.operator');

const equal = document.querySelector('.equal')
equal.addEventListener('click', () => {
    if (currentNum !== '' & previousNum !== '') {
        calculate();
    }
})

numberButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        handleNumber(e.target.textContent)
    })
});


operators.forEach(btn => {
    btn.addEventListener('click', (e) => {
        handleOperator(e.target.textContent)
    })
})

function handleNumber(number) {
    if (currentNum.length <= 11) {
        currentNum += number;
        currentDisplayedNumber.textContent = currentNum;
    }
}

function handleOperator(op) {
    if (previousNum === '') {
        previousNum = currentNum;
        operatorCheck(op);
    }
    else if (currentNum === '') {
        operatorCheck(op);
    }
    else {
        calculate();
        operator = op;
        currentDisplayedNumber.textContent = '0';
        previouslyDisplayedNumber.textContent = previousNum + ' ' + op;
    }
}

function operatorCheck(text) {
    operator = text;
    previouslyDisplayedNumber.textContent = previousNum + ' ' + operator;
    currentNum = '';
    currentDisplayedNumber.textContent = '';
}
function calculate() {
    previousNum = Number(previousNum);
    currentNum = Number(currentNum);

    previousNum = operate(operator, previousNum, currentNum);
    previouslyDisplayedNumber.textContent = '';
    currentDisplayedNumber.textContent = previousNum;
    previousNum = roundNumber(previousNum);
    previousNum = previousNum.toString();
    currentNum = '';
    displayResults();

}

function roundNumber(num) {
    return Math.round(num * 100000) / 100000
}

function displayResults() {
    previouslyDisplayedNumber.textContent = '';
    operator = '';
    if (previousNum.length <= 11) {
        currentDisplayedNumber.textContent = previousNum;
    } else {
        currentDisplayedNumber.textContent = previousNum.slice(0, 11);
    }
}

function clearOutput() {
    currentNum = '';
    previousNum = '';
    operator = '';
    previouslyDisplayedNumber.textContent = '';
    currentDisplayedNumber.textContent = '0';
}
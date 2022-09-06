let num1 = '';
let num2 = '';
let currentOperator = null;
let total = null;

const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const display = document.querySelector('.display');
const buttons = document.querySelector('button');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');
const backspace = document.querySelector('.backspace');
let displayValue = document.querySelector('.display').textContent;

function displayNumber(number) {
    if (display.textContent === '' || display.textContent === '0') {
        display.textContent = number.textContent;
    }
    else if (display.textContent !== '' || display.textContent !== 0 || display.textContent !== '0') {
        display.textContent += number.textContent;
    }
    displayValue = parseFloat(display.textContent);
    console.log('displayValue = ' + displayValue);
}

function setOperator(operator) {
    if (currentOperator !== null) calculate();
    if (display.textContent === '') return;
    if (total === null) {
        num1 = parseFloat(display.textContent);
        console.log('num1 = ' + num1);
    } else {
        num1 = parseFloat(total);
        console.log('new num1 = ' + num1);
    }
    if (operator.textContent === '÷') {
        currentOperator = '/';
    } else if (operator.textContent === 'x') {
        currentOperator = '*';
    } else currentOperator = operator.textContent;
    console.log('currentOperator = ' + currentOperator);
    resetScreen();
};

function calculate() {
    if (display.textContent === '') {
        return;
    }
    num2 = parseFloat(display.textContent);
    console.log('num2 = ' + num2);
    display.textContent = equals.textContent;
    resetScreen();
    operate(currentOperator, num1, num2);
    currentOperator = null;
    total = null;
}

function resetScreen() {
    display.textContent = '';
    displayValue = '';
}

function clearScreen() {
    location.reload();
}

function backSpace() {
    displayValue = (displayValue).toString().slice(0,-1);
    display.textContent = displayValue;
}

// Basic math operator functions - do we need separate functions for each operator or can I just put it in the operator function?
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    if (operator === '+') {
        total = add(a, b);
    }
    if (operator === '-') {
        total = subtract(a, b);
    }
    if (operator === '*') {
        total = multiply(a, b);
    }
    if (operator === '/') {
        if (num2 === 0) {
            alert("Can't divide by zero!");
            return;
        }
        total = divide(a, b);
    }
    total = Math.round(total * 100) / 100;
    display.textContent = total;
    return total;
}

// Event listeners
numbers.forEach((number) => {
    number.addEventListener('click', () => {
        displayNumber(number);
    })
})

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        setOperator(operator);
    }
    )
})

equals.addEventListener('click', () => {
    calculate();
})

clear.addEventListener('click', () => {
    clearScreen();
})

backspace.addEventListener('click', () => {
    backSpace();
})


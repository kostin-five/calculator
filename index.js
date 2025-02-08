const display = document.querySelector('#display');
const numbers = document.querySelectorAll('.number');
const functions = document.querySelectorAll('.function');
const clear = document.querySelector('#clear');
const equals = document.querySelector('#equals');
const point = document.querySelector('.point');
const deleteBtn = document.querySelector('#delete');

let currentInput = '';
let operator = '';
let previousInput = '';

window.addEventListener('load', () => {
    const savedData = localStorage.getItem('calculatorData');
    if (savedData) {
        const { currentInput, operator, previousInput } = JSON.parse(savedData);
        display.value = currentInput || previousInput || '';
        if (currentInput) {
            this.currentInput = currentInput;
        }
        if (operator) {
            this.operator = operator;
        }
        if (previousInput) {
            this.previousInput = previousInput;
        }
    }
});

const saveData = () => {
    const data = {
        currentInput,
        operator,
        previousInput
    };
    localStorage.setItem('calculatorData', JSON.stringify(data));
};

numbers.forEach(number => {
    number.addEventListener('click', () => {
        currentInput += number.innerText;
        display.value = currentInput;
        saveData();
    });
});

point.addEventListener('click', () => {
    if (currentInput === '') {
        currentInput = '0.';
    } else if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    display.value = currentInput;
    saveData();
});

functions.forEach(func => {
    func.addEventListener('click', () => {
        if (func.id === 'clear') {
            clearDisplay();
        } else if (func.id === 'delete') {
            deleteLast();
        } else if (func.id === 'equals') {
            calculateResult();
        } else {
            applyOperator(func.id);
        }
        saveData();
    });
});

function clearDisplay() {
    currentInput = '';
    operator = '';
    previousInput = '';
    display.value = '';
    saveData();
}

function deleteLast() {
    if (currentInput) {
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput;
    } else if (operator) {
        operator = '';
    } else if (previousInput) {
        previousInput = previousInput.slice(0, -1);
        display.value = previousInput;
    }
    saveData();
}


function applyOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculateResult();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
    saveData();
}

function calculateResult() {
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (operator) {
        case 'add':
            result = prev + curr;
            break;
        case 'subtract':
            result = prev - curr;
            break;
        case 'multiply':
            result = prev * curr;
            break;
        case 'divide':
            result = prev / curr;
            break;
        case 'degree':
            result = Math.pow(prev, curr);
            break;
        default:
            return;
    }
    currentInput = result;
    display.value = result;
    operator = '';
    previousInput = '';
    saveData();
}
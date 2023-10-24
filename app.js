// DOM Elements
const numberButtons = document.querySelectorAll('.number-1, .number-2, .number-3, .number-4, .number-5, .number-6, .number-7, .number-8, .number-9, .number-0, .operator');
const display = document.getElementById('numbers');
const resetButton = document.querySelector('.reset');
const equalsButton = document.querySelector('.equals');
const deleteButton = document.querySelector('.del');
const bodyContainer = document.querySelector("body");
const toggleButtons = document.querySelectorAll('.toggle div');
const cToggler = document.querySelector(".c");
const divisionButton = document.querySelector('.btn.function[value="/"]');

// Theme Functions
function applyTheme(theme) {
    bodyContainer.className = theme === 'first' ? '' : `${theme}-theme`;
    toggleButtons.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-theme') === theme));
    localStorage.setItem('activeTheme', theme);
}

function loadStoredTheme() {
    const storedTheme = localStorage.getItem('activeTheme') || 'first';
    applyTheme(storedTheme);
}

function applyStoredTheme() {
    const storedTheme = localStorage.getItem('activeTheme');
    const themeIndex = ['first', 'second', 'third'].indexOf(storedTheme);
    toggleButtons.forEach(btn => btn.classList.remove('active'));

    if (themeIndex >= 0) {
        toggleButtons[themeIndex].classList.add('active');
        if (themeIndex === 0) {
            bodyContainer.classList.remove('second-theme', 'third-theme');
        } else if (themeIndex === 1) {
            bodyContainer.classList.add('second-theme');
            bodyContainer.classList.remove('third-theme');
        } else {
            bodyContainer.classList.remove('second-theme');
            bodyContainer.classList.add('third-theme');
        }
    } else {
        toggleButtons[0].classList.add('active');
        bodyContainer.classList.remove('second-theme', 'third-theme');
    }
}

// Event Listeners
toggleButtons.forEach(button => {
    button.addEventListener('click', () => applyTheme(button.getAttribute('data-theme')));
});

divisionButton.addEventListener('click', () => {
    if (!lastButtonClickedWasOperator) {
        updateDisplay(display.value + divisionButton.value);
    }
    lastButtonClickedWasOperator = true;
});

equalsButton.addEventListener('click', calculate);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('operator')) {
            if (!lastButtonClickedWasOperator) {
                updateDisplay(display.value + button.value);
            }
            lastButtonClickedWasOperator = true;
        } else {
            lastButtonClickedWasOperator = false;
            if (display.value === '0') {
                updateDisplay(button.value);
            } else {
                updateDisplay(display.value + button.value);
            }
        }
    });
});

resetButton.addEventListener('click', () => {
    updateDisplay('0');
});

deleteButton.addEventListener('click', () => {
    updateDisplay(display.value.slice(0, -1));
});

// Function to update display value
function updateDisplay(value) {
    display.value = value;
}

// Function to calculate result
function calculate() {
    try {
        const expression = display.value.replace(/x/g, '*').replace(/\//g, '/');
        const result = eval(expression);
        updateDisplay(result);
    } catch (error) {
        updateDisplay('Error');
        console.log(error);
    }
}

// Apply stored theme on page load
applyStoredTheme();
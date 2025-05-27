let display = document.getElementById('display');
let historyList = document.getElementById('history-list');

let currentInput = '0';
let history = [];

function updateDisplay() {
  display.innerText = currentInput;
}

function appendNumber(num) {
  if (currentInput === '0') currentInput = '';
  currentInput += num;
  updateDisplay();
}

function appendDot() {
  const parts = currentInput.split(/[\+\-\*\/]/);
  if (!parts[parts.length - 1].includes('.')) {
    currentInput += '.';
    updateDisplay();
  }
}

function appendOperator(op) {
  const lastChar = currentInput.slice(-1);
  if ('+-*/'.includes(lastChar)) {
    currentInput = currentInput.slice(0, -1);
  }
  currentInput += op;
  updateDisplay();
}

function appendFunction(func) {
  currentInput += func;
  updateDisplay();
}

function appendBracket(bracket) {
  currentInput += bracket;
  updateDisplay();
}

function square() {
  try {
    const val = eval(currentInput);
    currentInput = Math.pow(val, 2).toString();
    saveHistory(`sqr(${val})`, currentInput);
    updateDisplay();
  } catch {
    currentInput = 'Error';
    updateDisplay();
  }
}

function clearDisplay() {
  currentInput = '0';
  updateDisplay();
}

function deleteChar() {
  if (currentInput.length === 1 || currentInput === 'Error') {
    currentInput = '0';
  } else {
    currentInput = currentInput.slice(0, -1);
  }
  updateDisplay();
}

function calculate() {
  try {
    const result = eval(currentInput);
    saveHistory(currentInput, result);
    currentInput = result.toString();
  } catch {
    currentInput = 'Error';
  }
  updateDisplay();
}

function saveHistory(expression, result) {
  const li = document.createElement('li');
  li.textContent = `${expression} = ${result}`;
  const delBtn = document.createElement('button');
  delBtn.textContent = '🗑️';
  delBtn.className = 'delete-btn';
  delBtn.onclick = () => li.remove();
  li.appendChild(delBtn);
  historyList.prepend(li);
}

document.addEventListener('keydown', (e) => {
  const key = e.key;
  if (!isNaN(key)) appendNumber(key);
  else if (key === '.') appendDot();
  else if ('+-*/'.includes(key)) appendOperator(key);
  else if (key === 'Enter') calculate();
  else if (key === 'Backspace') deleteChar();
  else if (key === 'Escape') clearDisplay();
  else if (key === '(' || key === ')') appendBracket(key);
});

// --- VARIABLES --- //
const row = 4;
const column = 4;
const keys = {
  0: { symbol: 7, type: "data-number" },
  1: { symbol: 8, type: "data-number" },
  2: { symbol: 9, type: "data-number" },
  3: { symbol: "÷", type: "data-operator" },
  4: { symbol: 4, type: "data-number" },
  5: { symbol: 5, type: "data-number" },
  6: { symbol: 6, type: "data-number" },
  7: { symbol: "×", type: "data-operator" },
  8: { symbol: 1, type: "data-number" },
  9: { symbol: 2, type: "data-number" },
  10: { symbol: 3, type: "data-number" },
  11: { symbol: "-", type: "data-operator" },
  12: { symbol: ".", type: "data-point" },
  13: { symbol: 0, type: "data-number" },
  14: { symbol: "=", type: "data-equal" },
  15: { symbol: "+", type: "data-operator" },
};

let operandA = "";
let operandB = "";
let operation = null;
let needsReset = false;

// Initiation: Creation of the calculator keys
initializeCalculator(keys, row, column);

// --- SELECTORS --- //
// --- Main Container (3)--- //
const resultDisplay = document.querySelector(".result-display");
const controlButtons = document.querySelector(".control-buttons");
const calculatorKeys = document.querySelector(".calculator-keys");

// --- Result Display (2) --- //
const currentOperationDisplay = document.querySelector(
  ".current-operation-display"
);
const calculationResult = document.querySelector(".calculation-result");

// --- Control Buttons (2) --- //
const buttonClear = document.querySelector(".btn[value='Clear']");
const buttonDelete = document.querySelector(".btn[value='Delete']");

// --- Calculator Keys (16) --- //
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const buttonEqual = document.querySelector("[data-equal]");
const buttonPoint = document.querySelector("[data-point]");

// --- EVENT LISTENERS --- //
buttonClear.addEventListener("click", clearCalculator);
buttonDelete.addEventListener("click", backspace);
buttonEqual.addEventListener("click", () => console.log("equal"));
buttonPoint.addEventListener("click", () => console.log("."));

numberButtons.forEach((button) =>
  button.addEventListener("click", () => appendNumber(button.textContent))
);
operatorButtons.forEach((button) =>
  button.addEventListener("click", () => setOperation(button.textContent))
);

// FUNCTION CREATION //
function initializeCalculator(keys, row, column) {
  createCalculatorKeys(keys, row, column);
  createDisplay();
  createClearButton();
  createDeleteButton();

  function createCalculatorKeys(
    keys,
    row,
    column,
    calculatorKeys = document.querySelector(".calculator-keys")
  ) {
    for (let i = 0; i < row * column; i++) {
      let key = document.createElement("button");

      if (keys[i].type === "data-number") key.setAttribute("data-number", "");
      if (keys[i].type === "data-operator")
        key.setAttribute("data-operator", "");
      if (keys[i].type === "data-point") key.setAttribute("data-point", "");
      if (keys[i].type === "data-equal") key.setAttribute("data-equal", "");

      key.textContent = keys[i].symbol;
      key.classList.add("key");
      calculatorKeys.appendChild(key);
    }
  }

  function createDisplay(
    resultDisplay = document.querySelector(".result-display")
  ) {
    const currentOperationDisplay = document.createElement("div");
    const calculationResult = document.createElement("div");
    currentOperationDisplay.textContent = 0;
    currentOperationDisplay.classList.add("current-operation-display");
    calculationResult.textContent = 0;
    calculationResult.classList.add("calculation-result");
    resultDisplay.appendChild(currentOperationDisplay);
    resultDisplay.appendChild(calculationResult);
  }

  function createClearButton(
    controlButtons = document.querySelector(".control-buttons")
  ) {
    const buttonClear = document.createElement("button");
    buttonClear.textContent = "Clear";
    buttonClear.value = "Clear";
    buttonClear.classList.add("btn");
    controlButtons.appendChild(buttonClear);
  }

  function createDeleteButton(
    controlButtons = document.querySelector(".control-buttons")
  ) {
    const buttonDelete = document.createElement("button");
    buttonDelete.textContent = "Delete";
    buttonDelete.value = "Delete";
    buttonDelete.classList.add("btn");
    controlButtons.appendChild(buttonDelete);
  }
}

// --- FONCTION MAIN --- ///
function clearCalculator() {
  currentOperationDisplay.textContent = "";
  calculationResult.textContent = 0;
  operandA = "";
  operandB = "";
  operation = null;
  needsReset = false;
}

function resetScreen() {
  calculationResult.textContent = "";
  needsReset = false;
}

function backspace() {
  let result = calculationResult.textContent;
  calculationResult.textContent = result.length > 1 ? result.slice(0, -1) : "0";
}

function appendNumber(number) {
  if (calculationResult.textContent === "0" || needsReset) resetScreen();
  calculationResult.textContent += number;
}

function setOperation(operator) {
  if (operation !== null) evaluate();
  operandA = calculationResult.textContent;
  operation = operator;
  currentOperationDisplay.textContent = `${operandA} ${operation}`;
  needsReset = true;
}

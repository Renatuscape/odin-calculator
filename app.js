const displayWindow = document.getElementById("display-window");
const numBtnContainer = document.getElementById("num-buttons");
const operationBtnContainer = document.getElementById("operation-buttons");
const clearBtn = document.getElementById("clear-button");
const sumBtn = document.getElementById("sum-button");
const decimalBtn = document.getElementById("decimal-button");

const numpadLayout = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"];

let displayText = 0;

let input1 = "";
let input2 = "";
let operatorName = "";

let summedUp = false;

const operators = [
  {
    operator: "+",
    action: add,
  },
  {
    operator: "-",
    action: subtract,
  },
  {
    operator: "x",
    action: multiply,
  },
  {
    operator: "/",
    action: divide,
  },
];

function sum() {
  console.log("Chosen operator is " + operatorName);
  const foundOperation = operators.find(
    (opr) => opr.operator == operatorName
  )?.action;

  if (foundOperation) {
    foundOperation();
  } else {
    console.warn("Operator not set");
  }

  setDisplay();
  summedUp = true;
}

function decimal() {
  if (input1 === "") {
    input1 = "0.";
  } else if (operatorName === "" && !input1.includes(".")) {
    input1 += "."
  }
  else if (operatorName !== "" && input2 === "") {
    input2 = "0.";
  }
  else if (operatorName !== "" && !input2.includes(".")) {
    input2 += ".";
  }
  setDisplay();
}

function add() {
  let result = parseFloat(input1) + parseFloat(input2);
  clear();
  input1 = result.toString();
}

function subtract() {
  let result = parseFloat(input1) - parseFloat(input2);
  clear();
  input1 = result.toString();
}

function multiply() {
  let result = parseFloat(input1) * parseFloat(input2);
  clear();
  input1 = result.toString();
}

function divide() {
  let result = parseFloat(input1) / parseFloat(input2);
  clear();
  input1 = result.toString();
}

function clear() {
  input1 = "";
  input2 = "";
  operatorName = "";
  setDisplay();
}

function buildButtons() {
  numpadLayout.forEach((num) => {
    const button = document.createElement("button");
    button.className = "calc-button";
    button.title = num;
    button.innerHTML = num;

    if (num === '0') {
        button.style.gridColumn = "span 3";
    }
    
    button.onclick = () => {
      if (summedUp) {
        input1 = "";
        summedUp = false;
      }

      if (operatorName === "") {
        input1 += num;
      } else {
        input2 += num;
      }
      setDisplay();
    };
    numBtnContainer.appendChild(button);
  });

  for (let i = 0; i < operators.length; i++) {
    const button = document.createElement("button");
    button.className = "calc-button";
    button.title = operators[i].operator;
    button.innerHTML = operators[i].operator;
    operationBtnContainer.appendChild(button);

    button.onclick = () => {
      summedUp = false;
      operatorName = button.title;
      setDisplay();
    };
  }

  sumBtn.onclick = sum;
  clearBtn.onclick = clear;
  decimalBtn.onclick = decimal;
}

function setDisplay() {
  let textContent = 0;

  if (input1 !== "") {
    textContent = Number(input1.replace(/,/g, "")).toLocaleString();

    if (operatorName !== "") {
      textContent += " " + operatorName;

      if (input2 !== "") {
        textContent += " " + Number(input2.replace(/,/g, "")).toLocaleString();
      }
    }
  }

  if (textContent.length > 54) {
    textContent = "ERROR!";
  }
  displayWindow.innerHTML = textContent;

  console.log("Input1: ", input1);
  console.log("Operator: ", operatorName);
  console.log("Input2: ", input2);
}

buildButtons();
setDisplay();

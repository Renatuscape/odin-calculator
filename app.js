const displayWindow = document.getElementById("display-window");
const numBtnContainer = document.getElementById("num-buttons");
const operationBtnContainer = document.getElementById("operation-buttons");
const clearBtn = document.getElementById("clear-button");
const sumBtn = document.getElementById("sum-button");

let displayText = 0;

let input1 = "";
let input2 = "";
let operatorName = "";

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
    console.error("Operator not found");
  }

  setDisplay();
}

function add() {
  let result = parseInt(input1) + parseInt(input2);
  clear();
  input1 = result.toString();
}

function subtract() {
    let result = parseInt(input1) - parseInt(input2);
    clear();
    input1 = result.toString();
}

function multiply() {
  let result = parseInt(input1) * parseInt(input2);
  clear();
  input1 = result.toString();
}

function divide() {
  let result = parseInt(input1) / parseInt(input2);
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
  for (let i = 0; i < 10; i++) {
    const button = document.createElement("button");
    button.className = "calc-button";
    button.title = i.toString();
    button.innerHTML = i.toString();

    button.onclick = () => {
      if (operatorName === "") {
        input1 += button.title;
      } else {
        input2 += button.title;
      }

      setDisplay();
    };

    numBtnContainer.appendChild(button);
  }

  for (let i = 0; i < operators.length; i++) {
    const button = document.createElement("button");
    button.className = "calc-button";
    button.title = operators[i].operator;
    button.innerHTML = operators[i].operator;
    operationBtnContainer.appendChild(button);

    button.onclick = () => {
      operatorName = button.title;
      setDisplay();
    };
  }

  sumBtn.onclick = sum;
  clearBtn.onclick = clear;
}

function setDisplay() {
  let textContent = 0;

  if (input1 !== "") {
    textContent = input1;

    if (operatorName !== "") {
      textContent += " " + operatorName;

      if (input2 !== "") {
        textContent += " " + input2;
      }
    }
  }

  if (textContent.length > 54){
    textContent = "ERROR!";
  }
  displayWindow.innerHTML = textContent;

  console.log("Input1: ", input1);
  console.log("Operator: ", operatorName);
  console.log("Input2: ", input2);
}

buildButtons();
setDisplay();

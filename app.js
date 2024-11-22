const displayWindow = document.getElementById('display-window');
const numBtnContainer = document.getElementById('num-buttons');

let displayText = 0;

let input1 = '';
let input2 = '';
let operator = '';

function buildButtons() {
    for (let i = 0; i < 10; i++) {
        const button = document.createElement("button");
        button.className = 'calc-button';
        button.title = i.toString();
        button.innerHTML = i.toString();

        numBtnContainer.appendChild(button);
    }
}

function setDisplay() {
    let textContent = 0;

    if (input1 !== '') {
        textContent = input1;

        if (operator !== '') {
            textContent += ' ' + operator;

            if (input2 !== '') {
                textContent += ' ' + input2;
            }
        }
    }

    displayWindow.innerHTML = textContent;
}

buildButtons();
setDisplay();
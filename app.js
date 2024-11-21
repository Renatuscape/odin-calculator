const displayWindow = document.getElementById('display-window');
let displayText = 0;

function setDisplay(textContent) {
    displayWindow.innerHTML  = textContent;
}

setDisplay(displayText);
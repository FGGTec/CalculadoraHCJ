// script.js
const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

let currentInput = "";
let currentOperator = "";
let shouldClearDisplay = true;

function coloraleatorio() {
    let enlaceCSS = document.getElementById("estilos");

    if(enlaceCSS.getAttribute("href") === "styles.css")
        enlaceCSS.setAttribute("href", "styles2.css"); 
    else 
        enlaceCSS.setAttribute("href", "styles.css");
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const buttonText = button.textContent;

        if (buttonText.match(/[0-9]/)) {
            if (shouldClearDisplay) {
                display.textContent = "";
                shouldClearDisplay = false;
            }
            display.textContent += buttonText;
        } 
        else if (buttonText === "C") {
            display.textContent = "0";
            currentInput = "";
            currentOperator = "";
            shouldClearDisplay = true;
        }
        else if (buttonText === "D"){
            //borrar 1 digito del operando en display
        }
        else if (buttonText === "=") {
            if (currentOperator && currentInput) {
                const result = calculate(parseFloat(currentInput), currentOperator, parseFloat(display.textContent));
                display.textContent = result;
                currentInput = result;
                currentOperator = "";//falta que repita la ultima operacion
                shouldClearDisplay = true;
            }
        }
        else if (buttonText === "π"){
            display.textContent = Math.PI;
        }  
        else if (buttonText === "√"){
            display.textContent = Math.sqrt(parseFloat(display.textContent));
            currentInput = display.textContent;
            shouldClearDisplay = true;
        }
        else if (buttonText === "S"){
            //cambia signo
        }
        else if (buttonText === "."){
            //agregar un punto decimal (.0) al final
        }
        else if (buttonText === "R"){
            coloraleatorio()
            //cambiar los colores aleatoriamente
        }
        else {
            currentOperator = buttonText;
            currentInput = display.textContent;
            shouldClearDisplay = true;
        }
    });
});

function calculate(num1, operator, num2) {
    switch (operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            if (num2 !== 0) {
                return num1 / num2;
            } 
            else {
                return "Error";
            }
        case "%":
            return num1 % num2;   
        case "^":
            return Math.pow(num1, num2);//falta que no funcione con 1 solo operando
        case "mode":
            return ;
        default:
            return num2;
    }
}
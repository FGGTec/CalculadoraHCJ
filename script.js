// script.js
const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

let currentInput = "";
let currentOperator = "";
let shouldClearDisplay = true;

function coloraleatorio()
{
    let enlaceCSS = document.getElementById("estilos");

    if(enlaceCSS.getAttribute("href") === "styles.css")
        enlaceCSS.setAttribute("href", "styles2.css"); 
    else 
        enlaceCSS.setAttribute("href", "styles.css");
}

buttons.forEach((button) =>
{
    button.addEventListener("click", () => 
    {
        const buttonText = button.textContent;

        if (buttonText.match(/[0-9]/)) 
        {
            if (shouldClearDisplay) 
            {
                display.textContent = "";
                shouldClearDisplay = false;
            }
            display.textContent += buttonText;
        } 
        else if (buttonText === "C") 
        {
            display.textContent = "0";
            currentInput = "";
            currentOperator = "";
            shouldClearDisplay = true;
        }
        else if (buttonText === "D")
        {
            if (display.textContent.length > 1) // Si es el último dígito, devolver a 0
            {
                if (display.textContent[0] === '-' && display.textContent.length === 2) 
                {// Si el número es negativo y tiene un solo dígito
                    display.textContent = "0";
                    shouldClearDisplay = true;
                }
                else
                    display.textContent = display.textContent.slice(0, -1); // Eliminar el último dígito
            }
            else
            {
                display.textContent = "0";
                shouldClearDisplay = true;
            }
        }            
        else if (buttonText === "=") 
        {
            if (currentOperator && currentInput) 
            {
                const result = calculate(parseFloat(currentInput), currentOperator, parseFloat(display.textContent));
                display.textContent = result;
                currentInput = result;
                currentOperator = "";//falta que repita la ultima operacion
                shouldClearDisplay = true;
            }
        }
        else if (buttonText === "π")
        {
            display.textContent = Math.PI;
        }  
        else if (buttonText === "√")
        {
            display.textContent = Math.sqrt(parseFloat(display.textContent));
            currentInput = display.textContent;
            shouldClearDisplay = true;
        }
        else if (buttonText === "S")
        {
            if (display.textContent !== "0") // Asegúrate de que no cambie el signo de cero
            {
                const currentValue = parseFloat(display.textContent);
                display.textContent = currentValue * -1; // Cambia el signo del número
            }
        }
        else if (buttonText === ".")
        {//agregar un punto decimal (.0) al final
            if (!display.textContent.includes(".")) // Verifica si ya hay un punto decimal
            {
                display.textContent += "."; // Agrega un punto decimal al final
                shouldClearDisplay = false;
            }
        }
        else if (buttonText === "R")
        {
            coloraleatorio()
            //cambiar los colores aleatoriamente
        }
        else 
        {
            currentOperator = buttonText;
            currentInput = display.textContent;
            shouldClearDisplay = true;
        }
    });
});

function calculate(num1, operator, num2) 
{
    switch (operator) 
    {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            if (num2 !== 0) 
            {
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
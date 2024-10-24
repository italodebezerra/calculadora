// Seleciona os elementos do DOM para exibir as operações anteriores e atuais
const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");
  // Classe que representará a calculadora
class Calculator {
    // Métodos e propriedades para a lógica da calculadora
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""
    }
        // Adicionar dígito à tela da calculadora
    addDigit(digit) {
        //  Verifique se a operação atual já tem um ponto
        if(digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }

        this.currentOperation = digit
        this.updateScreen()
    }

    // Processar todas as operações da calculadora
    processOperation(operation) {

  // Verifique se a corrente está vazia
        if (this.currentOperationText.innerText === "" && operation !== "C") {
                //  Operação de alteração
            if (this.previousOperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }

    // Obter valor atual e anterior
    let operationValue;
    const previous = +this.previousOperationText.innerText.split(" ")[0];
    const current =  +this.currentOperationText.innerText;

    switch(operation) {
        case "+":
            operationValue = previous + current
            this.updateScreen(operationValue, operation, current, previous);
            break;
        case "-":
             operationValue = previous - current
             this.updateScreen(operationValue, operation, current, previous);
             break;
        case "/":
             operationValue = previous / current
             this.updateScreen(operationValue, operation, current, previous);
             break;
        case "*":
             operationValue = previous * current
             this.updateScreen(operationValue, operation, current, previous);
             break;
        case "DEL":
             this.processDeloperator();
             break; 
        case "CE":
             this.processClearCurrentOperation();
            break;  
        case "C":
             this.processClearAllOperations();
             break;  
        case "=":
             this.processEqualoperator();
             break;     
          default:
            return;
        }
    }

    // Alterar valores da tela da calculadora
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ) {

       if(operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
       } else {
            // Verifique se o valor é zero, se for apenas adicionar valor atual
            if(previous === 0) {
                operationValue = current
            }

            // adicionar valor atual ao anterior
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
       }
    }

    // Alterar operação matemática
    changeOperation(operation) {
        const mathOperations = ["*","/","+","-"]
        // Verifique se a operação é válida
        if (!mathOperations.includes(operation)) {
            return;
        }
        //  Mude o operador, mantendo o valor anterior
        const currentText = this.previousOperationText.innerText;
        this.previousOperationText.innerText = currentText.slice(0, -1) + operation;
    }

    // Delete o último dígito
    processDeloperator() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    // Operação de corrente clara
    processClearCurrentOperation() {
        // Limpar a operação atual
        this.currentOperationText.innerText = "";   
    }

    //para deletar a opração atual e anterior
    processClearAllOperations() {
        //limpar a operação atual
        this.currentOperationText.innerText = "";
        //limpar a operação aterior
        this.previousOperationText.innerText = "";

    } 
    

    // Processa uma operação
    processEqualoperator() {
     const operation = previousOperationText.innerText.split(" ")[1]

     this.processOperation(operation);
    }
}

const calc =  new Calculator(previousOperationText, currentOperationText);

// Adiciona um listener de eventos a cada botão
buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;
        // Exibe o valor do botão clicado no console
        if(+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    });
});
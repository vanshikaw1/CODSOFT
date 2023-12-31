class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear() /* calling clear function as soon as we create a new calculator*/
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined /* as they don't have any operations if they clear things*/
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return /*to not repeat period symbol*/
        this.currentOperand = this.currentOperand.toString() + number.toString()

    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return /*check in for if current operand is empty do not go further*/
        if (this.previousOperand !== '') {    /*if there is number in previous opd and user typed current opd and an operation, do the computation*/
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand  /* to move number up*/
        this.currentOperand = "" /* to clear out current operand */
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand) /*converted string to number*/
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return /*if no prev or current value then cancel function completely*/
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return /*in case of invalid operation*/

        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }


    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {  /* if user inputs nothing or just decimal place*/
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }




    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = '' /* empties outs the previous operand value*/
        }


    }



}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-opereand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => { /* this line means whenever we click on button we want to do something*/
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => { /* this line means whenever we click on button we want to do something*/
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})
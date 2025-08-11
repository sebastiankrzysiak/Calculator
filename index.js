function add (a, b) {
    return a + b
}

function subtract (a, b) {
    return a - b
}

function multiply (a, b) {
    return a * b
}

function divide (a, b) {
    return a / b   
}

function operate(num1, num2, operator) {
    if (operator === "+") {
        return add(num1, num2)
    }
    if (operator === "-") {
        return subtract(num1, num2)
    }
    if (operator === "*") {
        return multiply(num1, num2)
    }
    if (operator === "/") {
        return divide(num1, num2)
    }
}

let num1 = "0"
let num2 = ""
let operator = ""

const buttons = Array.from(document.querySelectorAll(".button"))
const screen = document.querySelector(".screen")
screen.textContent = num1

const DIGITS = new Set(['0','1','2','3','4','5','6','7','8','9'])
const OPERATORS = new Set(['+','-','*','/'])

const setScreen = v => { screen.textContent = v }
const opBtn = op => buttons.find(b => b.textContent === op)
const highlight = btn => { if (btn) btn.style.backgroundColor = "#454545" }
const dim = btn => { if (btn) btn.style.backgroundColor = "gray" }

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const t = button.textContent

    if (DIGITS.has(t)) {
      if (operator === "") {
        if (num1.length === 1 && num1 === "0") {
            num1 = ""
        }
        num1 += t
        setScreen(num1)
      }
      else {
        num2 += t
        setScreen(num2)
      }
      return
    }

    if (OPERATORS.has(t)) {
      if (operator === "" && num2 === "") {
        operator = t
        highlight(button)
      }
      else if (operator && num2) {
        let answer = Math.round(operate(Number(num1), Number(num2), operator))
        dim(opBtn(operator))
        setScreen(answer)
        num1 = answer
        num2 = ""
        operator = t
        highlight(button)
      }
      else {
        dim(opBtn(operator))
        operator = t
        highlight(button)
      }
      return
    }

    if (t === '=') {
      if (num2 && operator) {
        let answer = Math.round(operate(Number(num1), Number(num2), operator))
        dim(opBtn(operator))
        num1 = answer
        num2 = ""
        operator = ""
        setScreen(num1)
      }
      else {
        num1 = "0"
        setScreen(num1)
      }
      return
    }

    if (num2 && operator) {
      dim(opBtn(operator))
      num1 = "0"
      num2 = ""
      operator = ""
      setScreen(num1)
    }
    else {
      num1 = "0"
      setScreen(num1)
    }
  })
})
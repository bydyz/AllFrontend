import "../style/div_cpn.css"

const divEl = document.createElement("div")

divEl.textContent = "Hello World"
divEl.classList.add("content")
document.body.append(divEl)
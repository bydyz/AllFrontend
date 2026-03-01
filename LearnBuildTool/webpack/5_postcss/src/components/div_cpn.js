import "../style/div_cpn.css"
import "../style/div_cpn.less"


const divEl = document.createElement("div")
divEl.textContent = "Hello World"
divEl.classList.add("content")
document.body.append(divEl)


const divEl2 = document.createElement("div")
divEl2.textContent = "Hello World"
divEl2.classList.add("content2")
document.body.append(divEl2)
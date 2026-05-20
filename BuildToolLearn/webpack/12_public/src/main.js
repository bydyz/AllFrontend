import "./style/test.css"

const element = document.createElement("div")
element.innerHTML = "hello baby"
element.className = "content"

const pElement = document.getElementById("app")

pElement.appendChild(element)
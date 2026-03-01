import "./style.css"

import zznvImage from '../img/zznh.png'

// 图片img
const imgEl = document.createElement('img')
imgEl.src = zznvImage
document.body.append(imgEl)

// 背景图片
const bgDivEl = document.createElement("div")
bgDivEl.classList.add("bg-image")
document.body.append(bgDivEl)
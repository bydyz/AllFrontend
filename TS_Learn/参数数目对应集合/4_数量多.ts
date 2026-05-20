type IPerson = {
  name: string
  age: number
}

// typescript github issue, 成员        
const p = {
  name: "why",
  age: 18,
  height: 1.88,
  address: "广州市"
}

// ??????这里为啥，赋值给info的值超过设定的类型也不会报错呢？？？？？
// !!!前面是 函数的参数的类型限制是对象，当给函数传参时，需要严格按照限制传参
const info: IPerson = p



export {}
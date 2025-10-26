

//！ object对象类型可以用于描述一个对象，但是从其中不能获取数据，亦不可设置数据
//！ 会提示不存在   执行会报Property 'name' does not exist on type 'object'
let info2: object = {
  name: "why",
  age: 18,
  height: 1.88
}


//！ 对 info2中的某一属性 赋值，不可行
info2.name = 'rc'
console.log(info2.name)


//！ 直接对 info2 赋值，可行
info2 = {}
info2 = {
  name: 'rc'
}
info2 = function(){}
info2 = []
info2 = /regex/
info2 = new Date()


//！ 可对 info2 进行遍历
for (let key in info2) {
  if (info2.hasOwnProperty(key)) {
      console.log(key);
  }
}

// 打印
// name
// age
// height


//！ JavaScript 规范声明任何没有 export 的 JavaScript 文件都应该被认为是一个脚本，而非一个模块
//！ 如果你有一个文件，现在没有任何 import 或者 export，但是你希望它被作为模块处理，添加这行代码  export{}
export {}
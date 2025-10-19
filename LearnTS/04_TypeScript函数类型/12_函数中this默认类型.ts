//！ 在没有对TS进行特殊配置的情况下, this是any类型

//！ tsc --init    生成ts配置文件   tsconfig.json


//！ 1.对象中的函数中的this
const obj = {
  name: "why",
  studying: function() {
    // 默认情况下, this是any类型
    console.log(this.name, "studying")
  }
}

obj.studying()    // why studying
// 将this的指向指向了  {name: [1, 2]}
obj.studying.call({name: [1, 2]})   // [1, 2] studying



//！ 2.普通的函数    tsconfig.js里设置 noImplicitThis 为 false时，可以正常使用   默认其值为false
/* 
VSCode在检测我们的TypeScript代码时，默认情况下运行不确定的this按照any类型去使用。但是我们可以创建一个tsconfig.json文件，并且在其中告知VSCode this必须明确执行

在设置了noImplicitThis为true时， TypeScript会根据上下文推导this，但是在不能正确推导(包括推导为any)，就会报错，需要我们明确
的指定this
*/
function foo() {
  console.log(this)
}

export {}

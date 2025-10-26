//！ 在没有对TS进行特殊配置的情况下, this是any类型

//！ tsc --init    生成ts配置文件   tsconfig.json


//！ 2.普通的函数    tsconfig.js里设置 noImplicitThis 为 false时，可以正常使用   默认其值为false
/* 
VSCode在检测我们的TypeScript代码时，默认情况下运行不确定的this按照any类型去使用。
但是我们可以创建一个tsconfig.json文件，并且在其中告知VSCode this必须明确执行


在设置了noImplicitThis为true时， TypeScript会根据上下文推导this，
但是在不能正确推导(包括推导为any)，就会报错，需要我们明确的指定this
*/
function foo(this: {}) {
  console.log(this)   // {}
}

export {}

//！ 在设置配置选项(编译选项compilerOptions, noImplicitThis设置为true, 不允许模糊的this存在)

//！ 在开启noImplicitThis的情况下，我们必须指定this的类型。
//！ ◼ 如何指定呢？函数的第一个参数类型：
//！   函数的第一个参数我们可以根据该函数之后被调用的情况，用于声明this的类型（名词必须叫this）；
//！   在后续调用函数传入参数时，用于指定this的部分，不用传参，从第二个参数开始传递的，this参数会在编译后被抹除



// 2.普通的函数
function foo(this: { name: string }, info: {name: string}) {
  console.log(this, info)
}


//！ 相当于在函数中，有对  this  进行限制，但是在调用时没有，就会报上述错误
foo({ name: "kobe" })   // 类型为“void”的 "this" 上下文不能分配给类型为“{ name: string; }”的方法的 "this"。   需要像下方一样，绑定一个this
foo.call({ name: "why" }, { name: "kobe" })




//！ 似乎function的参数this是用来限制后面利用call、apply来修改this指向时指向的this
export {}

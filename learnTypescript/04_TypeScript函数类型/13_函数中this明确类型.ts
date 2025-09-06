//！ 在设置配置选项(编译选项compilerOptions, noImplicitThis设置为true, 不允许模糊的this存在)

//！ 在开启noImplicitThis的情况下，我们必须指定this的类型。
//！ ◼ 如何指定呢？函数的第一个参数类型：
//！   函数的第一个参数我们可以根据该函数之后被调用的情况，用于声明this的类型（名词必须叫this）；
//！   在后续调用函数传入参数时，用于指定this的部分，不用传参，从第二个参数开始传递的，this参数会在编译后被抹除

// 1.对象中的函数中的this
const obj = {
  name: "why",
  studying: function(this: {}) {
    // 默认情况下, this是any类型
    console.log(this, "studying")
  }
}

// !    需要在  函数  以及  函数的调用处  都加以对this进行指向才可
// 此时this指向  obj   
obj.studying()
// 上面制定了this: {}    此处调用有修改this的指向，但是利用[]也不会报错
obj.studying.call([])










const obj1 = {
  name: "why",
  studying: function(this: { name: string }) {
    // 默认情况下, this是any类型
    console.log(this, "studying")
  }
}

// obj1 是对象，其本身有this，因此即是其中的函数有限制this的类型，但是调用时不需要指定 
obj1.studying()
// 但是如果制定了this的类型，必须要正确
obj1.studying.call([])
obj1.studying.call({name: '666'})















// 2.普通的函数
function foo(this: { name: string }, info: {name: string}) {
  console.log(this, info)
}

// 类型为“void”的 "this" 上下文不能分配给类型为“{ name: string; }”的方法的 "this"。   需要像下方一样，绑定一个this
//！ 相当于在函数中，有对  this  进行限制，但是在调用时没有，就会报上述错误
foo({ name: "kobe" })
foo.call({ name: "why" }, { name: "kobe" })







function foo1(this: {}, info: {name: string}) {
  console.log(this, info)
}

// 此时虽然  this的限定是 {}，但调用时不限定this依旧报错
foo1({ name: "kobe" })     
foo1.call({ name: "why" }, { name: "kobe" })







//！ 似乎function的参数this是用来限制后面利用call、apply来修改this指向时指向的this
export {}

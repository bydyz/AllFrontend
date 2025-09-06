// Genertor 函数

// Genertor 函数是es6 新增的一种异步编程的解决方案，语法和传统的函数完全不同；Genertor 函数的最大的特点就是可以交出函数的执行权（即暂停执行）。

// 1）形式上： Generator函数是一个普通的函数，不过相对于普通函数多出了两个特征。一是在function关键字和函数明之间多了 * 号；二是函数内部使用了yield表达式，用于定义Generator函数中的每个状态。

// 2）语法上： Generator函数封装了多个内部状态(通过yield表达式定义内部状态)。执行Generator函数时会返回一个遍历器对象(Iterator(迭代器)对象)。也就是说，Generator是遍历器对象生成函数，函数内部封装了多个状态。通过返回的Iterator对象，可以依次遍历(调用next方法)Generator函数的每个内部状态。

// 3）调用上： 普通函数在调用之后会立即执行，而Generator函数调用之后不会立即执行，而是会返回遍历器对象(Iterator对象)。通过Iterator对象的next方法来遍历内部yield表达式定义的每一个状态

function *myGenerator() {
  console.log('执行到第一个yield之前的打印')
	yield 'Hello'
  console.log('执行到第二个yield之前的打印')
	yield 'world'
  console.log('执行到return之前的打印')
	return 'ending'
}

let MG = myGenerator()
console.log(MG)

console.log(MG.next()) // {value:'Hello',done:false}
console.log(MG.next()) // {value:'world',done:false}
console.log(MG.next()) // {value:'ending',done:true}
console.log(MG.next()) // {value:'undefined',done:false}

// 上面代码一共调用了四次next方法。

// 第一次调用，Generator 函数开始执行，直到遇到第一个yield表达式为止。next方法返回一个对象，它的value属性值就是当前yield表达式的值hello，done属性的值false，表示遍历还没有结束。

// 第二次调用，Generator 函数从上次yield表达式停下的地方，一直执行到下一个yield表达式。next方法返回的对象的value属性就是当前yield表达式的值world，done属性的值false，表示遍历还没有结束。

// 第三次调用，Generator 函数从上次yield表达式停下的地方，一直执行到return语句（如果没有return语句，就执行到函数结束）。next方法返回的对象的value属性，就是紧跟在return语句后面的表达式的值（如果没有return语句，则value属性的值为undefined），done属性的值true，表示遍历已经结束。

// 第四次调用，此时 Generator 函数已经运行完毕，next方法返回对象的value属性为undefined，done属性为true。以后再调用next方法，返回的都是这个值。

// 调用 Generator 函数，返回一个遍历器对象，代表 Generator 函数的内部指针。以后，每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象。value属性表示当前的内部状态的值，是yield表达式后面那个表达式的值；done属性是一个布尔值，表示是否遍历结束。
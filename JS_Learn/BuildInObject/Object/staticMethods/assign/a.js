// Object.assign(target, ...sources)

// 参数
//   target
//     需要应用源对象属性的目标对象，修改后将作为返回值。

//   sources
//     一个或多个包含要应用的属性的源对象。

// 返回值
//   修改后的目标对象。


const obj = { nested: { a: 1 } };

//！ 创建一个新对象，将 obj 的属性 浅拷贝 到 新对象 之中
let copyParam = Object.assign({}, obj);

// 刚开始时  两个对象的 属性是相同的
console.log(obj, copyParam, obj === copyParam, obj.nested === copyParam.nested);

copyParam.nested = { a: 1 };

// 经过上面的设置， copyParam.nested 的引用发生改变
console.log(obj, copyParam, obj === copyParam, obj.nested === copyParam.nested);

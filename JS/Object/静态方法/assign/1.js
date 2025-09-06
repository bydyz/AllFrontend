const obj = { nested: { a: 1 } };

let copyParam = Object.assign({}, obj);

// 刚开始是 同一个对象
console.log(obj, copyParam, obj.nested === copyParam.nested);

copyParam.nested = { a: 1 };

// 经过上面的设置， copyParam.nested 的引用发生改变
console.log(obj, copyParam, obj.nested === copyParam.nested);

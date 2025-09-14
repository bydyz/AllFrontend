const obj = { nested: { a: 1 } };

let copyParam = Object.assign({}, obj);

// 刚开始是 同一个对象
console.log(obj, copyParam, obj.nested === copyParam.nested);

copyParam.nested = { a: 2 };

// 两个对象的 nested  是不同的
console.log(obj, copyParam);

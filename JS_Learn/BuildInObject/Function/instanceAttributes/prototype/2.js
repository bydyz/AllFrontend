// 下列的函数不具有 prototype 属性，因此不能成为构造函数，即便后续手动赋予了 prototype 属性

const method = { foo() {} }.foo;
const arrowFunction = () => {};
async function asyncFunction() {}
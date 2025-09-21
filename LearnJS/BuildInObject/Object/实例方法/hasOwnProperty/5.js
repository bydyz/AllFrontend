// 在支持 Object.hasOwn 的浏览器中，建议使用 Object.hasOwn()，而非 hasOwnProperty()。

const parent = { inherited: 'from parent' };
const child = Object.create(parent);
child.own = 'own property';

console.log(child.hasOwnProperty('own'));       // true
console.log(child.hasOwnProperty('inherited')); // false
console.log('inherited' in child);              // true ( in操作符会检查原型链 )
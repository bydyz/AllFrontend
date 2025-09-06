// null 和 undefined 会被转换为空对象
const fromNull = Object(null);
const fromUndefined = Object(undefined);

console.log(fromNull); // {}
console.log(fromUndefined); // {}

// 但这可能不是你想要的行为
function safeAccess(obj, prop) {
    const safeObj = Object(obj); // 如果 obj 是 null/undefined，变成 {}
    return safeObj[prop];
}

console.log(safeAccess(null, 'name')); // undefined
console.log(safeAccess({ name: 'John' }, 'name')); // "John"
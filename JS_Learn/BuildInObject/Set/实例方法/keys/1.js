// Set 实例的 keys() 方法是 values() 方法的别名。

// keys() 方法完全等价于 values() 方法


const mySet = new Set();
mySet.add("foo");
mySet.add("bar");
mySet.add("baz");

const setIter = mySet.keys();

console.log(setIter.next().value); // "foo"
console.log(setIter.next().value); // "bar"
console.log(setIter.next().value); // "baz"
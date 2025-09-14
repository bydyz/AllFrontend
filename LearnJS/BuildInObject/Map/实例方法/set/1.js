// Map 实例的 set() 方法会向 Map 对象添加或更新一个指定的键值对。


const myMap = new Map();

// 将一个新元素添加到 Map 对象
myMap.set("bar", "foo");
myMap.set(1, "foobar");

// 在 Map 对象中更新某个元素的值
myMap.set("bar", "baz");



// 链式添加元素
myMap.set("bar", "foo").set(1, "foobar").set(2, "baz");



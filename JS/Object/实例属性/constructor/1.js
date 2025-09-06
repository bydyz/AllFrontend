// Object 实例的 constructor 数据属性返回一个引用，指向创建该实例对象的构造函数。
// 注意，此属性的值是对函数本身的引用，而不是一个包含函数名称的字符串。


const o1 = {};
o1.constructor === Object; // true

const o2 = new Object();
o2.constructor === Object; // true

const a1 = [];
a1.constructor === Array; // true

const a2 = new Array();
a2.constructor === Array; // true

const n = 3;
n.constructor === Number; // true
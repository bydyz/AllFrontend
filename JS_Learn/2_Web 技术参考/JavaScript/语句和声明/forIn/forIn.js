// for...in 语句迭代一个对象的所有可枚举字符串属性（除 Symbol 以外），包括继承的可枚举属性。

var obj = { a: 1, b: 2, c: 3 };

// prop  是  属性key
for (var prop in obj) {
  console.log("obj." + prop + " = " + obj[prop]);
}

// "obj.a = 1"
// "obj.b = 2"
// "obj.c = 3"



// for ... in是为遍历对象属性而构建的，不建议与数组一起使用，数组可以用Array.prototype.forEach()和for ... of
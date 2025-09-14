// JSON.stringify()、JSON.parse()是 JavaScript 语言的一部分，提供了用于解析和序列化 JSON 数据的内置方法。


// JSON.stringify() 可以转换以下几种类型的值：

// 对象（Object）： 可以是普通对象、数组、函数、RegExp 等。
// 数组（Array）： 可以包含各种类型的值。
// 字符串（String）： 字符串会被原样输出，不进行二次转义。
// 数字（Number）： 包括整数和浮点数。
// 布尔值（Boolean）：
// null：





// 对于包含循环引用的对象，JSON.stringify() 会抛出错误。
// 不支持对函数、undefined 和 Symbol 进行序列化。在对象中包含这些值时，它们会在结果中被省略或转换为 null。
// RegExp 对象会转换为空对象 {}。
// NaN 和 Infinity 转换为 null。
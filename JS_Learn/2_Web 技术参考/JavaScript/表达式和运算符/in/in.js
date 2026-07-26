// in
//  如果指定的属性在指定的对象或其原型链中，则 in 运算符返回 true。

// 语法
// 	prop in object

// prop
//   一个字符串类型或者 symbol 类型的属性名或者数组索引（非 symbol 类型将会强制转为字符串）。

// objectName
//   检查它（或其原型链）是否包含具有指定名称的属性的对象。


	// 数组
	var trees = new Array("redwood", "bay", "cedar", "oak", "maple");
	console.log(0 in trees)        // 返回true
	console.log(3 in trees)        // 返回true
	console.log(6 in trees)        // 返回false
	console.log('really??', "bay" in trees)    // 返回false (必须使用索引号,而不是数组元素的值)
	
	console.log("length" in trees) // 返回true (length是一个数组属性)
	
	console.log(Symbol.iterator in trees) // 返回true (数组可迭代，只在ES2015+上有效)
	
	
	// 内置对象
	console.log("PI" in Math)          // 返回true
	

	// 自定义对象
	var myCar321 = {make: "Honda", model: "Accord", year: 1998};
	console.log("in Object", "make" in myCar321)  // 返回true
	console.log("model" in myCar321) // 返回true
	console.log("Honda" in myCar321) // 返回false








  // in 右操作数必须是一个对象值。例如，你可以指定使用 String 构造函数创建的字符串，但不能指定字符串文字。
  var color1 = new String("green");
	console.log("length" in color1) // 返回true
	var color2 = "coral";
	// console.log("length" in color2) // 报错(color2不是对象)








  // 如果你使用 delete 运算符删除了一个属性，则 in 运算符对所删除属性返回 false。
  var myCar32 = {make: "Honda", model: "Accord", year: 1998};
	delete myCar32.make;
	console.log("make" in myCar32);  // 返回false
	
	var trees = new Array("redwood", "bay", "cedar", "oak", "maple");
	delete trees[3];
	console.log(3 in trees); // 返回false










  // 如果你只是将一个属性的值赋值为 undefined，而没有删除它，则 in 运算仍然会返回 true。
  var myCar3 = {make: "Honda", model: "Accord", year: 1998};
	myCar3.make = undefined;
	console.log("make" in myCar3);  // 返回true

  var trees = new Array("redwood", "bay", "cedar", "oak", "maple");
	trees[3] = undefined;
	console.log(3 in trees); // 返回true






  // 如果一个属性是从原型链上继承来的，in 运算符也会返回 true。


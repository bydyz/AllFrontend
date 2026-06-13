// null 和 undefined
console.log(new Object(null)); // {}
console.log(Object(null));     // {}

console.log(new Object(undefined)); // {}
console.log(Object(undefined));     // {}

// 布尔值
console.log(new Object(true));  // Boolean {true}
console.log(Object(true));      // Boolean {true}

// 数字
console.log(new Object(42));    // Number {42}
console.log(Object(42));        // Number {42}

// 字符串
console.log(new Object("hello")); // String {"hello"}
console.log(Object("hello"));     // String {"hello"}
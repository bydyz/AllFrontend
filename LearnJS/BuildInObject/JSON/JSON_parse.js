// JSON.stringify()、JSON.parse()是 JavaScript 语言的一部分，提供了用于解析和序列化 JSON 数据的内置方法。

// JSON 字符串的格式要求相对简单，它主要包括以下几点：



// 对象表示： JSON 字符串可以表示一个对象，对象是由一对大括号 {} 包裹的键值对组成，键和值之间使用冒号 : 分隔，键值对之间使用逗号 , 分隔。键必须是字符串，而值可以是字符串、数字、布尔值、数组、对象、null。      然后外面加一层  ``  或  ''

`{
  "name": "John",
  "age": 30,
  "isStudent": false,
  "grades": [90, 85, 92],
  "address": {
    "city": "New York",
    "country": "USA"
  },
  "isActive": null
}`



// 数组表示： JSON 字符串可以表示一个数组，数组是由一对方括号 [] 包裹的值组成，各个值之间使用逗号 , 分隔。数组可以包含字符串、数字、布尔值、数组、对象、null。

'["apple", "banana", 42, true, [1, 2, 3], null]'



// 字符串表示： 字符串需要使用双引号 " 包裹，单引号是不允许的。

'"Hello, World!"'



// 数字表示： 数字可以包括整数和浮点数，不需要使用引号包裹。

'42'
'3.14'



// 布尔值表示： 布尔值表示为 true 或 false，不需要使用引号包裹。

'true'
'false'



// null 表示： 表示空值的关键字是 null，不需要使用引号包裹。

// JSON.parse(null)（不推荐）    JSON.parse('null')   结果都是 null
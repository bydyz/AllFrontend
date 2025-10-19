//! 1.字面量类型的基本上
const name: "why" = "why"
let age: 18 = 18



//! 2.将多个字面量类型联合起来 |
type Direction = "left" | "right" | "up" | "down"
const d1: Direction = "left"



// 栗子: 封装请求方法
type MethodType = "get" | "post"
function request(url: string, method: MethodType) {
}

request("http://codercba.com/api/aaa", "post")








//！ 此处直接复制，会进行 类型断言 ， 或 判定 info.url 、 info.method 的类型都为 string
const info = {
  url: "xxxx",
  method: "post"
}
//！ 下面的做法是错误: info.method获取的是string类型   而request的method是字面量，get | post
request(info.url, info.method)


// 解决方案一: info.method进行类型断言
request(info.url, info.method as "post")     // !!!!!!可以把  string  断言为  post   由不太具体的string断言为具体的"post"确实可行


// 解决方案二: 直接让info对象类型是一个字面量类型
const info2: { url: string, method: "post" } = {
  url: "xxxx",
  method: "post"
}





//！ TypeScript 的 as const 语法，将对象 info3 中的所有属性设定为只读（readonly）。后面修改则会报错
//！ as const   会推断  info3.url 、 info3.method 为 字面量类型
//！ 要求传入 string 可以传入 字面量类型数据
const info3 = {
  url: "xxxx",
  method: "post"
} as const        //?   这里加上的   as const是什么鬼     此时info3的属性前有 readOnly       且用 info3 调用method  它的类型是确定的post
// xxx 本身就是一个string
request(info3.url, info3.method)

export {}


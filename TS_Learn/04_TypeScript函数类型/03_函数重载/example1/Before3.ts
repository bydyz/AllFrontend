//! 需求: 只能将两个数字/两个字符串进行相加


//！ 错误的做法: 联合类型是不可以         运算符“+”不能应用于类型“string | number”和“string | number”
function add(arg1: number|string, arg2: number|string) {
  return arg1 + arg2
}

add(10, 20)
add("aaa", "bbb")
add(10 , "aaa")
add("aaa", 111)

export {}

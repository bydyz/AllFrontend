//! 需求: 只能将两个数字/两个字符串进行相加

//！ 案例分析: any实现
function add(arg1: any, arg2: any) {
  return arg1 + arg2
}

add(10, 20)
add("abc", "cba")
add({aaa: "aaa"}, 123)


export {}

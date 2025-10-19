//！ 从ES6开始，JavaScript也支持剩余参数，剩余参数语法允许我们将一个不定数量的参数放到一个数组中


//！ 这里的   (string | number)[]  是args的类型
function foo(...args: (string | number)[]) {

}

foo(123, 321)
foo(1, 2, 3)
foo("abc", 111, "cba")

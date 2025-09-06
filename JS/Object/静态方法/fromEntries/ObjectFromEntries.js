// ObjectFromEntries


// Object.fromEntries()和Object.entries()配套，是将特定的数组对象转换成对象格式


const arr = [ [ 'foo', 'bar' ], [ 'baz', 42 ] ]

/*数组对象中的数组只能有两个值，是类似键值对格式的数组，如果有多的将会被忽略不纳入转换
的对象数据中，以前两个数据为准进行数据格式的转换*/
const arr1 = [ [ 'foo', 'bar','obj' ], [ 'baz', 42,'name','jerry' ] ] 
console.log(Object.fromEntries(arr)) //{ foo: 'bar', baz: 42 }
console.log(Object.fromEntries(arr1))//{ foo: 'bar', baz: 42 } 两个数组得到的是一样的

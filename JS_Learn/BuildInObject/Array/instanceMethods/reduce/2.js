// reduce() 对于空数组是不会执行回调函数的

// array.reduce(function(prev, cur, index, arr), init)

// prev （上一次调用回调返回的值，或者是提供的初始值（initialValue））
// cur （数组中当前被处理的元素）
// index （当前元素在数组中的索引)
// arr （调用的数组）
// init （传递给函数的初始值）


// 带初始值

// var arr = [1,2,3,4]
// var sum = arr.reduce((pre, item) => {
//     return pre + item
// }, 10)
// console.log(sum) // 20

// 不带初始值

// var arr = [1,2,3,4]
// var sum = arr.reduce((pre, item) => {
//     return pre + item
// },)
// console.log(sum) // 10




// reduce数组去重

// var arr = [1,2,3,3,2,1,4]
// arr.reduce((acc, cur) => {
//   if (!(acc.includes(cur))) {
//     acc.push(cur)
//   }
//   return acc
// }, [])
// [1, 2, 3, 4]





// 求数组项最大值
// var arr = [1, 2, 3, 4];
// arr.reduce((prev, cur) => {
//     return Math.max(prev,cur);
// });
//4






// 将二维数组转为一维数组
// var arr = [[1,2], [3,4], [5,6]]
// arr.reduce((acc, cur) => {
//   return acc.concat(cur)
// }, [])
// [1,2,3,4,5,6]








// reduce对象里的属性求和
// var arr = [
//     {subject: 'Math', score: 90},
//     {subject: 'Chinese', score: 90},
//     {subject: 'English', score: 100}
// ]
// arr.reduce((pre, cur) => {
//     return cur.score + pre
// }, 0)
//280








// reduce计算数组中每个元素出现的个数
// var arr = [1, 2,3,3,2,1,2,1]
// arr.reduce((acc, cur) => {
//   if (!(cur in acc)) {
//     acc[cur] = 1
//   } else {
//     acc[cur] += 1
//   }
//   return acc
// }, {})
//{1: 3, 2: 3, 3: 2}










// reduce按属性给数组分类
// var arr = [
//     {subject: 'Math', score: 90},
//     {subject: 'Chinese', score: 90},
//     {subject: 'English', score: 100},
//     {subject: 'Math', score: 80},
//     {subject: 'Chinese', score: 95}
// ];
// var result = arr.reduce((acc, cur) => {
//   if (!acc[cur.subject]) {
//     acc[cur.subject] = [];
//   }
//   acc[cur.subject].push(cur)
//   return acc
// }, {})

// console.log(result)











// reduce实现forEach      reduce会执行的次数等于  Array.length  
// var arr = [1, 2, 3, 4]
// Array.prototype.reduceForEach = function(callback) {
//   this.reduce((acc, cur, index, array) => {
//     callback(cur, index, array)
//     // 传入函数，这里调用函数
//   }, [])
// }

// arr.reduceForEach((item, index, array) => {
//   console.log(item, index)
// })



// 1 0   2 1   3 2   4 3











// // reduce实现filter
// var arr = [1, 2, 3, 4]
// Array.prototype.reduceFilter = function (callback) {
//    return this.reduce((acc, cur, index, array) => {
//     if (callback(cur, index, array)) {
//       acc.push(cur)
//     }
//     return acc
//   }, [])
// }
// arr.reduceFilter(item => item % 2 == 0) // 过滤出偶数项。
// // [2, 4]











// reduce实现find
var arr = [1, 2, 3, 4]
var obj = [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }]
Array.prototype.reduceFind = function (callback) {
  return this.reduce((acc, cur, index, array) => {
    if (callback(cur, index, array)) {
      if (acc instanceof Array && acc.length == 0) {
        acc = cur
      }
    }    
    if ((index == array.length - 1) && acc instanceof Array && acc.length == 0) {
      acc = undefined
    }
    return acc
  }, [])
}
arr.reduceFind(item => item % 2 == 0) // 2
obj.reduceFind(item => item.a % 2 == 0) // {a: 2}
obj.reduceFind(item => item.a % 9 == 0) // undefined
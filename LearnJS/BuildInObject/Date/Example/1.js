// 案例 - 时间差

// 第一段
// // 1. 准备两个时间节点
// let time1 = new Date( 2021, 1, 23, 11, 22, 18 )
// let time2 = new Date( 2021, 1, 25, 3, 45, 36 )

// // 2. 获取到两个时间节点的时间戳
// let ms1 = time1.getTime()
// let ms2 = time2.getTime()

// // 3. 两个时间戳相减得到相差的毫秒数
// let sub = ms2 - ms1

// // 输出一下相差的毫秒数
// console.log( sub )





// 第二段
// // 1. 准备两个时间节点
// let time1 = new Date( 2021, 1, 23, 11, 22, 18 )
// let time2 = new Date( 2021, 1, 25, 3, 45, 36 )

// // 2. 获取到两个时间节点的时间戳
// let ms1 = time1.getTime()
// let ms2 = time2.getTime()

// // 3. 两个时间戳相减得到相差的秒数       为什么要向上取整呢？
// let sub = Math.ceil( (ms2 - ms1) / 1000 )

// // 输出一下相差的秒数
// console.log( sub )





// 第三段
// // 1. 准备两个时间节点
// let time1 = new Date( 2021, 1, 23, 11, 22, 18 )
// let time2 = new Date( 2021, 1, 25, 3, 45, 36 )

// // 2. 获取到两个时间节点的时间戳
// let ms1 = time1.getTime()
// let ms2 = time2.getTime()

// // 3. 两个时间戳相减得到相差的秒数
// let sub = Math.ceil( (ms2 - ms1) / 1000 )

// // 4. 开始换算
// // 4-1. 换算天
// let day = Math.floor( sub / ( 60 * 60 * 24 ) )
// “/”表示取整，计算间隔多少天

// // 4-2. 换算小时
// let hours = Math.floor( sub % ( 60 * 60 * 24 ) / ( 60 * 60 ) )
// “%”表示取余，表示取完整数天后的剩余，再对60*60取整，则表示有多少小时

// // 4-3. 换算分钟
// let minutes = Math.floor( sub % ( 60 * 60 ) / 60 )
// sub % (60 * 60)表示总间隔时间在算完间隔天数，小时数后剩余的秒数，再/60然后向下取整就表示可以取多少分钟

// // 4-4. 换算秒钟
// let seconds = sub % 60
// sub % 60表示总间隔时间在算完总的间隔分钟后剩余的秒数

// console.log(day, hours, minutes, seconds)

// 第一，二，三段都要看！！！！！！！！！！！！





// 第四段
// 1. 准备两个时间节点
let time1 = new Date(2021, 1, 23, 11, 22, 18);
let time2 = new Date(2021, 1, 25, 3, 45, 36);

// 准备一个函数, 接受两个参数
function getDiff(time1, time2) {
  // 获取到两个时间节点的时间戳
  let ms1 = time1.getTime();
  let ms2 = time2.getTime();
  // 两个时间戳相减得到相差的秒数
  let sub = Math.ceil((ms2 - ms1) / 1000);
  // 开始换算
  let day = Math.floor(sub / (60 * 60 * 24));
  let hours = Math.floor((sub % (60 * 60 * 24)) / (60 * 60));
  let minutes = Math.floor((sub % (60 * 60)) / 60);
  let seconds = sub % 60;

  return { day: day, hours: hours, minutes: minutes, seconds: seconds };
  // 这个如何区分哪个是表示，哪个是数据呢？？？？？？？？？
  // 用对象数据类型的方式返回，所以前面表示键（key），后面表示值（value）
  // return后面还可以加数值，变量名，表达式，对象，不等式（在数组方法中）
}

// 需要获取 time1 和 time2 之间的时间差
let res = getDiff(time1, time2);
// 因为返回值是个对象，所以变量res是个对象数据类型
console.log(res);

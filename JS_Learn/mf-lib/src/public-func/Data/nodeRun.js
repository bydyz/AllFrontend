// 1.将数字转化为中文
let NumToCn = n => {
  if (typeof n !== 'number') return n
  let cnNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  let unit = ['', '十', '百', '千', '万']

  let ns = n.toString().split('')
  let cnStr = ns.map((x, i) => {
    if (x === '0') return x
    return cnNum[x] + unit[ns.length - i - 1]
  }).join('')
  cnStr = cnStr.replace(/0+$/, '')              //正则几乎不明白
  cnStr = cnStr.replace(/0+/g, '零')            //基本方法也不是很熟悉
  return cnStr
}

// 似乎，最多6位数，且是整数
console.log()
console.log('NumToCn方法结果：', NumToCn(61))
console.log()







// 2.计算数组之和
const Sum = (arr, key = 'total') => {
  let s = 0
  switch (typeof key) {
    case 'string':
      arr.forEach(item => s += Number(item[key]))
      break
    case 'function':
      arr.forEach(item => s += Number(key(item)))
      break
  }
  return s
}

/** 
在项目中，最终暴露时，还需要这样绑定到Array的原型上

Array.prototype.Sum = function(key) {
  return Sum(this, key)       
* ！最终这个this就是调用Sum的数组
}

项目中的使用：
this.courseContent.chapterList?.Sum(item => item.lessonList?.length)

共{{ group.questionList.Sum('score') || 0 }}分
*/

console.log()
let students = [
  {score: 90, id: 1},
  {score: 91, id: 2},
  {score: 92, id: 3},
]
// let func = item => (1 + item)   这样写有问题
/**
 * ?箭头函数，还需要好好看看
 */
let func = item => {
  return(1 + item.score)
}
// console.log('Sum方法结果：', Sum(students, 'score'))
console.log('Sum方法结果：', Sum(students, func))
console.log()








// 3.isKeepZero == 是否保留末尾小数
const FormatNumber = (value, n = 2, isFormatIntPart = true, isKeepZero = false) => {
  let num = Number(value)
  // 无穷大
  if (!Number.isFinite(num) || num.toString().includes('e')) return '∞'
/* 
isFinite()方法是JavaScript中的Number方法，用于检查给定数字是否为有限数字。如果给定的数量是有限数，则返回true，否则，返回false。
*/
  // 非数字 返回默认值
  if (isNaN(num)) num = 0
/* 
NaN:非数值（not a number）,是一个特殊的数值，用来表示本来要返回数值的操作数未返回数值的情况。在ECMAScript中，任何数值除以非数值会返回NaN,不会影响其他代码的执行。
*/
  // 数字精度 处理
  num = num.toFixed(n)
  // 数字格式化处理
  let intPart = num.toString().split('.')[0]
  if (isFormatIntPart) intPart = intPart.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')   //这个玩意是干嘛的？？？
  let floatPart = n ? num.toString().match(/\.\d+$/)[0] : ''
  floatPart = parseInt(floatPart.split('').reverse().join(''))
  if (!floatPart) return intPart
  floatPart = floatPart.toString().split('').reverse().join('')
  return intPart + '.' + floatPart
}

console.log()
// console.log('FormatNumber方法结果：', FormatNumber(99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999))    //数值较大时，会用1e+98来展示
console.log('FormatNumber方法结果：', FormatNumber(999.88))    
console.log()
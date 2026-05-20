// TODO 数字转换成中文
export const NumToCn = n => {
  if (typeof n !== 'number') return n
  let cnNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  let unit = ['', '十', '百', '千', '万']

  let ns = n.toString().split('')
  let cnStr = ns.map((x, i) => {
    if (x === '0') return x
    return cnNum[x] + unit[ns.length - i - 1]
  }).join('')
  cnStr = cnStr.replace(/0+$/, '')
  cnStr = cnStr.replace(/0+/g, '零')
  return cnStr
}

// 计算数组之和
export const Sum = (arr, key = 'total') => {
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

// isKeepZero == 是否保留末尾小数
export const FormatNumber = (value, n = 2, isFormatIntPart = true, isKeepZero = false) => {
  let num = Number(value)
  // 无穷大
  if (!Number.isFinite(num) || num.toString().includes('e')) return '∞'

  // 非数字 返回默认值
  if (isNaN(num)) num = 0

  // 数字精度 处理
  num = num.toFixed(n)
  // 数字格式化处理
  let intPart = num.toString().split('.')[0]
  if (isFormatIntPart) intPart = intPart.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  let floatPart = n ? num.toString().match(/\.\d+$/)[0] : ''
  floatPart = parseInt(floatPart.split('').reverse().join(''))
  if (!floatPart) return intPart
  floatPart = floatPart.toString().split('').reverse().join('')
  return intPart + '.' + floatPart
}

/*
* ArrayFlat 扁平化数组 [ {a}, {b,children:[ {c} ]}] => [ {a}, {b,children}, {c} ]
* @arr:array 源数组
* @key:string = 'children' 子数组
* */
export const ArrayFlat = (arr, key = 'children') => arr.map(item => item[key] ? [item, ...ArrayFlat(item[key], key)] : [item]).flat()

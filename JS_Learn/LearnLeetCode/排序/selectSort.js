// 一轮一轮的比较，每次选出最大的，放在最后面

function selectSort(array) {
  if(!(array && array.length)) return false
  for(let i = 0; i < array.length - 1; i++) {
    let maxIndex = 0
    let max = array[0]
    for(let j = 1; j < array.length - i; j++) {
      if(max < array[j]) {
        maxIndex = j
        max = array[j]
      }
    }
    let middle = array[maxIndex]
    array[maxIndex] = array[array.length - 1 - i]
    array[array.length - 1 - i] = middle
  }
  return array
}

console.log(selectSort(1))
console.log('')
console.log(selectSort([]))
console.log('')
console.log(selectSort([6, 2, 3, 9, 12, 5, 1]))
console.log('')
console.log(selectSort([6, 2, 3, 9, 12, 5, 1, 21, 8, 37, 11, 7]))
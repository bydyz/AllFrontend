// 一轮一轮地两两比较，每次把大的移到后面

function bubbleSort(argument) {
  if(!(argument && argument.length)) return false
  for(let i = 0; i < argument.length - 1; i++) {
    for(let j = 0; j < argument.length - 1 - i; j++) {
      compareAndChange(j, argument)
    }
  }

  return argument
}

function compareAndChange(index, array) {
  if(array[index] > array[index + 1]) {
    let middle = array[index]
    array[index] = array[index + 1]
    array[index + 1] = middle
  }
}

console.log(bubbleSort(1))
console.log('')
console.log(bubbleSort([]))
console.log('')
console.log(bubbleSort([6, 2, 3, 9, 12, 5, 1]))
console.log('')
console.log(bubbleSort([6, 2, 3, 9, 12, 5, 1, 21, 8, 37, 11, 7]))
const arr1 = [ 1, 2, 3, 4, 5, 6 ]

const arr2 = arr1.slice(1, 3)
console.log(arr1, arr2)

// !   使用call
const arr3 = Array.prototype.slice.call(arr1, 1, 3)
console.log(arr1, arr3)

// !   使用apply
const arr4 = Array.prototype.slice.apply(arr1, [1, 3])
console.log(arr1, arr4)

// !   使用bind     它会返回一个函数
const slice = Array.prototype.slice.bind(arr1)    // 返回的函数 slice 的this永远绑定  bind() 的传参 arr1
const arr5 = slice(1, 3)
console.log(arr1, arr5)



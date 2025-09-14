// 不 影响 参与数组，
// 返回 浅拷贝后合并的数组
// 不传参时，拷贝调用数组

const array1 = ["a", "b", "c"];
const array2 = "f";
const array3 = array1.concat(array2);

console.log(array1)
console.log(array2)
console.log(array3)
// 影响原数组，
// 添加到数组的末尾，返回值为新的数组长度

// push()
// push(element0)
// push(element0, element1)
// push(element0, element1, /* … ,*/ elementN)



const animals = ["pigs", "goats", "sheep"];

const count = animals.push("cows");
console.log(count);
// Expected output: 4
console.log(animals);
// Expected output: Array ["pigs", "goats", "sheep", "cows"]

animals.push("chickens", "cats", "dogs");
console.log(animals);
// Expected output: Array ["pigs", "goats", "sheep", "cows", "chickens", "cats", "dogs"]
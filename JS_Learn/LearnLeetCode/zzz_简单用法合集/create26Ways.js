console.log(Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)));

// 结果: ["A", "B", "C", ..., "Z"]



console.log("");
console.log("----------------------------------------------------------------------------------");
console.log("");



const uppercaseLetters = [];
for (let i = 65; i <= 90; i++) {
  uppercaseLetters.push(String.fromCharCode(i));
}

// 结果: ["A", "B", "C", ..., "Z"]



console.log("");
console.log("----------------------------------------------------------------------------------");
console.log("");



console.log(Array.from({ length: 26 }, (_, i) => String.fromCharCode("A".charCodeAt(0) + i)));

// 结果: ["A", "B", "C", ..., "Z"]



console.log('')
console.log('----------------------------------------------------------------------------------')
console.log('')



console.log([...Array(26)].map((_, i) => String.fromCharCode(65 + i)))



console.log('')
console.log('----------------------------------------------------------------------------------')
console.log('')



// 最快的方法（性能最佳）
console.log('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''))
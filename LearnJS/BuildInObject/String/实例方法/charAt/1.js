// 不影响源字符串

// charAt(index)

// index
//   默认   0
//   范围   0 – str.length - 1    否则 为 空字符

// 作用：获取对应索引号位置的字符
// 返回值：对应索引号位置的字符

const sentence = "The quick brown fox jumps over the lazy dog.";

let index = -1;
console.log(sentence.charAt(index));

index = 0;
console.log(sentence.charAt(index));

index = 4;
console.log(sentence.charAt(index));

index = sentence.length - 1;
console.log(sentence.charAt(index));

index = sentence.length;
console.log(sentence.charAt(index));
// 不影响源字符串

// at(index)

// index
//   默认 0
//   范围  -sentence.length <=  index  < sentence.length      其他的都是 undefined


const sentence = "The quick brown fox jumps over the lazy dog.";

let index = 5;
console.log(sentence.at(index))



index = sentence.length - 1;
console.log(sentence.at(index))



index = sentence.length;
console.log(sentence.at(index))   // undefined



index = -4;
console.log(sentence.at(index))



index = -sentence.length;
console.log(sentence.at(index))



console.log(sentence.at())
console.log(sentence)
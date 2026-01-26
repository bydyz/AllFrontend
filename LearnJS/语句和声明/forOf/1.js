const array = [1, 2, 3];
for (const item of array) {
  console.log(item); // 1, 2, 3
}



const str = "hello";
for (const char of str) {
  console.log(char); // 'h', 'e', 'l', 'l', 'o'
}



const map = new Map([['a', 1], ['b', 2]]);
for (const [key, value] of map) {
  console.log(key, value); // 'a' 1, 'b' 2
}



const set = new Set([1, 2, 3]);
for (const value of set) {
  console.log(value); // 1, 2, 3
}



const typedArray = new Uint8Array([1, 2, 3]);
for (const value of typedArray) {
  console.log(value); // 1, 2, 3
}



function test() {
  for (const arg of arguments) {
    console.log(arg);
  }
}
test(1, 2, 3); // 1, 2, 3
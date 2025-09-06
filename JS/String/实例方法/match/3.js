const str = "Visit HTTPS://EXAMPLE.COM for details";

const regex = /https?:\/\/(\S+)/i; // i 表示忽略大小写
const result = str.match(regex);

console.log(result);
// [
//   "HTTPS://EXAMPLE.COM",
//   "EXAMPLE.COM",
//   index: 6,
//   input: "Visit HTTPS://EXAMPLE.COM for details"
//   groups: undefined
// ]
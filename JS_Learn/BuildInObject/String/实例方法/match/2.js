const str = "Contact us at admin@site.com or support@help.org";

const regex = /\S+@\S+\.\S+/g; // g 表示全局匹配
const result = str.match(regex);

console.log(result);
// [
//   "admin@site.com",
//   "support@help.org"
// ]
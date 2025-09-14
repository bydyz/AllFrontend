const str = "User: Alice (25), Bob (30), Carol (28)";

// 使用 ?<name> 定义命名捕获组
const regex = /(?<name>\w+) \((?<age>\d+)\)/g;
const matches = str.matchAll(regex);

for (const match of matches) {
  console.log("match的内容", match)
  console.log(`${match.groups.name} is ${match.groups.age} years old`);
}
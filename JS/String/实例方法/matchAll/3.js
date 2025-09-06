const str = "I love 😊 and 🚀 and 🌟!";

// 使用 u 标志支持 Unicode
const regex = /(\p{Emoji})/gu;
const matches = str.matchAll(regex);

for (const match of matches) {
  console.log("match的内容", match)
  console.log(`Found emoji: ${match[1]} at position ${match.index}`);
}
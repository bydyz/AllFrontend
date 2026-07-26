// 这个不影响原本的数组！！！

// 不加 /g  替换第一个      加了 /g  替换全部

// 返回值：替换好的字符串

const paragraph = "I think Ruth's dog is cuter than your dog!";

console.log(paragraph.replace("Ruth's", "my"));
// Expected output: "I think my dog is cuter than your dog!"

const regex = /Dog/i;
console.log(paragraph.replace(regex, "ferret"));
// Expected output: "I think Ruth's ferret is cuter than your dog!"

const regex1 = /Dog/ig;
console.log(paragraph.replace(regex1, "ferret"));
// Expected output: "I think Ruth's ferret is cuter than your ferret!"
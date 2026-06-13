const paragraph = "I think Ruth's dog is cuter than your dog!";

// 必须设置全局（g）标志，否则会抛出 TypeError。
const regex1 = /Dog/gi;
console.log(paragraph.replaceAll(regex1, "ferret"));
// Expected output: "I think Ruth's ferret is cuter than your dog!"
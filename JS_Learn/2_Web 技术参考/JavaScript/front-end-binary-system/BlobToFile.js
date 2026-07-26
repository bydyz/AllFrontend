// Blob转File

const blob2 = new Blob(["blob文件"], { type: "text/plain" });
console.log(blob2)
console.log('')
// blob转file
const file2 = new File([blob2], "test2", { type: blob2.type });
console.log("file2: ", file2);

console.log('')
console.log('')
console.log('')

// File转Blob
const file1 = new File(["文件对象"], "test", { type: "text/plain" });
console.log(file1)
console.log('')
// file转blob
const blob4 = new Blob([file1], { type: file1.type });
console.log("blob4: ", blob4);
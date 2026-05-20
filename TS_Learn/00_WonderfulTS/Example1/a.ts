// 正确版本
function processObject<T extends object>(obj: T): T & { processed: boolean } {
  return { ...obj, processed: true };
}

const user = { name: 'John', age: 30 };
const processedUser = processObject(user);

// 现在类型完全正确
console.log(processedUser.name);      // "John"
console.log(processedUser.age);       // 30
console.log(processedUser.processed); // true



export {}
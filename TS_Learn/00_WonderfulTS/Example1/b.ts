// 更严格的类型约束
function processObject<T extends Record<string, unknown>>(obj: T): T & { processed: boolean } {
  return { ...obj, processed: true };
}

const user = { name: 'John', age: 30 };
const processedUser = processObject(user);

// 类型安全，明确知道返回值包含 processed 属性
console.log(processedUser.name);      // "John"
console.log(processedUser.age);       // 30
console.log(processedUser.processed); // true



export {}
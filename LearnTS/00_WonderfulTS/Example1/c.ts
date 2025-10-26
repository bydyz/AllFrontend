// 不推荐：绕过类型检查
function processObject<T extends object>(obj: T): T {
  return { ...obj, processed: true } as T;
  // ⚠️ 类型断言，可能隐藏潜在问题
}

const user = { name: 'John', age: 30 };
const processedUser = processObject(user);
// processedUser 类型仍然是 { name: string; age: number; }
// 但实际上有 processed 属性，这会导致类型信息不准确

console.log(processedUser.processed); // ❌ TypeScript 会报错，但运行时存在

export {}
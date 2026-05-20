// 函数重载提供更好的类型体验
function processObject<T extends object>(obj: T): T & { processed: boolean };
function processObject(obj: any): any {
  return { ...obj, processed: true };
}

const user = { name: 'John', age: 30 };
const result = processObject(user);
// result 类型: { name: string; age: number; processed: boolean; }


export {}
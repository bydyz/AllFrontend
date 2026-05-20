// 模式1：明确返回扩展类型
function addTimestamp<T extends object>(obj: T): T & { timestamp: number } {
  return { ...obj, timestamp: Date.now() };
}

const item = { id: 1, name: 'Test' };
const itemWithTime = addTimestamp(item);
// 类型: { id: number; name: string; } & { timestamp: number; }

// 模式2：使用泛型参数指定新属性
function addProperty<T extends object, K extends string, V>(
  obj: T, 
  key: K, 
  value: V
): T & Record<K, V> {
  return { ...obj, [key]: value };
}

const user = { name: 'John' };
const userWithAge = addProperty(user, 'age', 30);
// 类型: { name: string; } & { age: number; }


export {}
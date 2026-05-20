interface User {
  id: number;
  name: string;
  email: string;
}

// 正确处理：返回扩展类型
function addMetadata<T extends User>(user: T): T & { 
  fetchedAt: Date; 
  fromCache: boolean;
} {
  return {
    ...user,
    fetchedAt: new Date(),
    fromCache: false
  };
}

const user: User = { id: 1, name: 'John', email: 'john@example.com' };
const userWithMeta = addMetadata(user);

console.log(userWithMeta.name);      // "John"
console.log(userWithMeta.fetchedAt); // Date 对象
console.log(userWithMeta.fromCache); // false


export {}
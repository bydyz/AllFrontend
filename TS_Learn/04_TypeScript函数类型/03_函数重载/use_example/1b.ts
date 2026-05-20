//！   根据参数数量重载


// 重载签名
function createUser(name: string): User;
function createUser(name: string, age: number): User;
function createUser(name: string, age: number, email: string): User;

// 实现签名
function createUser(name: string, age?: number, email?: string): User {
  const user: User = {
    id: Math.random().toString(36).substr(2, 9),
    name: name,
    age: age || 0,
    email: email || `${name.toLowerCase()}@example.com`,
    createdAt: new Date()
  };
  
  return user;
}

interface User {
  id: string;
  name: string;
  age: number;
  email: string;
  createdAt: Date;
}

// 使用
const user1 = createUser("Alice");
// ✅ 类型: User，age=0, email="alice@example.com"

const user2 = createUser("Bob", 25);
// ✅ 类型: User，age=25, email="bob@example.com"

const user3 = createUser("Charlie", 30, "charlie@company.com");
// ✅ 类型: User，使用提供的 email



export {}
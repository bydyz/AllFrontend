abstract class DatabaseRepository<T> {
  protected abstract tableName: string;
  
  // 抽象CRUD操作
  abstract create(item: T): Promise<T>;
  abstract findById(id: string): Promise<T | null>;
  abstract findAll(): Promise<T[]>;
  abstract update(id: string, item: Partial<T>): Promise<T>;
  abstract delete(id: string): Promise<boolean>;
  
  // 具体方法
  protected validateId(id: string): boolean {
    return /^[a-zA-Z0-9_-]+$/.test(id);
  }
  
  protected logOperation(operation: string, data: any): void {
    console.log(`[${new Date().toISOString()}] ${operation}:`, data);
  }
  
  // 钩子方法（模板方法模式）
  async executeWithLogging<U>(operation: string, fn: () => Promise<U>): Promise<U> {
    this.logOperation(`START_${operation}`, { table: this.tableName });
    try {
      const result = await fn();
      this.logOperation(`SUCCESS_${operation}`, { table: this.tableName, result });
      return result;
    } catch (error) {
      this.logOperation(`ERROR_${operation}`, { table: this.tableName, error });
      throw error;
    }
  }
}

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

class UserRepository extends DatabaseRepository<User> {
  protected tableName: string = "users";
  private users: Map<string, User> = new Map(); // 模拟数据库
  
  async create(user: User): Promise<User> {
    return this.executeWithLogging("CREATE_USER", async () => {
      if (!this.validateId(user.id)) {
        throw new Error("Invalid user ID");
      }
      if (this.users.has(user.id)) {
        throw new Error(`User with ID ${user.id} already exists`);
      }
      
      const newUser: User = {
        ...user,
        createdAt: new Date()
      };
      
      this.users.set(user.id, newUser);
      return newUser;
    });
  }
  
  async findById(id: string): Promise<User | null> {
    return this.executeWithLogging("FIND_USER_BY_ID", async () => {
      if (!this.validateId(id)) {
        throw new Error("Invalid user ID");
      }
      return this.users.get(id) || null;
    });
  }
  
  async findAll(): Promise<User[]> {
    return this.executeWithLogging("FIND_ALL_USERS", async () => {
      return Array.from(this.users.values());
    });
  }
  
  async update(id: string, updates: Partial<User>): Promise<User> {
    return this.executeWithLogging("UPDATE_USER", async () => {
      const existingUser = this.users.get(id);
      if (!existingUser) {
        throw new Error(`User with ID ${id} not found`);
      }
      
      const updatedUser: User = { ...existingUser, ...updates };
      this.users.set(id, updatedUser);
      return updatedUser;
    });
  }
  
  async delete(id: string): Promise<boolean> {
    return this.executeWithLogging("DELETE_USER", async () => {
      return this.users.delete(id);
    });
  }
}

// 使用
async function demo() {
  const userRepo = new UserRepository();
  
  const user: User = {
    id: "user_123",
    name: "John Doe",
    email: "john@example.com",
    createdAt: new Date()
  };
  
  // 使用抽象类提供的功能
  const createdUser = await userRepo.create(user);
  console.log("Created:", createdUser);
  
  const foundUser = await userRepo.findById("user_123");
  console.log("Found:", foundUser);
  
  const allUsers = await userRepo.findAll();
  console.log("All users:", allUsers);
}

demo();



export {}
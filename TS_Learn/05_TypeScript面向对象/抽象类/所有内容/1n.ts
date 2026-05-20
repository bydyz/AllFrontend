abstract class Repository<T> {
  protected abstract tableName: string;
  
  // 泛型方法
  public abstract findById(id: string): Promise<T | null>;
  public abstract findAll(): Promise<T[]>;
  public abstract save(entity: T): Promise<T>;
  public abstract update(id: string, entity: Partial<T>): Promise<T>;
  
  // 具体泛型方法
  protected validateEntity(entity: T): boolean {
    return entity !== null && typeof entity === 'object';
  }
  
  // 泛型约束
  public abstract findBy<K extends keyof T>(field: K, value: T[K]): Promise<T[]>;
}

class UserRepository extends Repository<User> {
  protected tableName: string = "users";
  private users: Map<string, User> = new Map();
  
  async findById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }
  
  async findAll(): Promise<User[]> {
    return Array.from(this.users.values());
  }
  
  async save(user: User): Promise<User> {
    this.users.set(user.id, user);
    return user;
  }
  
  async update(id: string, updates: Partial<User>): Promise<User> {
    const existing = this.users.get(id);
    if (!existing) throw new Error("User not found");
    
    const updated = { ...existing, ...updates };
    this.users.set(id, updated);
    return updated;
  }
  
  async findBy<K extends keyof User>(field: K, value: User[K]): Promise<User[]> {
    return Array.from(this.users.values()).filter(user => user[field] === value);
  }
}



export {}
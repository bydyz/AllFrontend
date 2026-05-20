// 泛型构造签名
interface RepositoryConstructor<T, ID = number> {
  new (connection: any): Repository<T, ID>;
  entityName: string;
}

interface Repository<T, ID> {
  findById(id: ID): T | null;
  save(entity: T): T;
  delete(id: ID): boolean;
}

// 用户实体
interface User {
  id: number;
  name: string;
  email: string;
}

// 用户仓库
class UserRepository implements Repository<User, number> {
  static entityName = "User";
  
  constructor(private connection: any) {}
  
  findById(id: number): User | null {
    console.log(`Finding user with id: ${id}`);
    return { id, name: "John", email: "john@example.com" };
  }
  
  save(user: User): User {
    console.log(`Saving user: ${user.name}`);
    return user;
  }
  
  delete(id: number): boolean {
    console.log(`Deleting user with id: ${id}`);
    return true;
  }
}

// 泛型仓库工厂
class RepositoryFactory {
  createRepository<T, ID>(
    ctor: RepositoryConstructor<T, ID>,
    connection: any
  ): Repository<T, ID> {
    console.log(`Creating repository for: ${ctor.entityName}`);
    return new ctor(connection);
  }
}

// 使用
const factory = new RepositoryFactory();
const userRepo = factory.createRepository(UserRepository, {});
const user = userRepo.findById(1);
console.log(user); // { id: 1, name: "John", email: "john@example.com" }



export {}
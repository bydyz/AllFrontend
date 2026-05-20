// 依赖注入系统中的构造签名
interface ServiceConstructor<T> {
  new (...args: any[]): T;
  dependencies?: string[];
}

interface ServiceContainer {
  register<T>(token: string, constructor: ServiceConstructor<T>): void;
  resolve<T>(token: string): T;
}

// 服务类
class DatabaseService {
  static dependencies: string[] = ["config"];
  
  constructor(private config: ConfigService) {}
  
  connect(): void {
    console.log(`Connecting to database: ${this.config.getDbUrl()}`);
  }
}

class ConfigService {
  getDbUrl(): string {
    return "localhost:5432/mydb";
  }
}

// 简单的依赖注入容器
class Container implements ServiceContainer {
  private services = new Map<string, ServiceConstructor<any>>();
  private instances = new Map<string, any>();
  
  register<T>(token: string, constructor: ServiceConstructor<T>): void {
    this.services.set(token, constructor);
  }
  
  resolve<T>(token: string): T {
    if (this.instances.has(token)) {
      return this.instances.get(token);
    }
    
    const constructor = this.services.get(token);
    if (!constructor) {
      throw new Error(`Service ${token} not found`);
    }
    
    // 解析依赖
    const dependencies = (constructor.dependencies || []).map(dep => 
      this.resolve(dep)
    );
    
    const instance = new constructor(...dependencies);
    this.instances.set(token, instance);
    return instance;
  }
}

// 使用
const container = new Container();
container.register("config", ConfigService);
container.register("database", DatabaseService);

const db = container.resolve<DatabaseService>("database");
db.connect(); // "Connecting to database: localhost:5432/mydb"



export {}
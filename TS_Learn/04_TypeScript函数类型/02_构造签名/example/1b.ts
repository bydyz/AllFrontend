interface LoggerConstructor {
  // 构造签名
  new (name: string, level: string): Logger;
  
  // 静态属性
  defaultLevel: string;
  instanceCount: number;
  
  // 静态方法
  getDefaultConfig(): object;
}

interface Logger {
  log(message: string): void;
  error(message: string): void;
  getName(): string;
}

// 实现
class ConsoleLogger implements Logger {
  // 静态属性
  static defaultLevel: string = "info";
  static instanceCount: number = 0;
  
  constructor(private name: string, private level: string) {
    ConsoleLogger.instanceCount++;
  }
  
  log(message: string): void {
    console.log(`[${this.level}] ${this.name}: ${message}`);
  }
  
  error(message: string): void {
    console.error(`[ERROR] ${this.name}: ${message}`);
  }
  
  getName(): string {
    return this.name;
  }
  
  // 静态方法
  static getDefaultConfig(): object {
    return {
      level: this.defaultLevel,
      format: "text"
    };
  }
}

// 使用构造签名创建实例
function createLogger(ctor: LoggerConstructor, name: string): Logger {
  return new ctor(name, ctor.defaultLevel);
}

const logger = createLogger(ConsoleLogger, "AppLogger");
logger.log("Application started");

console.log(ConsoleLogger.instanceCount); // 1
console.log(ConsoleLogger.getDefaultConfig()); // { level: "info", format: "text" }



export {}
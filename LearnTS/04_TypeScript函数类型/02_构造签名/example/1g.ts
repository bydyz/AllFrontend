// 重载构造签名
interface ConfigurableConstructor {
  // 重载构造签名
  new (name: string): Configurable;
  new (name: string, options: object): Configurable;
  new (options: object): Configurable;
  
  defaultConfig: object;
}

interface Configurable {
  name: string;
  config: object;
  validate(): boolean;
}

// 实现类
class ConfigurableService implements Configurable {
  static defaultConfig = { timeout: 5000, retries: 3 };
  
  constructor(public name: string | object, public config?: object) {
    if (typeof name === 'object') {
      this.config = name;
      this.name = "default";
    } else {
      this.name = name;
      this.config = config || (this.constructor as any).defaultConfig;
    }
  }
  
  validate(): boolean {
    return typeof this.name === 'string' && 
           typeof this.config === 'object';
  }
}

// 使用不同的构造方式
function createConfigurable(ctor: ConfigurableConstructor, ...args: any[]): Configurable {
  // TypeScript 会根据参数自动选择正确的构造签名
  return new ctor(...args);
}

const service1 = createConfigurable(ConfigurableService, "Service1");
const service2 = createConfigurable(ConfigurableService, "Service2", { timeout: 10000 });
const service3 = createConfigurable(ConfigurableService, { custom: "config" });

console.log(service1.name); // "Service1"
console.log(service2.config); // { timeout: 10000 }
console.log(service3.validate()); // true



export {}
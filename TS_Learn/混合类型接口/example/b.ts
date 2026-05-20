interface Plugin {
  //!  调用签名：执行插件逻辑
  (input: any): any;
  
  // 插件元数据
  version: string;
  author: string;
  description: string;
  
  //!  生命周期方法
  initialize?(): void;
  destroy?(): void;
}

// 创建插件
const uppercasePlugin: Plugin = Object.assign(
  function(input: any): any {
    if (typeof input === 'string') {
      return input.toUpperCase();
    }
    return input;
  },
  {
    version: "1.0.0",
    author: "Jane Smith",
    description: "将字符串转换为大写"
  }
);

const timestampPlugin: Plugin = Object.assign(
  function(input: any): any {
    return {
      ...input,
      timestamp: new Date().toISOString()
    };
  },
  {
    version: "1.0.0", 
    author: "Bob Johnson",
    description: "添加时间戳到数据"
  }
);

// 插件管理器
class PluginManager {
  private plugins: Plugin[] = [];
  
  register(plugin: Plugin): void {
    this.plugins.push(plugin);
    if (plugin.initialize) {
      plugin.initialize();
    }
  }
  
  process(input: any): any {
    return this.plugins.reduce((result, plugin) => {
      return plugin(result);
    }, input);
  }
}

// 使用
const manager = new PluginManager();
manager.register(uppercasePlugin);
manager.register(timestampPlugin);

const result = manager.process("hello world");
console.log(result);
// 输出处理后的结果



export {}
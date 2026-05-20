// 插件系统的构造签名
interface PluginConstructor {
  new (options: PluginOptions): Plugin;
  pluginName: string;
  version: string;
}

interface PluginOptions {
  enabled: boolean;
  config?: object;
}

interface Plugin {
  initialize(): void;
  execute(input: any): any;
  destroy(): void;
}

// 插件基类
abstract class BasePlugin implements Plugin {
  constructor(protected options: PluginOptions) {}
  
  abstract execute(input: any): any;
  
  initialize(): void {
    console.log(`Initializing plugin: ${this.constructor.name}`);
  }
  
  destroy(): void {
    console.log(`Destroying plugin: ${this.constructor.name}`);
  }
}

// 具体插件
class UppercasePlugin extends BasePlugin {
  static pluginName = "uppercase";
  static version = "1.0.0";
  
  execute(input: any): any {
    if (typeof input === 'string') {
      return input.toUpperCase();
    }
    return input;
  }
}

class ReversePlugin extends BasePlugin {
  static pluginName = "reverse";
  static version = "1.0.0";
  
  execute(input: any): any {
    if (typeof input === 'string') {
      return input.split('').reverse().join('');
    }
    return input;
  }
}

// 插件管理器
class PluginManager {
  private plugins: Plugin[] = [];
  
  registerPlugin(ctor: PluginConstructor, options: PluginOptions): void {
    if (!options.enabled) return;
    
    const plugin = new ctor(options);
    plugin.initialize();
    this.plugins.push(plugin);
    
    console.log(`Registered plugin: ${ctor.pluginName} v${ctor.version}`);
  }
  
  process(input: any): any {
    return this.plugins.reduce((result, plugin) => {
      return plugin.execute(result);
    }, input);
  }
  
  destroyAll(): void {
    this.plugins.forEach(plugin => plugin.destroy());
    this.plugins = [];
  }
}

// 使用
const manager = new PluginManager();
manager.registerPlugin(UppercasePlugin, { enabled: true });
manager.registerPlugin(ReversePlugin, { enabled: true });

const result = manager.process("hello world");
console.log(result); // "DLROW OLLEH"

manager.destroyAll();



export {}
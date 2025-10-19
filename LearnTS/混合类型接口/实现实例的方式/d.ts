interface ConfigurableFormatter {
  // 调用签名：格式化数据
  (data: any): string;
  
  // 配置属性
  format: "json" | "xml" | "yaml";
  indent: number;
  enabled: boolean;
  
  // 配置方法
  setFormat(format: "json" | "xml" | "yaml"): void;
  setIndent(spaces: number): void;
}



// 使用闭包模拟类行为
function createClassStyleFormatter(): ConfigurableFormatter {
  // 私有状态
  let state = {
    format: "json" as "json" | "xml" | "yaml",
    indent: 2,
    enabled: true
  };
  
  // 主格式化函数
  const formatFunction = function(data: any): string {
    if (!state.enabled) {
      throw new Error("Formatter is disabled");
    }
    
    const { format, indent } = state;
    
    switch (format) {
      case "json":
        return JSON.stringify(data, null, indent);
      case "xml":
        const content = typeof data === 'object' ? JSON.stringify(data) : String(data);
        return `<!-- XML Output -->\n<root>${content}</root>`;
      case "yaml":
        if (typeof data === 'object' && data !== null) {
          const entries = Object.entries(data);
          if (entries.length === 0) return "{}";
          return entries.map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join('\n');
        }
        return `value: ${JSON.stringify(data)}`;
      default:
        return String(data);
    }
  };
  
  // 配置方法
  const setFormat = function(newFormat: "json" | "xml" | "yaml"): void {
    state.format = newFormat;
    // 同步更新外部属性
    (formatFunction as any).format = newFormat;
  };
  
  const setIndent = function(newIndent: number): void {
    if (newIndent < 0 || newIndent > 10) {
      throw new Error("Indent must be between 0 and 10");
    }
    state.indent = newIndent;
    (formatFunction as any).indent = newIndent;
  };
  
  // 创建完整的格式化器对象
  const formatter = Object.assign(formatFunction, {
    get format() { return state.format; },
    get indent() { return state.indent; },
    get enabled() { return state.enabled; },
    set enabled(value: boolean) { state.enabled = value; },
    setFormat,
    setIndent
  }) as ConfigurableFormatter;
  
  return formatter;
}

// 使用示例
const advancedFormatter = createClassStyleFormatter();

// 测试功能
console.log("初始状态:");
console.log("Format:", advancedFormatter.format);
console.log("Indent:", advancedFormatter.indent);
console.log("Enabled:", advancedFormatter.enabled);

// 格式化数据
const data = { user: { name: "Bob", preferences: { theme: "dark" } } };
console.log("\n默认格式化:");
console.log(advancedFormatter(data));

// 更改配置
advancedFormatter.setFormat("yaml");
advancedFormatter.setIndent(0);
advancedFormatter.enabled = true;

console.log("\nYAML 格式化:");
console.log(advancedFormatter(data));

// 错误处理
try {
  advancedFormatter.setIndent(-1);
} catch (error) {
  console.log("\n错误处理:", (error as Error).message);
}



export {}
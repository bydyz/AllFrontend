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



interface EnhancedFormatter extends ConfigurableFormatter {
  // 新增方法
  validate(data: any): boolean;
  getSupportedFormats(): string[];
  toggle(): void;
}

function createEnhancedFormatter(): EnhancedFormatter {
  let format: "json" | "xml" | "yaml" = "json";
  let indent = 2;
  let enabled = true;
  
  const mainFunction = function(data: any): string {
    if (!enabled) return "[DISABLED]";
    if (!validate(data)) return "[INVALID DATA]";
    
    switch (format) {
      case "json":
        return `JSON:\n${JSON.stringify(data, null, indent)}`;
      case "xml":
        return `XML:\n<data>${JSON.stringify(data)}</data>`;
      case "yaml":
        return `YAML:\ndata: ${JSON.stringify(data)}`;
      default:
        return String(data);
    }
  };
  
  const validate = function(data: any): boolean {
    try {
      JSON.stringify(data);
      return true;
    } catch {
      return false;
    }
  };
  
  const getSupportedFormats = function(): string[] {
    return ["json", "xml", "yaml"];
  };
  
  const toggle = function(): void {
    enabled = !enabled;
    (mainFunction as any).enabled = enabled;
  };
  
  const setFormat = function(newFormat: "json" | "xml" | "yaml"): void {
    format = newFormat;
    (mainFunction as any).format = newFormat;
  };
  
  const setIndent = function(newIndent: number): void {
    indent = newIndent;
    (mainFunction as any).indent = newIndent;
  };
  
  const enhancedFormatter = Object.assign(mainFunction, {
    format,
    indent,
    enabled,
    setFormat,
    setIndent,
    validate,
    getSupportedFormats,
    toggle
  }) as EnhancedFormatter;
  
  return enhancedFormatter;
}

// 使用增强版本
const superFormatter = createEnhancedFormatter();

console.log("支持的格式:", superFormatter.getSupportedFormats());
console.log("数据验证:", superFormatter.validate({ valid: true }));
console.log("数据验证:", superFormatter.validate(() => {})); // 函数不能 JSON 序列化

// 测试完整流程
superFormatter.setFormat("json");
superFormatter.setIndent(2);

const testObj = { items: ["a", "b", "c"], count: 3 };
console.log(superFormatter(testObj));

// 切换状态
superFormatter.toggle();
console.log("禁用后:", superFormatter(testObj));

superFormatter.toggle();
console.log("启用后:", superFormatter(testObj));



export {}
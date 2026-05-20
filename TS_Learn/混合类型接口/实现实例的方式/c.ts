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



// 带初始配置的工厂函数
function createFormatter(config?: {
  initialFormat?: "json" | "xml" | "yaml";
  initialIndent?: number;
  initiallyEnabled?: boolean;
}): ConfigurableFormatter {
  const {
    initialFormat = "json",
    initialIndent = 2,
    initiallyEnabled = true
  } = config || {};
  
  let currentFormat = initialFormat;
  let currentIndent = initialIndent;
  let isEnabled = initiallyEnabled;
  
  const formatterFunction = function(data: any): string {
    if (!isEnabled) {
      return "[Formatter disabled]";
    }
    
    try {
      switch (currentFormat) {
        case "json":
          return JSON.stringify(data, null, currentIndent);
        case "xml":
          const content = typeof data === 'object' ? JSON.stringify(data) : String(data);
          return `<?xml version="1.0"?>\n<data>${content}</data>`;
        case "yaml":
          if (typeof data === 'object') {
            return Object.entries(data)
              .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
              .join('\n');
          }
          return `value: ${JSON.stringify(data)}`;
        default:
          return String(data);
      }
    } catch (error) {
      return `[Format error: ${error}]`;
    }
  };
  
  const setFormat = function(format: "json" | "xml" | "yaml"): void {
    currentFormat = format;
    (formatterFunction as any).format = format;
  };
  
  const setIndent = function(spaces: number): void {
    if (spaces < 0) throw new Error("Indent must be non-negative");
    currentIndent = spaces;
    (formatterFunction as any).indent = spaces;
  };
  
  const formatter = Object.assign(formatterFunction, {
    format: currentFormat,
    indent: currentIndent,
    enabled: isEnabled,
    setFormat,
    setIndent
  }) as ConfigurableFormatter;
  
  return formatter;
}

// 使用示例
const jsonFormatter = createFormatter({ 
  initialFormat: "json", 
  initialIndent: 4 
});

const xmlFormatter = createFormatter({ 
  initialFormat: "xml" 
});

const yamlFormatter = createFormatter({ 
  initialFormat: "yaml",
  initiallyEnabled: false
});

// 测试不同的格式化器
const testData = { name: "Alice", age: 25, active: true };

console.log("=== JSON Formatter ===");
console.log(jsonFormatter(testData));

console.log("=== XML Formatter ===");
console.log(xmlFormatter(testData));

console.log("=== YAML Formatter ===");
console.log(yamlFormatter(testData)); // [Formatter disabled]

// 启用 YAML 格式化器
(yamlFormatter as any).enabled = true;
console.log(yamlFormatter(testData));


export {}
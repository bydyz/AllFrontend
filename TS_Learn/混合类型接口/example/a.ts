interface ConfigurableFormatter {
  //!  调用签名：格式化数据
  (data: any): string;
  
  // 配置属性
  format: "json" | "xml" | "yaml";
  indent: number;
  enabled: boolean;
  
  //!  配置方法
  setFormat(format: "json" | "xml" | "yaml"): void;
  setIndent(spaces: number): void;
}

// 实现
function createFormatter(initialFormat: "json" | "xml" | "yaml" = "json"): ConfigurableFormatter {
  let currentFormat = initialFormat;
  let currentIndent = 2;
  let isEnabled = true;
  
  const formatter = function(data: any): string {
    if (!isEnabled) {
      throw new Error("Formatter is disabled");
    }
    
    switch (currentFormat) {
      case "json":
        return JSON.stringify(data, null, currentIndent);
      case "xml":
        return `<data>${JSON.stringify(data)}</data>`;
      case "yaml":
        return `data: ${JSON.stringify(data)}`;
      default:
        return String(data);
    }
  } as ConfigurableFormatter;
  
  // 添加属性
  formatter.format = initialFormat;
  formatter.indent = currentIndent;
  formatter.enabled = isEnabled;
  
  // 添加方法
  formatter.setFormat = function(format: "json" | "xml" | "yaml") {
    currentFormat = format;
    formatter.format = format;
  };
  
  formatter.setIndent = function(spaces: number) {
    currentIndent = spaces;
    formatter.indent = spaces;
  };
  
  return formatter;
}

// 使用
const myFormatter = createFormatter("json");
console.log(myFormatter({ name: "John", age: 30 }));
// 输出格式化后的 JSON

myFormatter.setFormat("xml");
console.log(myFormatter({ name: "John", age: 30 }));
// 输出 XML 格式

console.log(myFormatter.format); // "xml"
console.log(myFormatter.enabled); // true


export {}
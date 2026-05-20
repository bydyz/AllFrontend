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



// 创建实现
function createConfigurableFormatter(): ConfigurableFormatter {
  // 内部状态
  let currentFormat: "json" | "xml" | "yaml" = "json";
  let currentIndent = 2;
  let isEnabled = true;
  
  // 创建主函数（调用签名）
  const formatterFunction = function(data: any): string {
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
  };
  
  // 创建配置方法
  const setFormat = function(format: "json" | "xml" | "yaml"): void {
    currentFormat = format;
    // 更新属性值
    (formatterFunction as any).format = format;
  };
  
  const setIndent = function(spaces: number): void {
    currentIndent = spaces;
    // 更新属性值
    (formatterFunction as any).indent = spaces;
  };
  
  //!  使用 Object.assign 合并所有属性和方法
  const formatter = Object.assign(
    formatterFunction,
    {
      format: currentFormat,
      indent: currentIndent,
      enabled: isEnabled,
      setFormat,
      setIndent
    }
  ) as ConfigurableFormatter;
  
  return formatter;
}

// 使用示例
const myFormatter = createConfigurableFormatter();

// 作为函数调用
console.log(myFormatter({ name: "John", age: 30 }));
// 输出：
// {
//   "name": "John",
//   "age": 30
// }

// 访问属性
console.log(myFormatter.format);  // "json"
console.log(myFormatter.indent);  // 2
console.log(myFormatter.enabled); // true

// 调用配置方法
myFormatter.setFormat("xml");
myFormatter.setIndent(4);

console.log(myFormatter({ name: "John", age: 30 }));
// 输出：<data>{"name":"John","age":30}</data>

console.log(myFormatter.format); // "xml"
console.log(myFormatter.indent); // 4


export {}
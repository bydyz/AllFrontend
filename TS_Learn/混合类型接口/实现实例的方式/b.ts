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



// 直接创建并断言类型
const formatter: ConfigurableFormatter = (() => {
  let format: "json" | "xml" | "yaml" = "json";
  let indent = 2;
  let enabled = true;
  
  // 创建主函数
  const mainFunction = function(data: any): string {
    if (!enabled) {
      throw new Error("Formatter is disabled");
    }
    
    switch (format) {
      case "json":
        return JSON.stringify(data, null, indent);
      case "xml":
        return `<data>${JSON.stringify(data)}</data>`;
      case "yaml":
        return `data: ${JSON.stringify(data)}`;
      default:
        return String(data);
    }
  };
  
  // 添加属性和方法
  (mainFunction as any).format = format;
  (mainFunction as any).indent = indent;
  (mainFunction as any).enabled = enabled;
  
  (mainFunction as any).setFormat = function(newFormat: "json" | "xml" | "yaml") {
    format = newFormat;
    (mainFunction as any).format = newFormat;
  };
  
  (mainFunction as any).setIndent = function(newIndent: number) {
    indent = newIndent;
    (mainFunction as any).indent = newIndent;
  };
  
  return mainFunction as ConfigurableFormatter;
})();

console.log(formatter)


export {}
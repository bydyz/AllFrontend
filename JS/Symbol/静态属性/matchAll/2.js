class CustomGlobalMatcher {
  constructor(pattern) {
      this.pattern = pattern;
  }
  
  *[Symbol.matchAll](str) {
      // 返回一个生成器
      let currentIndex = 0;
      
      while (currentIndex < str.length) {
          const index = str.indexOf(this.pattern, currentIndex);
          if (index === -1) return;
          
          yield {
              index: index,
              0: this.pattern,        // 匹配的文本
              groups: undefined,      // 命名捕获组
              input: str,             // 原始字符串
              length: 1               // 匹配结果长度
          };
          
          currentIndex = index + this.pattern.length;
      }
  }
}

// 使用自定义全局匹配器
const globalMatcher = new CustomGlobalMatcher("test");
const results = "test1 test2 test3".matchAll(globalMatcher);

for (const match of results) {
  console.log(`在位置 ${match.index} 找到: ${match[0]}`);
}
// 在位置 0 找到: test
// 在位置 6 找到: test  
// 在位置 12 找到: test
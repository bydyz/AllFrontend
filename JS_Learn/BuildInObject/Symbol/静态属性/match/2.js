class CustomMatcher {
  constructor(pattern) {
      this.pattern = pattern;
  }
  
  [Symbol.match](str) {
      // 自定义匹配逻辑
      const matches = [];
      let currentIndex = 0;
      
      while (currentIndex < str.length) {
          const index = str.indexOf(this.pattern, currentIndex);
          if (index === -1) break;
          
          matches.push({
              index: index,
              match: this.pattern,
              input: str
          });
          
          currentIndex = index + this.pattern.length;
      }
      
      return matches.length > 0 ? matches : null;
  }
}

// 使用自定义匹配器
const matcher = new CustomMatcher("lo");
const result = "Hello World".match(matcher);
console.log(result);
// [
//   { index: 3, match: "lo", input: "Hello World" }
// ]
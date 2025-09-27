// 分析编码过程
function analyzeEncoding(str) {
  const encoded = encodeURI(str);
  console.log(`原始: "${str}"`);
  console.log(`编码后: "${encoded}"`);
  
  // 显示每个字符的编码
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const codePoint = char.codePointAt(0);
    const utf8Bytes = getUTF8Bytes(char);
    
    console.log(`"${char}" -> Unicode: U+${codePoint.toString(16).toUpperCase()} -> UTF-8: ${utf8Bytes}`);
  }
  console.log('---');
}

function getUTF8Bytes(char) {
  const bytes = [];
  const codePoint = char.codePointAt(0);
  
  if (codePoint <= 0x7F) {
    // 1字节
    bytes.push(codePoint.toString(16).toUpperCase());
  } else if (codePoint <= 0x7FF) {
    // 2字节
    bytes.push(
      (0xC0 | (codePoint >> 6)).toString(16),
      (0x80 | (codePoint & 0x3F)).toString(16)
    );
  } else if (codePoint <= 0xFFFF) {
    // 3字节
    bytes.push(
      (0xE0 | (codePoint >> 12)).toString(16),
      (0x80 | ((codePoint >> 6) & 0x3F)).toString(16),
      (0x80 | (codePoint & 0x3F)).toString(16)
    );
  } else {
    // 4字节（代理对）
    bytes.push(
      (0xF0 | (codePoint >> 18)).toString(16),
      (0x80 | ((codePoint >> 12) & 0x3F)).toString(16),
      (0x80 | ((codePoint >> 6) & 0x3F)).toString(16),
      (0x80 | (codePoint & 0x3F)).toString(16)
    );
  }
  
  return bytes.map(b => '%' + b.toUpperCase()).join('');
}

// 测试不同字节长度的字符
analyzeEncoding('A');    // 1字节 - ASCII
analyzeEncoding('ñ');    // 2字节 - 拉丁扩展
analyzeEncoding('中');   // 3字节 - 中文
analyzeEncoding('😊');   // 4字节 - Emoji（代理对）
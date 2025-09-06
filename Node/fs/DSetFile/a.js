const fs = require('fs');
const path = require('path');


// 使用 UTF-8 编码写入字符串
fs.writeFileSync(
  path.resolve(__dirname, 'example.txt'), 
  '你好', 
  { encoding: 'utf8' }
);
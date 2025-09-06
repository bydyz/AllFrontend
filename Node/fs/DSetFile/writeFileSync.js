// fs.writeFile(file, data[, options], callback)：在文件中写入内容；

// options

//  flag：写入的方式。
//  encoding：字符的编码；  目前基本用的都是UTF-8编码，即 utf-8

// flag的值有很多：

//  w 打开文件写入，默认值；
//  w+打开文件进行读写（可读可写），如果不存在则创建文件；
//  r打开文件读取，读取时的默认值；
//  r+ 打开文件进行读写，如果不存在那么抛出异常；
//  a打开要写入的文件，将流放在文件末尾。如果不存在则创建文件；
//  a+打开文件以进行读写（可读可写），将流放在文件末尾。如果不存在则创建文件

const { appendFileSync } = require('fs');
 
appendFileSync('test.csv', '\uFEFF追加的数据', {
  encoding: 'utf8',
  mode: 0o666,
  flag: 'a',
}, (err) => {
  if (err) throw err;
});
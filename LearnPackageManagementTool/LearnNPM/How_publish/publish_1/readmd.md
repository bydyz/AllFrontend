### 1.0.0

```json
// package.json
{
  "name": "publish_1",
  "version": "1.0.0",
  "main": "index.js",
  "bin": {
    "publish_1": "./index.js"
  },
  "files": ["index.js"],
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["learn", "test"],
  "author": "XR",
  "license": "ISC",
  "description": "Learn and Test"
}
```

```javascript
#!/usr/bin/env node   //加上 bin 字段后需加此，表示解析js的是node
function main() {
  console.log('Hello World!')
}

console.log('main函数执行了！！！')

export default main

export function hello(name) {
  console.log(`Hello ${name}`)
}
```

写好后
1. npm adduser  登录
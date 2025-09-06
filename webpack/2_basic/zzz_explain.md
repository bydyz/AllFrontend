## 注意 使用了 webpack 的代码示例

### 虽然使用了ES Module ，但通过webpack的打包后，在index.html中引入打包后的js文件不需要加上 type="module"
### import {sum} from "./utils/math" 因为有用webpack进行打包，在打包时会填上后缀，因此此处的引入不需要加后缀






## 创建项目

### 第一步  npm init -y    npm init -y 是一个快速生成默认 package.json 文件的命令，适合在需要快速初始化项目时使用。它会跳过交互式提问，使用默认值生成配置文件，方便开发者快速开始项目。

### 第二步  npm install webpack webpack-cli -D     因为webpack只是在部署前需要使用，而在生产环境不需要，因此用 --save-dev

### 第三步  npx webpack    使用 node_modules 中的webpack，即局部的webpack对代码进行打包






## 对上述第三步的注意事项

1. 像上述使用 npx webpack 且无其他配置 时，其是默认找到当前项目的src下的index.js，然后以它为入口进行打包。倘若找不到则会报错。倘若想要更改入口为src下的main.js，可以使用 npx webpack --entry ./src/main.js 此即通过添加入口配置参数指定打包的入口

2. 修改打包后的文件夹名、文件名可使用   npx webpack --output-path ./build --output-filename bundle.js

3. 当然还有其他各种各样的配置，倘若都用这种命令行的方式，则太不方便，为此我们抽取出了一个配置文件用以统一配置






## 统一的配置文件

1. 默认名称为 webpack.config.js

2. 写法

因为是nodejs进行读取，故用的是 commonjs

```javascript
const path = require("path")

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    // path 需要绝对路径
    path: path.resolve(__dirname, "./build")
  }
}
```

3. 然后执行 npx webpack 即可，因为它会默认去当前项目里寻找根目录下的 webpack.config.js 使用其中的配置

4. 修改 webpack.config.js 为 rc.config.js 此时需要使用 npx webpack --config rc.config.js






## 在 package.json 中写命令

"build": "webpack --mode=development",         

在 package.json 中，不需要使用 npx
倘若不指定 mode 会默认 mode 为 production

后面只需使用 npm run build 即可
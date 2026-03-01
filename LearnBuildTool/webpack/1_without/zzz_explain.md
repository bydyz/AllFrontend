## 注意此为 未使用 webpack 的代码示例

### 由于使用了ES Module 在index.html中引入js文件，需要加上 type="module"
### import {sum} from "./utils/math.js" 因为没有用webpack进行打包，此处的引入需要加后缀
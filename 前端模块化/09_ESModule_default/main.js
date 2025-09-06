// import { parseLyric } from "./parse_lyric.js"
//！ 这个是匹配普通导出

import parseLyric from "./parse_lyric.js"
//！ 这个匹配默认导出

console.log(parseLyric())




import {name} from "./parse_lyric.js"     //除了默认导出，还可以有普通导出
// import name from "./parse_lyric.js"   //此处这样写还是默认导入，正确地写法需要加  {}

console.log(name)
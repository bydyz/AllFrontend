// 定义对象类型
type LyricType = {
  time: number
  text: string
}

// 歌词解析工具
function parseLyric(lyric: string): LyricType[] {
  
  // !    虽然规定的是 LyricType[] 类型，但是仍然可赋值 []
  const lyrics: LyricType[] = []

  lyrics.push({ time: 1111, text: "天空想要下雨" })
  return lyrics
}

const lyricInfos = parseLyric("fdafdafdafa")
for (const item of lyricInfos) {
  console.log(item.time, item.text)
}



//！ JavaScript 规范声明任何没有 export 的 JavaScript 文件都应该被认为是一个脚本，而非一个模块
//！ 如果你有一个文件，现在没有任何 import 或者 export，但是你希望它被作为模块处理，添加这行代码  export{}
export {}

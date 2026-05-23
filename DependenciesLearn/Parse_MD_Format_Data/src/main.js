import { Buffer } from 'buffer'
window.Buffer = Buffer
import './style.css'
import sampleMd from './sample.md?raw'
import { renderHome } from './pages/home.js'
import { renderRemark } from './pages/remark.js'
import { renderGrayMatter } from './pages/grayMatter.js'
import { renderMdastUtil } from './pages/mdastUtil.js'
import { renderMarked } from './pages/marked.js'
import { renderMarkdownIt } from './pages/markdownit.js'
import { renderMicromark } from './pages/micromark.js'

console.log('如此得到的既是 md格式 的字符串，放置在另一个 md文件中，即可用', sampleMd)

const routes = {
  '/': renderHome,
  '/remark': renderRemark,
  '/gray-matter': renderGrayMatter,
  '/mdast-util': renderMdastUtil,
  '/marked': renderMarked,
  '/markdown-it': renderMarkdownIt,
  '/micromark': renderMicromark,
}

/**
 * 路由器：根据 URL hash 切换页面
 *
 * 工作流程：
 *   1. 从 window.location.hash 读取当前的 hash 值（如 "#/remark"）
 *   2. 截取 "#" 后面的路径部分（如 "/remark"），默认值为 "/"
 *   3. 从 routes 表中查找对应的渲染函数
 *   4. 调用渲染函数，传入内容容器和 Markdown 原始文本
 *   5. 如果找不到对应路由，显示 404 提示
 *
 * 这种基于 hash 的路由方式不需要服务端配合，
 * 纯前端即可实现 SPA 页面切换，且兼容所有浏览器。
 */
function router() {
  // 获取 URL hash 值，去掉开头的 "#"，无 hash 时默认为首页 "/"
  // 示例：https://host/#/remark  →  "/remark"
  const path = window.location.hash.slice(1) || '/'

  const content = document.getElementById('content')

  const render = routes[path]

  if (render) {
    // 导出的 renderHome、renderRemark 等 均为具体的函数，最后会直接直接操作 innerHTML
    render(content, sampleMd)
  } else {
    content.innerHTML = '<div class="card"><h1>404</h1><p>页面未找到</p></div>'
  }
}

// 监听 hash 变化事件：用户点击导航链接或手动修改 URL hash 时触发
// 每次 hash 改变都重新执行 router()，实现页面切换
window.addEventListener('hashchange', router)

router()

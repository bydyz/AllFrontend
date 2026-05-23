<template>
  <div>
    <div class="card">
      <h1>Vue Markdown 解析方案演示</h1>
      <p>本演示展示 Vue 工程中主流的 3 种 Markdown 解析方式，并实现"完美展示"效果。</p>
      <ul>
        <li><strong>markdown-it</strong> — 插件生态最丰富，支持代码高亮 + 数学公式</li>
        <li><strong>marked</strong> — 零配置轻量方案，配合 marked-highlight 实现高亮</li>
        <li><strong>remark + rehype</strong> — AST 管道处理，高度可定制</li>
      </ul>
    </div>

    <div class="card">
      <h2>原始 Markdown 内容</h2>
      <pre><code>{{ escapeHtml(md) }}</code></pre>
    </div>

    <div class="card">
      <h2>方案对比</h2>
      <table>
        <thead>
          <tr>
            <th>特性</th>
            <th>markdown-it</th>
            <th>marked</th>
            <th>remark</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>代码高亮</td><td>✓ 丰富插件</td><td>✓ marked-highlight</td><td>✓ rehype-highlight</td></tr>
          <tr><td>数学公式</td><td>✓ markdown-it-texmath</td><td>需自行扩展</td><td>✓ remark-math</td></tr>
          <tr><td>自定义渲染</td><td>✓ 自定义规则</td><td>✓ 自定义渲染器</td><td>✓ AST 级定制</td></tr>
          <tr><td>Vue 集成</td><td>✓ v-html 即可</td><td>✓ v-html 即可</td><td>✓ v-html 即可</td></tr>
          <tr><td>社区生态</td><td>最丰富</td><td>中等</td><td>丰富</td></tr>
          <tr><td>包体积</td><td>中等</td><td>小</td><td>较大</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({ md: String })

function escapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
</script>

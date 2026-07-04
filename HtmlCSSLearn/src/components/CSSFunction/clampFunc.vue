<template>
  <div class="clamp-demo">
    <h1>CSS clamp() 函数</h1>

    <section class="intro">
      <h2>简介</h2>
      <p>
        <code>clamp()</code> 是 CSS 中的一个数学函数，用于设置一个介于最小值和最大值之间的值。
        它接受三个参数：<code>clamp(最小值, 首选值, 最大值)</code>。
      </p>
      <p>
        首选值通常是一个相对单位（如 vw、%），当首选值小于最小值时返回最小值，大于最大值时返回最大值，
        否则返回首选值。这使得 <code>clamp()</code> 成为实现响应式设计的利器。
      </p>
      <div class="syntax">
        <h3>语法</h3>
        <code>clamp(MIN, VAL, MAX)</code>
        <ul>
          <li><strong>MIN</strong> - 最小值（必须）</li>
          <li><strong>VAL</strong> - 首选值（必须）- 通常是动态计算的值</li>
          <li><strong>MAX</strong> - 最大值（必须）</li>
        </ul>
      </div>
    </section>

    <section class="example">
      <h2>示例 1: 响应式字体大小</h2>
      <p>标题字体大小在 16px 到 32px 之间，随视口宽度动态变化：</p>
      <div class="demo-box responsive-font">
        <h3 class="demo-title">响应式标题文字</h3>
      </div>
      <pre class="code-block">h3 {
  font-size: clamp(16px, 4vw, 32px);
}</pre>
    </section>

    <section class="example">
      <h2>示例 2: 响应式容器宽度</h2>
      <p>容器宽度在 300px 到 800px 之间，随视口宽度动态调整：</p>
      <div class="demo-box">
        <div class="responsive-container">
          我是一个响应式容器
        </div>
      </div>
      <pre class="code-block">.container {
  width: clamp(300px, 80vw, 800px);
}</pre>
    </section>

    <section class="example">
      <h2>示例 3: 响应式间距</h2>
      <p>内边距在 16px 到 48px 之间动态变化：</p>
      <div class="demo-box">
        <div class="responsive-padding">
          响应式内边距
        </div>
      </div>
      <pre class="code-block">.element {
  padding: clamp(16px, 5vw, 48px);
}</pre>
    </section>

    <section class="example">
      <h2>示例 4: 行高限制</h2>
      <p>行高在 1.2 到 1.8 之间，随容器宽度调整：</p>
      <div class="demo-box">
        <p class="responsive-line-height">
          这是一段用于演示响应式行高的文本。通过 clamp() 函数，行高可以在不同屏幕尺寸下自动调整，
          确保文本在小屏幕上保持紧凑，在大屏幕上保持舒适的阅读体验。
        </p>
      </div>
      <pre class="code-block">p {
  line-height: clamp(1.2, 2vw + 1, 1.8);
}</pre>
    </section>

    <section class="example">
      <h2>示例 5: 字号范围约束</h2>
      <p>段落字号在 14px 到 20px 之间动态调整：</p>
      <div class="demo-box">
        <p class="responsive-paragraph">
          这是一个段落文本，用于展示 clamp() 如何实现字号的响应式调整。随着屏幕宽度变化，
          字号会在设定的范围内平滑过渡，提供最佳的阅读体验。
        </p>
      </div>
      <pre class="code-block">p {
  font-size: clamp(14px, 2.5vw, 20px);
}</pre>
    </section>

    <section class="tips">
      <h2>使用技巧</h2>
      <ul>
        <li>使用 <code>vw</code> 作为首选值的单位，可以实现视口宽度相关的响应式效果</li>
        <li>使用 <code>calc()</code> 可以构建更复杂的计算，如 <code>clamp(16px, 2vw + 12px, 32px)</code></li>
        <li>确保最小值小于最大值，否则函数会失效</li>
        <li><code>clamp()</code> 可用于任何接受长度、百分比或数字的 CSS 属性</li>
      </ul>
    </section>
  </div>
</template>

<script setup>
</script>

<style scoped>
.clamp-demo {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #303133;
}

h2 {
  color: #409eff;
  border-bottom: 2px solid #409eff;
  padding-bottom: 8px;
  margin-top: 40px;
}

h3 {
  color: #606266;
}

section {
  margin-bottom: 30px;
}

p {
  color: #606266;
  line-height: 1.8;
  margin: 10px 0;
}

code {
  background-color: #f5f7fa;
  padding: 2px 8px;
  border-radius: 4px;
  font-family: monospace;
  color: #e6a23c;
}

.syntax {
  background-color: #f5f7fa;
  padding: 20px;
  border-radius: 8px;
  margin-top: 15px;
}

.syntax ul {
  margin: 10px 0 0 20px;
}

.syntax li {
  margin: 5px 0;
  color: #606266;
}

.demo-box {
  background-color: #f5f7fa;
  padding: 20px;
  border-radius: 8px;
  margin: 15px 0;
}

.code-block {
  background-color: #282c34;
  color: #abb2bf;
  padding: 15px;
  border-radius: 6px;
  overflow-x: auto;
  font-size: 14px;
}

/* 示例1: 响应式字体 */
.responsive-font .demo-title {
  font-size: clamp(16px, 4vw, 32px);
  color: #409eff;
}

/* 示例2: 响应式容器 */
.responsive-container {
  width: clamp(300px, 80vw, 800px);
  background-color: #409eff;
  color: white;
  padding: 30px;
  text-align: center;
  margin: 0 auto;
  border-radius: 8px;
}

/* 示例3: 响应式间距 */
.responsive-padding {
  padding: clamp(16px, 5vw, 48px);
  background-color: #67c23a;
  color: white;
  text-align: center;
  border-radius: 8px;
}

/* 示例4: 行高限制 */
.responsive-line-height {
  line-height: clamp(1.2, 2vw + 1, 1.8);
  font-size: 16px;
}

/* 示例5: 字号范围 */
.responsive-paragraph {
  font-size: clamp(14px, 2.5vw, 20px);
}

.tips {
  background-color: #fdf6ec;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #e6a23c;
}

.tips ul {
  margin: 10px 0 0 20px;
}

.tips li {
  margin: 8px 0;
  color: #606266;
}
</style>

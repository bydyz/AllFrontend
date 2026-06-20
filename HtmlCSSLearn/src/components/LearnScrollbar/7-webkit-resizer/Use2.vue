<template>
  <div class="resizable-container" id="demoResizable">
    <div class="demo-content">
      <h3>可调整大小的容器</h3>
      <p>这个容器设置了 <code>resize: both</code> 和 <code>overflow: auto</code>。</p>
      <p>将鼠标移动到右下角，可以看到调整大小手柄。</p>
      <p>尝试拖动右下角的手柄来调整容器大小！</p>

      <div class="info-box" style="margin: 20px 0">
        <p><strong>提示：</strong> 调整手柄通常显示在滚动条的交汇处，只有当内容溢出时才会完全可见。</p>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.resizable-container {
  width: 400px;
  height: 300px;
  resize: both;
  overflow: auto;
  border: 2px solid #3498db;
  border-radius: 8px;
  padding: 20px;
  background: #f8f9fa;
  margin: 20px auto;
}
.demo-content {
  width: 800px;
  height: 600px;
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 5px;
}
.info-box {
  background: #e1f5fe;
  border-left: 4px solid #03a9f4;
  padding: 15px;
  margin: 20px 0;
  border-radius: 0 5px 5px 0;
}
</style>

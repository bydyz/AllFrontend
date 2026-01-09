<template>
  <div class="masonry-blog">
    <article class="blog-post">
      <h3>短标题</h3>
      <p>简短的内容摘要。</p>
    </article>

    <article class="blog-post">
      <h3>中等长度标题</h3>
      <p>这是一段中等长度的内容摘要，包含更多的文字描述和细节信息。</p>
    </article>

    <article class="blog-post">
      <h3>非常长的文章标题在这里显示</h3>
      <p>这是一篇很长很长的文章内容摘要，包含大量的文字描述、详细的信息和多个段落。这种布局非常适合展示不同长度的内容。</p>
      <p>第二个段落内容。</p>
    </article>

    <!-- 更多文章 -->
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.masonry-blog {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: masonry;
  gap: 25px;
  padding: 40px;
}

.blog-post {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 25px;
  border-radius: 15px;
  break-inside: avoid;
}

.blog-post h3 {
  margin: 0 0 15px 0;
  font-size: 1.3em;
}

.blog-post p {
  margin: 0 0 15px 0;
  line-height: 1.6;
  opacity: 0.9;
}

.blog-post p:last-child {
  margin-bottom: 0;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .masonry-blog {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .masonry-blog {
    grid-template-columns: 1fr;
  }
}
</style>

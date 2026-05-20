<template>
  <div class="masonry-gallery">
    <div class="gallery-item">
      <img src="https://fastly.picsum.photos/id/197/300/200.jpg?hmac=5xvRZ1gEnN4BTztSDUp_NB6KSvYvj7jAMuKgx_v8E70" alt="图片1" />
      <p>短描述</p>
    </div>
    <div class="gallery-item">
      <img src="https://fastly.picsum.photos/id/41/300/350.jpg?hmac=xPbdspmvCvkC-cFRqCJVJpB3Mivus4xWOo8NAtxuYXk" alt="图片2" />
      <p>这是一个比较长的描述内容，会占据更多空间</p>
    </div>
    <div class="gallery-item">
      <img src="https://fastly.picsum.photos/id/254/300/250.jpg?hmac=Rpw9Z6Acyorbf9htdZqunOp4Nbz9_HRMhrreXFrZPS8" alt="图片3" />
      <p>中等长度描述</p>
    </div>

    <!-- <div class="gallery-item">
      <img src="https://picsum.photos/300/200" alt="图片4" />
      <p>短描述</p>
    </div>
    <div class="gallery-item">
      <img src="https://picsum.photos/300/350" alt="图片5" />
      <p>这是一个比较长的描述内容，会占据更多空间</p>
    </div>
    <div class="gallery-item">
      <img src="https://picsum.photos/300/250" alt="图片6" />
      <p>中等长度描述</p>
    </div> -->
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.masonry-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-template-rows: masonry;
  gap: 20px;
  padding: 30px;
}

.gallery-item {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  break-inside: avoid;
}

.gallery-item img {
  width: 100%;
  height: auto;
  display: block;
}

.gallery-item p {
  padding: 15px;
  margin: 0;
  color: #2c3e50;
  line-height: 1.5;
}

/* 不同高度的项目 */
.gallery-item:nth-child(2n) {
  min-height: 350px;
}

.gallery-item:nth-child(3n) {
  min-height: 280px;
}

.gallery-item:nth-child(4n) {
  min-height: 320px;
}
</style>

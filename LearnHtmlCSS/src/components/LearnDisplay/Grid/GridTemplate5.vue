<template>
  <div class="products-grid">
    <div class="product-card">
      <h3>产品名称 1</h3>
      <p>产品描述</p>
      <span class="price">¥199</span>
    </div>
    <div class="product-card featured">
      <h3>特色产品</h3>
      <p>特别推荐的产品描述</p>
      <span class="price">¥299</span>
    </div>
    <div class="product-card">
      <h3>产品名称 3</h3>
      <p>产品描述</p>
      <span class="price">¥159</span>
    </div>
    <!-- 更多产品卡片 -->
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: minmax(200px, auto);
  gap: 25px;
  padding: 30px;
}

.product-card {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.product-card h3 {
  margin: 0 0 12px 0;
  color: #2c3e50;
  font-size: 18px;
}

.product-card p {
  margin: 0 0 20px 0;
  color: #7f8c8d;
  line-height: 1.5;
  flex-grow: 1;
}

.price {
  font-size: 22px;
  font-weight: bold;
  color: #e74c3c;
  margin-top: auto;
}

/* 特色产品 */
.featured {
  grid-column: span 2; /* 占两列宽度 */
  background: linear-gradient(135deg, #999999, #999998);
  color: white;
}

.featured h3,
.featured p,
.featured .price {
  color: white;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .featured {
    grid-column: 1; /* 小屏幕时恢复单列 */
  }
}
</style>

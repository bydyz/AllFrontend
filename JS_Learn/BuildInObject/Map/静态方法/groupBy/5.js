function demonstrateDynamicGrouping() {
  console.log('\n=== 动态条件分组 ===');
  
  const products = [
    { name: 'Laptop', category: 'Electronics', price: 999, stock: 15 },
    { name: 'Phone', category: 'Electronics', price: 699, stock: 30 },
    { name: 'Desk', category: 'Furniture', price: 299, stock: 10 },
    { name: 'Chair', category: 'Furniture', price: 149, stock: 25 },
    { name: 'Book', category: 'Education', price: 29, stock: 100 },
    { name: 'Tablet', category: 'Electronics', price: 399, stock: 5 }
  ];
  
  // 动态价格区间分组
  const priceRanges = [
    { min: 0, max: 100, label: '低价' },
    { min: 101, max: 500, label: '中价' },
    { min: 501, max: Infinity, label: '高价' }
  ];
  
  const byPriceRange = Map.groupBy(products, product => {
    const range = priceRanges.find(r => product.price >= r.min && product.price <= r.max);
    return range ? range.label : '其他';
  });
  console.log(byPriceRange)
  
  console.log('按价格区间分组:');
  for (const [range, products] of byPriceRange) {
    const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
    console.log(`${range}产品: ${products.length}种, 总库存价值: $${totalValue}`);
  }
  
  // 库存状态分组
  const byStockStatus = Map.groupBy(products, product => 
    product.stock < 10 ? '低库存' : 
    product.stock > 50 ? '高库存' : '正常库存'
  );
  
  console.log('\n按库存状态分组:');
  for (const [status, products] of byStockStatus) {
    console.log(`${status}:`, products.map(p => p.name));
  }
}

demonstrateDynamicGrouping();
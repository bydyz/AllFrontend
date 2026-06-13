function demonstrateDataAnalysis() {
  console.log('\n=== 数据分析报表场景 ===');
  
  const salesData = [
    { product: 'Laptop', region: 'North', quarter: 'Q1', sales: 50000 },
    { product: 'Laptop', region: 'South', quarter: 'Q1', sales: 45000 },
    { product: 'Phone', region: 'North', quarter: 'Q1', sales: 30000 },
    { product: 'Phone', region: 'South', quarter: 'Q1', sales: 35000 },
    { product: 'Laptop', region: 'North', quarter: 'Q2', sales: 55000 },
    { product: 'Laptop', region: 'South', quarter: 'Q2', sales: 48000 },
    { product: 'Phone', region: 'North', quarter: 'Q2', sales: 32000 },
    { product: 'Phone', region: 'South', quarter: 'Q2', sales: 38000 }
  ];
  
  // 按产品和季度生成报表
  const reportByProductQuarter = Map.groupBy(salesData, item => 
    `${item.product}-${item.quarter}`
  );
  
  console.log('产品销售季度报表:');
  for (const [key, data] of reportByProductQuarter) {
    const totalSales = data.reduce((sum, item) => sum + item.sales, 0);
    const regions = [...new Set(data.map(item => item.region))];
    console.log(`${key}: 总销售额 $${totalSales}, 覆盖区域: ${regions.join(', ')}`);
  }
  
  // 生成区域汇总
  const regionalSummary = Map.groupBy(salesData, item => item.region);
  
  console.log('\n区域销售汇总:');
  for (const [region, data] of regionalSummary) {
    const totalSales = data.reduce((sum, item) => sum + item.sales, 0);
    const products = [...new Set(data.map(item => item.product))];
    console.log(`${region}区域: 总销售额 $${totalSales}, 产品: ${products.join(', ')}`);
  }
}

demonstrateDataAnalysis();
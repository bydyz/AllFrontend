function detailedComparison(urlString) {
  const urlObj = new URL(urlString);
  
  console.log('=== 详细属性分析 ===');
  console.log('输入 URL:', urlString);
  console.log('');
  
  const comparisons = [
      {
          property: 'href',
          description: '完整 URL',
          urlValue: urlObj.href,
          note: '包含所有部分的完整 URL 字符串'
      },
      {
          property: 'protocol',
          description: '协议',
          urlValue: urlObj.protocol,
          note: '包括冒号，如 https:'
      },
      {
          property: 'hostname',
          description: '主机名',
          urlValue: urlObj.hostname,
          note: '不包含端口号的纯域名'
      },
      {
          property: 'port',
          description: '端口',
          urlValue: urlObj.port,
          note: '字符串类型，默认端口为空字符串'
      },
      {
          property: 'host',
          description: '主机',
          urlValue: urlObj.host,
          note: 'hostname + port'
      },
      {
          property: 'origin',
          description: '源',
          urlValue: urlObj.origin,
          note: 'protocol + host，只读属性'
      },
      {
          property: 'pathname',
          description: '路径',
          urlValue: urlObj.pathname,
          note: '以斜杠开头的路径部分'
      },
      {
          property: 'search',
          description: '查询字符串',
          urlValue: urlObj.search,
          note: '包括问号的完整查询字符串'
      },
      {
          property: 'hash',
          description: '哈希/锚点',
          urlValue: urlObj.hash,
          note: '包括井号的锚点部分'
      }
  ];
  
  comparisons.forEach(item => {
      console.log(`🔹 ${item.property} (${item.description}):`);
      console.log(`   值: "${item.urlValue}"`);
      console.log(`   说明: ${item.note}`);
      console.log('');
  });
}

// 测试各种 URL
detailedComparison('https://www.example.com:8080/products/search?id=123&category=books#reviews');
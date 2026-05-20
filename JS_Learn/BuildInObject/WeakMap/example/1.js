function demonstrateDOMElementStorage() {
  console.log('=== DOM 元素数据存储 ===');
  
  // 创建 WeakMap 来存储DOM元素的私有数据
  const elementData = new WeakMap();
  
  // 模拟DOM元素
  const domElements = [
    { type: 'button', id: 'btn1' },
    { type: 'input', id: 'input1' },
    { type: 'div', id: 'container1' }
  ];
  
  // 为每个元素存储数据
  domElements.forEach(element => {
    elementData.set(element, {
      clickCount: 0,
      lastClicked: null,
      customConfig: { color: 'blue', size: 'medium' }
    });
  });
  
  // 模拟点击事件
  function handleClick(element) {
    const data = elementData.get(element);
    if (data) {
      data.clickCount++;
      data.lastClicked = new Date();
      console.log(`${element.id} 被点击了 ${data.clickCount} 次`);
    }
  }
  
  // 测试点击
  handleClick(domElements[0]);
  handleClick(domElements[0]);
  handleClick(domElements[1]);
  
  // 当DOM元素被移除时，相关数据会自动被垃圾回收
  console.log('元素数据存储演示完成');
  
  return elementData;
}

const domStorage = demonstrateDOMElementStorage();
export const chapters = [
  {
    id: 'intro',
    title: '1. 介绍',
    content: [
      '锚点滚动（Anchor Scrolling）是 Web 开发中常见交互，用户点击链接后页面平滑滚动到指定位置。',
      '本文演示了 5 种实现锚点滚动的主流方案，从最简单的 CSS 到专业的 JavaScript 库。',
      '每种方案都有其适用场景：CSS 方案零成本但控制力弱，JS 方案灵活但代码量多，第三方库功能全但有额外依赖。',
    ],
  },
  {
    id: 'scroll-behavior',
    title: '2. scroll-behavior 属性',
    content: [
      'CSS scroll-behavior 是 W3C 标准属性，只需在容器上设置 scroll-behavior: smooth 即可获得平滑滚动效果。',
      '使用方式极为简单：在 CSS 中设置 html { scroll-behavior: smooth; }，然后通过 <a href="#target-id"> 即可触发平滑滚动。',
      '优点是无任何 JavaScript 依赖，零学习成本。缺点是控制力较弱，无法自定义动画曲线、无法中途停止滚动。',
      '浏览器兼容性良好，主流浏览器均已支持该属性，但不支持 IE。',
    ],
  },
  {
    id: 'scroll-into-view',
    title: '3. scrollIntoView 方法',
    content: [
      'Element.scrollIntoView() 是 DOM API，调用后浏览器会将元素滚动到可视区域。',
      '现代浏览器支持 options 参数：element.scrollIntoView({ behavior: "smooth", block: "start" })。',
      '相比 CSS 方案，JS 方案可以在事件处理中动态决定滚动目标，灵活性更高。',
      'scrollIntoView 还支持 block 和 inline 参数控制对齐方式，以及 behavior 控制平滑度。',
    ],
  },
  {
    id: 'scroll-to-method',
    title: '4. scrollTo 方法',
    content: [
      'window.scrollTo() 和 element.scrollTo() 允许精确控制滚动位置，需要手动计算目标元素的 offsetTop。',
      '搭配缓动函数（easing function）可以自定义动画曲线，实现弹跳、缓出等效果。',
      '基本思路：获取目标位置 → 计算当前滚动位置 → 在动画帧中逐步改变 scrollTop。',
      '这种方式提供了最大的控制力，但需要自己处理动画循环、中断、防抖等逻辑。',
    ],
  },
  {
    id: 'raf-custom',
    title: '5. requestAnimationFrame 自定义动画',
    content: [
      'requestAnimationFrame（rAF）是浏览器提供的动画帧 API，在每次重绘前执行回调。',
      '使用 rAF 可以实现完全自定义的滚动动画，包括自定义缓动函数、滚动速度、甚至路径。',
      '相比 setInterval，rAF 在页面不可见时会自动暂停，节省性能。',
      '实现时需要处理：动画开始、持续更新滚动位置、动画结束判断、用户交互中断等边界情况。',
    ],
  },
  {
    id: 'lenis-library',
    title: '6. Lenis 平滑滚动库',
    content: [
      'Lenis 是一个轻量级的平滑滚动库，由 Darkroom Engineering 开发，提供丝滑的滚动体验。',
      '它会接管浏览器的原生滚动行为，使用缓动函数模拟出物理感更强、更自然的滚动效果。',
      'Lenis 提供了简洁的 API：new Lenis({ duration, easing }) 和 lenis.scrollTo(target)。',
      '支持虚拟滚动、无限滚动、滚动驱动动画等高级功能，适用于需要精细滚动控制的项目。',
      'GitHub 上拥有 10k+ stars，是当前最流行的平滑滚动库之一。',
    ],
  },
  {
    id: 'comparison',
    title: '7. 方案对比',
    content: [
      'CSS scroll-behavior 适合对滚动效果要求不高、不想引入额外代码的简单场景。',
      'scrollIntoView 是 JS 场景下最简洁的方案，适合需要动态决定滚动目标的情况。',
      'scrollTo + 缓动函数适合需要自定义动画曲线的场景，如品牌定制化的滚动效果。',
      'rAF 自定义动画适合需要完全控制滚动行为的场景，如游戏或特殊交互。',
      'Lenis 等第三方库适合追求极致滚动体验的产品级项目，但需要额外依赖包。',
    ],
  },
]

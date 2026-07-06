<template>
  <div class="space-y-12">
    <!-- 1. Ring 焦点环 -->
    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Ring 焦点环</h2>
      <p class="text-gray-600 mb-4">用于焦点态、选中态，比 <code>outline</code> 更灵活，可独立控制颜色、宽度和偏移。</p>
      <div class="space-y-6">
        <!-- 基础 Ring -->
        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-3">基础 Ring</h3>
          <div class="flex flex-wrap gap-4">
            <button class="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring transition-all">
              focus:ring
            </button>
            <button class="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all">
              focus:ring-2 blue
            </button>
            <button class="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-4 focus:ring-red-300 transition-all">
              focus:ring-4 red-300
            </button>
            <button class="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-inset focus:ring-green-500 transition-all">
              ring-inset green
            </button>
          </div>
        </div>

        <!-- Ring Offset -->
        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-3">Ring Offset（环偏移）</h3>
          <div class="flex flex-wrap gap-4">
            <button class="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all">
              ring-offset-2 blue
            </button>
            <button class="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-4 focus:ring-offset-red-500 focus:ring-red-500 transition-all">
              ring-offset-4 red
            </button>
            <button class="px-4 py-2 bg-indigo-600 text-white rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all">
              深色背景 + offset
            </button>
          </div>
        </div>

        <!-- Code -->
        <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre class="text-sm text-gray-300"><code>&lt;!-- Ring 基础 --&gt;
&lt;button class="<span class="text-yellow-400">focus:ring</span>"&gt;默认 ring&lt;/button&gt;
&lt;button class="<span class="text-yellow-400">focus:ring-2 focus:ring-blue-500</span>"&gt;2px 蓝色 ring&lt;/button&gt;
&lt;button class="<span class="text-yellow-400">focus:ring-4 focus:ring-red-300</span>"&gt;4px 浅红 ring&lt;/button&gt;
&lt;button class="<span class="text-yellow-400">focus:ring-inset focus:ring-green-500</span>"&gt;内嵌绿色 ring&lt;/button&gt;

&lt;!-- Ring Offset（在 ring 和元素之间加偏移层） --&gt;
&lt;button class="<span class="text-yellow-400">focus:ring-2 focus:ring-offset-2 focus:ring-blue-500</span>"&gt;
  2px 偏移 + 蓝色 ring
&lt;/button&gt;
&lt;button class="<span class="text-yellow-400">focus:ring-offset-4 focus:ring-offset-red-500</span>"&gt;
  偏移层本身也有颜色
&lt;/button&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 2. Divide 分割线 -->
    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Divide 分割线</h2>
      <p class="text-gray-600 mb-4">给直接子元素之间添加分割线，无需手动加 border。</p>
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-3">方向 & 颜色</h3>
          <div class="flex gap-6">
            <div class="divide-y divide-gray-300 w-48">
              <div class="p-3 text-sm">项目 A</div>
              <div class="p-3 text-sm">项目 B</div>
              <div class="p-3 text-sm">项目 C</div>
              <div class="p-3 text-sm">项目 D</div>
            </div>
            <div class="divide-y-2 divide-red-400 w-48">
              <div class="p-3 text-sm">项目 A</div>
              <div class="p-3 text-sm">项目 B</div>
              <div class="p-3 text-sm">项目 C</div>
            </div>
            <div class="divide-x divide-blue-400 flex">
              <div class="p-3 text-sm">列 1</div>
              <div class="p-3 text-sm">列 2</div>
              <div class="p-3 text-sm">列 3</div>
            </div>
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-3">卡片列表（实际场景）</h3>
          <div class="bg-white rounded-lg shadow divide-y divide-gray-100 max-w-sm">
            <div class="p-4 flex items-center justify-between">
              <span class="text-sm font-medium">总订单</span>
              <span class="text-sm text-gray-500">1,234</span>
            </div>
            <div class="p-4 flex items-center justify-between">
              <span class="text-sm font-medium">已完成</span>
              <span class="text-sm text-green-600">1,100</span>
            </div>
            <div class="p-4 flex items-center justify-between">
              <span class="text-sm font-medium">进行中</span>
              <span class="text-sm text-blue-600">100</span>
            </div>
            <div class="p-4 flex items-center justify-between">
              <span class="text-sm font-medium">已取消</span>
              <span class="text-sm text-red-600">34</span>
            </div>
          </div>
        </div>
        <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre class="text-sm text-gray-300"><code>&lt;!-- 垂直分割线（水平排列的元素之间） --&gt;
&lt;div class="<span class="text-yellow-400">divide-x divide-gray-200</span> flex"&gt;
  &lt;div&gt;列 1&lt;/div&gt;
  &lt;div&gt;列 2&lt;/div&gt;
  &lt;div&gt;列 3&lt;/div&gt;
&lt;/div&gt;

&lt;!-- 水平分割线（垂直排列的元素之间） --&gt;
&lt;div class="<span class="text-yellow-400">divide-y divide-gray-200</span>"&gt;
  &lt;div&gt;项目 A&lt;/div&gt;
  &lt;div&gt;项目 B&lt;/div&gt;
  &lt;div&gt;项目 C&lt;/div&gt;
&lt;/div&gt;

&lt;!-- 分割线宽度和虚线 --&gt;
&lt;div class="<span class="text-yellow-400">divide-y-2 divide-dashed divide-red-300</span>"&gt;...&lt;/div&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 3. Space 间距 -->
    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Space 间距</h2>
      <p class="text-gray-600 mb-4">通过 margin-left/right 或 margin-top/bottom 给直接子元素添加间距。推荐用 <code>gap</code>，但 <code>space</code> 在某些场景更方便。</p>
      <div class="space-y-6">
        <div class="flex gap-6">
          <div class="space-x-4 flex">
            <div class="bg-blue-100 px-3 py-1 rounded text-sm">A</div>
            <div class="bg-blue-100 px-3 py-1 rounded text-sm">B</div>
            <div class="bg-blue-100 px-3 py-1 rounded text-sm">C</div>
          </div>
          <div class="space-y-2">
            <div class="bg-green-100 px-3 py-1 rounded text-sm">第 1 行</div>
            <div class="bg-green-100 px-3 py-1 rounded text-sm">第 2 行</div>
            <div class="bg-green-100 px-3 py-1 rounded text-sm">第 3 行</div>
          </div>
        </div>
        <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre class="text-sm text-gray-300"><code>&lt;!-- 水平间距（给每个子元素加 margin-left） --&gt;
&lt;div class="<span class="text-yellow-400">space-x-4</span> flex"&gt;
  &lt;div&gt;A&lt;/div&gt;
  &lt;div&gt;B&lt;/div&gt;
  &lt;div&gt;C&lt;/div&gt;
&lt;/div&gt;

&lt;!-- 垂直间距（给每个子元素加 margin-top） --&gt;
&lt;div class="<span class="text-yellow-400">space-y-2</span>"&gt;
  &lt;div&gt;第 1 行&lt;/div&gt;
  &lt;div&gt;第 2 行&lt;/div&gt;
&lt;/div&gt;

&lt;!-- 注意：space-x 仅在 flex 行布局下生效，space-y 仅在 flex 列布局下生效 --&gt;
&lt;!-- 推荐优先使用 gap，更简洁且无副作用（不会给第一个元素加多余 margin） --&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 4. Backdrop 毛玻璃 -->
    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Backdrop 毛玻璃效果</h2>
      <p class="text-gray-600 mb-4">对元素<strong>背后</strong>的内容应用模糊、亮度等效果，常用于弹窗遮罩层。</p>
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-3">弹窗遮罩层示例</h3>
          <div class="relative h-48 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg overflow-hidden">
            <p class="absolute inset-0 flex items-center justify-center text-white text-lg font-bold z-0">
              背景内容
            </p>
            <!-- 毛玻璃遮罩 -->
            <div class="absolute inset-0 z-10 flex items-center justify-center">
              <div class="bg-white/30 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-white/20">
                <p class="text-white font-medium">backdrop-blur-sm</p>
              </div>
            </div>
            <div class="absolute inset-0 z-20 flex items-center justify-center translate-x-24">
              <div class="bg-black/30 backdrop-blur-md rounded-lg p-6 shadow-lg">
                <p class="text-white font-medium">backdrop-blur-md + bg-black/30</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-3">所有 Backdrop 变体</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg p-4 h-24 backdrop-blur-sm flex items-end">
              <span class="text-xs text-white font-mono">backdrop-blur-sm</span>
            </div>
            <div class="bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg p-4 h-24 backdrop-blur flex items-end">
              <span class="text-xs text-white font-mono">backdrop-blur</span>
            </div>
            <div class="bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg p-4 h-24 backdrop-blur-md flex items-end">
              <span class="text-xs text-white font-mono">backdrop-blur-md</span>
            </div>
            <div class="bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg p-4 h-24 backdrop-blur-xl flex items-end">
              <span class="text-xs text-white font-mono">backdrop-blur-xl</span>
            </div>
            <div class="bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg p-4 h-24 backdrop-brightness-50 flex items-end">
              <span class="text-xs text-white font-mono">brightness-50</span>
            </div>
            <div class="bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg p-4 h-24 backdrop-contrast-200 flex items-end">
              <span class="text-xs text-white font-mono">contrast-200</span>
            </div>
            <div class="bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg p-4 h-24 backdrop-grayscale flex items-end">
              <span class="text-xs text-white font-mono">grayscale</span>
            </div>
            <div class="bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg p-4 h-24 backdrop-saturate-200 flex items-end">
              <span class="text-xs text-white font-mono">saturate-200</span>
            </div>
          </div>
        </div>
        <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre class="text-sm text-gray-300"><code>&lt;!-- 毛玻璃弹窗 --&gt;
&lt;div class="<span class="text-yellow-400">fixed inset-0 z-50 flex items-center justify-center</span>"&gt;
  &lt;!-- 遮罩层 --&gt;
  &lt;div class="<span class="text-yellow-400">absolute inset-0 bg-black/50 backdrop-blur-sm</span>"&gt;&lt;/div&gt;
  &lt;!-- 弹窗内容 --&gt;
  &lt;div class="<span class="text-yellow-400">relative bg-white/80 backdrop-blur-md rounded-xl p-6</span>"&gt;
    弹窗内容
  &lt;/div&gt;
&lt;/div&gt;

&lt;!-- backdrop 变体 --&gt;
backdrop-blur-none | backdrop-blur-sm | backdrop-blur | backdrop-blur-md | backdrop-blur-lg | backdrop-blur-xl | backdrop-blur-2xl | backdrop-blur-3xl
backdrop-brightness-0 ~ backdrop-brightness-200
backdrop-contrast-0 ~ backdrop-contrast-200
backdrop-grayscale | backdrop-grayscale-0
backdrop-hue-rotate-0/15/30/60/90/180
backdrop-invert | backdrop-invert-0
backdrop-opacity-0 ~ backdrop-opacity-100
backdrop- saturate-0 ~ saturate-200
backdrop-sepia | backdrop-sepia-0</code></pre>
        </div>
      </div>
    </section>

    <!-- 5. Scroll 滚动 -->
    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Scroll 滚动控制</h2>
      <p class="text-gray-600 mb-4">控制滚动行为和滚动定位。</p>
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-3">平滑滚动 + 锚点定位</h3>
          <div class="bg-white rounded-lg shadow p-4">
            <nav class="flex gap-4 mb-4 text-sm">
              <a href="#section-a" class="text-indigo-600 hover:underline">跳到 A</a>
              <a href="#section-b" class="text-indigo-600 hover:underline">跳到 B</a>
              <a href="#section-c" class="text-indigo-600 hover:underline">跳到 C</a>
            </nav>
            <div class="h-48 overflow-y-auto scroll-smooth">
              <div class="p-4 bg-gray-50 rounded mb-2" id="section-a">
                <h4 class="font-semibold">Section A</h4>
                <p class="text-sm text-gray-500">这是第一个分区</p>
              </div>
              <div class="p-4 bg-gray-50 rounded mb-2">
                <p class="text-sm text-gray-400">占位内容...</p>
              </div>
              <div class="p-4 bg-gray-50 rounded mb-2">
                <p class="text-sm text-gray-400">占位内容...</p>
              </div>
              <div class="p-4 bg-gray-50 rounded mb-2" id="section-b">
                <h4 class="font-semibold">Section B</h4>
                <p class="text-sm text-gray-500">这是第二个分区</p>
              </div>
              <div class="p-4 bg-gray-50 rounded mb-2">
                <p class="text-sm text-gray-400">占位内容...</p>
              </div>
              <div class="p-4 bg-gray-50 rounded mb-2" id="section-c">
                <h4 class="font-semibold">Section C</h4>
                <p class="text-sm text-gray-500">这是第三个分区</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-3">滚动边距（固定导航栏下的锚点偏移）</h3>
          <div class="bg-white rounded-lg shadow p-4">
            <div class="h-48 overflow-y-auto">
              <div class="scroll-mt-16 bg-indigo-50 p-4 rounded mb-4">
                <p class="text-sm"><code class="bg-indigo-100 px-1 rounded">scroll-mt-16</code> — 锚点定位时向上偏移 4rem（留出导航栏空间）</p>
              </div>
              <div class="h-40 bg-gray-50 rounded mb-4 flex items-center justify-center text-gray-400 text-sm">
                占位内容...
              </div>
              <div class="scroll-ml-4 bg-green-50 p-4 rounded">
                <p class="text-sm"><code class="bg-green-100 px-1 rounded">scroll-ml-4</code> — 水平滚动时向左偏移 1rem</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-3">横向滚动容器</h3>
          <div class="flex gap-4 overflow-x-auto scroll-smooth pb-2">
            <div class="flex-shrink-0 w-64 h-32 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-lg flex items-center justify-center text-white">
              卡片 1
            </div>
            <div class="flex-shrink-0 w-64 h-32 bg-gradient-to-br from-pink-400 to-rose-400 rounded-lg flex items-center justify-center text-white">
              卡片 2
            </div>
            <div class="flex-shrink-0 w-64 h-32 bg-gradient-to-br from-amber-400 to-orange-400 rounded-lg flex items-center justify-center text-white">
              卡片 3
            </div>
            <div class="flex-shrink-0 w-64 h-32 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-lg flex items-center justify-center text-white">
              卡片 4
            </div>
          </div>
        </div>
        <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre class="text-sm text-gray-300"><code>&lt;!-- 平滑滚动 --&gt;
&lt;html class="<span class="text-yellow-400">scroll-smooth</span>"&gt;

&lt;!-- 滚动定位（锚点偏移，避免被固定导航遮挡） --&gt;
&lt;div id="section" class="<span class="text-yellow-400">scroll-mt-16</span>"&gt;...&lt;/div&gt;
&lt;div class="<span class="text-yellow-400">scroll-ml-4</span>"&gt;水平偏移&lt;/div&gt;
&lt;div class="<span class="text-yellow-400">scroll-mx-8</span>"&gt;同时设置水平偏移&lt;/div&gt;

&lt;!-- padding 版本（scroll-p）：设置滚动容器内边距，留出空间 --&gt;
&lt;div class="<span class="text-yellow-400">overflow-y-auto scroll-py-4</span>"&gt;...&lt;/div&gt;

&lt;!-- 滚动snap（吸附对齐） --&gt;
&lt;div class="<span class="text-yellow-400">overflow-x-auto snap-x snap-mandatory</span>"&gt;
  &lt;div class="<span class="text-yellow-400">snap-start</span> w-64"&gt;卡片 1&lt;/div&gt;
  &lt;div class="<span class="text-yellow-400">snap-center</span> w-64"&gt;卡片 2&lt;/div&gt;
&lt;/div&gt;

&lt;!-- 滚动行为 --&gt;
scroll-auto | scroll-smooth</code></pre>
        </div>
      </div>
    </section>

    <!-- 6. Placeholder 占位符 -->
    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Placeholder 占位符</h2>
      <p class="text-gray-600 mb-4">设置 input/textarea 的 placeholder 文本样式。</p>
      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl">
          <input
            type="text"
            placeholder="默认样式"
            class="border border-gray-300 rounded-lg px-4 py-2"
          />
          <input
            type="text"
            placeholder="placeholder:text-gray-400"
            class="border border-gray-300 rounded-lg px-4 py-2 placeholder:text-gray-400"
          />
          <input
            type="text"
            placeholder="placeholder:text-sm placeholder:italic"
            class="border border-gray-300 rounded-lg px-4 py-2 placeholder:text-sm placeholder:italic placeholder:text-gray-400"
          />
          <input
            type="text"
            placeholder="placeholder:text-red-300 placeholder:uppercase"
            class="border border-gray-300 rounded-lg px-4 py-2 placeholder:text-red-300 placeholder:uppercase"
          />
          <input
            type="text"
            placeholder="placeholder:opacity-50"
            class="border border-gray-300 rounded-lg px-4 py-2 placeholder:opacity-50"
          />
          <input
            type="text"
            placeholder="placeholder:tracking-wider"
            class="border border-gray-300 rounded-lg px-4 py-2 placeholder:tracking-wider placeholder:text-gray-500"
          />
        </div>
        <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre class="text-sm text-gray-300"><code>&lt;input placeholder="<span class="text-yellow-400">placeholder:text-gray-400</span>" /&gt;
&lt;input placeholder="<span class="text-yellow-400">placeholder:text-sm placeholder:italic</span>" /&gt;
&lt;input placeholder="<span class="text-yellow-400">placeholder:text-red-300 placeholder:uppercase</span>" /&gt;
&lt;input placeholder="<span class="text-yellow-400">placeholder:opacity-50</span>" /&gt;
&lt;input placeholder="<span class="text-yellow-400">placeholder:tracking-wider</span>" /&gt;

&lt;!-- 支持几乎所有文字工具类 --&gt;
placeholder:text-{color}
placeholder:text-{size}
placeholder:font-{weight}
placeholder:italic | placeholder:not-italic
placeholder:uppercase | placeholder:lowercase | placeholder:capitalize
placeholder:tracking-{tight|normal|wide}
placeholder:leading-{none|tight|snug|normal|relaxed|loose}
placeholder:opacity-{value}
placeholder:underline | placeholder:line-through | placeholder:no-underline</code></pre>
        </div>
      </div>
    </section>

    <!-- 7. @apply 指令 -->
    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">@apply 指令</h2>
      <p class="text-gray-600 mb-4">在 CSS 中组合多个 Tailwind 工具类，提取可复用的组件样式。</p>
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-3">示例按钮变体</h3>
          <div class="flex gap-4">
            <button class="btn-primary">Primary</button>
            <button class="btn-secondary">Secondary</button>
            <button class="btn-danger">Danger</button>
          </div>
        </div>
        <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre class="text-sm text-gray-300"><code><span class="text-blue-400">/* 在 CSS 文件中使用 */</span>
<span class="text-purple-400">@tailwind</span> base;
<span class="text-purple-400">@tailwind</span> components;
<span class="text-purple-400">@tailwind</span> utilities;

<span class="text-purple-400">@layer</span> components {
  <span class="text-green-400">.btn-primary</span> {
    <span class="text-yellow-400">@apply</span> px-4 py-2 bg-indigo-600 text-white rounded-lg
           hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2
           focus:ring-indigo-500 transition-colors font-medium;
  }

  <span class="text-green-400">.btn-secondary</span> {
    <span class="text-yellow-400">@apply</span> px-4 py-2 bg-gray-200 text-gray-800 rounded-lg
           hover:bg-gray-300 focus:ring-2 focus:ring-offset-2
           focus:ring-gray-400 transition-colors font-medium;
  }

  <span class="text-green-400">.btn-danger</span> {
    <span class="text-yellow-400">@apply</span> px-4 py-2 bg-red-600 text-white rounded-lg
           hover:bg-red-700 focus:ring-2 focus:ring-offset-2
           focus:ring-red-500 transition-colors font-medium;
  }
}

<span class="text-purple-400">@layer</span> utilities {
  <span class="text-green-400">.text-balance</span> {
    <span class="text-yellow-400">@apply</span> text-wrap balance;
  }
}</code></pre>
        </div>
      </div>
    </section>

    <!-- 8. !important 修饰符 -->
    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">!important 修饰符</h2>
      <p class="text-gray-600 mb-4">给工具类添加 <code>!important</code>，用于覆盖第三方样式或高优先级场景。</p>
      <div class="space-y-6">
        <div class="flex gap-4">
          <button class="!bg-red-500 !text-white px-4 py-2 rounded">
            !bg-red-500 !text-white
          </button>
          <button class="!bg-green-500 !text-white !font-bold px-4 py-2 rounded">
            !bg-green !text-white !font-bold
          </button>
          <button class="!opacity-100 px-4 py-2 bg-blue-500 text-white rounded">
            !opacity-100（强制不透明）
          </button>
        </div>
        <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre class="text-sm text-gray-300"><code>&lt;!-- 语法：在工具类名前加 ! --&gt;
&lt;button class="<span class="text-yellow-400">!bg-red-500 !text-white !font-bold</span>"&gt;
  强制覆盖
&lt;/button&gt;

&lt;!-- 等价于 CSS --&gt;
.button {
  background-color: red !important;
  color: white !important;
  font-weight: bold !important;
}

&lt;!-- 注意：谨慎使用，通常用更具体的选择器更好 --&gt;
&lt;!-- 适用场景：
  1. 覆盖第三方组件库样式
  2. 覆盖第三方插件动态添加的类
  3. 紧急修复样式问题
--&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 9. Truncate & Line Clamp -->
    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Truncate & Line Clamp 文本截断</h2>
      <p class="text-gray-600 mb-4">控制长文本的溢出和截断行为。</p>
      <div class="space-y-6">
        <div class="max-w-sm space-y-4">
          <div>
            <h3 class="text-sm font-medium text-gray-500 mb-1">truncate（单行截断 + 省略号）</h3>
            <p class="truncate bg-gray-100 p-3 rounded">
              这是一段非常非常非常非常非常非常非常非常非常非常长的文本，会超出容器宽度并显示省略号
            </p>
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-500 mb-1">line-clamp-2（限制 2 行）</h3>
            <p class="line-clamp-2 bg-gray-100 p-3 rounded">
              这是一段非常非常非常非常非常非常非常非常非常非常长的文本，限制为两行显示，超出部分会显示省略号。这里还有更多的内容用于演示多行截断效果。
            </p>
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-500 mb-1">line-clamp-3（限制 3 行）</h3>
            <p class="line-clamp-3 bg-gray-100 p-3 rounded">
              这是一段非常非常非常非常非常非常非常非常非常非常长的文本，限制为三行显示。每一行都会正常显示，直到第三行结束才会截断并显示省略号。这是第四行，会被截断。这是第五行，也会被截断。这是第六行，同样被截断。
            </p>
          </div>
        </div>
        <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre class="text-sm text-gray-300"><code>&lt;!-- 单行截断 --&gt;
&lt;p class="<span class="text-yellow-400">truncate</span>"&gt;
  长文本...（等价于 overflow:hidden + text-overflow:ellipsis + white-space:nowrap）
&lt;/p&gt;

&lt;!-- 多行截断（需要 @tailwindcss/line-clamp 插件，v3.3+ 已内置） --&gt;
&lt;p class="<span class="text-yellow-400">line-clamp-2</span>"&gt;限制 2 行&lt;/p&gt;
&lt;p class="<span class="text-yellow-400">line-clamp-3</span>"&gt;限制 3 行&lt;/p&gt;
&lt;p class="<span class="text-yellow-400">line-clamp-none</span>"&gt;不限制行数&lt;/p&gt;

&lt;!-- 任意行数（v3.3+ JIT 模式） --&gt;
&lt;p class="<span class="text-yellow-400">line-clamp-[5]</span>"&gt;限制 5 行&lt;/p&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 10. @layer 指令 -->
    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">@layer 指令</h2>
      <p class="text-gray-600 mb-4">控制 CSS 规则的<strong>层叠优先级</strong>，确保自定义样式能正确覆盖工具类。</p>
      <div class="space-y-6">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-700 mb-3">三个层级（优先级从低到高）</h3>
          <div class="space-y-3 text-sm">
            <div class="flex items-start gap-3">
              <code class="bg-gray-100 px-2 py-1 rounded text-xs whitespace-nowrap">@layer base</code>
              <span class="text-gray-600">基础层 — 重置样式、全局元素样式（最低优先级）</span>
            </div>
            <div class="flex items-start gap-3">
              <code class="bg-gray-100 px-2 py-1 rounded text-xs whitespace-nowrap">@layer components</code>
              <span class="text-gray-600">组件层 — <code>@apply</code> 定义的可复用组件（中等优先级）</span>
            </div>
            <div class="flex items-start gap-3">
              <code class="bg-gray-100 px-2 py-1 rounded text-xs whitespace-nowrap">@layer utilities</code>
              <span class="text-gray-600">工具层 — 自定义工具类（最高优先级）</span>
            </div>
          </div>
        </div>
        <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre class="text-sm text-gray-300"><code><span class="text-purple-400">@layer</span> base {
  <span class="text-green-400">html</span> {
    <span class="text-yellow-400">font-family</span>: 'Inter', sans-serif;
    <span class="text-yellow-400">color-scheme</span>: light dark;
  }
  <span class="text-green-400">h1, h2, h3</span> {
    <span class="text-yellow-400">font-weight</span>: 700;
  }
}

<span class="text-purple-400">@layer</span> components {
  <span class="text-green-400">.card</span> {
    <span class="text-yellow-400">@apply</span> bg-white rounded-xl shadow-md p-6;
  }
  <span class="text-green-400">.btn</span> {
    <span class="text-yellow-400">@apply</span> px-4 py-2 rounded-lg font-medium transition-colors;
  }
}

<span class="text-purple-400">@layer</span> utilities {
  <span class="text-green-400">.text-balance</span> {
    <span class="text-yellow-400">@apply</span> text-wrap balance;
  }
  <span class="text-green-400">.scrollbar-hide</span> {
    <span class="text-yellow-400">@apply</span> [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none];
  }
}

<span class="text-blue-400">/* 不在任何 layer 中的样式优先级最高 */</span>
<span class="text-green-400">.override-class</span> {
  <span class="text-yellow-400">color</span>: red !important;
}</code></pre>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
</script>

<template>
  <div class="space-y-12">
    <!-- 1. 文字装饰 -->
    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">文字装饰 Text Decoration</h2>
      <p class="text-gray-600 mb-4">控制下划线、删除线、上划线及其样式。</p>
      <div class="space-y-6">
        <div class="space-y-3">
          <p class="underline text-lg">underline — 默认下划线</p>
          <p class="underline decoration-solid text-lg">decoration-solid — 实线下划线</p>
          <p class="underline decoration-double text-lg">decoration-double — 双线下划线</p>
          <p class="underline decoration-dotted text-lg">decoration-dotted — 点线下划线</p>
          <p class="underline decoration-dashed text-lg">decoration-dashed — 虚线下划线</p>
          <p class="underline decoration-wavy text-lg">decoration-wavy — 波浪线下划线</p>
          <p class="underline decoration-2 text-lg">decoration-2 — 2px 粗下划线</p>
          <p class="underline decoration-4 text-lg">decoration-4 — 4px 粗下划线</p>
          <p class="underline decoration-indigo-500 text-lg">decoration-indigo-500 — 靛蓝色下划线</p>
          <p class="underline decoration-pink-400 decoration-wavy decoration-2 text-lg">
            组合：粉色波浪 2px 下划线
          </p>
          <p class="underline underline-offset-4 text-lg">underline-offset-4 — 下划线偏移 4px</p>
          <p class="underline underline-offset-8 decoration-4 text-lg">
            underline-offset-8 decoration-4 — 大偏移 + 粗线
          </p>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-3">删除线 & 上划线</h3>
          <div class="flex gap-6">
            <span class="line-through text-lg">line-through 删除线</span>
            <span class="overline text-lg">overline 上划线</span>
            <span class="no-underline text-lg text-indigo-600">no-underline（去掉下划线）</span>
          </div>
        </div>
        <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre class="text-sm text-gray-300"><code><span class="text-blue-400">/* 下划线 */</span>
underline | no-underline | line-through | overline

<span class="text-blue-400">/* 下划线样式 */</span>
decoration-solid | decoration-double | decoration-dotted | decoration-dashed | decoration-wavy

<span class="text-blue-400">/* 下划线粗细 */</span>
decoration-auto | decoration-0 | decoration-1 | decoration-2 | decoration-4 | decoration-8

<span class="text-blue-400">/* 下划线颜色 */</span>
decoration-{color}    <span class="text-gray-500">/* 独立于文字颜色 */</span>

<span class="text-blue-400">/* 下划线偏移 */</span>
underline-offset-auto | underline-offset-0 | underline-offset-2 | underline-offset-4 | underline-offset-8

<span class="text-blue-400">/* 组合示例 */</span>
&lt;p class="<span class="text-yellow-400">underline decoration-wavy decoration-pink-400 decoration-2 underline-offset-4</span>"&gt;
  粉色波浪 2px 下划线，偏移 4px
&lt;/p&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 2. 文字大小写 -->
    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">文字大小写 Text Transform</h2>
      <div class="space-y-6">
        <div class="space-y-3">
          <p class="uppercase text-lg">uppercase — 全部大写 THIS IS UPPERCASE</p>
          <p class="lowercase text-lg">Lowercase — 全部小写 THIS IS LOWERCASE</p>
          <p class="capitalize text-lg">capitalize — 首字母大写 this is capitalized</p>
          <p class="normal-case text-lg">normal-case — 正常显示 This Is Normal Case</p>
        </div>
        <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre class="text-sm text-gray-300"><code>uppercase      <span class="text-gray-500">/* 全部大写 */</span>
lowercase      <span class="text-gray-500">/* 全部小写 */</span>
capitalize     <span class="text-gray-500">/* 每个单词首字母大写 */</span>
normal-case    <span class="text-gray-500">/* 正常显示（覆盖其他变换） */</span></code></pre>
        </div>
      </div>
    </section>

    <!-- 3. 列表样式 -->
    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">列表样式 List Style</h2>
      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 class="text-sm font-semibold text-gray-500 mb-2">list-disc（实心圆）</h3>
            <ul class="list-disc list-inside space-y-1 text-gray-700">
              <li>项目 A</li>
              <li>项目 B</li>
              <li>项目 C</li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-500 mb-2">list-decimal（数字）</h3>
            <ol class="list-decimal list-inside space-y-1 text-gray-700">
              <li>第一步</li>
              <li>第二步</li>
              <li>第三步</li>
            </ol>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-500 mb-2">list-none（无符号）</h3>
            <ul class="list-none list-inside space-y-1 text-gray-700">
              <li>无符号项目</li>
              <li>自定义样式</li>
            </ul>
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-3">position 对比</h3>
          <div class="flex gap-8">
            <div>
              <p class="text-sm text-gray-500 mb-1">list-inside</p>
              <ul class="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>文字在符号右侧</li>
                <li>符号和文字同缩进</li>
              </ul>
            </div>
            <div>
              <p class="text-sm text-gray-500 mb-1">list-outside</p>
              <ul class="list-disc list-outside text-sm text-gray-700 space-y-1 ml-6">
                <li>符号在文字左侧外</li>
                <li>文字统一缩进</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre class="text-sm text-gray-300"><code>list-none       <span class="text-gray-500">/* 无符号 */</span>
list-disc       <span class="text-gray-500">/* 实心圆 • */</span>
list-decimal    <span class="text-gray-500">/* 数字 1. 2. 3. */</span>

list-inside     <span class="text-gray-500">/* 符号在文本内侧 */</span>
list-outside    <span class="text-gray-500">/* 符号在文本外侧（默认） */</span>

<span class="text-blue-400">/* 结合 marker: 自定义符号颜色 */</span>
&lt;ul class="<span class="text-yellow-400">list-disc list-inside marker:text-indigo-600</span>"&gt;
  &lt;li&gt;自定义符号颜色&lt;/li&gt;
&lt;/ul&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 4. 表格样式 -->
    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">表格样式 Table</h2>
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-3">border-collapse（合并边框）</h3>
          <table class="w-full border-collapse text-sm">
            <thead>
              <tr class="bg-gray-100">
                <th class="border border-gray-300 px-4 py-2 text-left">名称</th>
                <th class="border border-gray-300 px-4 py-2 text-left">类型</th>
                <th class="border border-gray-300 px-4 py-2 text-left">描述</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 px-4 py-2">margin</td>
                <td class="border border-gray-300 px-4 py-2">number/string</td>
                <td class="border border-gray-300 px-4 py-2">外边距</td>
              </tr>
              <tr class="bg-gray-50">
                <td class="border border-gray-300 px-4 py-2">padding</td>
                <td class="border border-gray-300 px-4 py-2">number/string</td>
                <td class="border border-gray-300 px-4 py-2">内边距</td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2">border</td>
                <td class="border border-gray-300 px-4 py-2">number/string</td>
                <td class="border border-gray-300 px-4 py-2">边框宽度</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-3">border-separate（分离边框 + 间距）</h3>
          <table class="w-full border-separate border-spacing-0 text-sm">
            <thead>
              <tr class="bg-gray-100">
                <th class="rounded-tl-lg border border-gray-300 px-4 py-2 text-left">名称</th>
                <th class="border border-gray-300 px-4 py-2 text-left">类型</th>
                <th class="rounded-tr-lg border border-gray-300 px-4 py-2 text-left">描述</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 px-4 py-2">gap</td>
                <td class="border border-gray-300 px-4 py-2">number/string</td>
                <td class="border border-gray-300 px-4 py-2">Grid/Flex 间距</td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2">space</td>
                <td class="border border-gray-300 px-4 py-2">number/string</td>
                <td class="rounded-bl-lg border border-gray-300 px-4 py-2">子元素间距</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-3">table-fixed（固定列宽）</h3>
          <table class="w-full table-fixed text-sm">
            <thead>
              <tr class="bg-gray-100">
                <th class="w-1/4 border border-gray-300 px-4 py-2 text-left">列 1（固定 25%）</th>
                <th class="border border-gray-300 px-4 py-2 text-left">列 2（自适应）</th>
                <th class="w-1/3 border border-gray-300 px-4 py-2 text-left">列 3（固定 33%）</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 px-4 py-2">固定</td>
                <td class="border border-gray-300 px-4 py-2">自适应填满剩余空间</td>
                <td class="border border-gray-300 px-4 py-2">固定</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre class="text-sm text-gray-300"><code><span class="text-blue-400">/* 布局 */</span>
table-auto       <span class="text-gray-500">/* 自动列宽（根据内容） */</span>
table-fixed      <span class="text-gray-500">/* 固定列宽（根据首行） */</span>

<span class="text-blue-400">/* 边框 */</span>
border-collapse  <span class="text-gray-500">/* 合并相邻边框 */</span>
border-separate  <span class="text-gray-500">/* 分离边框 */</span>
border-spacing-{size}  <span class="text-gray-500">/* 分离边框间距 */</span>

<span class="text-blue-400">/* 宽度 */</span>
w-full           <span class="text-gray-500">/* 表格占满容器宽度 */</span>
w-{value}        <span class="text-gray-500">/* 列固定宽度 */</span>

<span class="text-blue-400">/* 文字对齐 */</span>
text-left | text-center | text-right

<span class="text-blue-400">/* 完整表格示例 */</span>
&lt;table class="<span class="text-yellow-400">w-full border-collapse text-sm</span>"&gt;
  &lt;thead class="<span class="text-yellow-400">bg-gray-100</span>"&gt;
    &lt;tr&gt;
      &lt;th class="<span class="text-yellow-400">border border-gray-300 px-4 py-2 text-left</span>"&gt;标题&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr class="<span class="text-yellow-400">odd:bg-white even:bg-gray-50</span>"&gt;
      &lt;td class="<span class="text-yellow-400">border border-gray-300 px-4 py-2</span>"&gt;内容&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/table&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 5. caret-color 光标色 -->
    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Caret Color 输入光标色</h2>
      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl">
          <input
            type="text"
            placeholder="默认光标色"
            class="border border-gray-300 rounded-lg px-4 py-2"
          />
          <input
            type="text"
            placeholder="caret-red-500"
            class="border border-gray-300 rounded-lg px-4 py-2 caret-red-500"
          />
          <input
            type="text"
            placeholder="caret-indigo-600 caret-2"
            class="border border-gray-300 rounded-lg px-4 py-2 caret-indigo-600"
          />
          <input
            type="text"
            placeholder="caret-emerald-500"
            class="border border-gray-300 rounded-lg px-4 py-2 caret-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
          />
        </div>
        <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre class="text-sm text-gray-300"><code>&lt;input class="<span class="text-yellow-400">caret-red-500</span>" /&gt;
&lt;input class="<span class="text-yellow-400">caret-indigo-600</span>" /&gt;
&lt;input class="<span class="text-yellow-400">caret-emerald-500</span>" /&gt;

caret-{color}     <span class="text-gray-500">/* 光标颜色 */</span></code></pre>
        </div>
      </div>
    </section>

    <!-- 6. accent-color 主题色 -->
    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Accent Color 主题色</h2>
      <p class="text-gray-600 mb-4">自定义 checkbox、radio、range 滑块的主题色。</p>
      <div class="space-y-6">
        <div class="flex flex-wrap gap-6">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" class="w-5 h-5 accent-indigo-600" />
            <span class="text-sm">accent-indigo-600</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" class="w-5 h-5 accent-pink-500" />
            <span class="text-sm">accent-pink-500</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" class="w-5 h-5 accent-emerald-500" />
            <span class="text-sm">accent-emerald-500</span>
          </label>
        </div>
        <div class="flex flex-wrap gap-6">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="accent-demo" class="w-5 h-5 accent-red-500" />
            <span class="text-sm">accent-red-500</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="accent-demo" class="w-5 h-5 accent-amber-500" />
            <span class="text-sm">accent-amber-500</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="accent-demo" class="w-5 h-5 accent-cyan-500" />
            <span class="text-sm">accent-cyan-500</span>
          </label>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-3">Range 滑块</h3>
          <div class="space-y-3 max-w-md">
            <input type="range" class="w-full accent-indigo-600" />
            <input type="range" class="w-full accent-pink-500" />
            <input type="range" class="w-full accent-emerald-500" />
          </div>
        </div>
        <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre class="text-sm text-gray-300"><code>&lt;input type="checkbox" class="<span class="text-yellow-400">accent-indigo-600</span>" /&gt;
&lt;input type="radio" class="<span class="text-yellow-400">accent-pink-500</span>" /&gt;
&lt;input type="range" class="<span class="text-yellow-400">accent-emerald-500</span>" /&gt;

accent-{color}     <span class="text-gray-500">/* checkbox/radio/range 主题色 */</span></code></pre>
        </div>
      </div>
    </section>

    <!-- 7. will-change -->
    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Will Change 性能提示</h2>
      <p class="text-gray-600 mb-4">提示浏览器该元素的属性即将变化，浏览器可提前优化。仅在需要时使用。</p>
      <div class="space-y-6">
        <div class="flex gap-4">
          <div class="w-16 h-16 bg-indigo-500 rounded-lg will-change-transform hover:rotate-45 transition-transform cursor-pointer">
            <div class="w-full h-full flex items-center justify-center text-white text-xs">transform</div>
          </div>
          <div class="w-16 h-16 bg-pink-500 rounded-lg will-change-opacity hover:opacity-0 transition-opacity cursor-pointer">
            <div class="w-full h-full flex items-center justify-center text-white text-xs">opacity</div>
          </div>
          <div class="h-16 flex-1 bg-gray-200 rounded-lg overflow-hidden">
            <div class="w-1/3 h-full bg-emerald-500 will-change-scroll animate-pulse"></div>
          </div>
        </div>
        <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre class="text-sm text-gray-300"><code>will-change-transform     <span class="text-gray-500">/* 提示将做 transform 变化 */</span>
will-change-opacity      <span class="text-gray-500">/* 提示将做 opacity 变化 */</span>
will-change-scroll       <span class="text-gray-500">/* 提示将做滚动 */</span>
will-change-contents     <span class="text-gray-500">/* 提示内容将变化 */</span>
will-change-auto         <span class="text-gray-500">/* 浏览器自动决定（默认） */</span>
will-change-none         <span class="text-gray-500">/* 无提示 */</span>

<span class="text-blue-400">/* 注意事项：
  1. 仅在频繁变化的元素上使用
  2. 动画结束后应移除
  3. 不要给太多元素设置，否则反而降低性能
  4. 优先使用 transform 和 opacity 做动画（GPU 加速）*/</span></code></pre>
        </div>
      </div>
    </section>

    <!-- 8. Touch 触摸行为 -->
    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Touch Touch Action</h2>
      <p class="text-gray-600 mb-4">控制触摸设备上的手势行为，常用于移动端。</p>
      <div class="space-y-6">
        <div class="bg-gray-100 rounded-lg p-4">
          <p class="text-sm text-gray-500 mb-2">以下区域可触摸测试：</p>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-white rounded-lg p-4 text-center text-sm touch-auto border border-gray-200">
              <code class="text-xs bg-gray-100 px-1 rounded">touch-auto</code>
              <p class="text-gray-500 mt-1">默认（浏览器）</p>
            </div>
            <div class="bg-white rounded-lg p-4 text-center text-sm touch-none border border-gray-200">
              <code class="text-xs bg-gray-100 px-1 rounded">touch-none</code>
              <p class="text-gray-500 mt-1">禁止所有手势</p>
            </div>
            <div class="bg-white rounded-lg p-4 text-center text-sm touch-pan-x border border-gray-200">
              <code class="text-xs bg-gray-100 px-1 rounded">touch-pan-x</code>
              <p class="text-gray-500 mt-1">仅允许水平滚动</p>
            </div>
            <div class="bg-white rounded-lg p-4 text-center text-sm touch-pan-y border border-gray-200">
              <code class="text-xs bg-gray-100 px-1 rounded">touch-pan-y</code>
              <p class="text-gray-500 mt-1">仅允许垂直滚动</p>
            </div>
          </div>
        </div>
        <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre class="text-sm text-gray-300"><code>touch-auto         <span class="text-gray-500">/* 浏览器默认行为 */</span>
touch-none         <span class="text-gray-500">/* 禁止所有触摸手势 */</span>
touch-pan-x        <span class="text-gray-500">/* 仅允许水平拖拽/滚动 */</span>
touch-pan-y        <span class="text-gray-500">/* 仅允许垂直拖拽/滚动 */</span>
touch-pinch-zoom   <span class="text-gray-500">/* 仅允许双指缩放 */</span>
touch-manipulation <span class="text-gray-500">/* 允许拖拽和缩放，禁止双击缩放 */</span>

<span class="text-blue-400">/* 典型场景 */</span>
地图容器：touch-none（禁止页面滚动，由地图库控制手势）
轮播图：touch-pan-x（仅允许左右滑动）
图片查看器：touch-manipulation（允许缩放和拖拽）</code></pre>
        </div>
      </div>
    </section>

    <!-- 9. appearance -->
    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Appearance 去除原生样式</h2>
      <div class="space-y-6">
        <div class="flex gap-6">
          <div>
            <p class="text-sm text-gray-500 mb-2">默认 checkbox</p>
            <input type="checkbox" class="w-5 h-5" />
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-2">appearance-none + 自定义</p>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" class="appearance-none w-5 h-5 border-2 border-gray-300 rounded checked:bg-indigo-600 checked:border-indigo-600 transition-colors" />
              <span class="text-sm">自定义 checkbox</span>
            </label>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-2">默认 select</p>
            <select class="border border-gray-300 rounded px-3 py-1 text-sm">
              <option>选项 A</option>
              <option>选项 B</option>
            </select>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-2">appearance-none + 自定义</p>
            <div class="relative">
              <select class="appearance-none border border-gray-300 rounded px-3 py-1 pr-8 text-sm bg-white">
                <option>选项 A</option>
                <option>选项 B</option>
              </select>
              <svg class="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre class="text-sm text-gray-300"><code><span class="text-blue-400">/* 去除原生样式 */</span>
&lt;input type="checkbox" class="<span class="text-yellow-400">appearance-none</span> w-5 h-5 border-2 border-gray-300 rounded
       checked:bg-indigo-600 checked:border-indigo-600" /&gt;

&lt;select class="<span class="text-yellow-400">appearance-none</span> bg-white border border-gray-300 rounded pr-8"&gt;
  ...
&lt;/select&gt;

<span class="text-blue-400">/* 配合 Tailwind 使用 */</span>
appearance-none        <span class="text-gray-500">/* 移除原生样式 */</span>
appearance-auto        <span class="text-gray-500">/* 恢复原生样式 */</span>

<span class="text-blue-400">/* 自定义 checkbox 常用组合 */</span>
appearance-none border-2 border-gray-300 rounded
checked:bg-indigo-600 checked:border-indigo-600
focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500</code></pre>
        </div>
      </div>
    </section>

    <!-- 10. 文字截断对比 -->
    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">overflow & text-overflow</h2>
      <div class="space-y-6">
        <div class="max-w-sm space-y-3">
          <div class="w-full h-8 bg-gray-100 rounded px-3 flex items-center overflow-hidden">
            <span class="text-sm text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis">
              overflow-hidden + text-ellipsis — 超出部分截断显示省略号
            </span>
          </div>
          <div class="w-full h-8 bg-gray-100 rounded px-3 flex items-center overflow-hidden">
            <span class="text-sm text-gray-700 whitespace-nowrap overflow-hidden text-clip">
              overflow-hidden + text-clip — 超出部分截断无省略号
            </span>
          </div>
          <div class="w-full bg-gray-100 rounded px-3 py-2 overflow-hidden">
            <span class="text-sm text-gray-700 break-all">
              break-all — 任意位置断行：LongTextWithoutAnySpaceExample123456789
            </span>
          </div>
          <div class="w-full bg-gray-100 rounded px-3 py-2 overflow-hidden">
            <span class="text-sm text-gray-700 break-words">
              break-words — 单词边界断行：LongTextWithoutAnySpaceExample
            </span>
          </div>
        </div>
        <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre class="text-sm text-gray-300"><code><span class="text-blue-400">/* 单行截断 */</span>
truncate = overflow-hidden + text-overflow-ellipsis + whitespace-nowrap

<span class="text-blue-400">/* 文本溢出 */</span>
overflow-hidden     <span class="text-gray-500">/* 裁剪溢出内容 */</span>
overflow-visible    <span class="text-gray-500">/* 显示溢出内容 */</span>
overflow-auto       <span class="text-gray-500">/* 自动滚动条 */</span>
overflow-scroll     <span class="text-gray-500">/* 始终显示滚动条 */</span>

<span class="text-blue-400">/* 文本溢出 */</span>
text-ellipsis       <span class="text-gray-500">/* 溢出显示省略号 */</span>
text-clip           <span class="text-gray-500">/* 溢出直接裁剪 */</span>

<span class="text-blue-400">/* 换行 */</span>
whitespace-nowrap   <span class="text-gray-500">/* 不换行 */</span>
whitespace-normal   <span class="text-gray-500">/* 正常换行 */</span>
break-all           <span class="text-gray-500">/* 任意位置断行 */</span>
break-words         <span class="text-gray-500">/* 单词边界断行 */</span>
break-normal        <span class="text-gray-500">/* 正常断行 */</span>

<span class="text-blue-400">/* 溢出方向 */</span>
overflow-x-auto     <span class="text-gray-500">/* 水平自动滚动 */</span>
overflow-y-scroll   <span class="text-gray-500">/* 垂直始终滚动 */</span></code></pre>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
</script>

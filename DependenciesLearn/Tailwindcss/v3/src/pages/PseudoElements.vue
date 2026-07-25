<template>
  <div class="space-y-12">
    <!-- 1. before: 和 after: 伪元素 -->
    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">before: &amp; after: 伪元素</h2>
      <p class="text-gray-600 mb-4">通过 <code>before:</code> 和 <code>after:</code> 修饰符创建伪元素，必须配合 <code>content-['']</code>。</p>
      <div class="space-y-6">
        <!-- 基础用法 -->
        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-3">基础用法</h3>
          <div class="flex flex-wrap gap-4">
            <span class="before:content-['*'] before:text-red-500 before:mr-1 after:content-['*'] after:text-red-500 after:ml-1">
              必填字段
            </span>
            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full before:content-['🏷️_'] before:mr-1">
              标签样式
            </span>
          </div>
        </div>

        <!-- 装饰效果 -->
        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-3">装饰效果</h3>
          <div class="space-y-4">
            <!-- 下划线装饰 -->
            <div class="relative inline-block">
              <h4 class="text-2xl font-bold text-gray-800 relative z-10">标题文字</h4>
              <span class="absolute bottom-0 left-0 w-full h-3 bg-yellow-200 -z-0 -rotate-1"></span>
            </div>

            <!-- 引号效果 -->
            <div class="relative pl-8 max-w-md">
              <span class="absolute -top-2 -left-2 text-5xl text-indigo-200 font-serif before:content-['“']"></span>
              <p class="text-gray-700 italic">
                这是一段引用文字，使用 before 伪元素添加了装饰性引号。
              </p>
            </div>

            <!-- 徽章 -->
            <div class="flex gap-2">
              <span class="relative bg-white border border-gray-300 px-4 py-2 rounded-lg">
                新功能
                <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  3
                </span>
              </span>
            </div>

            <!-- 步骤指示器 -->
            <div class="flex items-center gap-4">
              <div class="relative flex items-center justify-center w-10 h-10 bg-indigo-600 text-white rounded-full font-bold">
                1
              </div>
              <div class="flex-1 h-0.5 bg-indigo-200 relative">
                <div class="absolute inset-y-0 left-0 w-2/3 bg-indigo-600"></div>
              </div>
              <div class="relative flex items-center justify-center w-10 h-10 bg-indigo-600 text-white rounded-full font-bold">
                2
              </div>
              <div class="flex-1 h-0.5 bg-gray-200"></div>
              <div class="relative flex items-center justify-center w-10 h-10 bg-gray-200 text-gray-500 rounded-full font-bold">
                3
              </div>
            </div>
          </div>
        </div>

        <!-- 代码 -->
        <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre class="text-sm text-gray-300"><code><span class="text-blue-400">/* 必须设置 content 属性 */</span>
&lt;span class="<span class="text-yellow-400">before:content-['*'] before:text-red-500</span>"&gt;必填&lt;/span&gt;

<span class="text-blue-400">/* 下划线装饰 */</span>
&lt;div class="relative"&gt;
  &lt;h4 class="relative z-10"&gt;标题&lt;/h4&gt;
  &lt;span class="<span class="text-yellow-400">absolute bottom-0 left-0 w-full h-3 bg-yellow-200 -z-0 -rotate-1</span>"&gt;&lt;/span&gt;
&lt;/div&gt;

<span class="text-blue-400">/* 引号效果 */</span>
&lt;div class="relative pl-8"&gt;
  &lt;span class="<span class="text-yellow-400">absolute -top-2 -left-2 text-5xl text-indigo-200 font-serif before:content-['"']</span>"&gt;&lt;/span&gt;
  &lt;p&gt;引用文字&lt;/p&gt;
&lt;/div&gt;

<span class="text-blue-400">/* after 伪元素 */</span>
&lt;a class="<span class="text-yellow-400">after:content-['↗'] after:ml-1 after:text-sm</span>"&gt;
  外部链接
&lt;/a&gt;

<span class="text-blue-400">/* 同时使用 before 和 after */</span>
&lt;span class="<span class="text-yellow-400">before:content-['('] after:content-[')']</span>"&gt;
  包裹文字
&lt;/span&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 2. marker: 列表符号 -->
    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">marker: 列表符号样式</h2>
      <p class="text-gray-600 mb-4">自定义 <code>&lt;ul&gt;</code>、<code>&lt;ol&gt;</code> 和 <code>&lt;li&gt;</code> 的列表符号样式。</p>
      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-semibold text-gray-700 mb-3">有序列表</h3>
            <ol class="list-decimal list-inside space-y-2 marker:text-indigo-600 marker:font-bold">
              <li class="text-gray-700">第一步</li>
              <li class="text-gray-700">第二步</li>
              <li class="text-gray-700">第三步</li>
            </ol>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-700 mb-3">无序列表</h3>
            <ul class="list-disc list-inside space-y-2 marker:text-pink-500 marker:text-lg">
              <li class="text-gray-700">项目 A</li>
              <li class="text-gray-700">项目 B</li>
              <li class="text-gray-700">项目 C</li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-700 mb-3">字母列表</h3>
            <ol class="list-alpha list-inside space-y-2 marker:text-green-600 marker:font-bold marker:text-lg" style="list-style-type: lower-alpha;">
              <li class="text-gray-700">选项 A</li>
              <li class="text-gray-700">选项 B</li>
              <li class="text-gray-700">选项 C</li>
            </ol>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-700 mb-3">罗马数字</h3>
            <ol class="list-inside space-y-2 marker:text-amber-600 marker:font-mono" style="list-style-type: upper-roman;">
              <li class="text-gray-700">第一</li>
              <li class="text-gray-700">第二</li>
              <li class="text-gray-700">第三</li>
            </ol>
          </div>
        </div>
        <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre class="text-sm text-gray-300"><code>&lt;!-- 有序列表 + marker 样式 --&gt;
&lt;ol class="<span class="text-yellow-400">list-decimal list-inside marker:text-indigo-600 marker:font-bold</span>"&gt;
  &lt;li&gt;第一步&lt;/li&gt;
  &lt;li&gt;第二步&lt;/li&gt;
&lt;/ol&gt;

&lt;!-- 无序列表 + marker 样式 --&gt;
&lt;ul class="<span class="text-yellow-400">list-disc list-inside marker:text-pink-500 marker:text-lg</span>"&gt;
  &lt;li&gt;项目 A&lt;/li&gt;
  &lt;li&gt;项目 B&lt;/li&gt;
&lt;/ul&gt;

<span class="text-blue-400">/* 任意 marker 样式 */</span>
marker:text-{color}        <span class="text-gray-500">/* 符号颜色 */</span>
marker:text-{size}         <span class="text-gray-500">/* 符号大小 */</span>
marker:font-{weight}       <span class="text-gray-500">/* 符号粗细 */</span>
marker:opacity-{value}     <span class="text-gray-500">/* 符号透明度 */</span>
marker:[content:'✓']       <span class="text-gray-500">/* 自定义符号内容（v3.4+） */</span></code></pre>
        </div>
      </div>
    </section>

    <!-- 3. selection: 选中文本 -->
    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">selection: 选中文本样式</h2>
      <p class="text-gray-600 mb-4">自定义用户选中文本时的高亮颜色。</p>
      <div class="space-y-6">
        <div class="space-y-3">
          <p class="selection:bg-indigo-200 selection:text-indigo-900 bg-white p-3 rounded">
            selection:bg-indigo-200 selection:text-indigo-900 — 选中显示靛蓝色高亮
          </p>
          <p class="selection:bg-pink-200 selection:text-pink-900 bg-white p-3 rounded">
            selection:bg-pink-200 selection:text-pink-900 — 选中显示粉色高亮
          </p>
          <p class="selection:bg-yellow-200 selection:text-yellow-900 bg-white p-3 rounded">
            selection:bg-yellow-200 selection:text-yellow-900 — 选中显示黄色高亮
          </p>
          <p class="selection:bg-green-300 selection:text-green-900 bg-white p-3 rounded">
            selection:bg-green-300 selection:text-green-900 — 选中显示绿色高亮
          </p>
        </div>
        <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre class="text-sm text-gray-300"><code>&lt;p class="<span class="text-yellow-400">selection:bg-indigo-200 selection:text-indigo-900</span>"&gt;
  选中这段文字试试
&lt;/p&gt;

<span class="text-blue-400">/* 全局设置选中样式 */</span>
<span class="text-purple-400">@layer</span> base {
  <span class="text-green-400">::selection</span> {
    <span class="text-yellow-400">background-color</span>: theme('colors.indigo.200');
    <span class="text-yellow-400">color</span>: theme('colors.indigo.900');
  }
}

selection:bg-{color}         <span class="text-gray-500">/* 选中背景色 */</span>
selection:text-{color}       <span class="text-gray-500">/* 选中文字色 */</span>
selection:font-bold          <span class="text-gray-500">/* 选中加粗 */</span>
selection:underline          <span class="text-gray-500">/* 选中下划线 */</span></code></pre>
        </div>
      </div>
    </section>

    <!-- 4. peer 机制 -->
    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">peer 机制（同级兄弟联动）</h2>
      <p class="text-gray-600 mb-4">给元素添加 <code>peer</code> 类后，其<strong>同级后续兄弟元素</strong>可通过 <code>peer-*</code> 修饰符响应状态变化。类似 <code>group</code> 但更灵活。</p>
      <div class="space-y-6">
        <!-- 输入框联动 -->
        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-3">输入框联动</h3>
          <div class="space-y-4 max-w-sm">
            <div>
              <input
                type="text"
                placeholder="输入后看标签变化"
                class="peer w-full border border-gray-300 rounded-lg px-4 pt-5 pb-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              />
              <label class="absolute left-3 top-2 text-xs text-gray-400 transition-all peer-focus:text-indigo-600 peer-focus:text-xs peer-[:not(:placeholder-shown)]:text-indigo-600 peer-[:not(:placeholder-shown)]:text-xs">
                浮动标签
              </label>
            </div>

            <div class="relative">
              <input
                type="email"
                placeholder=" "
                class="peer w-full border border-gray-300 rounded-lg px-4 pt-5 pb-2 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
              />
              <label class="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 transition-all peer-focus:-translate-y-5 peer-focus:text-xs peer-focus:text-green-600 peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-green-600">
                邮箱地址
              </label>
            </div>
          </div>
        </div>

        <!-- 复选框联动 -->
        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-3">复选框联动</h3>
          <div class="space-y-3 max-w-sm">
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" class="peer w-4 h-4 text-indigo-600 rounded" />
              <span class="text-gray-700 peer-checked:text-indigo-600 peer-checked:font-medium transition-colors">
                同意用户协议
              </span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" class="peer w-4 h-4 text-green-600 rounded" />
              <span class="text-gray-700 peer-checked:text-green-600 peer-checked:line-through transition-all">
                已完成任务
              </span>
            </label>
          </div>
        </div>

        <!-- radio 联动 -->
        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-3">Radio 联动</h3>
          <div class="flex gap-4">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="plan" value="free" class="peer w-4 h-4 text-indigo-600" />
              <span class="px-3 py-1 rounded-full text-sm border border-gray-300 peer-checked:border-indigo-500 peer-checked:bg-indigo-50 peer-checked:text-indigo-700 transition-all">
                免费版
              </span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="plan" value="pro" class="peer w-4 h-4 text-indigo-600" />
              <span class="px-3 py-1 rounded-full text-sm border border-gray-300 peer-checked:border-indigo-500 peer-checked:bg-indigo-50 peer-checked:text-indigo-700 transition-all">
                专业版
              </span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="plan" value="enterprise" class="peer w-4 h-4 text-indigo-600" />
              <span class="px-3 py-1 rounded-full text-sm border border-gray-300 peer-checked:border-indigo-500 peer-checked:bg-indigo-50 peer-checked:text-indigo-700 transition-all">
                企业版
              </span>
            </label>
          </div>
        </div>

        <!-- Code -->
        <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre class="text-sm text-gray-300"><code><span class="text-blue-400">/* peer vs group 的区别 */</span>

<span class="text-blue-400">/* group: 父元素状态 → 影响子元素 */</span>
&lt;div class="<span class="text-yellow-400">group</span>"&gt;
  &lt;div class="<span class="text-yellow-400">group-hover:text-white</span>"&gt;子元素响应父元素&lt;/div&gt;
&lt;/div&gt;

<span class="text-blue-400">/* peer: 兄弟元素状态 → 影响后续兄弟 */</span>
&lt;div&gt;
  &lt;input class="<span class="text-yellow-400">peer</span>" /&gt;         <span class="text-gray-500">/* 标记为 peer */</span>
  &lt;label class="<span class="text-yellow-400">peer-focus:text-blue</span>"&gt;  <span class="text-gray-500">/* 响应 peer 的 focus */</span&gt;
    响应输入框状态
  &lt;/label&gt;
&lt;/div&gt;

<span class="text-blue-400">/* peer 可用的变体 */</span>
peer-focus:             <span class="text-gray-500">/* peer 获得焦点 */</span>
peer-focus-visible:     <span class="text-gray-500">/* 键盘 focus */</span>
peer-hover:             <span class="text-gray-500">/* peer 悬停 */</span>
peer-checked:           <span class="text-gray-500">/* peer 被选中 */</span>
peer-disabled:          <span class="text-gray-500">/* peer 被禁用 */</span>
peer-placeholder-shown: <span class="text-gray-500">/* peer placeholder 可见 */</span>
peer-required:          <span class="text-gray-500">/* peer 必填 */</span>
peer-valid:             <span class="text-gray-500">/* peer 验证通过 */</span>
peer-invalid:           <span class="text-gray-500">/* peer 验证失败 */</span>

<span class="text-blue-400">/* 浮动标签核心原理 */</span>
&lt;input class="<span class="text-yellow-400">peer</span> placeholder-shown:pt-4 focus:pt-0" /&gt;
&lt;label class="<span class="text-yellow-400">peer-focus:-translate-y-5
            peer-[:not(:placeholder-shown)]:-translate-y-5</span>" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 5. group 机制深入 -->
    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">group 机制（父子联动）深入</h2>
      <p class="text-gray-600 mb-4"><code>group</code> 让父元素的状态可以影响子元素的样式。</p>
      <div class="space-y-6">
        <!-- 卡片悬停 -->
        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-3">卡片悬停效果</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="group bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow">
              <div class="h-32 bg-gradient-to-br from-indigo-400 to-purple-500 group-hover:scale-105 transition-transform duration-300"></div>
              <div class="p-4">
                <h4 class="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">卡片标题</h4>
                <p class="text-sm text-gray-500 mt-1">悬停卡片时标题变色</p>
                <span class="inline-block mt-2 text-xs text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  查看详情 →
                </span>
              </div>
            </div>
            <div class="group bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow">
              <div class="h-32 bg-gradient-to-br from-pink-400 to-rose-500 group-hover:scale-105 transition-transform duration-300"></div>
              <div class="p-4">
                <h4 class="font-semibold text-gray-800 group-hover:text-pink-600 transition-colors">卡片标题</h4>
                <p class="text-sm text-gray-500 mt-1">悬停卡片时标题变色</p>
                <span class="inline-block mt-2 text-xs text-pink-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  查看详情 →
                </span>
              </div>
            </div>
            <div class="group bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow">
              <div class="h-32 bg-gradient-to-br from-emerald-400 to-teal-500 group-hover:scale-105 transition-transform duration-300"></div>
              <div class="p-4">
                <h4 class="font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors">卡片标题</h4>
                <p class="text-sm text-gray-500 group-hover:text-emerald-500 transition-colors">悬停卡片时文字也变色</p>
                <span class="inline-block mt-2 text-xs text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  查看详情 →
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 命名 group -->
        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-3">命名 group（多个 group 共存）</h3>
          <div class="flex gap-4">
            <div class="group/card cursor-pointer">
              <div class="p-4 bg-blue-50 rounded-lg group-hover/card:bg-blue-100 transition-colors">
                <p class="text-blue-700 font-medium group-hover/card:underline">卡片 A（蓝色主题）</p>
              </div>
            </div>
            <div class="group/card cursor-pointer">
              <div class="p-4 bg-red-50 rounded-lg group-hover/card:bg-red-100 transition-colors">
                <p class="text-red-700 font-medium group-hover/card:underline">卡片 B（红色主题）</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre class="text-sm text-gray-300"><code><span class="text-blue-400">/* 基础用法 */</span>
&lt;div class="<span class="text-yellow-400">group</span>"&gt;
  &lt;div class="<span class="text-yellow-400">group-hover:text-white</span>"&gt;子元素响应父元素悬停&lt;/div&gt;
&lt;/div&gt;

<span class="text-blue-400">/* 命名 group（避免嵌套冲突） */</span>
&lt;div class="<span class="text-yellow-400">group/card</span>"&gt;
  &lt;div class="<span class="text-yellow-400">group-hover/card:bg-blue-100</span>"&gt;
    用 /card 命名后不会和其他 group 冲突
  &lt;/div&gt;
&lt;/div&gt;

<span class="text-blue-400">/* 常见组合 */</span>
group-hover:opacity-100       <span class="text-gray-500">/* 悬停显示 */</span>
group-hover:scale-105         <span class="text-gray-500">/* 悬停放大 */</span>
group-hover:translate-x-2     <span class="text-gray-500">/* 悬停偏移 */</span>
group-focus-within:ring-2     <span class="text-gray-500">/* 子元素 focus 时父元素显示 ring */</span>

<span class="text-blue-400">/* group-focus-within：父元素内任一子元素 focus 时触发 */</span>
&lt;div class="<span class="text-yellow-400">group</span>"&gt;
  &lt;input class="peer" /&gt;
  &lt;label class="<span class="text-yellow-400">group-focus-within:text-blue-600</span>"&gt;
    输入框 focus 时标签变色
  &lt;/label&gt;
&lt;/div&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 6. 其他伪类 -->
    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">其他伪类修饰符</h2>
      <p class="text-gray-600 mb-4">Tailwind 内置的其他伪类修饰符。</p>
      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-semibold text-gray-700 mb-3">first: / last: / odd: / even:</h3>
            <ul class="bg-white rounded-lg shadow divide-y divide-gray-100 max-w-sm">
              <li class="px-4 py-3 text-sm first:rounded-t-lg first:font-bold odd:bg-gray-50 even:bg-white">
                第 1 项（first + odd）
              </li>
              <li class="px-4 py-3 text-sm even:bg-gray-50">
                第 2 项（even）
              </li>
              <li class="px-4 py-3 text-sm odd:bg-gray-50">
                第 3 项（odd）
              </li>
              <li class="px-4 py-3 text-sm last:rounded-b-lg last:font-bold even:bg-gray-50">
                第 4 项（last + even）
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-700 mb-3">visited: / required: / disabled:</h3>
            <div class="space-y-3 max-w-sm">
              <a href="#" class="block text-indigo-600 visited:text-purple-600 underline">
                visited:text-purple-600（点击后变色）
              </a>
              <div class="flex gap-2">
                <input type="text" required placeholder="必填" class="border border-gray-300 rounded px-3 py-2 text-sm required:border-red-500 required:ring-1 required:ring-red-500 outline-none" />
                <input type="text" disabled placeholder="禁用" class="border border-gray-300 rounded px-3 py-2 text-sm disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed" />
              </div>
            </div>
          </div>
        </div>

        <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre class="text-sm text-gray-300"><code><span class="text-blue-400">/* 列表项 */</span>
first:rounded-t-lg     <span class="text-gray-500">/* 第一个子元素 */</span>
last:rounded-b-lg      <span class="text-gray-500">/* 最后一个子元素 */</span>
odd:bg-gray-50         <span class="text-gray-500">/* 奇数行 */</span>
even:bg-white          <span class="text-gray-500">/* 偶数行 */</span>

<span class="text-blue-400">/* 表单 */</span>
required:border-red-500 <span class="text-gray-500">/* 必填字段 */</span>
disabled:bg-gray-100    <span class="text-gray-500">/* 禁用状态 */</span>
read-only:bg-gray-50    <span class="text-gray-500">/* 只读状态 */</span>
valid:border-green-500  <span class="text-gray-500">/* 验证通过 */</span>
invalid:border-red-500  <span class="text-gray-500">/* 验证失败 */</span>

<span class="text-blue-400">/* 链接 */</span>
visited:text-purple-600 <span class="text-gray-500">/* 已访问 */</span>

<span class="text-blue-400">/* 文件输入 */</span>
file:bg-blue-50 file:text-blue-700 file:border-0 file:rounded-lg file:px-4 file:py-2</code></pre>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
</script>

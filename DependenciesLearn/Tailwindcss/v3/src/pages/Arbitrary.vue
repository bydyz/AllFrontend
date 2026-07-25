<template>
  <div class="space-y-12">
    <!-- 1. 任意值 Arbitrary Values -->
    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">任意值 Arbitrary Values</h2>
      <p class="text-gray-600 mb-4">使用方括号 <code>[value]</code> 传入任意 CSS 值，突破预设限制。</p>
      <div class="space-y-6">
        <!-- 任意尺寸 -->
        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-3">任意尺寸</h3>
          <div class="flex flex-wrap gap-4">
            <div class="w-[120px] h-[80px] bg-indigo-100 border-2 border-indigo-300 rounded-lg flex items-center justify-center text-xs text-indigo-600">
              w-[120px] h-[80px]
            </div>
            <div class="w-[200px] h-[120px] bg-pink-100 border-2 border-pink-300 rounded-lg flex items-center justify-center text-xs text-pink-600">
              w-[200px] h-[120px]
            </div>
            <div class="w-[calc(100%-2rem)] h-12 bg-green-100 border-2 border-green-300 rounded-lg flex items-center justify-center text-xs text-green-600">
              w-[calc(100%-2rem)]
            </div>
          </div>
        </div>

        <!-- 任意颜色 -->
        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-3">任意颜色</h3>
          <div class="flex flex-wrap gap-4">
            <div class="px-4 py-2 rounded-lg text-white text-sm" style="background-color: #6366f1">
              bg-[#6366f1]
            </div>
            <div class="px-4 py-2 rounded-lg text-sm" style="background-color: rgb(236, 72, 153)">
              bg-[rgb(236,72,153)]
            </div>
            <div class="px-4 py-2 rounded-lg text-sm" style="background-color: hsl(150, 80%, 45%)">
              bg-[hsl(150,80%,45%)]
            </div>
            <div class="px-4 py-2 rounded-lg bg-[#ff6b35] text-white text-sm">
              bg-[#ff6b35]
            </div>
            <div class="px-4 py-2 rounded-lg text-[rgb(99,102,241)] bg-[rgb(99,102,241)]/10 text-sm">
              text-[rgb(99,102,241)]
            </div>
          </div>
        </div>

        <!-- 任意字体大小 -->
        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-3">任意字体大小 & 行高</h3>
          <div class="space-y-2">
            <p class="text-[10px]">text-[10px]</p>
            <p class="text-[13px]">text-[13px]</p>
            <p class="text-[1.25rem]">text-[1.25rem]</p>
            <p class="text-[clamp(1rem,3vw,2rem)]">text-[clamp(1rem,3vw,2rem)] — 响应式 clamp</p>
            <p class="text-[20px]/[1.5]">text-[20px]/[1.5] — 同时设置大小和行高</p>
          </div>
        </div>

        <!-- 任意间距 -->
        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-3">任意间距</h3>
          <div class="flex gap-4">
            <div class="p-[15px] bg-blue-100 rounded text-sm">
              p-[15px]
            </div>
            <div class="m-[2px] p-4 bg-green-100 rounded text-sm">
              m-[2px]（外边距 2px）
            </div>
            <div class="px-[2.5rem] py-[10px] bg-amber-100 rounded text-sm">
              px-[2.5rem] py-[10px]
            </div>
          </div>
        </div>

        <!-- 任意 Grid -->
        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-3">任意 Grid 布局</h3>
          <div class="grid grid-cols-[200px_1fr_100px] gap-4">
            <div class="bg-indigo-100 p-4 rounded text-sm text-center">200px</div>
            <div class="bg-pink-100 p-4 rounded text-sm text-center">1fr（自适应）</div>
            <div class="bg-green-100 p-4 rounded text-sm text-center">100px</div>
          </div>
          <div class="grid grid-rows-[auto_1fr_auto] gap-2 mt-4 h-48">
            <div class="bg-indigo-100 p-2 rounded text-xs text-center">auto（自适应高度）</div>
            <div class="bg-pink-100 p-2 rounded text-xs text-center">1fr（占满剩余空间）</div>
            <div class="bg-green-100 p-2 rounded text-xs text-center">auto（自适应高度）</div>
          </div>
        </div>

        <!-- Code -->
        <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre class="text-sm text-gray-300"><code>&lt;!-- 任意尺寸 --&gt;
&lt;div class="<span class="text-yellow-400">w-[120px] h-[80px]</span>"&gt;固定尺寸&lt;/div&gt;
&lt;div class="<span class="text-yellow-400">w-[calc(100%-2rem)]</span>"&gt;calc 计算&lt;/div&gt;
&lt;div class="<span class="text-yellow-400">w-[min(100%,500px)]</span>"&gt;min 函数&lt;/div&gt;

&lt;!-- 任意颜色 --&gt;
&lt;div class="<span class="text-yellow-400">bg-[#6366f1]</span>"&gt;十六进制&lt;/div&gt;
&lt;div class="<span class="text-yellow-400">bg-[rgb(99,102,241)]</span>"&gt;RGB&lt;/div&gt;
&lt;div class="<span class="text-yellow-400">bg-[hsl(150,80%,45%)]</span>"&gt;HSL&lt;/div&gt;
&lt;div class="<span class="text-yellow-400">text-[#ff6b35]/80</span>"&gt;带透明度&lt;/div&gt;

&lt;!-- 任意字体 --&gt;
&lt;p class="<span class="text-yellow-400">text-[13px]</span>"&gt;px 单位&lt;/p&gt;
&lt;p class="<span class="text-yellow-400">text-[1.25rem]</span>"&gt;rem 单位&lt;/p&gt;
&lt;p class="<span class="text-yellow-400">text-[clamp(1rem,3vw,2rem)]</span>"&gt;clamp 响应式&lt;/p&gt;
&lt;p class="<span class="text-yellow-400">text-[20px]/[1.5]</span>"&gt;大小+行高&lt;/p&gt;

&lt;!-- 任意间距 --&gt;
&lt;div class="<span class="text-yellow-400">p-[15px]</span>"&gt;任意内边距&lt;/div&gt;
&lt;div class="<span class="text-yellow-400">m-[2px]</span>"&gt;任意外边距&lt;/div&gt;

&lt;!-- 任意 Grid --&gt;
&lt;div class="<span class="text-yellow-400">grid-cols-[200px_1fr_100px]</span>"&gt;
  自定义列宽
&lt;/div&gt;
&lt;div class="<span class="text-yellow-400">grid-rows-[auto_1fr_auto]</span>"&gt;
  自定义行高
&lt;/div&gt;

&lt;!-- 任意值 + 单位自动推断 --&gt;
&lt;!-- 数字 → px（如 w-[200] = w-[200px]）--&gt;
&lt;!-- 其他值保持原样 --&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 2. 任意属性 Arbitrary Properties -->
    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">任意属性 Arbitrary Properties</h2>
      <p class="text-gray-600 mb-4">直接设置任意 CSS 属性，无需对应的 Tailwind 工具类。</p>
      <div class="space-y-6">
        <div class="flex flex-wrap gap-4">
          <div class="[mask-type:luminance] bg-gradient-to-r from-indigo-500 to-pink-500 w-32 h-16 rounded-lg flex items-center justify-center text-white text-xs">
            mask-type:luminance
          </div>
          <div class="[writing-mode:vertical-rl] bg-gray-100 p-4 rounded-lg text-sm h-24">
            [writing-mode:vertical-rl] 竖排文字
          </div>
          <div class="[user-select:none] bg-blue-100 p-4 rounded-lg text-sm cursor-default">
            [user-select:none] 不可选中
          </div>
          <div class="[accent-color:#6366f1] bg-purple-50 p-4 rounded-lg">
            <input type="checkbox" class="w-4 h-4" />
            accent-color:#6366f1
          </div>
        </div>
        <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre class="text-sm text-gray-300"><code>&lt;!-- 任意属性语法：[property:value] --&gt;

&lt;!-- 遮罩类型 --&gt;
&lt;div class="<span class="text-yellow-400">[mask-type:luminance]</span>"&gt;...&lt;/div&gt;

&lt;!-- 文字方向 --&gt;
&lt;p class="<span class="text-yellow-400">[writing-mode:vertical-rl]</span>"&gt;竖排文字&lt;/p&gt;

&lt;!-- 用户选择 --&gt;
&lt;p class="<span class="text-yellow-400">[user-select:none]</span>"&gt;不可选中&lt;/p&gt;

&lt;!-- 主题色（checkbox/radio） --&gt;
&lt;input class="<span class="text-yellow-400">[accent-color:#6366f1]</span>" type="checkbox" /&gt;

&lt;!-- 流光灯效果（outline 配合 offset） --&gt;
&lt;input class="<span class="text-yellow-400">[outline:2px_solid_#6366f1] [outline-offset:2px]</span>" /&gt;

&lt;!-- CSS 变量声明（v3.3+ 支持） --&gt;
&lt;div class="<span class="text-yellow-400">[--my-color:#ff6b35] bg-[var(--my-color)]</span>"&gt;
  动态 CSS 变量
&lt;/div&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 3. 任意选择器 Arbitrary Selectors -->
    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">任意选择器 Arbitrary Selectors</h2>
      <p class="text-gray-600 mb-4">使用任意 CSS 选择器，将样式应用到当前或关联元素上。</p>
      <div class="space-y-6">
        <div class="[&>*]:mb-3">
          <h3 class="text-lg font-semibold text-gray-700">[&amp;>*]:mb-3</h3>
          <p>这段文字自动有 margin-bottom</p>
          <p>这段也有 margin-bottom</p>
          <p class="!mb-0">最后一行没有</p>
        </div>

        <div class="[&_.highlight]:bg-yellow-200 [&_.highlight]:px-1 [&_.highlight]:rounded">
          <p>普通文字</p>
          <p><span class="highlight">这是高亮文字（.highlight）</span></p>
          <p><span class="highlight">这也是高亮</span></p>
          <p>普通文字</p>
        </div>

        <div class="[&>li]:py-2 [&>li]:border-b [&>li]:border-gray-200 [&>li:last-child]:border-0 list-decimal list-inside">
          <li>第一项（自动有 padding 和边框）</li>
          <li>第二项</li>
          <li>第三项（无边框，:last-child）</li>
        </div>

        <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre class="text-sm text-gray-300"><code>&lt;!-- 任意选择器语法：[selector]{utility} --&gt;

&lt;!-- 直接子元素 --&gt;
&lt;div class="<span class="text-yellow-400">[&amp;>*]:mb-3</span>"&gt;
  &lt;p&gt;每个子元素都有 mb-3&lt;/p&gt;
&lt;/div&gt;

&lt;!-- 类选择器 --&gt;
&lt;div class="<span class="text-yellow-400">[&amp;_.highlight]:bg-yellow-200</span>"&gt;
  &lt;span class="highlight"&gt;高亮&lt;/span&gt;
&lt;/div&gt;

&lt;!-- 类型选择器 --&gt;
&lt;div class="<span class="text-yellow-400">[&amp;>li]:py-2 [&amp;>li]:border-b</span>"&gt;
  &lt;li&gt;列表项有样式&lt;/li&gt;
&lt;/div&gt;

&lt;!-- 伪类选择器 --&gt;
&lt;div class="<span class="text-yellow-400">[&amp;:first-child]:font-bold</span>"&gt;
  &lt;p&gt;第一个子元素加粗&lt;/p&gt;
&lt;/div&gt;

&lt;!-- 属性选择器 --&gt;
&lt;div class="<span class="text-yellow-400">[&amp;[data-active]]:bg-green-100</span>"&gt;
  有 data-active 属性时生效
&lt;/div&gt;

&lt;!-- 多个选择器组合 --&gt;
&lt;div class="<span class="text-yellow-400">[&amp;>li]:py-2 [&amp;>li]:border-b [&amp;>li:first-child]:font-bold [&amp;>li:last-child]:border-0</span>"&gt;
  多重选择器
&lt;/div&gt;

&lt;!-- 选择器 + 任意属性 --&gt;
&lt;div class="<span class="text-yellow-400">[&amp;>span]:[color:red]</span>"&gt;
  子元素 span 变红
&lt;/div&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 4. CSS 变量 -->
    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">CSS 变量与动态主题</h2>
      <p class="text-gray-600 mb-4">结合 CSS 变量实现运行时动态主题切换。</p>
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-3">动态切换示例</h3>
          <div class="space-y-4">
            <div class="flex gap-2">
              <button
                v-for="color in themeColors"
                :key="color.name"
                @click="currentColor = color.value"
                class="w-8 h-8 rounded-full border-2 transition-all"
                :class="[
                  currentColor === color.value ? 'border-gray-800 scale-110' : 'border-gray-300',
                ]"
                :style="{ backgroundColor: color.value }"
                :title="color.name"
              />
            </div>
            <div
              :style="{ '--theme-color': currentColor }"
              class="space-y-3"
            >
              <div class="p-4 rounded-lg bg-[var(--theme-color)]/10 border border-[var(--theme-color)]/30">
                <p class="text-[var(--theme-color)] font-medium">
                  使用 CSS 变量的卡片 — bg-[var(--theme-color)]/10
                </p>
              </div>
              <div class="flex gap-3">
                <button
                  class="px-4 py-2 rounded-lg text-white transition-colors"
                  :style="{ backgroundColor: currentColor }"
                >
                  动态按钮
                </button>
                <div
                  class="w-12 h-12 rounded-full"
                  :style="{ backgroundColor: currentColor }"
                />
                <div
                  class="flex-1 h-3 rounded-full mt-4"
                  :style="{ backgroundColor: currentColor, opacity: 0.3 }"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre class="text-sm text-gray-300"><code><span class="text-blue-400">/* 1. 定义 CSS 变量 */</span>
:root {
  <span class="text-yellow-400">--theme-color</span>: #6366f1;
}

<span class="text-blue-400">/* 2. Tailwind 中使用 CSS 变量 */</span>
&lt;div class="<span class="text-yellow-400">bg-[var(--theme-color)]</span>"&gt;背景色&lt;/div&gt;
&lt;div class="<span class="text-yellow-400">text-[var(--theme-color)]</span>"&gt;文字色&lt;/div&gt;
&lt;div class="<span class="text-yellow-400">border-[var(--theme-color)]</span>"&gt;边框色&lt;/div&gt;

<span class="text-blue-400">/* 3. 带透明度 */</span>
&lt;div class="<span class="text-yellow-400">bg-[var(--theme-color)]/10</span>"&gt;10% 透明度&lt;/div&gt;

<span class="text-blue-400">/* 4. 在组件上定义变量 */</span>
&lt;div style="<span class="text-yellow-400">--theme-color: #ec4899</span>"&gt;
  &lt;div class="<span class="text-yellow-400">bg-[var(--theme-color)]</span>"&gt;粉色背景&lt;/div&gt;
&lt;/div&gt;

<span class="text-blue-400">/* 5. 配合 Vue 响应式 */</span>
&lt;div :style="<span class="text-yellow-400">{ '--theme-color': currentColor }</span>"&gt;
  运行时动态切换
&lt;/div&gt;

<span class="text-blue-400">/* 6. 暗黑模式变量方案 */</span>
:root { --bg: white; --text: black; }
.dark { --bg: #1a1a2e; --text: #e0e0e0; }
&lt;div class="<span class="text-yellow-400">bg-[var(--bg)] text-[var(--text)]</span>"&gt;自动适配暗黑模式&lt;/div&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 5. 修饰符链 -->
    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">修饰符链 Modifiers Chain</h2>
      <p class="text-gray-600 mb-4">多个修饰符可以链式组合，条件越具体的放越后面。</p>
      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-white rounded-lg shadow p-4 text-center">
            <code class="text-xs bg-gray-100 px-1 rounded">hover:bg-blue-500</code>
            <button class="mt-3 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              hover:bg-blue-700
            </button>
          </div>
          <div class="bg-white rounded-lg shadow p-4 text-center">
            <code class="text-xs bg-gray-100 px-1 rounded">hover:focus:ring-2</code>
            <button class="mt-3 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all">
              hover + focus 同时生效
            </button>
          </div>
          <div class="bg-white rounded-lg shadow p-4 text-center">
            <code class="text-xs bg-gray-100 px-1 rounded">dark:hover:bg-purple-600</code>
            <button class="mt-3 w-full px-4 py-2 bg-purple-500 text-white rounded-lg dark:bg-purple-700 dark:hover:bg-purple-600 transition-colors">
              暗黑模式 + hover
            </button>
          </div>
        </div>

        <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre class="text-sm text-gray-300"><code>&lt;!-- 修饰符链：从左到右，条件逐步具体化 --&gt;
&lt;button class="<span class="text-yellow-400">hover:focus:ring-2</span>"&gt;
  hover 时 + focus 时 → 显示 ring
&lt;/button&gt;

&lt;!-- 常见组合 --&gt;
hover:bg-blue-500          <span class="text-gray-500">/* 悬停变色 */</span>
focus:ring-2               <span class="text-gray-500">/* 焦点环 */</span>
hover:focus:ring-2         <span class="text-gray-500">/* 悬停时的焦点环 */</span>
dark:hover:bg-gray-800     <span class="text-gray-500">/* 暗黑模式悬停 */</span>
group-hover:text-white     <span class="text-gray-500">/* 父元素悬停时子元素变色 */</span>
peer-checked:bg-blue-500   <span class="text-gray-500">/* 兄弟选中时 */</span>
first:rounded-l-lg         <span class="text-gray-500">/* 第一个元素圆角 */</span>
last:rounded-r-lg          <span class="text-gray-500">/* 最后一个元素圆角 */</span>
odd:bg-gray-50             <span class="text-gray-500">/* 奇数行背景 */</span>
even:bg-white              <span class="text-gray-500">/* 偶数行背景 */</span>

&lt;!-- 三重修饰符 --&gt;
&lt;div class="<span class="text-yellow-400">group-hover:dark:focus:text-white</span>"&gt;
  父悬停 + 暗黑模式 + 焦点 → 白色文字
&lt;/div&gt;</code></pre>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentColor = ref('#6366f1')

const themeColors = [
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Emerald', value: '#10b981' },
  { name: 'Amber', value: '#f59e0b' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Cyan', value: '#06b6d4' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Slate', value: '#475569' },
]
</script>

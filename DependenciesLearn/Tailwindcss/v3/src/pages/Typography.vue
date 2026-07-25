<template>
  <div class="space-y-8">
    <h1 class="text-3xl font-bold text-gray-800">文字 (Typography)</h1>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">文字大小</h2>
      <p class="text-gray-600 mb-4">
        Tailwind CSS 提供了丰富的文字大小工具类，从超小号到超大号，以及自定义 rem 值。
      </p>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 文字大小工具类
text-xs    → font-size: 0.75rem (12px); line-height: 1rem (16px)
text-sm    → font-size: 0.875rem (14px); line-height: 1.25rem (20px)
text-base  → font-size: 1rem (16px); line-height: 1.5rem (24px)
text-lg    → font-size: 1.125rem (18px); line-height: 1.75rem (28px)
text-xl    → font-size: 1.25rem (20px); line-height: 1.75rem (28px)
text-2xl   → font-size: 1.5rem (24px); line-height: 2rem (32px)
text-3xl   → font-size: 1.875rem (30px); line-height: 2.25rem (36px)
text-4xl   → font-size: 2.25rem (36px); line-height: 2.5rem (40px)
text-5xl   → font-size: 3rem (48px); line-height: 1
text-6xl   → font-size: 3.75rem (60px); line-height: 1
text-7xl   → font-size: 4.5rem (72px); line-height: 1
text-8xl   → font-size: 6rem (96px); line-height: 1
text-9xl   → font-size: 8rem (128px); line-height: 1

// 自定义大小
text-[14px]  → font-size: 14px
text-[1.5rem] → font-size: 1.5rem</pre>
      </div>

      <!-- 文字大小示例 -->
      <div class="space-y-2">
        <div class="text-xs bg-gray-100 p-2">text-xs - 超小号文字 (12px)</div>
        <div class="text-sm bg-gray-100 p-2">text-sm - 小号文字 (14px)</div>
        <div class="text-base bg-gray-100 p-2">text-base - 基础文字 (16px)</div>
        <div class="text-lg bg-gray-100 p-2">text-lg - 大号文字 (18px)</div>
        <div class="text-xl bg-gray-100 p-2">text-xl - 超大号文字 (20px)</div>
        <div class="text-2xl bg-gray-100 p-2">text-2xl - 2倍大 (24px)</div>
        <div class="text-3xl bg-gray-100 p-2">text-3xl - 3倍大 (30px)</div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">字体粗细</h2>
      <p class="text-gray-600 mb-4">
        使用 font-{weight} 工具类控制文字的粗细。
      </p>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 字体粗细工具类
font-thin       → font-weight: 100
font-extralight → font-weight: 200
font-light      → font-weight: 300
font-normal     → font-weight: 400
font-medium     → font-weight: 500
font-semibold   → font-weight: 600
font-bold       → font-weight: 700
font-extrabold  → font-weight: 800
font-black      → font-weight: 900</pre>
      </div>

      <!-- 字体粗细示例 -->
      <div class="space-y-2">
        <div class="font-thin text-lg">font-thin - 极细 (100)</div>
        <div class="font-light text-lg">font-light - 细体 (300)</div>
        <div class="font-normal text-lg">font-normal - 正常 (400)</div>
        <div class="font-medium text-lg">font-medium - 中等 (500)</div>
        <div class="font-semibold text-lg">font-semibold - 半粗 (600)</div>
        <div class="font-bold text-lg">font-bold - 粗体 (700)</div>
        <div class="font-extrabold text-lg">font-extrabold - 特粗 (800)</div>
        <div class="font-black text-lg">font-black - 黑体 (900)</div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">文字对齐</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 文字对齐工具类
text-left    → text-align: left
text-center  → text-align: center
text-right   → text-align: right
text-justify → text-align: justify</pre>
      </div>

      <!-- 文字对齐示例 -->
      <div class="space-y-2">
        <div class="text-left bg-gray-100 p-2">text-left - 左对齐</div>
        <div class="text-center bg-gray-100 p-2">text-center - 居中对齐</div>
        <div class="text-right bg-gray-100 p-2">text-right - 右对齐</div>
        <div class="text-justify bg-gray-100 p-2">
          text-justify - 两端对齐：这是一段较长的文字，用于演示两端对齐的效果。当文字足够长时，它会均匀分布在整个容器宽度内。
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">文字颜色</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 文字颜色工具类
text-{color}         // text-red-500 → color: rgb(239 68 68)
text-{color}-{shade} // text-blue-600 → color: rgb(37 99 235)

// 透明度
text-{color}/{opacity} // text-red-500/50 → color: rgb(239 68 68 / 0.5)

// 颜色预设
red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, slate, gray, zinc, neutral, stone</pre>
      </div>

      <!-- 文字颜色示例 -->
      <div class="flex flex-wrap gap-2">
        <span class="text-red-500 font-medium">text-red-500</span>
        <span class="text-orange-500 font-medium">text-orange-500</span>
        <span class="text-yellow-500 font-medium">text-yellow-500</span>
        <span class="text-green-500 font-medium">text-green-500</span>
        <span class="text-blue-500 font-medium">text-blue-500</span>
        <span class="text-indigo-500 font-medium">text-indigo-500</span>
        <span class="text-purple-500 font-medium">text-purple-500</span>
        <span class="text-pink-500 font-medium">text-pink-500</span>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">行高</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 行高工具类
leading-none    → line-height: 1
leading-tight   → line-height: 1.25
leading-snug    → line-height: 1.375
leading-normal  → line-height: 1.5
leading-relaxed → line-height: 1.625
leading-loose   → line-height: 2

// 自定义行高
leading-[1.2]   → line-height: 1.2</pre>
      </div>

      <!-- 行高示例 -->
      <div class="space-y-4">
        <div class="leading-none bg-gray-100 p-2">
          leading-none - 行高为 1：这是一段用于演示行高效果的文字。
        </div>
        <div class="leading-tight bg-gray-100 p-2">
          leading-tight - 行高为 1.25：这是一段用于演示行高效果的文字。
        </div>
        <div class="leading-normal bg-gray-100 p-2">
          leading-normal - 行高为 1.5：这是一段用于演示行高效果的文字。
        </div>
        <div class="leading-loose bg-gray-100 p-2">
          leading-loose - 行高为 2：这是一段用于演示行高效果的文字。
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">字母间距和字间距</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 字母间距
tracking-tighter → letter-spacing: -0.05em
tracking-tight   → letter-spacing: -0.025em
tracking-normal  → letter-spacing: 0
tracking-wide    → letter-spacing: 0.025em
tracking-wider   → letter-spacing: 0.05em
tracking-widest  → letter-spacing: 0.1em

// 单词间距
spacing-tight  → word-spacing: -0.05em
spacing-normal → word-spacing: 0
spacing-wide   → word-spacing: 0.1em</pre>
      </div>

      <!-- 字母间距示例 -->
      <div class="space-y-2">
        <div class="tracking-tighter text-lg">tracking-tighter - 紧凑 (-0.05em)</div>
        <div class="tracking-normal text-lg">tracking-normal - 正常 (0)</div>
        <div class="tracking-wider text-lg">tracking-wider - 宽松 (0.05em)</div>
        <div class="tracking-widest text-lg">tracking-widest - 最宽 (0.1em)</div>
      </div>
    </div>

    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
      <h3 class="text-lg font-semibold text-green-800 mb-2">文字工具类总结</h3>
      <ul class="text-green-700 space-y-1">
        <li>• <code class="bg-green-100 px-1 rounded">text-{size}</code> - 控制文字大小</li>
        <li>• <code class="bg-green-100 px-1 rounded">font-{weight}</code> - 控制字体粗细</li>
        <li>• <code class="bg-green-100 px-1 rounded">text-{alignment}</code> - 控制文字对齐</li>
        <li>• <code class="bg-green-100 px-1 rounded">text-{color}</code> - 控制文字颜色</li>
        <li>• <code class="bg-green-100 px-1 rounded">leading-{size}</code> - 控制行高</li>
        <li>• <code class="bg-green-100 px-1 rounded">tracking-{size}</code> - 控制字母间距</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// 文字工具类演示组件
// 展示了文字大小、粗细、对齐、颜色、行高等各种用法
</script>

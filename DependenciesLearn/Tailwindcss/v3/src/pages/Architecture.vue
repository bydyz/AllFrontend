<template>
  <div class="space-y-12">
    <!-- 1. @layer 指令 -->
    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">@layer 指令（层叠控制）</h2>
      <p class="text-gray-600 mb-4">控制 CSS 规则的层叠优先级，确保自定义样式与 Tailwind 工具类正确协作。</p>
      <div class="space-y-6">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-700 mb-3">三个层级（优先级从低到高）</h3>
          <div class="space-y-3">
            <div class="flex items-start gap-4">
              <div class="w-20 text-center">
                <code class="bg-gray-100 px-2 py-1 rounded text-xs whitespace-nowrap">base</code>
              </div>
              <div>
                <p class="text-sm font-medium">基础层</p>
                <p class="text-xs text-gray-500">重置样式、全局元素（最低优先级）</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="w-20 text-center">
                <code class="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs whitespace-nowrap">components</code>
              </div>
              <div>
                <p class="text-sm font-medium">组件层</p>
                <p class="text-xs text-gray-500">@apply 定义的可复用组件（中等优先级）</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="w-20 text-center">
                <code class="bg-green-100 text-green-700 px-2 py-1 rounded text-xs whitespace-nowrap">utilities</code>
              </div>
              <div>
                <p class="text-sm font-medium">工具层</p>
                <p class="text-xs text-gray-500">自定义工具类（最高优先级）</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre class="text-sm text-gray-300"><code><span class="text-purple-400">@tailwind</span> base;
<span class="text-purple-400">@tailwind</span> components;
<span class="text-purple-400">@tailwind</span> utilities;

<span class="text-purple-400">@layer</span> base {
  <span class="text-green-400">html</span> {
    <span class="text-yellow-400">font-family</span>: <span class="text-orange-300">'Inter'</span>, system-ui, sans-serif;
    <span class="text-yellow-400">color-scheme</span>: light dark;
  }
}

<span class="text-purple-400">@layer</span> components {
  <span class="text-green-400">.btn</span> {
    <span class="text-yellow-400">@apply</span> px-4 py-2 rounded-lg font-medium transition-colors;
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

    <!-- 2. @screen 指令 -->
    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">@screen 指令（CSS 中的响应式）</h2>
      <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
        <pre class="text-sm text-gray-300"><code><span class="text-purple-400">@layer</span> components {
  <span class="text-green-400">.container</span> {
    <span class="text-yellow-400">width</span>: 100%;
  }

  <span class="text-purple-400">@screen</span> sm {
    <span class="text-green-400">.container</span> {
      <span class="text-yellow-400">max-width</span>: 640px;
    }
  }

  <span class="text-purple-400">@screen</span> md {
    <span class="text-green-400">.container</span> {
      <span class="text-yellow-400">max-width</span>: 768px;
    }
  }

  <span class="text-purple-400">@screen</span> lg {
    <span class="text-green-400">.container</span> {
      <span class="text-yellow-400">max-width</span>: 1024px;
    }
  }
}</code></pre>
      </div>
    </section>

    <!-- 3. @variants 指令 -->
    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">@variants 指令（自定义变体）</h2>
      <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
        <pre class="text-sm text-gray-300"><code><span class="text-blue-400">/* 添加自定义变体 */</span>
<span class="text-purple-400">@layer</span> utilities {
  <span class="text-purple-400">@variants</span> peer, peer-focus, group-hover, focus-within;

  <span class="text-green-400">.my-variant</span> {
    <span class="text-yellow-400">@apply</span> px-2 py-1 text-sm;
  }
}

<span class="text-blue-400">/* 使用自定义变体 */</span>
&lt;div class="<span class="text-yellow-400">peer:my-variant</span>"&gt;
  &lt;input class="<span class="text-yellow-400">peer</span>" /&gt;
  &lt;span class="<span class="text-yellow-400">peer:my-variant</span>"&gt;响应 peer&lt;/span&gt;
&lt;/div&gt;</code></pre>
      </div>
    </section>

    <!-- 4. Plugin 开发 -->
    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Plugin 开发</h2>
      <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
        <pre class="text-sm text-gray-300"><code><span class="text-blue-400">/* 自定义 Plugin */</span>
<span class="text-purple-400">const</span> plugin = <span class="text-purple-400">require</span>(<span class="text-orange-300">'tailwindcss/plugin'</span>);

module.exports = {
  plugins: [
    <span class="text-purple-400">plugin</span>(function({ addUtilities, addComponents, addVariant }) {
      <span class="text-green-400">// 添加自定义工具类</span>
      <span class="text-yellow-400">addUtilities</span>({
        <span class="text-green-400">'.animate-bounce-in'</span>: {
          <span class="text-yellow-400">'@keyframes bounce-in'</span>: {
            <span class="text-green-400">'0%'</span>: { transform: <span class="text-orange-300">'scale(0)'</span> },
            <span class="text-green-400">'60%'</span>: { transform: <span class="text-orange-300">'scale(1.1)'</span> },
            <span class="text-green-400">'100%'</span>: { transform: <span class="text-orange-300">'scale(1)'</span> },
          },
          <span class="text-yellow-400">animation</span>: <span class="text-orange-300">'bounce-in 0.5s ease-out'</span>,
        },
      });

      <span class="text-green-400">// 添加自定义组件</span>
      <span class="text-yellow-400">addComponents</span>({
        <span class="text-green-400">'.card'</span>: {
          <span class="text-yellow-400">@apply</span> bg-white rounded-lg shadow-md p-6;
        },
      });

      <span class="text-green-400">// 添加自定义变体</span>
      <span class="text-yellow-400">addVariant</span>(<span class="text-orange-300">'dark-hover'</span>, <span class="text-orange-300">'.dark:hover:'</span>);
    }),
  ],
};</code></pre>
      </div>
    </section>

    <!-- 5. theme() 函数 -->
    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">theme() 函数（PostCSS）</h2>
      <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
        <pre class="text-sm text-gray-300"><code><span class="text-blue-400">/* 在 Tailwind 配置文件中 */</span>
module.exports = {
  theme: {
    extend: {
      <span class="text-yellow-400">colors</span>: {
        <span class="text-green-400">primary</span>: <span class="text-orange-300">'#3490dc'</span>,
      },
    },
  },
};

<span class="text-blue-400">/* 在 CSS 中使用 theme() 函数读取配置 */</span>
<span class="text-green-400">:root</span> {
  <span class="text-yellow-400">--my-color</span>: <span class="text-yellow-400">theme</span>(<span class="text-orange-300">'colors.primary'</span>);
}

<span class="text-blue-400">/* 在 Plugin 中使用 */</span>
<span class="text-purple-400">function</span> ({ addUtilities }) {
  <span class="text-yellow-400">addUtilities</span>({
    <span class="text-green-400">'.bg-primary'</span>: {
      <span class="text-yellow-400">background-color</span>: <span class="text-yellow-400">theme</span>(<span class="text-orange-300">'colors.primary'</span>),
    },
  });
}</code></pre>
      </div>
    </section>

    <!-- 6. safelist -->
    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Safelist 安全列表</h2>
      <p class="text-gray-600 mb-4">动态添加的类名可能被 purge 清理，需要添加到 safelist 中。</p>
      <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
        <pre class="text-sm text-gray-300"><code><span class="text-blue-400">/* 在 tailwind.config.js 中 */</span>
module.exports = {
  content: [<span class="text-orange-300">'./index.html'</span>, <span class="text-orange-300">'./src/**/*.{js,ts,vue,jsx,tsx}'</span>],
  safelist: [
    <span class="text-orange-300">'bg-blue-500'</span>,                      <span class="text-gray-500">// 字符串：精确匹配</span>
    <span class="text-orange-300">/^text-red-</span>,                         <span class="text-gray-500">// 正则：以 text-red- 开头</span>
    <span class="text-orange-300">/^bg-[a-z]+-\d+$</span>,                    <span class="text-gray-500">// 正则：bg-xxx-数字</span>
    <span class="text-purple-400">{ pattern: /animate-pulse/ }</span>,   <span class="text-gray-500">// 对象：匹配 animate-pulse</span>
    <span class="text-purple-400">{ pattern: <span class="text-orange-300">/text-(red|green)-(500|700)/</span> }</span>,  <span class="text-gray-500">// 对象正则</span>
    <span class="text-purple-400">{ variants: [<span class="text-orange-300">'hover'</span>, <span class="text-orange-300">'group-hover'</span>] }</span>, <span class="text-gray-500">// 作用于变体</span>
  ],
};</code></pre>
      </div>
    </section>

    <!-- 7. extract 配置 -->
    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Extract 自定义提取策略</h2>
      <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
        <pre class="text-sm text-gray-300"><code><span class="text-blue-400">/* 在 tailwind.config.js 中 */</span>
module.exports = {
  content: {
    files: [<span class="text-orange-300">'./index.html'</span>, <span class="text-orange-300">'./src/**/*.js'</span>],
    <span class="text-green-400">// 默认提取策略</span>
    <span class="text-yellow-400">extract</span>: (content) => {
      <span class="text-purple-400">return</span> content
        .<span class="text-purple-400">match</span>(/\[.*?\]/g) <span class="text-gray-500">// 匹配方括号内容</span>
        ?.join(<span class="text-orange-300">''</span>) || <span class="text-orange-300">''</span>;
    },
  },
};</code></pre>
      </div>
    </section>

    <!-- 8. JIT 模式 -->
    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">JIT 模式原理</h2>
      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-blue-50 rounded-lg p-4">
            <h3 class="font-semibold text-blue-800 mb-2">JIT 模式（Just-In-Time）</h3>
            <ul class="text-sm text-blue-700 space-y-1">
              <li>• 按需生成类名</li>
              <li>• 速度极快</li>
              <li>• 支持任意值</li>
              <li>• 现在是默认模式</li>
            </ul>
          </div>
          <div class="bg-gray-100 rounded-lg p-4">
            <h3 class="font-semibold text-gray-800 mb-2">旧版模式（Full Build）</h3>
            <ul class="text-sm text-gray-600 space-y-1">
              <li>• 全量编译所有工具类</li>
              <li>• 生成文件大</li>
              <li>• 构建速度慢</li>
              <li>• 需要 PostCSS Purge</li>
            </ul>
          </div>
        </div>
        <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre class="text-sm text-gray-300"><code><span class="text-blue-400">/* JIT 模式流程 */</span>
1. 扫描 content 中的文件
2. 提取所有使用的类名
3. 只生成这些类名的 CSS
4. 处理任意值、变体、扩展等
5. 输出最终 CSS

<span class="text-blue-400">/* 优势 */</span>
✓ 构建速度提升 10x+
✓ 任意值支持
✓ 可用的变体更多
✓ CSS 文件更小

<span class="text-blue-400">/* 开启方式（v3 已默认开启）*/</span>
<span class="text-gray-600">mode: 'jit',</span> <span class="text-gray-500">// 已是默认值</span></code></pre>
      </div>
    </section>

    <!-- 9. @apply 在 CSS 中使用 -->
    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">@apply 在 CSS 中的使用</h2>
      <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
        <pre class="text-sm text-gray-300"><code><span class="text-purple-400">@tailwind</span> base;
<span class="text-purple-400">@tailwind</span> components;
<span class="text-purple-400">@tailwind</span> utilities;

<span class="text-purple-400">@layer</span> components {
  <span class="text-green-400">.btn</span> {
    <span class="text-yellow-400">@apply</span> px-4 py-2 rounded-lg font-medium transition-colors;
  }

  <span class="text-green-400">.btn-primary</span> {
    <span class="text-yellow-400">@apply</span> px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700;
  }

  <span class="text-green-400">.btn-secondary</span> {
    <span class="text-yellow-400">@apply</span> px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300;
  }

  <span class="text-green-400">.card</span> {
    <span class="text-yellow-400">@apply</span> bg-white rounded-xl shadow-md p-6;
  }

  <span class="text-green-400">.input</span> {
    <span class="text-yellow-400">@apply</span> border border-gray-300 rounded-lg px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all;
  }
}

<span class="text-purple-400">@layer</span> utilities {
  <span class="text-green-400">.text-balance</span> {
    <span class="text-yellow-400">@apply</span> text-wrap balance;
  }

  <span class="text-green-400">.scrollbar-hide</span> {
    <span class="text-yellow-400">@apply</span> [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none];
  }
}</code></pre>
      </div>
    </section>
  </div>
</template>

<script setup>
</script>

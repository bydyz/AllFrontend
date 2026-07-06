<template>
  <div class="space-y-8">
    <h1 class="text-3xl font-bold text-gray-800">效果 (Effects)</h1>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">不透明度</h2>
      <p class="text-gray-600 mb-4">
        不透明度工具类用于控制整个元素的透明度，包括其子元素。
      </p>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 不透明度
opacity-0      // opacity: 0
opacity-5      // opacity: 0.05
opacity-10     // opacity: 0.1
opacity-15     // opacity: 0.15
opacity-20     // opacity: 0.2
opacity-25     // opacity: 0.25
opacity-30     // opacity: 0.3
opacity-35     // opacity: 0.35
opacity-40     // opacity: 0.4
opacity-45     // opacity: 0.45
opacity-50     // opacity: 0.5
opacity-55     // opacity: 0.55
opacity-60     // opacity: 0.6
opacity-65     // opacity: 0.65
opacity-70     // opacity: 0.7
opacity-75     // opacity: 0.75
opacity-80     // opacity: 0.8
opacity-85     // opacity: 0.85
opacity-90     // opacity: 0.9
opacity-95     // opacity: 0.95
opacity-100    // opacity: 1</pre>
      </div>

      <!-- 不透明度示例 -->
      <div class="flex gap-4">
        <div class="bg-blue-500 text-white p-4 rounded opacity-0">opacity-0</div>
        <div class="bg-blue-500 text-white p-4 rounded opacity-25">opacity-25</div>
        <div class="bg-blue-500 text-white p-4 rounded opacity-50">opacity-50</div>
        <div class="bg-blue-500 text-white p-4 rounded opacity-75">opacity-75</div>
        <div class="bg-blue-500 text-white p-4 rounded opacity-100">opacity-100</div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">盒子阴影</h2>
      <p class="text-gray-600 mb-4">
        盒子阴影工具类用于为元素添加阴影效果。
      </p>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 盒子阴影
shadow-sm     // 小阴影
shadow        // 默认阴影
shadow-md     // 中等阴影
shadow-lg     // 大阴影
shadow-xl     // 超大阴影
shadow-2xl    // 2倍大阴影
shadow-inner  // 内阴影
shadow-none   // 无阴影

// 自定义阴影颜色
shadow-{color}-{shade}  // shadow-blue-500/50</pre>
      </div>

      <!-- 盒子阴影示例 -->
      <div class="grid grid-cols-4 gap-4">
        <div class="shadow-sm bg-white p-4 rounded-lg text-center">shadow-sm</div>
        <div class="shadow bg-white p-4 rounded-lg text-center">shadow</div>
        <div class="shadow-md bg-white p-4 rounded-lg text-center">shadow-md</div>
        <div class="shadow-lg bg-white p-4 rounded-lg text-center">shadow-lg</div>
        <div class="shadow-xl bg-white p-4 rounded-lg text-center">shadow-xl</div>
        <div class="shadow-2xl bg-white p-4 rounded-lg text-center">shadow-2xl</div>
        <div class="shadow-inner bg-gray-100 p-4 rounded-lg text-center">shadow-inner</div>
        <div class="shadow-none bg-white p-4 rounded-lg text-center border">shadow-none</div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">文字阴影</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 文字阴影（需要自定义）
// Tailwind CSS 没有内置文字阴影工具类，但可以通过配置或自定义类实现

// 在 tailwind.config.js 中添加
export default {
  theme: {
    extend: {
      textShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.5)',
        'DEFAULT': '0 2px 4px rgba(0, 0, 0, 0.5)',
        'md': '0 4px 8px rgba(0, 0, 0, 0.5)',
        'lg': '0 8px 16px rgba(0, 0, 0, 0.5)',
      },
    },
  },
}

// 使用
// text-shadow-sm, text-shadow, text-shadow-md, text-shadow-lg</pre>
      </div>

      <!-- 文字阴影示例（使用自定义样式） -->
      <div class="space-y-2">
        <p class="text-2xl font-bold text-gray-800" style="text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);">
          text-shadow: sm
        </p>
        <p class="text-2xl font-bold text-gray-800" style="text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);">
          text-shadow: DEFAULT
        </p>
        <p class="text-2xl font-bold text-gray-800" style="text-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);">
          text-shadow: md
        </p>
        <p class="text-2xl font-bold text-gray-800" style="text-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);">
          text-shadow: lg
        </p>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">混合模式</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 混合模式
mix-blend-normal      // mix-blend-mode: normal
mix-blend-multiply    // mix-blend-mode: multiply
mix-blend-screen      // mix-blend-mode: screen
mix-blend-overlay     // mix-blend-mode: overlay
mix-blend-darken      // mix-blend-mode: darken
mix-blend-lighten     // mix-blend-mode: lighten
mix-blend-color-dodge // mix-blend-mode: color-dodge
mix-blend-color-burn  // mix-blend-mode: color-burn
mix-blend-hard-light  // mix-blend-mode: hard-light
mix-blend-soft-light  // mix-blend-mode: soft-light
mix-blend-difference  // mix-blend-mode: difference
mix-blend-exclusion   // mix-blend-mode: exclusion
mix-blend-hue         // mix-blend-mode: hue
mix-blend-saturation  // mix-blend-mode: saturation
mix-blend-color       // mix-blend-mode: color
mix-blend-luminosity  // mix-blend-mode: luminosity

// 背景混合模式
bg-blend-normal      // background-blend-mode: normal
bg-blend-multiply    // background-blend-mode: multiply
bg-blend-screen      // background-blend-mode: screen
// ... 其他模式同上</pre>
      </div>

      <!-- 混合模式示例 -->
      <div class="flex gap-4">
        <div class="relative w-32 h-32 bg-blue-500 rounded-lg overflow-hidden">
          <div class="absolute inset-0 bg-yellow-400 mix-blend-multiply"></div>
          <div class="absolute inset-0 flex items-center justify-center text-white font-medium">
            mix-blend-multiply
          </div>
        </div>
        <div class="relative w-32 h-32 bg-blue-500 rounded-lg overflow-hidden">
          <div class="absolute inset-0 bg-yellow-400 mix-blend-screen"></div>
          <div class="absolute inset-0 flex items-center justify-center text-white font-medium">
            mix-blend-screen
          </div>
        </div>
        <div class="relative w-32 h-32 bg-blue-500 rounded-lg overflow-hidden">
          <div class="absolute inset-0 bg-yellow-400 mix-blend-overlay"></div>
          <div class="absolute inset-0 flex items-center justify-center text-white font-medium">
            mix-blend-overlay
          </div>
        </div>
        <div class="relative w-32 h-32 bg-blue-500 rounded-lg overflow-hidden">
          <div class="absolute inset-0 bg-yellow-400 mix-blend-difference"></div>
          <div class="absolute inset-0 flex items-center justify-center text-white font-medium">
            mix-blend-difference
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">过滤器</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 模糊
blur-none     // filter: blur(0)
blur-sm       // filter: blur(4px)
blur          // filter: blur(8px)
blur-md       // filter: blur(12px)
blur-lg       // filter: blur(16px)
blur-xl       // filter: blur(24px)
blur-2xl      // filter: blur(40px)
blur-3xl      // filter: blur(64px)

// 亮度
brightness-0   // filter: brightness(0)
brightness-50  // filter: brightness(0.5)
brightness-75  // filter: brightness(0.75)
brightness-90  // filter: brightness(0.9)
brightness-95  // filter: brightness(0.95)
brightness-100 // filter: brightness(1)
brightness-105 // filter: brightness(1.05)
brightness-110 // filter: brightness(1.1)
brightness-125 // filter: brightness(1.25)
brightness-150 // filter: brightness(1.5)
brightness-200 // filter: brightness(2)

// 对比度
contrast-0    // filter: contrast(0)
contrast-50   // filter: contrast(0.5)
contrast-75   // filter: contrast(0.75)
contrast-100  // filter: contrast(1)
contrast-125  // filter: contrast(1.25)
contrast-150  // filter: contrast(1.5)
contrast-200  // filter: contrast(2)

// 灰度
grayscale-0   // filter: grayscale(0)
grayscale     // filter: grayscale(100%)

// 色相旋转
hue-rotate-0    // filter: hue-rotate(0deg)
hue-rotate-15   // filter: hue-rotate(15deg)
hue-rotate-30   // filter: hue-rotate(30deg)
hue-rotate-60   // filter: hue-rotate(60deg)
hue-rotate-90   // filter: hue-rotate(90deg)
hue-rotate-180  // filter: hue-rotate(180deg)

// 反色
invert-0    // filter: invert(0)
invert       // filter: invert(100%)

// 饱和度
saturate-0    // filter: saturate(0)
saturate-50   // filter: saturate(0.5)
saturate-100  // filter: saturate(1)
saturate-150  // filter: saturate(1.5)
saturate-200  // filter: saturate(2)

// 褐色
sepia-0    // filter: sepia(0)
sepia      // filter: sepia(100%)

// 滤镜组合
filter-none   // filter: none</pre>
      </div>

      <!-- 过滤器示例 -->
      <div class="flex gap-4 flex-wrap">
        <div class="w-32 h-32 rounded-lg overflow-hidden">
          <img src="https://picsum.photos/200/200" class="w-full h-full object-cover blur-sm" alt="blur" />
          <div class="text-center text-xs mt-1">blur-sm</div>
        </div>
        <div class="w-32 h-32 rounded-lg overflow-hidden">
          <img src="https://picsum.photos/200/200" class="w-full h-full object-cover brightness-150" alt="brightness" />
          <div class="text-center text-xs mt-1">brightness-150</div>
        </div>
        <div class="w-32 h-32 rounded-lg overflow-hidden">
          <img src="https://picsum.photos/200/200" class="w-full h-full object-cover contrast-150" alt="contrast" />
          <div class="text-center text-xs mt-1">contrast-150</div>
        </div>
        <div class="w-32 h-32 rounded-lg overflow-hidden">
          <img src="https://picsum.photos/200/200" class="w-full h-full object-cover grayscale" alt="grayscale" />
          <div class="text-center text-xs mt-1">grayscale</div>
        </div>
        <div class="w-32 h-32 rounded-lg overflow-hidden">
          <img src="https://picsum.photos/200/200" class="w-full h-full object-cover hue-rotate-90" alt="hue-rotate" />
          <div class="text-center text-xs mt-1">hue-rotate-90</div>
        </div>
        <div class="w-32 h-32 rounded-lg overflow-hidden">
          <img src="https://picsum.photos/200/200" class="w-full h-full object-cover invert" alt="invert" />
          <div class="text-center text-xs mt-1">invert</div>
        </div>
        <div class="w-32 h-32 rounded-lg overflow-hidden">
          <img src="https://picsum.photos/200/200" class="w-full h-full object-cover sepia" alt="sepia" />
          <div class="text-center text-xs mt-1">sepia</div>
        </div>
      </div>
    </div>

    <div class="bg-pink-50 border border-pink-200 rounded-lg p-4">
      <h3 class="text-lg font-semibold text-pink-800 mb-2">效果工具类总结</h3>
      <ul class="text-pink-700 space-y-1">
        <li>• <code class="bg-pink-100 px-1 rounded">opacity-{value}</code> - 控制元素不透明度</li>
        <li>• <code class="bg-pink-100 px-1 rounded">shadow-{size}</code> - 添加盒子阴影</li>
        <li>• <code class="bg-pink-100 px-1 rounded">mix-blend-{mode}</code> - 设置混合模式</li>
        <li>• <code class="bg-pink-100 px-1 rounded">blur-{size}</code> - 添加模糊效果</li>
        <li>• <code class="bg-pink-100 px-1 rounded">brightness/{contrast}/{grayscale}</code> - 其他滤镜效果</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// 效果工具类演示组件
// 展示了不透明度、阴影、混合模式和过滤器等用法
</script>

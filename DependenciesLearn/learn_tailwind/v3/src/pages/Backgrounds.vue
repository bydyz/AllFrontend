<template>
  <div class="space-y-8">
    <h1 class="text-3xl font-bold text-gray-800">背景 (Backgrounds)</h1>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">背景颜色</h2>
      <p class="text-gray-600 mb-4">
        背景颜色工具类与文字颜色类似，但用于设置元素的背景色。
      </p>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 背景颜色
bg-{color}         // bg-blue-500 → 背景色
bg-{color}-{shade} // bg-red-600 → 指定色调

// 特殊背景色
bg-transparent  // 透明背景
bg-current      // 当前文字颜色作为背景
bg-inherit      // 继承父元素背景色

// 透明度
bg-{color}/{opacity}  // bg-blue-500/50 → 50% 透明度</pre>
      </div>

      <!-- 背景颜色示例 -->
      <div class="grid grid-cols-4 gap-2">
        <div class="bg-red-500 text-white p-3 rounded text-center">bg-red-500</div>
        <div class="bg-blue-500 text-white p-3 rounded text-center">bg-blue-500</div>
        <div class="bg-green-500 text-white p-3 rounded text-center">bg-green-500</div>
        <div class="bg-yellow-500 text-white p-3 rounded text-center">bg-yellow-500</div>
        <div class="bg-purple-500 text-white p-3 rounded text-center">bg-purple-500</div>
        <div class="bg-pink-500 text-white p-3 rounded text-center">bg-pink-500</div>
        <div class="bg-indigo-500 text-white p-3 rounded text-center">bg-indigo-500</div>
        <div class="bg-gray-500 text-white p-3 rounded text-center">bg-gray-500</div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">背景渐变</h2>
      <p class="text-gray-600 mb-4">
        Tailwind CSS 内置了强大的渐变背景支持。
      </p>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 线性渐变
bg-gradient-to-r    // 从左到右
bg-gradient-to-l    // 从右到左
bg-gradient-to-t    // 从下到上
bg-gradient-to-b    // 从上到下
bg-gradient-to-tr   // 从左下到右上
bg-gradient-to-bl   // 从右上到左下
bg-gradient-to-tl   // 从右下到左上
bg-gradient-to-br   // 从左上到右下

// 渐变颜色
from-{color}        // 渐变起始颜色
via-{color}         // 渐变中间颜色（可选）
to-{color}          // 渐变结束颜色

// 示例
bg-gradient-to-r from-blue-500 to-purple-500
bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500</pre>
      </div>

      <!-- 渐变示例 -->
      <div class="space-y-3">
        <div class="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded">
          bg-gradient-to-r from-blue-500 to-purple-500
        </div>
        <div class="bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 text-white p-4 rounded">
          bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500
        </div>
        <div class="bg-gradient-to-br from-green-400 to-blue-500 text-white p-4 rounded">
          bg-gradient-to-br from-green-400 to-blue-500
        </div>
        <div class="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4 rounded">
          bg-gradient-to-r from-pink-500 to-rose-500
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">背景大小</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 背景大小
bg-auto      // background-size: auto
bg-cover     // background-size: cover
bg-contain   // background-size: contain</pre>
      </div>

      <!-- 背景大小示例 -->
      <div class="flex gap-4">
        <div class="bg-cover bg-center w-32 h-32 rounded border border-gray-300"
             style="background-image: url('https://picsum.photos/200/200')">
          <div class="w-full h-full flex items-center justify-center bg-black/30 text-white text-sm">
            bg-cover
          </div>
        </div>
        <div class="bg-contain bg-center bg-no-repeat w-32 h-32 rounded border border-gray-300"
             style="background-image: url('https://picsum.photos/200/200')">
          <div class="w-full h-full flex items-center justify-center bg-black/30 text-white text-sm">
            bg-contain
          </div>
        </div>
        <div class="bg-auto bg-center bg-no-repeat w-32 h-32 rounded border border-gray-300"
             style="background-image: url('https://picsum.photos/200/200')">
          <div class="w-full h-full flex items-center justify-center bg-black/30 text-white text-sm">
            bg-auto
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">背景位置</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 背景位置
bg-bottom    // background-position: bottom
bg-center    // background-position: center
bg-left      // background-position: left
bg-left-bottom  // background-position: left bottom
bg-left-top     // background-position: left top
bg-right     // background-position: right
bg-right-bottom // background-position: right bottom
bg-right-top    // background-position: right top
bg-top       // background-position: top</pre>
      </div>

      <!-- 背景位置示例 -->
      <div class="grid grid-cols-3 gap-4">
        <div class="bg-bottom bg-no-repeat w-32 h-32 rounded border border-gray-300"
             style="background-image: url('https://picsum.photos/100/100')">
          <div class="w-full h-full flex items-end justify-center bg-black/30 text-white text-xs pb-1">
            bg-bottom
          </div>
        </div>
        <div class="bg-center bg-no-repeat w-32 h-32 rounded border border-gray-300"
             style="background-image: url('https://picsum.photos/100/100')">
          <div class="w-full h-full flex items-center justify-center bg-black/30 text-white text-xs">
            bg-center
          </div>
        </div>
        <div class="bg-top bg-no-repeat w-32 h-32 rounded border border-gray-300"
             style="background-image: url('https://picsum.photos/100/100')">
          <div class="w-full h-full flex items-start justify-center bg-black/30 text-white text-xs pt-1">
            bg-top
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">背景重复</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 背景重复
bg-repeat     // background-repeat: repeat
bg-no-repeat  // background-repeat: no-repeat
bg-repeat-x   // background-repeat: repeat-x
bg-repeat-y   // background-repeat: repeat-y
bg-repeat-round  // background-repeat: round
bg-repeat-space  // background-repeat: space</pre>
      </div>

      <!-- 背景重复示例 -->
      <div class="flex gap-4">
        <div class="bg-repeat w-32 h-32 rounded border border-gray-300"
             style="background-image: url('https://picsum.photos/50/50')">
          <div class="w-full h-full flex items-center justify-center bg-black/30 text-white text-xs">
            bg-repeat
          </div>
        </div>
        <div class="bg-no-repeat w-32 h-32 rounded border border-gray-300"
             style="background-image: url('https://picsum.photos/50/50')">
          <div class="w-full h-full flex items-center justify-center bg-black/30 text-white text-xs">
            bg-no-repeat
          </div>
        </div>
        <div class="bg-repeat-x w-32 h-32 rounded border border-gray-300"
             style="background-image: url('https://picsum.photos/50/50')">
          <div class="w-full h-full flex items-center justify-center bg-black/30 text-white text-xs">
            bg-repeat-x
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">背景附件</h2>

      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <pre>// 背景附件
bg-fixed    // background-attachment: fixed
bg-local    // background-attachment: local
bg-scroll   // background-attachment: scroll</pre>
      </div>

      <p class="text-gray-600">
        <code class="bg-gray-100 px-1 rounded">bg-fixed</code> 使背景图片相对于视口固定，
        <code class="bg-gray-100 px-1 rounded">bg-local</code> 使背景图片跟随内容滚动，
        <code class="bg-gray-100 px-1 rounded">bg-scroll</code> 使背景图片跟随元素滚动。
      </p>
    </div>

    <div class="bg-teal-50 border border-teal-200 rounded-lg p-4">
      <h3 class="text-lg font-semibold text-teal-800 mb-2">背景工具类总结</h3>
      <ul class="text-teal-700 space-y-1">
        <li>• <code class="bg-teal-100 px-1 rounded">bg-{color}</code> - 设置背景颜色</li>
        <li>• <code class="bg-teal-100 px-1 rounded">bg-gradient-to-{direction}</code> - 创建渐变背景</li>
        <li>• <code class="bg-teal-100 px-1 rounded">from-{color} via-{color} to-{color}</code> - 渐变颜色</li>
        <li>• <code class="bg-teal-100 px-1 rounded">bg-cover/contain/auto</code> - 控制背景大小</li>
        <li>• <code class="bg-teal-100 px-1 rounded">bg-center/left/right/top/bottom</code> - 控制背景位置</li>
        <li>• <code class="bg-teal-100 px-1 rounded">bg-repeat/no-repeat</code> - 控制背景重复</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// 背景工具类演示组件
// 展示了背景颜色、渐变、大小、位置、重复和附件等用法
</script>

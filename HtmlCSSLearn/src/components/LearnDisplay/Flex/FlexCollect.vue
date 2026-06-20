<template>
  <div class="p-[16px] border-[2px] border-solid border-[#c4c4c4] rounded-[8px]">
    <div><span class="text-[32px] font-bold">flex-grow</span> 是 CSS Flexbox 布局中的一个属性，它的核心作用是：定义 Flex 项目（子项）在主轴方向上有剩余空间时，是否以及如何“长大”去瓜分这些空间。它决定了当父容器有多余空间时，你家孩子（子元素）怎么去抢着“吃”掉这些空间。</div>

    <div class="mt-[20px] ml-[40px]">
      <div>工作原理和特性如下：</div>
      <ul>
        <li>默认值为 0（不长大）</li>
        <li>正值表示“参与分配”</li>
        <li>分配的是“剩余空间”，而非总宽度</li>
        <li>受 flex-basis 影响：flex-grow 是在 flex-basis（基础尺寸）的基础上进行增加的。如果设了 flex-basis: 200px，那么它是在 200px 的基础上再瓜分剩余空间。</li>
      </ul>
    </div>

    <div class="mt-[20px]">
      <div>示例一：固定宽度时，使用 flex-grow 依旧会 "长大"</div>
      <div class="w-[1000px] h-[60px] border-[1px] border-solid border-[#c4c4c4] rounded-[8px] flex p-[2px] mt-[8px]">
        <div class="bg-[#d8acac] w-[300px] h-full basis-[350px]"></div>
        <div class="bg-[#718b71] w-[300px] h-full grow-[1]"></div>
        <div class="bg-[#686897] w-[300px] h-full"></div>
      </div>
    </div>
  </div>

  <div class="p-[16px] border-[2px] border-solid border-[#c4c4c4] rounded-[8px] mt-[16px]">
    <div><span class="text-[32px] font-bold">flex-basis</span> 是 充当“建议尺寸”与“分配起点”。</div>

    <div class="mt-[20px] ml-[40px]">
      <div>工作原理和特性如下：</div>
      <ul>
        <li>取值：auto（默认值）、固定长度（固定px数值、百分比）、content、0</li>
        <li>当 flex-basis 不为 auto 时（如 0、100px、50%、content）：主轴上的 width（水平）或 height（垂直）被完全覆盖（忽略）。</li>
        <li>当 flex-basis 为 auto 时，先检查主轴上的 width（或 height）属性，若有则取该值；若无，则取内容（content）本身的尺寸。</li>
        <li>当 flex-basis 为 固定长度 时，严格按数值计算，完全忽略主轴上 width / height 的设置。百分比是相对于父容器主轴尺寸的。</li>
        <li>当 flex-basis 为 content 时，“根据元素内部内容的尺寸来决定基础大小”，完全不理会 width 设置。</li>
        <li>当 flex-basis 为 0 时，将初始尺寸归零，完全无视内容大小。此时项目的大小将完全由 flex-grow 的权重决定。</li>
        <li>终极“杀手”：min-width 和 max-width：虽然 flex-basis 优先级高于 width，但 min-width/max-width 拥有最高的最终裁决权。假如你设置了 flex-basis: 200px 但 max-width: 100px，那么元素最终绝对不会超过 100px，flex-basis 会被约束条件强行拉回。</li>
      </ul>
    </div>
  </div>

  <div class="p-[16px] border-[2px] border-solid border-[#c4c4c4] rounded-[8px] mt-[16px]">
    <div><span class="text-[32px] font-bold">flex-shrink</span> 决定弹性项目在空间不足时如何“压缩”的核心属性。它的默认值是 1，表示项目默认允许缩小。</div>

    <div class="mt-[20px] ml-[40px]">
      <div>工作原理和特性如下：</div>
      <ul>
        <li>只有当容器的 flex-wrap: nowrap（不换行）且所有子项的 flex-basis（或内容宽度）总和 大于 容器宽度时，flex-shrink 才会生效。如果容器足够宽，这个属性完全不起作用。</li>
        <li>每个项目应缩小的空间 = 总溢出空间 ×（该项目 flex-shrink × 该项目 flex-basis）÷（所有项目 flex-shrink × flex-basis 的总和）</li>
        <li>flex-shrink 缩小的对象不是 width，而是 flex-basis。</li>
        <li>flex-basis: 0%；基础宽度为 0，无论 flex-shrink 设多大，权重 = shrink × 0 = 0，项目完全不缩小（因为没什么可缩的）。此时宽度完全由 flex-grow 决定。</li>
        <li>flex-basis: auto；基准值取 width 属性值（或内容尺寸），这时 flex-shrink 才按上述公式按比例生效。</li>
        <li>flex-basis: 具体px；严格按照设定的具体像素作为基准进行压缩。</li>
        <li>当你想让某个元素“打死也不缩小”时，正确的写法是 flex-shrink: 0 且赋予固定的 flex-basis（或直接写 flex: 0 0 100px），只设 flex-shrink: 0 但 flex-basis: 100% 时它依然会被内容撑开。</li>
        <li>隐藏的“底线”：min-width / min-height。flex-shrink 无法无限压缩。每个弹性项目都有一个默认的“最小尺寸”限制：对于文本内容，默认 min-width: auto，意味着项目不会缩小到小于其最长单词或内容的宽度；典型案例：侧边栏设置了 flex-shrink: 1，但里面有一个很长的英文单词，宽度死活缩不下去。此时需要手动设置 min-width: 0（或 overflow: hidden）来强制允许缩小到 0。</li>
      </ul>
    </div>
  </div>

  <div class="p-[16px] border-[2px] border-solid border-[#c4c4c4] rounded-[8px] mt-[16px]">
    <div><span class="text-[32px] font-bold">快捷语法</span>：它允许你写 1个值、2个值或3个值；语法：flex: [flex-grow] [flex-shrink] [flex-basis]   后两者可选</div>

    <div class="mt-[20px] ml-[40px]">
      <div>三种值组合的精确规则</div>
      <ul>
        <li>单值（数字），如 flex: 数字X;                     补全逻辑，flex-grow: 数字X；flex-shrink: 1（默认补1）；flex-basis: 0%（强制补0%）</li>
        <li>单值（px或者%），如 flex: px或者%;                补全逻辑，flex-grow: 1（默认补1）；flex-shrink: 1（默认补1）；flex-basis: px或者%</li>
        <li>双值，如 flex: 1 3;                               补全逻辑，flex-grow: 1；flex-shrink: 3；flex-basis: （强制补0%）</li>
      </ul>

      <div class="mt-[50px]">示例</div>
      <ul>
        <li>flex: none                对应  0 0 auto      表示  绝对不缩小</li>
        <li>flex: initial（默认）      对应  0 1 auto     表示  不主动生长，但空间不足时等比缩小</li>
        <li>flex: auto                对应  1 1 auto      表示  既生长也缩小</li>
        <li>flex: 1                   对应  1 1 0%        表示  充满剩余空间；由于 basis:0%，flex-shrink 不起作用（此写法常用于等分布局）</li>
        <li>flex: 0                   对应  0 1 0%        表示  最小化宽度：基准为0，不放大，只缩小。</li>
      </ul>
    </div>
  </div>

  <div class="p-[16px] border-[2px] border-solid border-[#c4c4c4] rounded-[8px] mt-[16px]">
    <div class="text-[32px] font-bold">实战总结</div>

    <div class="mt-[20px] ml-[40px]">
      <div>实战总结：</div>
      <ul>
        <li>不要单独调整 flex-shrink，一定要结合 flex-basis 看，否则算不明白宽度。</li>
        <li>如果想实现多列等宽且自适应，用 flex: 1（此时 shrink 因 basis:0% 而失效，靠 grow 分配空间）。</li>
        <li>如果想实现固定侧边栏 + 自适应内容，侧边栏写 flex: 0 0 200px（shrink 为 0 锁死宽度），内容区写 flex: 1。</li>
        <li>当压缩效果“不听话”时，优先检查子元素是否设置了 min-width 或内部是否有长文本/图片。</li>
      </ul>
    </div>
  </div>
</template>


<script setup>
</script>

<style scoped lang="scss">
li {
  padding: 8px 0
}
</style>
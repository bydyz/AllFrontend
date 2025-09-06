<template>
  <div>
    <p>
        左右尖括号
        &lt;come on
        &gt;
    </p>
    <p>
        &lt;come on&gt;
        <!-- 上面由于 &gt; 换行，比下面的多一个空格的差距 -->
    </p>

    
    <!-- 空格   &nbsp后面有无 ; 均可，而 &emsp 必须要 -->
    <p>&nbsp&nbsp赵钱孙李，周吴郑王111</p>
    <p>&nbsp;&nbsp;赵钱孙李，周吴郑王222</p>
    <!-- alt + w 的运用 -->
    
    <p>&emsp&emsp赵钱孙李，周吴郑王333</p>
    <p>&emsp;&emsp;赵钱孙李，周吴郑王444</p>
    <!-- 分号需要用英文的 -->
    <p>
        大家好，我是kerwin,,,,,,,,,,,,,Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam, aspernatur! Animi, vero veniam distinctio esse dolorum deserunt illum odio, delectus eius fuga praesentium! Adipisci eos maiores recusandae cupiditate magnam 
         ducimus!
         <!-- 如何让这些东西自动换行   vscode配置即可 -->
         
    </p>
    <!-- lorem  自动生成一些单词 -->



    <p>版权&copy;</p>
    <!-- 版权符号 -->



    <p>商标&trade;</p>

    <p>商标&reg;</p>
    <!-- 
      商标符号主要有以下三种：
        TM（商标符）------&trade;
          指已经向商标局登记（申请注册）、或持有人声明拥有权利的商品商标。
        SM（商标符）
          指已经向商标局登记（申请注册）、或持有人声明拥有权利的服务商标。
        R（注册符）------&reg;
          指已经商标局核准注册的商标，包括已核准注册的商品商标和服务商标。
    -->




    <!-- 这些特殊的图标，只与内容有关 -->
    <!-- <meta charset="UTF-8"> 定义来字符集。A, B, 和 C 也可以使用 65, 66, 和 67 来表示。实体编号需要以 &# 开头并以分号 ; 结尾，这样才能正确显示一个字符。同样 Emoji 也是字符，可以在 HTML 页面中跟其他字符一样使用它： -->
    <p>&#65</p>
    <div>&#128512</div>
    <span>&#128512</span>
    <p>&#128512</p>
    <p>&#128513</p>
    <p>&#128514</p>
    <p>&#128515</p>
    <p>&#128516</p>
    <p>&#128517</p>
    <p>&#128518</p>
  </div>
</template>


<script setup>
  
</script>

<style scope></style>
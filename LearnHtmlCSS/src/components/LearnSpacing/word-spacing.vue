<template>
  <div>
    <h2>正常单词间距</h2>
    <p class="normal-words">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita totam voluptates esse earum accusantium voluptatem et odio, veritatis assumenda, vitae molestiae soluta dicta adipisci, ipsam asperiores? Maxime officiis recusandae vel.</p>

    <h2>10px</h2>
    <p class="wide-words">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita totam voluptates esse earum accusantium voluptatem et odio, veritatis assumenda, vitae molestiae soluta dicta adipisci, ipsam asperiores? Maxime officiis recusandae vel.</p>

    <h2>-2px</h2>
    <p class="narrow-words">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita totam voluptates esse earum accusantium voluptatem et odio, veritatis assumenda, vitae molestiae soluta dicta adipisci, ipsam asperiores? Maxime officiis recusandae vel.</p>
  </div>
</template>


<script setup>
</script>

<style scoped lang="stylus">
/* 正常单词间距 */
.normal-words {
  word-spacing: normal;
}

/* 增加单词间距 */
.wide-words {
  word-spacing: 10px;
}

/* 减少单词间距 */
.narrow-words {
  word-spacing: -2px;
}
</style>
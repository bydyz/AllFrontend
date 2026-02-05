<template>
  <div class="div1">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, quae officiis dolores eveniet et quaerat porro quas? Accusamus voluptatum reiciendis eveniet voluptas, excepturi enim perspiciatis fugit, delectus molestiae placeat asperiores. Lorem ipsum dolor sit amet consectetur adipisicing
    elit. Pariatur, quae officiis dolores eveniet et quaerat porro quas? Accusamus voluptatum reiciendis eveniet voluptas, excepturi enim perspiciatis fugit, delectus molestiae placeat asperiores. Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, quae officiis dolores eveniet et
    quaerat porro quas? Accusamus voluptatum reiciendis eveniet voluptas, excepturi enim perspiciatis fugit, delectus molestiae placeat asperiores. Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, quae officiis dolores eveniet et quaerat porro quas? Accusamus voluptatum reiciendis
    eveniet voluptas, excepturi enim perspiciatis fugit, delectus molestiae placeat asperiores. Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, quae officiis dolores eveniet et quaerat porro quas? Accusamus voluptatum reiciendis eveniet voluptas, excepturi enim perspiciatis fugit,
    delectus molestiae placeat asperiores. Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, quae officiis dolores eveniet et quaerat porro quas? Accusamus voluptatum reiciendis eveniet voluptas, excepturi enim perspiciatis fugit, delectus molestiae placeat asperiores. Lorem ipsum
    dolor sit amet consectetur adipisicing elit. Pariatur, quae officiis dolores eveniet et quaerat porro quas? Accusamus voluptatum reiciendis eveniet voluptas, excepturi enim perspiciatis fugit, delectus molestiae placeat asperiores.
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.div1 {
  background-color: pink;
  background-image: url(./Wechat.png);
  background-repeat: no-repeat;
  /* background-position: center top; */
  /* background-size: cover; */
  height: 200px;
  width: 500px;

  /* background-attachment: scroll; */
  background-attachment: fixed;
  /* background-attachment: local; */
  /* 因为div没有包含左上角，所以图片不会显示 */
  /* background-attachment: scroll; */
  /* background-attachment的属性值有
                scroll  背景图片附着在背景容器上，它是相对于背景容器（元素）固定，它会随着背景容器的滚动，而不是随着它的内容滚动 
                fixed  背景图片附着在浏览器的可视区域。因为浏览器的可视区域不具备滚动的性格，所以它是不滚动的
                local：这是CSS3新增的属性值。背景图片附着在背景容器的内容区域。它会随着内容的滚动而滚动。*/

  /* margin: 0 auto; */
  /* 让div这个盒子处在正中间 */

  overflow: auto;

  /* background 搭配起来奇妙无穷 */
}
</style>

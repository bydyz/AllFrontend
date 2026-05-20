<script setup>
import { onMounted, ref } from "vue";

const box = ref()

let isResizing = ref(false);

// 鼠标按下时开始调整
const startDrag = function(e) {
  e.preventDefault(); // 防止默认行为（如文本选择）
  isResizing.value = true;

  const onMouseMove = event => {
    if (isResizing.value) {
      console.log(event.clientX, box.value.getBoundingClientRect())
      // 计算新的宽度   多 减去一个2 即会起到 移动时也会有鼠标变化的效果
      const newWidth = event.clientX - box.value.getBoundingClientRect().left - 2;
      box.value.style.width = Math.max(newWidth, 50) + "px"; // 最小宽度为50px
    }
  };

  // 监听这个不行，会卡顿
  let timeId = ref()
  const debounceOnMouseMove = event => {
    if(timeId.value) {
      clearTimeout(timeId.value)
    }
    timeId.value = setTimeout(() => {
      if (isResizing.value) {
        console.log(event.clientX, box.value.getBoundingClientRect())
        // 计算新的宽度
        const newWidth = event.clientX - box.value.getBoundingClientRect().left;
        box.value.style.width = Math.max(newWidth, 50) + "px"; // 最小宽度为50px
      }
    }, 200)
  }

  const onMouseUp = () => {
    isResizing.value = false;
    // 移除事件监听器
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  // 监听鼠标移动和释放事件
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
}

onMounted(() => {
  box.value = document.getElementById("leftArea");
  console.log(box.value)
});
</script>

<template>
  <main>
    <div id="leftArea"></div>
    <div id="centerLine" @mousedown="startDrag"></div>
    <div id="rightArea"></div>
  </main>
</template>

<style scoped lang="scss">
main {
  height: 100%;
  display: flex;
}
#leftArea {
  width: 80px;
}
/* 鼠标到margin区域不会有效果，对padding有 */
#centerLine {
  width: 2px;
  margin: 0 2px;

  background: coral;
  cursor: ew-resize; /* 水平调整光标 */
}
#rightArea {
  flex: 1;
}
</style>

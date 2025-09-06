import { reactive } from 'vue'

export default function useScrollPosition() {
  // 1.使用reative记录位置
  const scrollPosition = reactive({
    x: 0,
    y: 0
  })

  // 2.监听滚动
  // 似乎只要某一个文件有导入此hook，则无论哪个位置滚动都会监听到
  document.addEventListener("scroll", () => {
    // console.log(window.scrollX, window.scrollY)
    scrollPosition.x = window.scrollX
    scrollPosition.y = window.scrollY

    console.log('11111111111111111111111111111111111111111111111111111111', )
  })


  return {
    scrollPosition
  }
}
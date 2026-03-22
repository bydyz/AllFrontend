// 监听屏幕尺寸变化
import { Debounce } from '@/lib'

export default {
  data() {
    return {
      screen: {
        bodyWidth: document.body.offsetWidth
      }
    }
  },
  created() {
    // 动态尺寸
    let resizeFn = Debounce(() => {
      this.screen.bodyWidth = document.body.offsetWidth
      this.$emit('resize')
    })
    window.addEventListener('resize', resizeFn)
    this.destroyFn = () => window.removeEventListener('resize', resizeFn)
  },
  beforeDestroy() {
    this.destroyFn && this.destroyFn()
  }
}

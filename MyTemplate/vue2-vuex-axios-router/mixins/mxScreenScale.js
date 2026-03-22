export default {
  data () {
    return {
      scalingRatio: window.devicePixelRatio
    }
  },
  mounted () {
    window.addEventListener('resize', () => {
      const devicePixelRatio = window.devicePixelRatio
      this.scalingRatio = devicePixelRatio
    })
  },
}
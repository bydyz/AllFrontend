export default {
  data() {
    return {
      visibleInner: true
    }
  },
  props: {
    width: {
      type: Number,
      default: 200
    },
    visible: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    sideInnerStyle() {
      return {
        width: this.width + 'px'
      }
    },
    sideStyle() {
      if (this.visibleInner) return this.sideInnerStyle
      return {
        width: 0,
        margin: 0
      }
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler(visible) {
        this.visibleInner = visible
      }
    }
  },
  methods: {
    open() {
      this.visibleInner = true
      this.$emit('update:visible', this.visibleInner)
    },
    close() {
      this.visibleInner = false
      this.$emit('update:visible', this.visibleInner)
    }
  }
}

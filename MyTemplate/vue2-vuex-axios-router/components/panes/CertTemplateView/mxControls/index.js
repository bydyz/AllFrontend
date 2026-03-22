export default {
  data() {
    return {
      headImgConfig: {
        minScale: 10,
        maxScale: 300
      }
    }
  },

  methods: {
    // 效果 - 拖拽大小
    onSeResize(e) {
      if (!this.info.isEdit) return false

      let el = this.getElement(e.target)
      // 释放元素
      if (!el) return this.activeIndex = null
      // 选中元素
      this.activeIndex = el.getAttribute('code')
      let elItem = this.elMaps[this.activeIndex]

      let sx = e.clientX - el.offsetWidth
      let { minScale, maxScale } = this.headImgConfig


      let $moveFn = ev => {
        let x = Math.round(ev.clientX - sx)

        // 边界限制
        x = x < minScale ? minScale : (x > maxScale ? maxScale : x)

        elItem.style.width = x
        elItem.style.height = x * 1.5
      }

      let $upFn = ev => {
        document.removeEventListener('mousemove', $moveFn)
        document.removeEventListener('mouseup', $upFn)
      }
      document.addEventListener('mousemove', $moveFn)
      document.addEventListener('mouseup', $upFn)
    },

    // 效果 - 拖拽大小
    onEResizeFromRight(e) {
      if (!this.info.isEdit) return false

      let el = this.getElement(e.target)
      // 释放元素
      if (!el) return this.activeIndex = null
      // 选中元素
      this.activeIndex = el.getAttribute('code')
      let elItem = this.elMaps[this.activeIndex]

      let sx = e.clientX - el.offsetWidth
      let minScale = 0
      let maxScale = this.backgroundWidth - elItem.style.x


      let $moveFn = ev => {
        let x = Math.round(ev.clientX - sx)

        // 边界限制
        x = x < minScale ? minScale : (x > maxScale ? maxScale : x)

        elItem.style.width = x || 1
      }

      let $upFn = ev => {
        document.removeEventListener('mousemove', $moveFn)
        document.removeEventListener('mouseup', $upFn)
      }
      document.addEventListener('mousemove', $moveFn)
      document.addEventListener('mouseup', $upFn)
    },

    // 效果 - 拖拽大小
    onEResizeFromLeft(e) {
      if (!this.info.isEdit) return false

      let el = this.getElement(e.target)
      // 释放元素
      if (!el) return this.activeIndex = null
      // 选中元素
      this.activeIndex = el.getAttribute('code')
      let elItem = this.elMaps[this.activeIndex]

      let { zoom, viewZoom } = this.info
      let sx = e.clientX / (viewZoom / zoom) - el.offsetLeft
      let maxX = el.offsetLeft + el.offsetWidth

      let $moveFn = ev => {
        let x = Math.round(ev.clientX / (viewZoom / zoom) - sx)

        // 边界限制
        x = x < 0 ? 0 : (x > maxX ? maxX : x)

        elItem.style.x = x
        elItem.style.width = maxX - x || 1
      }

      let $upFn = ev => {
        document.removeEventListener('mousemove', $moveFn)
        document.removeEventListener('mouseup', $upFn)
      }
      document.addEventListener('mousemove', $moveFn)
      document.addEventListener('mouseup', $upFn)
    },


    // 效果 - 拖拽位置
    onMouseDown(e) {
      if (!this.info.isEdit) return false

      let el = this.getElement(e.target)
      // 释放元素
      if (!el) return this.activeIndex = null
      // 选中元素
      this.activeIndex = el.getAttribute('code')
      let elItem = this.elMaps[this.activeIndex]

      let { zoom, viewZoom } = this.info
      let sx = e.clientX / (viewZoom / zoom) - el.offsetLeft
      let sy = e.clientY / (viewZoom / zoom) - el.offsetTop
      let maxX = el.offsetParent.clientWidth * zoom - el.offsetWidth
      let maxY = el.offsetParent.clientHeight * zoom - el.offsetHeight
      if (elItem.code === 'certContent') {
        maxX = el.offsetParent.clientWidth * zoom - 64
      }

      let $moveFn = ev => {
        let x = Math.round(ev.clientX / (viewZoom / zoom) - sx)
        let y = Math.round(ev.clientY / (viewZoom / zoom) - sy)

        // 边界限制
        x = x < 0 ? 0 : (x > maxX ? maxX : x)
        y = y < 0 ? 0 : (y > maxY ? maxY : y)

        elItem.style.x = x
        elItem.style.y = y
      }

      let $upFn = ev => {
        document.removeEventListener('mousemove', $moveFn)
        document.removeEventListener('mouseup', $upFn)
      }
      document.addEventListener('mousemove', $moveFn)
      document.addEventListener('mouseup', $upFn)
    },

    // 效果 - 滚轮控制字体大小
    onWheel(e) {
      if (!this.info.isEdit) return false
      // 阻止默认事件
      e.preventDefault()
      // 滚轮方向
      let isDown = true
      if (this.isFireFox) {
        // 火狐
        isDown = e.detail > 0
      } else {
        isDown = e.wheelDelta < 0
      }

      // 获取元素: 当前元素 | 选中元素
      let el = this.getElement(e.target)
      let elItem = this.elMaps[el ? el.getAttribute('code') : this.activeIndex]
      if (!elItem) return false

      if (elItem.code === 'headImg') {
        let width = elItem.style.width + (isDown ? -1 : 1)
        let { minScale, maxScale } = this.headImgConfig
        // 边界限制
        if (width < minScale) {
          width = minScale
        } else if (width > maxScale) {
          width = maxScale
        }
        elItem.style.width = width
        elItem.style.height = width * 1.5

        return false
      }


      // 设置字体大小
      let fontSize = elItem.style.fontSize + (isDown ? -1 : 1)
      // 边界限制
      if (fontSize < 12) {
        fontSize = 12
      } else if (fontSize > 80) {
        fontSize = 80
      }
      elItem.style.fontSize = fontSize
    },

    // 操作 - 选择字体
    onSelectFontFamily() {
      for (const k in this.elMaps) {
        this.elMaps[k].style.font = this.fontFamily
      }
    },

    // 头像缩放 输入值为空时 的处理
    onHeadImgBlur(item) {
      if (item.style.width) return false
      item.style.width = this.headImgConfig.minScale
    }
  }
}

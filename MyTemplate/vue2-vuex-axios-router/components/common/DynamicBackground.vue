<template>
  <div class="dynamic-background">
    <div class="canvas-box" :class="{'append-to-body':appendToBody}">
      <canvas :width="width" :height="height" ref="canvas"></canvas>
    </div>
    <section class="content-box" @mousemove="mousePosition.x = $event.pageX;mousePosition.y = $event.pageY"
             @mouseleave="onMouseLeave">
      <slot></slot>
    </section>
  </div>
</template>

<script>
export default {
  name: 'DynamicBackground',
  created() {
    this.isRun = true
    this.width = window.screen.width
    this.height = window.screen.height
    this.mousePosition.x = window.innerWidth / 2
    this.mousePosition.y = window.innerHeight / 2
    this.dots.number = this.number

    this.createDots()
  },
  mounted() {
    /*获取canvas的dom*/
    this.paint = this.$refs.canvas.getContext('2d')
    this.paint.lineWidth = this.lineWidth
    this.paint.strokeStyle = this.getColor(150).style
    this.animateDots()
  },
  beforeDestroy() {
    this.isRun = false
  },
  data() {
    return {
      paint: null,
      width: 300,
      height: 300,
      dots: {
        number: 250,
        distance: 100,
        d_radius: 150,
        array: []
      },
      mousePosition: {
        x: 0,
        y: 0
      },
      isRun: true
    }
  },
  props: {
    lineWidth: {
      type: Number,
      default: .3
    },
    number: {
      type: Number,
      default: 250
    },
    appendToBody: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onMouseLeave() {
      this.mousePosition.x = window.innerWidth / 2
      this.mousePosition.y = window.innerHeight / 2
    },
    // 初始化 点
    createDots() {
      for (let i = 0; i < this.dots.number; i++) {
        this.dots.array.push(this.getDot())
      }
    },
    // 工厂模式， 生成一个随机点
    getDot() {
      let {
        random
      } = Math
      return {
        x: random() * this.width,
        y: random() * this.height,
        vx: random() - .5,
        vy: random() - .5,
        radius: random() * 2,
        color: this.getColor()
      }
    },
    // 工厂模式， 生成随机颜色
    getColor(min = 0) {
      let [r, g, b] = [min, min, min].map(n => Math.floor(Math.random() * 255 + n))
      return {
        r, g, b,
        style: `rgba(${r},${g},${b},.8)`
      }
    },
    // 运行动画
    animateDots() {
      this.paint.clearRect(0, 0, this.width, this.height)
      this.moveDots()
      this.connectDots()
      this.drawDots()

      this.isRun && requestAnimationFrame(this.animateDots)
    },
    mixComponents(comp1, weight1, comp2, weight2) {
      return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2)
    },
    averageColorStyles(dot1, dot2) {
      var color1 = dot1.color,
          color2 = dot2.color
      let {
        mixComponents
      } = this
      var r = mixComponents(color1.r, dot1.radius, color2.r, dot2.radius),
          g = mixComponents(color1.g, dot1.radius, color2.g, dot2.radius),
          b = mixComponents(color1.b, dot1.radius, color2.b, dot2.radius)
      return `rgba(${Math.floor(r)},${Math.floor(g)},${Math.floor(b)},.8)`
    },
    // 移动
    moveDots() {
      this.dots.array.forEach(dot => {
        if (dot.y < 0 || dot.y > this.height) {
          dot.vy = -dot.vy
        } else if (dot.x < 0 || dot.x > this.width) {
          dot.vx = -dot.vx
        }
        dot.x += dot.vx
        dot.y += dot.vy
      })
    },
    // 连接点
    connectDots() {
      let {
        dots,
        mousePosition,
        paint,
        averageColorStyles
      } = this
      for (let i = 0; i < dots.number; i++) {
        for (let j = 0; j < dots.number; j++) {
          let i_dot = dots.array[i]
          let j_dot = dots.array[j]

          if ((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > -dots.distance && (i_dot.y - j_dot.y) > -dots.distance) {
            if ((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > -dots.d_radius && (i_dot.y - mousePosition.y) > -dots.d_radius) {
              paint.beginPath()
              paint.strokeStyle = averageColorStyles(i_dot, j_dot)
              paint.moveTo(i_dot.x, i_dot.y)
              paint.lineTo(j_dot.x, j_dot.y)
              paint.stroke()
              paint.closePath()
            }
          }
        }
      }
    },
    drawDots() {
      let {
        paint
      } = this
      this.dots.array.forEach(dot => {
        paint.beginPath()
        paint.fillStyle = dot.color.style
        paint.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2, false)
        paint.fill()
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.dynamic-background
  position relative

  .canvas-box
    width 100vw
    height 100vh
    position fixed
    top 0
    left 0
    z-index 99
    overflow hidden

    &.append-to-body
      width 100%
      height 100%
      position absolute

  .content-box
    position relative
    z-index 100
</style>
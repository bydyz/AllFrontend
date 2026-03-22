<template>
  <div class="flex start-center font-0">

    <div>
      <!--编辑区域-->
      <div class="relative flex bg-3 overflow">

        <!--编辑区域 - 背景图片-->
        <el-image class="flex" ref="image" :style="style.editZone" :src="src" fit="contain"></el-image>

        <!--遮罩背景-->
        <div class="absolute select-none width-100p height-100p bg-mask"></div>

        <!--遮罩块-->
        <div ref="mask" class="absolute mask overflow select-none border-f" :style="style.mask"
             @mousedown="onMouseDown">
          <el-image class="absolute flex" :style="style.maskImg" :src="src" fit="contain"></el-image>
        </div>
      </div>

      <!--控制区域-->
      <div class="text-center ">
        <el-button type="text" icon="el-icon-refresh-left" @click="mask.rotate -= 90"></el-button>
        <el-button type="text" icon="el-icon-refresh-right" @click="mask.rotate += 90"></el-button>
      </div>
    </div>


    <div class="border-9 margin-32 height-64"></div>

    <div>
      <div ref="result" class="relative overflow border-e bg-3" :style="style.result">
        <el-image class="absolute select-none flex" :style="style.resultImg" :src="src" fit="contain"></el-image>
      </div>
      <slot name="tips">
        <div class="font-16 text-center margin-top-12">图片预览</div>
      </slot>
    </div>

    <canvas class="border-3" :width="width" :height="height" ref="canvas"></canvas>
  </div>
</template>

<script>

export default {
  name: 'ImageClip',
  mounted() {
    this.cv = this.$refs.canvas.getContext('2d')
  },
  data() {
    return {
      mask: {
        x: 0,
        y: 0,
        rotate: 0,
        zoom: 1
      },
      cv: null
    }
  },
  props: {
    // 裁剪结果 - 宽度
    width: {
      type: [String, Number],
      default: 80
    },
    // 裁剪结果 - 高度
    height: {
      type: [String, Number],
      default: 80
    },
    // 源图片
    src: {
      type: String
    },
    // 编辑区域缩放比例
    zoom: {
      type: [String, Number],
      default: 4
    }
  },
  computed: {
    // 样式汇总
    style() {
      let {width, height, zoom, mask} = this
      let max = (width > height ? width : height) * zoom

      return {
        // 编辑区域
        editZone: {
          width: `${max}px`,
          height: `${max}px`,
          transform: `rotate(${mask.rotate}deg)`
        },

        // 遮罩区域
        mask: {
          width: `${width * mask.zoom}px`,
          height: `${height * mask.zoom}px`,
          top: `${mask.y}px`,
          left: `${mask.x}px`
        },
        // 遮罩区域 - 裁剪图片
        maskImg: {
          width: `${max}px`,
          height: `${max}px`,
          top: `${-mask.y}px`,
          left: `${-mask.x}px`,
          transform: `rotate(${mask.rotate}deg)`
        },


        // 裁剪结果 - 包含块
        result: {
          width: `${width}px`,
          height: `${height}px`
        },
        // 裁剪结果 - 图片
        resultImg: {
          width: `${max / mask.zoom}px`,
          height: `${max / mask.zoom}px`,
          top: `${-mask.y / mask.zoom}px`,
          left: `${-mask.x / mask.zoom}px`,
          transform: `rotate(${mask.rotate}deg)`
        }
      }
    }
  },

  methods: {
    // 效果 - 拖拽位置
    onMouseDown(event) {
      this.$utils.CreateDragEvent({
        el: this.$refs.mask,
        event,
        moveFn: ({x, y}) => {
          this.mask.y = y
          this.mask.x = x
        }
      })
    },
    getFileData() {
      return new Promise(resolve => {
        /*html2canvas(this.$refs.result,{

        }).then(canvas => {
          resolve(canvas.toDataURL('image/png'))
        })*/

        let cv = this.cv
        let source = this.$refs.image.$el.children[0]
        let {width, height, zoom} = this
        let t = {
          // 新原点
          ox: width / 2,
          oy: height / 2
        }
        // 绘图起点
        t.ax = 0 - t.ox
        t.ay = 0 - t.oy
        // 绘图终点
        t.zx = width - t.ox
        t.zy = height - t.oy

        let {x, y} = this.mask

        cv.save()
        cv.translate(t.ox, t.oy)
        cv.clearRect(t.ax, t.ay, t.zx, t.zy)
        // cv.rotate(90 * Math.PI / 180)
        console.log(x * zoom, y * zoom, width * zoom, height * zoom, t.ax, t.ay, width, height)
        cv.drawImage(source, x * zoom, y * zoom, width * zoom, height * zoom, t.ax, t.ay, width, height)

        cv.restore()

        // this.$utils.DownloadElement(this.$refs.mask)
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.bg-mask
  top 0
  left 0
  background-color rgba(0, 0, 0, .5)

.mask
  cursor move

.font-0
  font-size 0
</style>
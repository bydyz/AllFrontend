import { DevelopmentTool } from '@/lib'
import { mapGetters } from 'vuex'

export default {
  props: {
    // 模板元素列表 value  解析 --> 元素映射 elMaps --> $emit
    // 元素结构 {code,keyName,keyValue,extraOperation: hidden|...,customStyle:{x,y,width,height,fontSize,url}}
    value: {
      type: Array,
      default: () => []
    },

    // 模板类型
    modelType: {
      type: Number,
      default: 1
    },

    // 背景图片
    backgroundUrl: {
      type: String
    }
  },

  computed: {
    ...mapGetters({
      isDev: 'isDev'
    }),
    StepLog() {
      return () => null
      // return new DevelopmentTool('证书编辑').CreateStepLog(null)
    },
    watchElMaps() {
      this.StepLog('监听到 elMaps, zoom 更变', {
        zoom: this.info.zoom
      })
      return {
        val: this.elMaps,
        zoom: this.info.zoom
      }
    }
  },

  watch: {
    value: {
      deep: true,
      async handler(val) {
        if (!val?.length) return false
        this.StepLog('监听到 value', JSON.parse(JSON.stringify(val)), this.info)

        if (this.info.isEdit) {
          await this.initBackground()
        } else {
          let { customStyle } = val.find(a => a.code === 'backgroundUrl') || {}

          if (customStyle) {
            customStyle = JSON.parse(customStyle)
            this.backgroundWidth = customStyle.width
            this.backgroundHeight = customStyle.height
          }
        }

        // 解析: value --> elMaps
        await this.parseElementList(val)
      }
    },
    watchElMaps: {
      deep: true,
      async handler({ val, zoom }, prev) {
        if (!this.info.isEdit) return false

        clearTimeout(this.timer.emit)
        this.timer.emit = setTimeout(() => {
          if (!Object.keys(val)?.length) return false

          let zFn = a => a / zoom

          // $emit: elMaps --> value
          let parseValue = this.value.map(item => {
            let style = val[item.code].style
            if (item.code === 'backgroundUrl') {
              style = {
                ...style,
                width: this.backgroundWidth,
                height: this.backgroundHeight
              }
            } else {
              style = {
                ...style,
                x: zFn(style.x),
                y: zFn(style.y),
                width: zFn(style.width),
                height: zFn(style.height),
                fontSize: zFn(style.fontSize)
              }
            }
            let customStyle = JSON.stringify(style)

            return {
              ...item,
              customStyle
            }
          })

          this.StepLog('$emit发送 elMaps', {
            zoom,
            parseValue: JSON.parse(JSON.stringify(parseValue))
          })
          this.$emit('input', parseValue)
        }, 300)
      }
    }
  }
}

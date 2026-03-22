<template>
  <canvas ref="canvas" :width="width" :height="height"></canvas>
</template>

<script>
export default {
  name: "Captcha",
  mounted() {
    /*获取canvas的dom*/
    this.paint = this.$refs.canvas.getContext('2d');
    this.draw()
  },
  data() {
    return {
      paint: null,
    }
  },
  props: {
    width: {
      type: Number,
      default: 150
    },
    height: {
      type: Number,
      default: 60
    },
    //线条宽度
    lineWidth: {
      type: Number,
      default: .5
    },
    //线条数量
    lineNum: {
      type: Number,
      default: 2
    },
    //点的半径
    dotR: {
      type: Number,
      default: 1
    },
    //点的数量
    dotNum: {
      type: Number,
      default: 15
    },
    //前景色区间
    preGroundColor: {
      type: Array,
      default: () => [10, 80]
    },
    //背景色区间
    backGroundColor: {
      type: Array,
      default: () => [150, 255]
    },
    //字体大小
    fontSize: {
      type: Number,
      default: 20
    },
    //字体类型
    fontFamily: {
      type: Array,
      default: () => ['Georgia', '微软雅黑', 'Helvetica', 'Arial']
    },
    //字体绘制方法，有fill和stroke
    fontStyle: {
      type: String,
      default: 'fill'
    },
    //验证码内容
    code: {
      type: String,
      default: '1234'
    }
  },
  watch: {
    code() {
      this.draw()
    }
  },
  methods: {
    getRandom(...arr) {
      arr.sort((a, b) => a - b);
      return Math.floor(Math.random() * (arr[1] - arr[0]) + arr[0]);
    },
    getColor(arr) {
      return new Array(3).fill('').map(item => this.getRandom(...arr))
    },
    circle() {
      let {
        getRandom,
        paint,
      } = this
      for (let i = this.dotNum; i--;) {
        paint.beginPath();
        /*随机获取圆心,绘制圆*/
        paint.arc(getRandom(0, this.width), getRandom(0, this.height), this.dotR, 0, Math.PI * 2, false);
        paint.closePath();
        /*随机获取路径颜色*/
        paint.fillStyle = `rgba(${this.getColor(this.preGroundColor).join(',')},0.8)`;
        /*绘制*/
        paint.fill();
      }
    },
    line() {
      let {
        getRandom,
        paint,
        width,
        height
      } = this
      for (let i = this.lineNum; i--;) {
        paint.beginPath();
        paint.lineWidth = this.lineWidth;
        /*获取颜色路径*/
        let colors = this.getColor(this.preGroundColor);
        paint.strokeStyle = `rgba(${colors.join(',')},0.8)`
        /*随机获取线条的起始位置,绘制路径*/
        paint.moveTo(getRandom(0, width), getRandom(0, height));
        paint.lineTo(getRandom(0, width), getRandom(0, height));
        paint.closePath();
        paint.stroke();
      }
    },
    font() {
      let {
        getRandom,
        paint,
        width,
        height,
        fontFamily,
        fontStyle,
        code
      } = this
      /*指定文字风格*/
      paint.font = this.fontSize + 'px ' + fontFamily[getRandom(0, fontFamily.length)];
      paint.textBaseline = 'middle';
      /*指定文字绘制风格*/
      let _fontStyle = fontStyle + 'Text';
      let colorStyle = fontStyle + 'Style';
      let length = code.length
      for (let i = 0; i < length; i++) {
        let fontWidth = paint.measureText(code[i]).width;
        let x = getRandom(width / length * i + 0.2 * fontWidth, (width / length) * i + 0.5 * fontWidth) + width / 20;
        /*随机获取字体的旋转角度*/
        let deg = getRandom(-6, 6);
        /*随机获取文字颜色*/
        paint[colorStyle] = `rgba(${this.getColor(this.preGroundColor).join(',')},0.8)`
        /*开始绘制*/
        paint.save();
        paint.rotate(deg * Math.PI / 180);
        paint[_fontStyle](code[i], x, height / 2);
        paint.restore();
      }
    },
    draw() {
      /*随机画布颜色，使用背景色*/
      this.paint.fillStyle = `rgba(${this.getColor(this.backGroundColor).join(',')},0.8)`
      /*绘制画布*/
      this.paint.fillRect(0, 0, this.width, this.height);
      /*绘图*/
      this.circle();
      this.line();
      this.font();
    }
  },
}
</script>
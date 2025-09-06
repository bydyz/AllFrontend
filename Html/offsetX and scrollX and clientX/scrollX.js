// 滚动条位置变化
    window.onscroll = function () {
      // 有 DOCTYPE 标签
      // console.log( document.documentElement.scrollTop )

      // // 没有 DOCTYPE 标签
      // console.log( document.body.scrollTop )

      // 兼容
      var height = document.documentElement.scrollTop || document.body.scrollTop
      console.log( 'height', height )

      var width = document.documentElement.scrollLeft || document.body.scrollLeft
      console.log( 'width', width )
    }


// document.documentElement.scrollTop || document.body.scrollTop
//         含有scrollTop，它是将 竖直方向被卷的尺寸 赋值给height，此时 竖直方向被卷的尺寸 
//         发生改变，就会不断的执行函数并在控制台输出height，如果 水平方向被卷的尺寸
//         发生改变，也会不断的执行函数，在控制台不断输出同样的height









//     window.onscroll = function () {
//       // 有 DOCTYPE 标签
//       // console.log( document.documentElement.scrollLeft )

//       // // 没有 DOCTYPE 标签
//       // console.log( document.body.scrollLeft )

//       // 兼容
//       var width = document.documentElement.scrollLeft || document.body.scrollLeft
//       console.log( 'width', width )
//     }



// // document.documentElement.scrollLeft || document.body.scrollLeft
//         // 含有scrollLeft，它是将 水平方向被卷的尺寸 赋值给width，此时 水平方向被卷的尺寸 
//         // 发生改变，就会不断的执行函数并在控制台输出width，如果 竖直方向被卷的尺寸
//         // 发生改变，也会不断的执行函数并在控制台不断输出同样的width
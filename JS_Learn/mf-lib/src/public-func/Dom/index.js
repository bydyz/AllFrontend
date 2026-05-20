// 事件委托 - 获取目标元素
export const GetEventElement = (element, targetClassName, endClassName) => {
  while (!new RegExp(targetClassName).test(element.className)) {
    if (new RegExp(endClassName).test(element.className)) return false
    element = element.offsetParent
  }
  return element
}

// 创建拖拽事件
export const CreateDragEvent = (options = {}) => {
  let {zoom = 1, el, event, moveFn, upFn} = options
  if (!el) return console.error('请传递拖拽目标 el')
  if (!event) return console.error('请传递keydown时间对象 event')
  let sx = event.clientX / zoom - el.offsetLeft
  let sy = event.clientY / zoom - el.offsetTop
  let maxX = el.offsetParent.clientWidth - el.offsetWidth
  let maxY = el.offsetParent.clientHeight - el.offsetHeight

  let $moveFn = ev => {
    let x = ev.clientX / zoom - sx
    let y = ev.clientY / zoom - sy

    // 边界限制
    x = x < 0 ? 0 : (x > maxX ? maxX : x)
    y = y < 0 ? 0 : (y > maxY ? maxY : y)

    if (moveFn) return moveFn({
      x,
      y,
      event: ev
    })
    el.style.top = `${y}px`
    el.style.left = `${x}px`
  }

  let $upFn = ev => {
    upFn && upFn({
      event: ev
    })
    document.removeEventListener('mousemove', $moveFn)
    document.removeEventListener('mouseup', $upFn)
  }
  document.addEventListener('mousemove', $moveFn)
  document.addEventListener('mouseup', $upFn)
}

/**
 * 将 dom 元素全屏
 * @param {dom} element dom元素
 * @example
 * setFullscreen(document.documentElement) // 整个页面进入全屏
 * setFullscreen(document.getElementById("id")) // 某个元素进入全屏
 */
export const SetFullScreen = (dom) => {
  if (dom.requestFullscreen) return dom.requestFullscreen()
  if (dom.webkitRequestFullscreen) return dom.webkitRequestFullscreen()
  if (dom.mozRequestFullScreen) return dom.mozRequestFullScreen()
  if (dom.msRequestFullscreen) return dom.msRequestFullscreen()
}

/**
 * 退出全屏
 * @example
 * exitFullscreen();
 */
export const ExitFullScreen = () => {
  if (document.exitFullscreen) return document.exitFullscreen()
  if (document.webkitExitFullscreen) return document.webkitExitFullscreen()
  if (document.mozCancelFullScreen) return document.mozCancelFullScreen()
  if (document.msExitFullscreen) return document.msExitFullscreen()
}

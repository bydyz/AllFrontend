import {$xss} from './xss'

export default {
  install(Vue) {
    Vue.prototype.$xss = $xss
  }
}
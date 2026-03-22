/*
* @this.iframeMessageHandles 接收到iframe信息后的处理列表
* this.iframeMessageHandles = { [type]: function }
* */

export default {
  created() {
    let domain = (location.host.match(/\w+\.\w+$/) || [])[0]
    if(domain) document.domain = domain
    this.onWatchIframeMessage()
  },
  beforeDestroy() {
    this.onDestroyIframeMessage && this.onDestroyIframeMessage()
  },
  methods: {
    // 操作 - 接收数据
    onWatchIframeMessage() {
      let types = this.iframeMessageHandles || {}
      let fn = ({ data }) => {
        types[data.type] && types[data.type](data.data)
      }
      window.addEventListener('message', fn)

      this.onDestroyIframeMessage = () => {
        window.removeEventListener('message', fn)
      }
    },

    // 操作 - 发送数据 [给子级]
    onSendIframeMessageToChild({ iframe, type, data }) {
      iframe = iframe || this.$refs.iframe
      iframe.contentWindow.postMessage({
        type,
        data
      }, '*')
    },

    // 操作 - 发送数据 [给父级]
    onSendIframeMessageToParent({ type, data }) {
      window.parent.postMessage({
        type,
        data
      }, '*')
    }
  }
}

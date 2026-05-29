import { h } from 'vue'
// 继续 PnpmWorkspaces2 进行调整
import Badge from './Badge.vue'

export const MyButton = {
  props: {
    type: {
      type: String,
      default: 'primary'
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    return () => h('button', {
      class: `btn btn-${props.type}`,
      onClick: () => emit('click')
    }, 'MyButton')
  }
}

// 继续 PnpmWorkspaces2 进行调整
export { Badge }
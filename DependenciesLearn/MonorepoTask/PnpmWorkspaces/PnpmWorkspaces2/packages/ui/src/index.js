import { h } from 'vue'

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
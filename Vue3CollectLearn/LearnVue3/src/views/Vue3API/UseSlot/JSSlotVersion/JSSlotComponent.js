import { createElementVNode } from "vue";

export default {
  setup(_, { slots }) {
    return () => {
      const defaultVnodes = slots.default()
      const slot1Vnodes = slots.slot1()
      const slot2Vnodes = slots.slot2({
        msg: 'Hello World'
      })

      const div = createElementVNode('div', null, [
        ...defaultVnodes,
        ...slot1Vnodes,
        ...slot2Vnodes
      ])

      return div
    }
  }
}
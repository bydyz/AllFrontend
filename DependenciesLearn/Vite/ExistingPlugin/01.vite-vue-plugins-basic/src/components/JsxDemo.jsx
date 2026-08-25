// ========================================
// JSX/TSX 组件示例
// ========================================
// 使用 JSX 语法编写 Vue 组件
// 需要 @vitejs/plugin-vue-jsx 插件支持

import { defineComponent, ref } from 'vue'

// defineComponent 提供更好的 TypeScript 类型推断
export default defineComponent({
  name: 'JsxDemo',

  props: {
    count: {
      type: Number,
      default: 0
    }
  },

  setup(props) {
    const localCount = ref(0)
    const increment = () => localCount.value++

    // JSX 返回值
    return () => (
      <div class="jsx-demo">
        <h2>JSX 组件示例</h2>
        <p>父组件传入的 count: {props.count}</p>
        <p>本地 count: {localCount.value}</p>
        <button onClick={increment}>点击 +1</button>

        {/* 条件渲染 */}
        {localCount.value > 5 && <p style="color: green;">count 大于 5!</p>}

        {/* 列表渲染 */}
        <ul>
          {[1, 2, 3].map(num => (
            <li key={num}>数字: {num}</li>
          ))}
        </ul>
      </div>
    )
  }
})
</script>

<style scoped>
.jsx-demo {
  padding: 20px;
  border: 2px dashed #42b883;
  border-radius: 8px;
  margin: 10px 0;
}

button {
  padding: 8px 16px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #369970;
}
</style>

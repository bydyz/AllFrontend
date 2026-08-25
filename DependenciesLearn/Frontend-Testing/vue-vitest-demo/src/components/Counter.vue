<template>
  <div class="counter">
    <h2>计数器组件</h2>
    <p class="count">当前计数: {{ count }}</p>
    <p class="status">状态: {{ isEven ? '偶数' : '奇数' }} | {{ isPositive ? '正数' : '非正数' }}</p>
    <div class="buttons">
      <button @click="decrement" class="btn decrement">-</button>
      <button @click="reset" class="btn reset">重置</button>
      <button @click="increment" class="btn increment">+</button>
    </div>
  </div>
</template>

<script setup>
/**
 * Counter 组件
 * 演示组件测试：事件触发、状态更新、计算属性
 */
import { useCounter } from '../composables/useCounter'

const props = defineProps({
  // 初始值
  initialValue: {
    type: Number,
    default: 0
  },
  // 步长
  step: {
    type: Number,
    default: 1
  }
})

const emit = defineEmits(['update'])

// 使用计数器组合式函数
const { count, isEven, isPositive, increment, decrement, reset } = useCounter(
  props.initialValue,
  props.step
)

// 监听计数变化并触发事件
const emitUpdate = () => {
  emit('update', count.value)
}

// 包装原始方法以触发emit
const wrappedIncrement = () => {
  increment()
  emitUpdate()
}

const wrappedDecrement = () => {
  decrement()
  emitUpdate()
}

const wrappedReset = () => {
  reset()
  emitUpdate()
}

// 替换方法引用
Object.assign({ increment: wrappedIncrement, decrement: wrappedDecrement, reset: wrappedReset })
</script>

<style scoped>
.counter {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  max-width: 300px;
}

.count {
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0;
}

.status {
  color: #666;
  margin: 10px 0;
}

.buttons {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
}

.btn:hover {
  background: #f5f5f5;
}

.btn.increment {
  background: #4caf50;
  color: white;
  border-color: #4caf50;
}

.btn.decrement {
  background: #f44336;
  color: white;
  border-color: #f44336;
}

.btn.reset {
  background: #2196f3;
  color: white;
  border-color: #2196f3;
}
</style>

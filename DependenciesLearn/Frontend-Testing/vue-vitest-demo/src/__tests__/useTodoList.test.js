/**
 * useTodoList 组合式函数测试
 * 演示 Vitest 复杂组合式函数测试：状态管理、CRUD操作
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { useTodoList } from '../composables/useTodoList'

describe('useTodoList 组合式函数', () => {
  let todoList

  // 每个测试前初始化新的待办事项列表
  beforeEach(() => {
    todoList = useTodoList()
  })

  describe('初始状态', () => {
    it('应该返回空的待办事项列表', () => {
      expect(todoList.todos.value).toEqual([])
    })

    it('应该返回正确的统计数据', () => {
      expect(todoList.pendingTodos.value).toEqual([])
      expect(todoList.completedTodos.value).toEqual([])
      expect(todoList.totalCount.value).toBe(0)
      expect(todoList.completionRate.value).toBe(0)
    })
  })

  describe('addTodo 方法', () => {
    it('应该添加新的待办事项', () => {
      const todo = todoList.addTodo('学习Vue')
      expect(todo.title).toBe('学习Vue')
      expect(todo.completed).toBe(false)
      expect(todo.id).toBeDefined()
    })

    it('应该将待办事项添加到列表中', () => {
      todoList.addTodo('任务1')
      todoList.addTodo('任务2')
      expect(todoList.todos.value.length).toBe(2)
    })

    it('应该返回新创建的待办事项', () => {
      const todo = todoList.addTodo('测试任务')
      expect(todoList.todos.value).toContainEqual(todo)
    })

    it('应该正确更新统计数据', () => {
      todoList.addTodo('任务1')
      expect(todoList.totalCount.value).toBe(1)
      expect(todoList.pendingTodos.value.length).toBe(1)
    })
  })

  describe('removeTodo 方法', () => {
    it('应该删除指定的待办事项', () => {
      const todo = todoList.addTodo('要删除的任务')
      const result = todoList.removeTodo(todo.id)
      expect(result).toBe(true)
      expect(todoList.todos.value.length).toBe(0)
    })

    it('当ID不存在时应该返回false', () => {
      const result = todoList.removeTodo(999)
      expect(result).toBe(false)
    })

    it('应该正确更新统计数据', () => {
      const todo = todoList.addTodo('任务')
      todoList.removeTodo(todo.id)
      expect(todoList.totalCount.value).toBe(0)
    })
  })

  describe('toggleTodo 方法', () => {
    it('应该切换待办事项的完成状态', () => {
      const todo = todoList.addTodo('要完成的任务')
      const updatedTodo = todoList.toggleTodo(todo.id)
      expect(updatedTodo.completed).toBe(true)
    })

    it('应该可以取消完成', () => {
      const todo = todoList.addTodo('任务')
      todoList.toggleTodo(todo.id)
      todoList.toggleTodo(todo.id)
      expect(todo.completed).toBe(false)
    })

    it('当ID不存在时应该返回null', () => {
      const result = todoList.toggleTodo(999)
      expect(result).toBeNull()
    })

    it('应该正确更新已完成列表', () => {
      const todo = todoList.addTodo('任务')
      todoList.toggleTodo(todo.id)
      expect(todoList.completedTodos.value.length).toBe(1)
      expect(todoList.pendingTodos.value.length).toBe(0)
    })
  })

  describe('clearCompleted 方法', () => {
    it('应该清除所有已完成的待办事项', () => {
      todoList.addTodo('任务1')
      const todo2 = todoList.addTodo('任务2')
      const todo3 = todoList.addTodo('任务3')
      
      todoList.toggleTodo(todo2.id)
      todoList.toggleTodo(todo3.id)
      
      const count = todoList.clearCompleted()
      expect(count).toBe(2)
      expect(todoList.todos.value.length).toBe(1)
    })

    it('当没有已完成的事项时应该返回0', () => {
      todoList.addTodo('未完成的任务')
      const count = todoList.clearCompleted()
      expect(count).toBe(0)
    })
  })

  describe('getTodoById 方法', () => {
    it('应该根据ID返回正确的待办事项', () => {
      const todo = todoList.addTodo('查找我')
      const found = todoList.getTodoById(todo.id)
      expect(found).toStrictEqual(todo)
    })

    it('当ID不存在时应该返回null', () => {
      const found = todoList.getTodoById(999)
      expect(found).toBeNull()
    })
  })

  describe('计算属性', () => {
    it('completionRate 应该正确计算完成率', () => {
      todoList.addTodo('任务1')
      const todo2 = todoList.addTodo('任务2')
      todoList.addTodo('任务3')
      
      todoList.toggleTodo(todo2.id)
      
      expect(todoList.completionRate.value).toBeCloseTo(33.33, 1)
    })

    it('当没有待办事项时完成率应该为0', () => {
      expect(todoList.completionRate.value).toBe(0)
    })

    it('当全部完成时完成率应该为100', () => {
      const todo1 = todoList.addTodo('任务1')
      const todo2 = todoList.addTodo('任务2')
      
      todoList.toggleTodo(todo1.id)
      todoList.toggleTodo(todo2.id)
      
      expect(todoList.completionRate.value).toBe(100)
    })
  })
})

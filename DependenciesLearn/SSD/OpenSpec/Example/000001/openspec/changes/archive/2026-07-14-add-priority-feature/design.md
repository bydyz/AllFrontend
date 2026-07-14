# 技术设计：添加优先级标记功能

## 设计日期
2026-07-14

## 技术方案

### 1. 数据结构设计

#### 当前数据结构
```javascript
// localStorage 中的待办事项数据
{
  id: Number,        // 唯一标识
  text: String,      // 待办事项内容
  completed: Boolean // 是否完成
}
```

#### 新数据结构
```javascript
{
  id: Number,        // 唯一标识
  text: String,      // 待办事项内容
  completed: Boolean, // 是否完成
  priority: String   // 优先级：'high', 'medium', 'low'
}
```

#### 数据迁移策略
- 现有数据没有 `priority` 字段
- 读取时检查：如果 `priority` 不存在，默认设置为 `'medium'`
- 保存时确保所有数据都有 `priority` 字段

### 2. UI组件设计

#### 2.1 优先级选择器
**位置**：在输入框右侧，添加按钮左侧
**形式**：下拉选择框（select）
**选项**：
- 高优先级：🔴 高
- 中优先级：🟡 中（默认）
- 低优先级：🟢 低

**HTML结构**：
```html
<select id="priority-select" class="priority-select">
  <option value="high">🔴 高</option>
  <option value="medium" selected>🟡 中</option>
  <option value="low">🟢 低</option>
</select>
```

#### 2.2 优先级标识
**位置**：待办事项文本前
**形式**：图标 + 颜色背景
**样式**：
- 高优先级：红色背景圆点
- 中优先级：黄色背景圆点
- 低优先级：绿色背景圆点

**HTML结构**：
```html
<li class="todo-item priority-high">
  <input type="checkbox">
  <span class="priority-dot"></span>
  <span class="todo-text">待办事项内容</span>
  <button class="delete-btn">×</button>
</li>
```

#### 2.3 优先级筛选
**位置**：筛选区域下方
**形式**：按钮组
**选项**：全部、高、中、低

**HTML结构**：
```html
<div class="priority-filter">
  <button class="priority-btn active" data-priority="all">全部</button>
  <button class="priority-btn" data-priority="high">🔴 高</button>
  <button class="priority-btn" data-priority="medium">🟡 中</button>
  <button class="priority-btn" data-priority="low">🟢 低</button>
</div>
```

### 3. 样式设计

#### 3.1 优先级选择器样式
```css
.priority-select {
  padding: 8px 12px;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
}

body.dark-mode .priority-select {
  background: #3d3d3d;
  border-color: #555;
  color: #fff;
}
```

#### 3.2 优先级标识样式
```css
.priority-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 10px;
  display: inline-block;
}

.priority-high .priority-dot {
  background-color: #e74c3c;
}

.priority-medium .priority-dot {
  background-color: #f39c12;
}

.priority-low .priority-dot {
  background-color: #27ae60;
}
```

#### 3.3 优先级筛选按钮样式
```css
.priority-btn {
  padding: 6px 12px;
  border: 2px solid #ddd;
  background: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
}

.priority-btn.active {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

body.dark-mode .priority-btn {
  background: #3d3d3d;
  border-color: #555;
  color: #fff;
}
```

### 4. 功能逻辑设计

#### 4.1 添加待办事项
```javascript
addTodo() {
  const text = this.input.value.trim();
  const priority = this.prioritySelect.value; // 获取优先级
  
  if (!text) return;

  const todo = {
    id: Date.now(),
    text,
    completed: false,
    priority // 添加优先级字段
  };

  this.todos.push(todo);
  this.saveTodos();
  this.render();
  this.input.value = '';
}
```

#### 4.2 渲染待办事项
```javascript
render() {
  const filteredTodos = this.getFilteredTodos();
  
  this.list.innerHTML = filteredTodos.map(todo => `
    <li class="todo-item ${todo.completed ? 'completed' : ''} priority-${todo.priority}">
      <input type="checkbox" ${todo.completed ? 'checked' : ''} 
             onchange="app.toggleTodo(${todo.id})">
      <span class="priority-dot"></span>
      <span class="todo-text">${todo.text}</span>
      <button class="delete-btn" onclick="app.deleteTodo(${todo.id})">×</button>
    </li>
  `).join('');

  const pendingCount = this.todos.filter(t => !t.completed).length;
  this.pendingCount.textContent = pendingCount;
}
```

#### 4.3 筛选逻辑
```javascript
getFilteredTodos() {
  let filtered = this.todos;
  
  // 按完成状态筛选
  if (this.currentFilter === 'pending') {
    filtered = filtered.filter(t => !t.completed);
  } else if (this.currentFilter === 'completed') {
    filtered = filtered.filter(t => t.completed);
  }
  
  // 按优先级筛选
  if (this.currentPriority !== 'all') {
    filtered = filtered.filter(t => t.priority === this.currentPriority);
  }
  
  return filtered;
}
```

### 5. 兼容性处理

#### 5.1 数据兼容
```javascript
// 在加载数据时检查并设置默认优先级
loadTodos() {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  return todos.map(todo => ({
    ...todo,
    priority: todo.priority || 'medium' // 默认优先级
  }));
}
```

#### 5.2 浏览器兼容
- 使用现代CSS特性，兼容所有现代浏览器
- 使用ES6语法，确保浏览器兼容性

### 6. 性能考虑

#### 6.1 渲染性能
- 待办事项数量通常较少（<100），性能影响可忽略
- 使用innerHTML批量渲染，避免频繁DOM操作

#### 6.2 存储性能
- 优先级字段增加数据大小，但影响微乎其微
- localStorage读写性能良好

## 设计决策记录

### 决策1：使用图标+颜色方案
**原因**：最直观，易于识别，用户体验最好
**替代方案**：纯颜色方案（不够直观）、数字标签（不够友好）

### 决策2：默认优先级为"中"
**原因**：最安全的选择，不会给用户带来困扰
**替代方案**：随机分配（用户体验差）、无默认值（需要强制选择）

### 决策3：优先级筛选独立于状态筛选
**原因**：两个维度的筛选可以组合使用，功能更强大
**替代方案**：合并筛选（功能受限）

## 技术约束

1. **数据格式**：必须与现有数据格式兼容
2. **UI设计**：必须保持现有设计风格
3. **性能**：不能明显影响应用性能
4. **兼容性**：必须支持暗黑模式

## 验证标准

### 功能验证
- [ ] 可以添加带优先级的待办事项
- [ ] 不同优先级显示不同颜色和图标
- [ ] 可以按优先级筛选事项
- [ ] 现有数据自动获得默认优先级
- [ ] 暗黑模式下样式正常

### 技术验证
- [ ] 代码结构清晰，无重复代码
- [ ] 数据迁移正确，无数据丢失
- [ ] 性能测试通过
- [ ] 跨浏览器测试通过
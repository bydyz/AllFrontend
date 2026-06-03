# Flexbox CSS 属性详解

## 基础属性

### display: flex
- **说明**：将元素转换为 flex 容器
- **取值**：`flex` 或 `inline-flex`
- **影响**：子元素变为 flex 项目，遵循 flexbox 布局模型

## 方向与换行

### flex-direction
- **说明**：设置主轴的方向
- **取值**：
  - `row`（默认）：水平方向，从左到右
  - `row-reverse`：水平方向，从右到左
  - `column`：垂直方向，从上到下
  - `column-reverse`：垂直方向，从下到上

### flex-wrap
- **说明**：控制 flex 项目是否换行
- **取值**：
  - `nowrap`（默认）：不换行
  - `wrap`：允许换行
  - `wrap-reverse`：反向换行

### flex-flow
- **说明**：flex-direction 和 flex-wrap 的简写
- **语法**：`flex-flow: <direction> <wrap>`
- **默认值**：`row nowrap`

## 对齐方式

### justify-content
- **说明**：控制主轴上项目的对齐方式
- **取值**：
  - `flex-start`：起点对齐
  - `flex-end`：终点对齐
  - `center`：居中对齐
  - `space-between`：两端对齐，项目间距均匀
  - `space-around`：每个项目两侧间距相等
  - `space-evenly`：项目之间间距相等

### align-items
- **说明**：控制交叉轴上项目的对齐方式
- **取值**：
  - `stretch`（默认）：拉伸填充容器
  - `flex-start`：起点对齐
  - `flex-end`：终点对齐
  - `center`：居中对齐
  - `baseline`：基线对齐

### align-content
- **说明**：控制多行 flex 容器在交叉轴上的对齐方式
- **注意**：只在有多行项目时生效
- **取值**：与 align-items 相同

### align-self
- **说明**：单独控制单个项目的对齐方式
- **覆盖**：align-items 的设置
- **取值**：与 align-items 相同

## 项目大小

### flex-grow
- **说明**：定义项目放大的比例
- **取值**：数字（默认 0）
- **计算**：`项目放大比例 = flex-grow / (所有项目 flex-grow 之和)`

### flex-shrink
- **说明**：定义项目缩小的比例
- **取值**：数字（默认 1）
- **计算**：`项目缩小比例 = flex-shrink / (所有项目 flex-shrink 之和)`

### flex-basis
- **说明**：定义项目在分配空间前的基础大小
- **取值**：宽度、高度、百分比
- **默认值**：`auto`（根据内容自动计算）

### flex
- **说明**：flex-grow、flex-shrink、flex-basis 的简写
- **语法**：`flex: <grow> <shrink> <basis>`
- **常用简写**：
  - `flex: 1`：等价于 `flex: 1 1 0%`（等分剩余空间）
  - `flex: none`：等价于 `flex: 0 0 auto`（不放大不缩小）
  - `flex: auto`：等价于 `flex: 1 1 auto`

## 项目顺序

### order
- **说明**：改变 flex 项目的显示顺序
- **取值**：数字（默认 0）
- **数值越小，项目越靠前**
- **负值**：允许

## 容器属性总结

| 属性 | 作用 |
|------|------|
| display | 创建 flex 容器 |
| flex-direction | 主轴方向 |
| flex-wrap | 是否换行 |
| flex-flow | 方向和换行的简写 |
| justify-content | 主轴对齐 |
| align-items | 交叉轴对齐 |
| align-content | 多行交叉轴对齐 |
| align-self | 单个项目交叉轴对齐 |
| flex-grow | 放大比例 |
| flex-shrink | 缩小比例 |
| flex-basis | 基础大小 |
| flex | 三个属性简写 |
| order | 项目顺序 |
# Grid CSS 属性详解

## 基础属性

### display: grid
- **说明**：将元素转换为 grid 容器
- **取值**：`grid` 或 `inline-grid`
- **影响**：子元素变为 grid 项目，遵循网格布局模型

## 列与行定义

### grid-template-columns
- **说明**：定义网格的列数和每列宽度
- **取值**：
  - 固定值：`100px 200px 100px`
  - 比例：`1fr 2fr 1fr`（fr 单位按比例分配剩余空间）
  - 百分比：`25% 50% 25%`
  - `repeat()` 函数：`repeat(3, 1fr)`（重复 3 次 1fr）
  - `minmax()` 函数：`minmax(100px, 1fr)`（最小 100px，最大 1fr）
  - `auto`：自动计算
  - `auto-fill` / `auto-fit`：自动填充或自适应

### grid-template-rows
- **说明**：定义网格的行数和每行高度
- **取值**：与 grid-template-columns 相同

### grid-template-areas
- **说明**：通过命名区域定义网格布局
- **语法**：使用字符串命名区域，相同名称合并
- **示例**：
  ```css
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
  ```
- **注意**：使用 `.` 表示空单元格

### grid-template
- **说明**：grid-template-columns、grid-template-rows、grid-template-areas 的简写
- **语法**：`grid-template: <rows> / <columns>`

## 间距控制

### column-gap / grid-column-gap
- **说明**：设置列与列之间的间距
- **取值**：长度值（如 `10px`、`1em`）
- **推荐**：使用 `column-gap`（新标准）

### row-gap / grid-row-gap
- **说明**：设置行与行之间的间距
- **取值**：长度值
- **推荐**：使用 `row-gap`（新标准）

### gap / grid-gap
- **说明**：row-gap 和 column-gap 的简写
- **语法**：`gap: <row-gap> <column-gap>`
- **示例**：`gap: 10px 20px`（行间距 10px，列间距 20px）

## 自动布局

### grid-auto-columns
- **说明**：定义自动生成的列的宽度
- **使用场景**：项目超出显式定义的网格范围时
- **取值**：与 grid-template-columns 相同

### grid-auto-rows
- **说明**：定义自动生成的行的高度
- **使用场景**：项目超出显式定义的网格范围时
- **取值**：与 grid-template-rows 相同

### grid-auto-flow
- **说明**：控制自动布局的方向
- **取值**：
  - `row`（默认）：按行填充
  - `column`：按列填充
  - `dense`：密集填充（尝试填补前面的空位）
  - `row dense` / `column dense`：组合使用

### grid
- **说明**：所有 grid 容器属性的简写
- **语法**：`grid: <grid-template> <grid-auto-flow> <grid-auto-rows> / <grid-auto-columns>`

## 项目位置控制

### grid-column-start
- **说明**：定义项目起始的列线
- **取值**：数字、命名线、`span <数字>`（跨越多少格）

### grid-column-end
- **说明**：定义项目结束的列线
- **取值**：与 grid-column-start 相同

### grid-row-start
- **说明**：定义项目起始的行线
- **取值**：与 grid-column-start 相同

### grid-row-end
- **说明**：定义项目结束的行线
- **取值**：与 grid-column-start 相同

### grid-column
- **说明**：grid-column-start 和 grid-column-end 的简写
- **语法**：`grid-column: <start> / <end>`
- **示例**：`grid-column: 1 / 3`（从第 1 条列线到第 3 条列线）
- **简写**：`grid-column: span 2`（跨越 2 列）

### grid-row
- **说明**：grid-row-start 和 grid-row-end 的简写
- **语法**：与 grid-column 相同

### grid-area
- **说明**：定义项目所在的网格区域
- **语法**：
  - 命名引用：`grid-area: header`（配合 grid-template-areas 使用）
  - 线号指定：`grid-area: <row-start> / <column-start> / <row-end> / <column-end>`

## 项目对齐

### justify-items
- **说明**：控制所有项目在单元格内的水平对齐
- **取值**：
  - `stretch`（默认）：拉伸填充
  - `start`：左对齐
  - `end`：右对齐
  - `center`：居中对齐

### align-items
- **说明**：控制所有项目在单元格内的垂直对齐
- **取值**：
  - `stretch`（默认）：拉伸填充
  - `start`：顶部对齐
  - `end`：底部对齐
  - `center`：居中对齐
  - `baseline`：基线对齐

### place-items
- **说明**：align-items 和 justify-items 的简写
- **语法**：`place-items: <align> <justify>`

### justify-self
- **说明**：单个项目在单元格内的水平对齐
- **覆盖**：justify-items 的设置
- **取值**：与 justify-items 相同

### align-self
- **说明**：单个项目在单元格内的垂直对齐
- **覆盖**：align-items 的设置
- **取值**：与 align-items 相同

### place-self
- **说明**：align-self 和 justify-self 的简写
- **语法**：`place-self: <align> <justify>`

## 整体对齐

### justify-content
- **说明**：控制整个网格在容器内的水平对齐
- **使用场景**：网格总宽度小于容器宽度时
- **取值**：
  - `start`、`end`、`center`
  - `space-between`、`space-around`、`space-evenly`

### align-content
- **说明**：控制整个网格在容器内的垂直对齐
- **使用场景**：网格总高度小于容器高度时
- **取值**：与 justify-content 相同

### place-content
- **说明**：align-content 和 justify-content 的简写
- **语法**：`place-content: <align> <justify>`

## 容器属性总结

| 属性 | 作用 |
|------|------|
| display | 创建 grid 容器 |
| grid-template-columns | 定义列 |
| grid-template-rows | 定义行 |
| grid-template-areas | 命名区域布局 |
| grid-template | 模板简写 |
| column-gap / row-gap | 列间距 / 行间距 |
| gap | 间距简写 |
| grid-auto-columns | 自动列宽 |
| grid-auto-rows | 自动行高 |
| grid-auto-flow | 自动布局方向 |
| grid | 所有容器属性简写 |
| justify-items | 单元格水平对齐 |
| align-items | 单元格垂直对齐 |
| place-items | 单元格对齐简写 |
| justify-content | 网格水平对齐 |
| align-content | 网格垂直对齐 |
| place-content | 网格对齐简写 |

## 项目属性总结

| 属性 | 作用 |
|------|------|
| grid-column-start | 起始列线 |
| grid-column-end | 结束列线 |
| grid-row-start | 起始行线 |
| grid-row-end | 结束行线 |
| grid-column | 列位置简写 |
| grid-row | 行位置简写 |
| grid-area | 区域位置 |
| justify-self | 单个项目水平对齐 |
| align-self | 单个项目垂直对齐 |
| place-self | 单个项目对齐简写 |

## 常用单位与函数

| 单位/函数 | 说明 |
|-----------|------|
| fr | 按比例分配剩余空间 |
| min-content | 最小内容尺寸 |
| max-content | 最大内容尺寸 |
| auto | 自动计算 |
| repeat() | 重复定义 |
| minmax() | 最小最大值范围 |
| fit-content() | 适应内容 |
| auto-fill | 自动填充（可能产生空列） |
| auto-fit | 自适应（拉伸填满容器） |
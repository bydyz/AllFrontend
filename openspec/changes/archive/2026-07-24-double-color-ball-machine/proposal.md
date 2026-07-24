## Why

NativeDevelopLearn 项目目前涵盖了拖拽、滚动、虚拟滚动、主题切换等前端技术演示，但缺少**交互动画**和**音频合成**方面的实践。双色球摇号机是一个很好的载体，可以同时练习 DOM 拖拽交互、CSS 关键帧动画、Web Audio API 音效合成等多个前端技术点。

## What Changes

- 新增 `src/6DoubleColorBall/index.vue` 模块，实现双色球摇号机页面
- 左右布局：左侧为摇杆操作区，右侧为号码展示区
- 旋转式摇杆交互：杆子绕根部固定点旋转，鼠标拖拽控制旋转角度，松手后弹性回弹
- 10 组双色球号码生成：红球 6 个（1-33 不重复）+ 蓝球 1 个（1-16）
- 球从下往上浮入动画：每组号码的 7 个球依次从底部升起并弹跳落定
- 动画重置：再次摇号时通过 `:key` 强制 DOM 重渲染，动画从头播放
- Web Audio API 纯代码合成音效：摇杆咔嗒声、弹簧回弹声、球弹跳声、完成提示音
- 在 App.vue 的 `componentsConfig` 中注册新模块，接入 tab 导航

## Capabilities

### New Capabilities

- `lever-interaction`: 旋转式摇杆的拖拽交互逻辑，包括鼠标事件处理、角度限制、弹性回弹、阈值判定，杆子绕根部旋转
- `lottery-number-generation`: 双色球号码生成算法，红球去重排序 + 蓝球随机，支持 10 组批量生成
- `ball-animation`: 球从底部浮入弹跳动画，基于 CSS @keyframes + :key 动画重置
- `sound-synthesis`: Web Audio API 音效合成引擎，用 OscillatorNode 生成 4 种短促音效

### Modified Capabilities

（无，本变更为全新模块，不影响现有功能）

## Impact

- **新增文件**: `src/6DoubleColorBall/index.vue`
- **修改文件**: `src/App.vue`（在 `componentsConfig` 数组中添加新模块入口）
- **依赖**: 无新增外部依赖，使用浏览器原生 Web Audio API
- **项目影响**: 首次在项目中引入 `@keyframes` 动画和 Web Audio API，为后续动画类演示提供参考模式

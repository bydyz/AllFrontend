## ADDED Requirements

### Requirement: Web Audio API 音效引擎
系统 SHALL 使用 Web Audio API 的 OscillatorNode 和 GainNode 合成所有音效，不依赖任何外部音频文件。

#### Scenario: AudioContext 初始化
- **WHEN** 页面加载完成
- **THEN** 创建 AudioContext 实例（兼容 webkitAudioContext），初始状态为 suspended

#### Scenario: AudioContext 恢复播放
- **WHEN** 用户首次与页面交互（mousedown/touchstart）
- **THEN** 调用 `audioCtx.resume()` 确保音频上下文处于 running 状态

### Requirement: 摇杆咔嗒音效
系统 SHALL 在用户按下摇杆球头时播放一个短促的机械咔嗒声。

#### Scenario: 按下摇杆触发咔嗒声
- **WHEN** 用户按下摇杆球头（mousedown/touchstart）
- **THEN** 播放一个 50ms 的方波音效，频率从 200Hz 快速下降到 100Hz，音量快速衰减

### Requirement: 摇杆回弹弹簧音效
系统 SHALL 在摇杆松手回弹时播放一个弹簧音效。

#### Scenario: 松手回弹触发弹簧声
- **WHEN** 用户松开鼠标使摇杆回弹
- **THEN** 播放一个 100ms 的正弦波音效，频率从 800Hz 快速下降到 200Hz，模拟弹簧回弹

### Requirement: 球弹跳音效
系统 SHALL 在每个球滚入到位时播放一个短促的弹跳声。

#### Scenario: 球入场触发弹跳声
- **WHEN** 一个球完成滚入动画到达最终位置
- **THEN** 播放一个 30ms 的正弦波音效，频率 600Hz，音量快速衰减

### Requirement: 完成提示音效
系统 SHALL 在全部 10 组号码展示完成后播放一个双音完成提示音。

#### Scenario: 全部号码展示完成
- **WHEN** 第 10 组号码的最后一个球完成动画
- **THEN** 播放一个 200ms 的双音叠加音效（523Hz C5 + 659Hz E5），音量自然衰减

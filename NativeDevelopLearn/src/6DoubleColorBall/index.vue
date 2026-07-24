<script setup>
import { ref, onUnmounted } from "vue";

// ==================== 号码生成 ====================
function generateOneSet() {
  const reds = new Set();
  while (reds.size < 6) {
    reds.add(Math.floor(Math.random() * 33) + 1);
  }
  const blue = Math.floor(Math.random() * 16) + 1;
  return { reds: [...reds].sort((a, b) => a - b), blue };
}

function generateTenSets() {
  return Array.from({ length: 10 }, () => generateOneSet());
}

const lotteryData = ref([]);
const isAnimating = ref(false);
const animationKey = ref(0);

// ==================== Web Audio API 音效 ====================
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
}

function playClick() {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "square";
  osc.frequency.setValueAtTime(200, now);
  osc.frequency.linearRampToValueAtTime(100, now + 0.05);
  gain.gain.setValueAtTime(0.3, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start(now);
  osc.stop(now + 0.05);
}

function playBoing() {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(800, now);
  osc.frequency.linearRampToValueAtTime(200, now + 0.1);
  gain.gain.setValueAtTime(0.3, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start(now);
  osc.stop(now + 0.1);
}

function playBounce() {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(600, now);
  gain.gain.setValueAtTime(0.15, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start(now);
  osc.stop(now + 0.03);
}

function playComplete() {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  [523, 659].forEach((freq) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  });
}

// ==================== 摇杆交互（旋转式）====================
const leverAngle = ref(0);
const isDragging = ref(false);
let startY = 0;
const MAX_ANGLE = 35;
const MAX_DRAG_PX = 80;
const THRESHOLD = 0.8;

function onPointerDown(e) {
  initAudio();
  playClick();
  isDragging.value = true;
  startY = e.clientY || e.touches?.[0]?.clientY || 0;
  document.addEventListener("mousemove", onPointerMove);
  document.addEventListener("mouseup", onPointerUp);
  document.addEventListener("touchmove", onPointerMove, { passive: false });
  document.addEventListener("touchend", onPointerUp);
}

function onPointerMove(e) {
  if (!isDragging.value) return;
  e.preventDefault();
  const currentY = e.clientY || e.touches?.[0]?.clientY || 0;
  const delta = currentY - startY;
  const clampedDelta = Math.max(0, Math.min(delta, MAX_DRAG_PX));
  leverAngle.value = -((clampedDelta / MAX_DRAG_PX) * MAX_ANGLE);
}

function onPointerUp() {
  if (!isDragging.value) return;
  isDragging.value = false;
  document.removeEventListener("mousemove", onPointerMove);
  document.removeEventListener("mouseup", onPointerUp);
  document.removeEventListener("touchmove", onPointerMove);
  document.removeEventListener("touchend", onPointerUp);

  if (Math.abs(leverAngle.value) >= MAX_ANGLE * THRESHOLD) {
    triggerGenerate();
  }
  rebound();
}

function rebound() {
  playBoing();
  leverAngle.value = 0;
}

// ==================== 号码生成与动画 ====================
const INDEX_CHARS = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩"];

function triggerGenerate() {
  if (isAnimating.value) return;
  isAnimating.value = true;

  lotteryData.value = generateTenSets();
  animationKey.value++;

  scheduleBounceSounds();

  setTimeout(() => {
    isAnimating.value = false;
    playComplete();
  }, 2600);
}

function scheduleBounceSounds() {
  for (let group = 0; group < 10; group++) {
    for (let ball = 0; ball < 7; ball++) {
      const delay = group * 200 + ball * 80 + 350;
      setTimeout(() => playBounce(), delay);
    }
  }
}

function pad(n) {
  return String(n).padStart(2, "0");
}

onUnmounted(() => {
  document.removeEventListener("mousemove", onPointerMove);
  document.removeEventListener("mouseup", onPointerUp);
  document.removeEventListener("touchmove", onPointerMove);
  document.removeEventListener("touchend", onPointerUp);
});
</script>

<template>
  <div class="lottery-page">
    <h1 class="title">🎱 双色球摇号机</h1>

    <div class="main-content">
      <!-- 左侧：摇杆区域 -->
      <div class="lever-area">
        <div class="lever-wrapper">
          <div
            class="lever"
            :style="{ transform: `rotateX(${leverAngle}deg)` }"
            @mousedown="onPointerDown"
            @touchstart="onPointerDown"
          >
            <div class="lever-knob"></div>
            <div class="lever-shaft"></div>
          </div>
          <div class="lever-base"></div>
          <div class="lever-hint">按住下拉摇杆</div>
        </div>
      </div>

      <!-- 右侧：号码展示区域 -->
      <div class="result-area">
        <div
          v-if="lotteryData.length > 0"
          class="result-wrapper"
          :key="animationKey"
        >
          <div
            class="number-row"
            v-for="(set, gIdx) in lotteryData"
            :key="gIdx"
            :style="{ animationDelay: `${gIdx * 200}ms` }"
          >
            <span class="index-char">{{ INDEX_CHARS[gIdx] }}</span>
            <div class="balls">
              <span
                v-for="(num, bIdx) in set.reds"
                :key="'r' + bIdx"
                class="ball red"
                :style="{ '--i': bIdx, animationDelay: `${gIdx * 200 + bIdx * 80}ms` }"
              >{{ pad(num) }}</span>
              <span
                class="ball blue"
                :style="{ '--i': 6, animationDelay: `${gIdx * 200 + 6 * 80}ms` }"
              >{{ pad(set.blue) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.lottery-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
}

.title {
  font-size: 28px;
  color: #f5f5f5;
  margin-bottom: 30px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

// ==================== 左右布局 ====================
.main-content {
  display: flex;
  gap: 60px;
  align-items: flex-start;
  width: 100%;
  max-width: 900px;
}

// ==================== 摇杆样式（旋转式）====================
.lever-area {
  flex-shrink: 0;
  width: 200px;
  display: flex;
  justify-content: center;
  padding-top: 40px;
}

.lever-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  perspective: 400px;
}

.lever {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: grab;
  user-select: none;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: bottom center;
  z-index: 10;
  transform-style: preserve-3d;

  &:active {
    cursor: grabbing;
  }
}

.lever-knob {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #fff, #c0c0c0, #808080);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4), inset 0 -2px 6px rgba(0, 0, 0, 0.2);
}

.lever-shaft {
  width: 12px;
  height: 100px;
  background: linear-gradient(90deg, #a0a0a0, #d0d0d0, #a0a0a0);
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.2);
}

.lever-base {
  width: 80px;
  height: 20px;
  background: linear-gradient(180deg, #555, #333);
  border-radius: 0 0 10px 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
}

.lever-hint {
  margin-top: 12px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 1px;
}

// ==================== 号码展示样式 ====================
.result-area {
  flex: 1;
  min-width: 0;
  min-height: 300px;
}

.number-row {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  opacity: 0;
  animation: fadeInUp 0.4s ease-out forwards;
}

.index-char {
  width: 32px;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
  flex-shrink: 0;
}

.balls {
  display: flex;
  gap: 8px;
}

.ball {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  opacity: 0;
  animation: ballRiseIn 0.45s ease-out forwards;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3), inset 0 -2px 4px rgba(0, 0, 0, 0.2);

  &.red {
    background: radial-gradient(circle at 35% 35%, #ff6b6b, #e74c3c, #c0392b);
  }

  &.blue {
    background: radial-gradient(circle at 35% 35%, #5dade2, #3498db, #2980b9);
  }
}

// ==================== 关键帧动画 ====================
@keyframes ballRiseIn {
  0% {
    transform: translateY(40px) scale(0.5);
    opacity: 0;
  }
  60% {
    transform: translateY(-5px) scale(1.05);
    opacity: 1;
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

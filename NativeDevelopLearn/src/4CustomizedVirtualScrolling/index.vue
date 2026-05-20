<template>
  <div class="customized-virtual-scrolling">
    <div class="tabs">
      <button
        :class="['tab-btn', { active: activeTab === 'fixHeight' }]"
        @click="activeTab = 'fixHeight'"
      >
        固定高度
      </button>
      <button
        :class="['tab-btn', { active: activeTab === 'dynamicHeight' }]"
        @click="activeTab = 'dynamicHeight'"
      >
        动态高度
      </button>
    </div>

    <div v-if="activeTab === 'fixHeight'" class="examples">
      <FixHeight01Transform></FixHeight01Transform>
      <FixHeight02AbsoluteTop></FixHeight02AbsoluteTop>
      <FixHeight03Padding></FixHeight03Padding>
      <FixHeight04Margin></FixHeight04Margin>
      <FixHeight05Spacer></FixHeight05Spacer>
      <FixHeight06ContentVisibility></FixHeight06ContentVisibility>
    </div>

    <div v-if="activeTab === 'dynamicHeight'" class="examples">
      <DynamicHeight01Transform></DynamicHeight01Transform>
      <DynamicHeight02AbsoluteTop></DynamicHeight02AbsoluteTop>
      <DynamicHeight03Padding></DynamicHeight03Padding>
      <DynamicHeight04Margin></DynamicHeight04Margin>
      <DynamicHeight05Spacer></DynamicHeight05Spacer>
      <DynamicHeight06ContentVisibility></DynamicHeight06ContentVisibility>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FixHeight01Transform from './FixHeight/01-transform.vue'
import FixHeight02AbsoluteTop from './FixHeight/02-absolute-top.vue'
import FixHeight03Padding from './FixHeight/03-padding.vue'
import FixHeight04Margin from './FixHeight/04-margin.vue'
import FixHeight05Spacer from './FixHeight/05-spacer.vue'
import FixHeight06ContentVisibility from './FixHeight/06-content-visibility.vue'
import DynamicHeight01Transform from './DynamicHeight/01-transform.vue'
import DynamicHeight02AbsoluteTop from './DynamicHeight/02-absolute-top.vue'
import DynamicHeight03Padding from './DynamicHeight/03-padding.vue'
import DynamicHeight04Margin from './DynamicHeight/04-margin.vue'
import DynamicHeight05Spacer from './DynamicHeight/05-spacer.vue'
import DynamicHeight06ContentVisibility from './DynamicHeight/06-content-visibility.vue'

const activeTab = ref('fixHeight')
</script>

<style scoped lang="scss">
.customized-virtual-scrolling {
  padding: 20px;
  height: calc(100vh - 74px);
  overflow: auto;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.tab-btn {
  padding: 8px 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #f5f5f5;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;

  &:hover {
    background: #e8e8e8;
  }

  &.active {
    background: #409eff;
    color: #fff;
    border-color: #409eff;
  }
}

.examples {
  display: flex;
  flex-direction: column;
  // gap: 40px;
}
</style>
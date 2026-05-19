<template>
  <div class="demo-container">
    <GenuiRenderer :content="schema" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { GenuiRenderer } from '@opentiny/genui-sdk-vue';

const schema = ref({
  componentName: 'Page',
  state: {},
  methods: {},
  children: [
    {
      componentName: 'CanvasFlexBox',
      props: {
        flexDirection: 'column',
        gap: '16px',
        padding: '20px'
      },
      children: [
        {
          componentName: 'Text',
          props: {
            text: '用户信息表单',
            style: 'color: #333; font-size: 24px; font-weight: bold;'
          }
        },
        {
          componentName: 'CanvasFlexBox',
          props: {
            flexDirection: 'column',
            gap: '12px'
          },
          children: [
            {
              componentName: 'div',
              props: { style: 'display: flex; align-items: center;' },
              children: [
                { componentName: 'Text', props: { text: '姓名：', style: 'width: 80px;' } },
                { componentName: 'Text', props: { text: '请输入姓名', style: 'color: #999;' } }
              ]
            },
            {
              componentName: 'div',
              props: { style: 'display: flex; align-items: center;' },
              children: [
                { componentName: 'Text', props: { text: '邮箱：', style: 'width: 80px;' } },
                { componentName: 'Text', props: { text: '请输入邮箱', style: 'color: #999;' } }
              ]
            },
            {
              componentName: 'div',
              props: { style: 'display: flex; align-items: center;' },
              children: [
                { componentName: 'Text', props: { text: '年龄：', style: 'width: 80px;' } },
                { componentName: 'Text', props: { text: '请输入年龄', style: 'color: #999;' } }
              ]
            }
          ]
        },
        {
          componentName: 'CanvasFlexBox',
          props: {
            flexDirection: 'row',
            gap: '12px',
            marginTop: '20px'
          },
          children: [
            {
              componentName: 'TinyButton',
              props: {
                text: '提交',
                type: 'primary'
              }
            },
            {
              componentName: 'TinyButton',
              props: {
                text: '重置'
              }
            }
          ]
        }
      ]
    }
  ]
});
</script>

<style scoped>
.demo-container {
  padding: 16px;
  box-sizing: border-box;
}
</style>
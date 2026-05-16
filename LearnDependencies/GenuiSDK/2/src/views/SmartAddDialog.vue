<template>
  <el-drawer v-model="visible" title="智能助手" size="800px" :close-on-click-modal="false" @close="onClose">
    <div class="header-actions">
      <el-button @click="startNewConversation">新建会话</el-button>
    </div>

    <!--    <GenuiChat-->
    <!--        ref="chatRef"-->
    <!--        :url="chatUrl"-->
    <!--        :customFetch="customFetch"-->
    <!--        :customComponents="customComponents"-->
    <!--        :model="model"-->
    <!--        :temperature="temperature"-->
    <!--        :chat-config="chatConfig"-->
    <!--    />-->

    <GenuiChat ref="chatRef" :url="chatUrl" :model="model" :customFetch="customFetch" :customComponents="customComponents" :customActions="customActions" :temperature="temperature" :chat-config="chatConfig" />

<!--        <FormComponents></FormComponents>-->
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, computed, type ComponentPublicInstance } from "vue";
// import FormComponents from "./genui/customComponents/FormComponents.vue";
import { GenuiChat } from "@opentiny/genui-sdk-vue";
import type { CustomFetch } from '@opentiny/genui-sdk-vue';
import { customComponents } from "../genui/chat/custom-components.ts";
import { createCustomActions } from "../genui/chat/custom-actions.ts";
// import { createMcpOpenAICustomFetch } from "./genui/mcp/custom-fetch.ts";
import { useRouter } from 'vue-router'

const router = useRouter()
type GenuiChatExposed = ComponentPublicInstance & {
  handleNewConversation: () => void;
};
const chatRef = ref<GenuiChatExposed | null>(null);
function startNewConversation() {
  chatRef.value?.handleNewConversation()
}

const model = ref("MiniMax-M2.5");
const temperature = ref(0);

const chatConfig = {
  addToolCallContext: true,
  showThinkingResult: true,
};

const chatUrl = "http://localhost:3100/chat/completions";
// const customFetch = createMcpOpenAICustomFetch({
//   apiKey: import.meta.env.VITE_OPENAI_API_KEY || 'sk-trial',
//   baseURL: import.meta.env.VITE_OPENAI_BASE_URL || 'http://localhost:3100',
//   defaultModel: model.value,
//   maxToolSteps: 20,
// })

const customFetch: CustomFetch = async (url, options) => {
  // 解析 body，添加额外 prompt                                                                                                                                                                        LSPs are disabled
  const body = JSON.parse(options.body || '{}')
  const extraPrompt = '这是一个维护人员信息的系统。当用户提到新增人员时，需要使用传入的 自定义新增用户表单 组件创建卡片，请严格按照自定义组件创建卡片，不要自己发挥。新增用户卡片需要绑定关闭智能助手滑窗并切换到表格页事件，请务必给对应的事件绑定对应的交互事件, 禁止自定义方法，必须使用this.callAction中提到的方法， 例如：this.callAction(\'closeDrawerChangePage\')'

  // 在 messages 开头插入 system 消息
  body.messages = [
    { role: 'system', content: extraPrompt },
    ...(body.messages || [])
  ]

  options.body = JSON.stringify(body)

  return await fetch(url, options)
};

const customActions = computed(() =>
    createCustomActions({
      closeDrawerChangePage: () => {
        console.log('onCloseAndChangePage');
        visible.value = false;
        router.push({ path: "/table" });
      },
    }),
)

const { visible } = toRefs(
  reactive({
    visible: false,
  }),
);

let confirmAction = () => {}
let rejectAction = () => {};

const open = () => {
  visible.value = true;

  return new Promise((resolve, reject) => {
    confirmAction = () => {
      visible.value = false;
      resolve(true);
    };
    rejectAction = () => {
      reject(false);
    };
  });
};

const onClose = () => {
  visible.value = false;
  confirmAction();
};

defineExpose({
  open,
});
</script>

<style scoped>
.header-actions {
  position: absolute;
  top: 24px;
  left: 100px;
  z-index: 1;
}
</style>

<template>
  <div class="app">
    <suspense>
      <template #default>
        <async-home/>
      </template>
      <template #fallback>
        <h2>Loading</h2>
      </template>
    </suspense>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';

const AsyncHome = defineAsyncComponent(() => import("./AsyncHome.vue"))

// defineAsyncComponent 是 Vue 3 中用于异步定义组件的函数。它可以用于延迟加载组件，提高应用程序的性能，尤其是对于大型应用或页面中的特定组件。以下是 defineAsyncComponent 的作用及一个简单的示例：

// 作用：
// 延迟加载组件： 允许在需要时异步加载组件，而不是在应用启动时加载所有组件。
// 优化性能： 对于大型应用或页面，延迟加载组件可以提高应用程序的性能，减小初始加载时间。

// defineAsyncComponent 函数接受一个返回组件的函数。通常，我们使用 import 来异步加载组件。当应用程序首次渲染时，YourComponent.vue 不会被加载。只有在实际需要渲染 AsyncComponent 时，才会触发异步加载，并在加载完成后渲染组件。

// 这样，你可以将应用程序的初始加载时间减小，只加载实际需要的组件，提高应用程序的性能。在大型应用或页面中，这种延迟加载的方式尤其有用。
</script>

<style scoped>

</style>



<!-- ◼ 注意：目前（204-03-01）Suspense显示的是一个实验性的特性，API随时可能会修改。
◼ Suspense是一个内置的全局组件，该组件有两个插槽：
 default：如果default可以显示，那么显示default的内容；
 fallback：如果default无法显示，那么会显示fallback插槽的内容； -->
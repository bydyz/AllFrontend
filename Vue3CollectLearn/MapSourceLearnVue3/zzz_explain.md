## 错误原因
vue.runtime.esm-bundler.js 是一个 不包含模板编译器（Runtime-only） 的构建版本。这意味着它不能直接解析 .vue 文件中的模板字符串，比如：

```html
<template>
  <RouterView />
</template>
```


## 正确解决方案

### 方案一：使用带模板编译器的构建版本（推荐）
你需要使用 包含模板编译器（runtime + compiler） 的 Vue 构建版本：vue.esm-bundler.js


### 方案二：避免依赖模板编译器（进阶）
如果你坚持使用 runtime-only 的 Vue 构建版本（如为了体积优化），那么你必须：

不使用 template 标签
直接编写 render() 函数
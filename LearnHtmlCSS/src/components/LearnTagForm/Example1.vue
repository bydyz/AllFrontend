<template>
  <form action="https://www.baidu.com" method="get">
    <!-- method的属性值有默认的GET以及POST，GET暴露密码，POST不会 -->
    <!-- action的属性值一般填后端指定的地址 -->
    用户信息: <input type="text" placeholder="请输入用户名，注意大小写" name="username" />
    <!-- 用户信息: <input> -->
    <br />

    密码: <input type="password" placeholder="请输入密码" name="password" />
    <br />
    <!-- 加上name后，在登录界面填上的用户信息和密码都会传到action指定网址的地址栏 -->

    <input type="submit" value="登录" />
    <!-- 提交到action指定的地址，若没有则自动会在网址栏添一个问号 -->
    <button type="submit">登录</button>

    <input type="reset" value="put in again" />
    <button type="reset">put in again</button>

    <input type="button" value="用以自定义" />
  </form>
</template>

<script setup></script>

<style lang="scss" scope></style>

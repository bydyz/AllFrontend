<template>
  <div>
    <!-- 如果是简单的 html 去打开的话，这个无论是 open with live server 或者 双击打开 这种方式可以 -->
    <!-- <img src="雏田.gif" /> -->

    <!-- open with live server 或者 双击打开 或者 在项目中  这种方式都可以 -->
    <img src="./雏田.gif" />

    <!-- 三种方式都不可 -->
    <!-- <img src="/雏田.gif" /> -->
     
    <!-- 如果是简单的 html 去打开的话，这个无论是 open with live server 或者 双击打开 都不可 -->
    <img src="E:\Project\AAA_All_MINE\all-frontend\LearnHtmlCSS\src\components\LearnTagImg\雏田.gif" />
    <!-- 这个最复杂的，在http协议（利用Open with Live Server）中不能打开图片，在file（利用View In 
        Browser或者双击HTML文件）中可以 -->

    <!-- 
    用open with live server时，是先创建了一个服务器，故它在服务器中显示的网页网址是
    http://127.0.0.1:5500/P17%20Path%20to%20the%20image%20label.html  是http协议


    正常双击打开或者用view in browser时，它在服务器中显示的网页网址是
    file:///C:/Users/Bydyz/Desktop/Html/VS%20Code/P17%20Path%20to%20the%20image%20label.html
    时file协议
    -->

    <!-- 如果是简单的 html 去打开的话，这个无论是 open with live server 或者 双击打开 这种方式可以 -->
    <!-- <img src="img/1.jpg" /> -->

    <img src="./img/1.jpg" />

    <!-- 仅仅是 open with live server 可行 -->
    <!-- <img src="/LearnHtml/src/1/components/LearnImg/img/1.jpg" alt="" /> -->
  </div>
</template>

<script setup>
// 创建函数
const InitPage = async () => {};
// 写在此处 大致相当于 created 里调用
InitPage();
</script>

<style lang="less" scope></style>

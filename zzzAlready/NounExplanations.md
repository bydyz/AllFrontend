# GitHub仓库中的 Tags（标签）

* 可以理解为项目版本历史中的书签
* 它是一个指向特定代码提交（commit）的引用，用于标记项目在某个时间点的特定状态

## Tags 与 Releases 的区别

* Git Tag：是Git本身的基础功能，是一个轻量级的引用，指向特定的代码提交
* GitHub Release：是GitHub在Tag之上提供的增强协作功能。它关联一个Git Tag，并额外提供发布说明（Release Notes）、可下载的软件安装包（如 .exe、.apk 文件）等

简单来说，Tag是“书签”本身，而Release是“书签”加上详细的“读书笔记”和“附件”。

## 例如 v8.0.16 既是对应 分支 v8.0中的发布 8.0.16阶段 的commit
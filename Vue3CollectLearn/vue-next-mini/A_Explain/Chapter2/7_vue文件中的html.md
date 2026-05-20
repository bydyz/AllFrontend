.vue文件中 的html内容，不是真实的 html。

原因：因为我们在 html 中会写很多  非html内容，这些是不能被浏览器正确解析的，但是最后却显示正常，因此可以得出
结论 .vue文件中 的html内容，不是真实的 html；它需要被vue框架进行解析，然后运行，才能得到最终真实的html

编译时：compiler
运行时：runtime

vue 就是 runtime + compiler 框架

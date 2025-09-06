
    // 在原生的 HTML <script> 中，直接使用 import 语法是无法直接工作的，因为 import 是 ECMAScript 模块的一部分，而浏览器默认的脚本加载方式是全局作用域，不支持模块化。

    // 然而，你可以通过以下几种方式在原生 HTML 的 <script> 中使用模块：

      // 1. 使用 type="module" 属性：
        // <script type="module">

        // 上述代码中，type="module" 属性告诉浏览器这是一个 ECMAScript 模块，可以使用 import 语法。./your-module.js 是你的模块文件的相对路径。


      // 2. 内联 import() 动态导入：
        // (async () => {
        //   const { someFunction } = await import('./your-module.js');
        //   someFunction();
        // })();

        // 使用动态 import() 是一种在非模块环境下异步加载模块的方式。在这种情况下，<script> 不需要 type="module" 属性。



      // 注意事项：
        //   由于浏览器的同源策略，如果你的模块是从其他域加载的，确保服务器支持 CORS。

        //   如果你在本地使用 file:// 协议打开 HTML 文件，也需要考虑浏览器的一些限制。在这种情况下，建议使用一个简单的本地服务器，如 VS Code 插件 "Live Server" 


  
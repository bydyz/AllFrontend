// 作用域：

// 作用域指定一个变量的作用的范围

// 在JS中一共有两种作用域：

// 全局的作用域
// 直接编写在script标签中的JS代码都是全局作用域
// 全局作用域在页面打开时创建，在页面在关闭时销毁
// 在全局作用域中有一个全局的window对象，它代表的是一个浏览器窗口对象，它由浏览器创建我们可以直接使用

// 在使用作用域中：
// 创建的变量都会作为window对象的属性性保存
// 创建的函数都会作为window对象的方法他保存
// 全局作用域的变量都是全局变量
// 在页面的任意的部分都可以访问的到

// 函数作用域（也称为：局部作用域）











// 全局作用域：就是直接编写在script标签中的代码，随着页面的打开创建，关闭销毁

// 在全局作用中：

// 创建的变量都会作为window对象的属性保存
// 创建的函数都会作为window对象的方法保存


/* 

<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>08_全局作用域</title>
</head>
<body>
<script type="text/javascript">
    // 定义变量
    var a = 100;
    var b = 200;
    // 上述定义的两个变量都是保存在`window`对象的属性中
    // 可以使用window.属性的方式调用
    console.log(window.a);//由于window是一个窗口对象，默认就是使用它，所以我们一般会省略掉
    console.log(window.b);


    //定义函数
    function fun1(a,b) {
        console.log(a+b);
    }
    // 上述定义的函数是保存在window对象中的方法中
    // 可以使用window.方法名的方式调用
    window.fun1(3,5);//由于window是一个窗口对象，默认就是使用它，所以我们一般会省略掉
</script>
</body>
</html>

*/











/* 

局部作用域就是在函数中定义的变量，并且在函数中定义的变量如果不使用var关键字时，默认定义就是全局变量，默认是window.变量名

函数作用域（局部作用域）

调用函数时创建函数作用域，函数执行完毕后，函数作用域销毁
每调用一次函数就会创建一个新的函数作用域，他们之间是相互独立的
在函数作用域中可以访问全局作用域的变量
当在全局作用域中无法访问到函数作用域中的变量
在函数作用中如果有与全局作用域的变量名相同，需要访问全局作用域中的变量时，可以使用window.变量名来访问全局变量


<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>10_函数作用域</title>
</head>
<body>
<script type="text/javascript">
  函数作用域
  
  在函数中使用`var`关键字定义的变量就是函数变量
  该变量的作用域只限于函数体内，如果在函数不使用`var`关键字定义变量
  时，默认定义就是全局变量
  
  function fun() {
    var a = 100;
    b = 100;// 如果在函数中不使用var定义的变量，默认就是全局变量，默认使用`window.变量名`
    console.log(a);
  }
</script>
</body>
</html>

*/




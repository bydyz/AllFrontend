// 变量的声明提前：

// ​ 使用var关键字声明的变量，会在所有的代码执行之前被声明（但是不会被赋值）

// ​ 但是如果声明变量时不使用var关键字时，则变量不会被声明提前


// 函数的声明提前：

// ​ 使用  函数声明形式  创建的函数function 函数() {}

// ​ 它会在所有的代码执行之前就被创建，所以我们在函数声明前来调用函数，使用 函数表达式 创建的函数，不会被声明提前，所以不能声明前调用


// 变量的提前声明就是使用var关键字      而函数的提前声明语法是：function 函数名(参数列表){语句...}

/* 

<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>声明提前</title>
</head>
<body>
<script type="text/javascript">

    // 变量的声明提前语法是：var 变量名 = 值;
    // 返回值是：undefined，原因是：在下面的13行才进行赋值
    console.log(a);//不会被报错，因为是`a`变量被提前声明了，相当于在上面声明了：var a;
    // 如果不写`var a = 100`，而是写成：`a = 100;` 会直接报错
    var a = 168;


    
    函数的声明提前语法是：
     function 函数名(参数列表) {语句...}
  
    注意是：
     var 变量名 = function(参数列表) {语句...}
     这种方式不是函数的提前声明，会报错的，这是变量的提前声明，
     如果使用这种方式调用函数时，会报错，因为变量值是undefined 调用undefined会直接报错
    
    function fun() {
        alert("你好，函数的提前声明");
    }

    fun();
</script>
</body>
</html>


*/


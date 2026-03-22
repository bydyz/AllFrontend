# 断点调试

* 行断点
  * 代码左侧显示行数区域左键单击
  * 在断点处右键，可以添加条件。满足条件即会停止运行
    * 条件一  i % 2 == 0
    * 条件二  Thread.currentThread.getName.equals("Thread1")
  
* 详细断点（源断点）
  * shift + 代码左侧显示行数区域 左点击

* 方法断点
  * 在方法的定义行处左键单击
  * 在方法调用处左键单击，运行可跳转到实际代码处

* 异常断点
  * 在 Breakpoints 可以管理所有断点，即也可添加异常断点，如此代码出现对应异常就会停止

* 字段断点
  * 在类的变量前点击断点，则对该参数进行设置时，会停止运行


# 断点调试功能

  右键 Evaluate Expression

  Drop Frame  回退到方法执行开始处

  Force Return  跳过接下来的所有，直接结束，和程序终止不同，它不会运行后面的代码

  Step Over   跳过本步骤，无论本步骤有没有调用方法，都运行下一步
  Step Into   进入调用方法
  Step Out    从调用方法里跳出
  Force Step Into   进入依赖提供的方法
  Run to Cursor   跳转到光标指定处
  Trace Current Stream Chain    查看流的整体执行情况
  Show Execution Point    跳到断点程序执行处

  右键 set value 可设置运行值


# 其他一些问题

* 改了源码没有重新编译，会导致一些代码无法加断点

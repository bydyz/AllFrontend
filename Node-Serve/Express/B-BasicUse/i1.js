const express = require('express');
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

// 创建 Express 应用
const app = express();
const port = 3000;

// 配置 Winston 日志记录器
const logger = winston.createLogger({



  // 在 winston.createLogger 配置中，level 属性指定了日志记录器的最低日志级别。这意味着只会记录这个级别以及更高级别的日志（即比它更“严重”的级别）。winston 中的级别通常是（按严重性递增）：silly, debug, verbose, info, warn, error, critical。

  // level: 'info' 的作用
  // 控制日志输出：设置为 'info' 意味着只有 info 级别以及以上的日志（warn, error, critical）会被记录。debug, verbose, 和 silly 级别的日志将被忽略。
  // 应用于所有传输层：在 createLogger 中定义的 level 默认应用于所有的传输层，除非你在特定传输层中覆盖了这个设置。

  // 作用在哪个部分
  // 控制台传输层 (Console)：控制台传输层将遵循 'info' 级别的设置，只输出 info 级别以上的日志。
  // 每日旋转文件传输层 (DailyRotateFile)：尽管 DailyRotateFile 中可以单独设置日志级别，但在这个例子中，它也将遵循 'info' 级别的设置，除非你在 DailyRotateFile 的配置中指定了一个不同的级别。

  // 覆盖级别设置
  // 在提供的代码示例中，DailyRotateFile 并没有覆盖 level 设置，因此它将遵循 createLogger 中定义的 'info' 级别。然而，如果需要不同的级别，你可以在 DailyRotateFile 的配置中单独设置：

  // new DailyRotateFile({
  //   // ... 其他配置
  //   level: 'error', // 覆盖级别设置，只记录 'error' 级别以上的日志
  //   // ... 其他配置
  // })

  // 结论
  // level: 'info' 控制了日志记录器记录日志的最低级别，它决定了哪些级别的日志会被记录。这个设置默认应用于所有传输层，但可以在特定传输层中被覆盖。在日志记录中合理设置级别可以帮助你控制日志的数量和细节程度，特别是在生产环境中，这有助于减少不必要的日志输出，同时保留关键信息。
  level: 'info',


  // 日志格式化，会被应用到所有的传输层，
  // 在 createLogger 中定义的 format 应用于控制台传输层，它决定了控制台输出的日志格式。如果你想要为不同的传输层定义不同的日志格式，你可以在每个传输层实例中单独定义 format，就像在 DailyRotateFile 中所做的那样。
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),


  transports: [

    // 在 winston 的配置中，new winston.transports.Console() 创建了一个将日志输出到控制台（stdout）的传输层（transport）。每个由该传输层处理的日志条目都会实时打印到控制台。

    // 详解
    // 传输层（Transport）：在 winston 中，传输层是日志记录器的一部分，负责将日志条目发送到特定的位置。除了控制台，还可以是文件、网络等。

    // winston.transports.Console：这是 winston 提供的一个内置传输层，用于将日志输出到 Node.js 的标准输出流，通常是你的终端或控制台。

    // 在提供的配置中：

    // new winston.transports.Console(),
    // 没有指定格式：这里没有为控制台传输层指定特定的格式，所以它会使用 winston 默认的格式化方式，通常是一个简单的文本格式，适合人眼阅读。

    // 示例
    // 假设你的 logger 被配置如下：

    // const logger = winston.createLogger({
    //   level: 'info',
    //   format: winston.format.combine(
    //     winston.format.timestamp(),
    //     winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    //   ),
    //   transports: [
    //     new winston.transports.Console()
    //   ]
    // });
    // 当你调用 logger.info('Hello, World!'); 时，控制台输出可能会是这样的：

    // 2023-04-28 08:30:00.000 INFO: Hello, World!
    // 结论
    // new winston.transports.Console() 的作用是将日志信息输出到控制台，这对于开发和调试非常有用，因为它允许你实时查看日志输出。控制台传输层通常用于开发环境或临时的日志记录需求，而在生产环境中，你可能更倾向于将日志持久化到文件或其他远程服务中。

    new winston.transports.Console({

      // level: 'error', // 覆盖控制台传输层的日志级别为 'error'


       // 为控制台传输层指定格式
       format: winston.format.combine(

        // winston.format.colorize() 为不同的日志级别添加颜色。这对于在控制台中快速区分日志级别非常有用。它可以根据日志级别（如 info、warn、error）为日志消息着色。

        // logger.info('This is an informational message.');
        // logger.warn('This is a warning message.');
        // logger.error('This is an error message.');
        // 在上述代码中，控制台输出的日志会根据级别以不同的颜色显示。
        winston.format.colorize(),  // 添加颜色

        



        // winston.format.simple() 提供了一个简洁的日志格式，通常包括日期/时间、日志级别和一个简单的分隔符，后跟日志消息。

        // logger.info('This is an informational message.');
        // 输出可能如下所示：
        // [2023-04-28 08:30:00.000] INFO: This is an informational message.
        winston.format.simple(),    // 使用简单格式

        

        

        // 实际上，winston.format.simple() 和 winston.format.printf() 可以并存，并且经常一起使用，以创建一个既简单又可定制的日志格式。winston.format.simple() 提供了一个基本的格式化，而 winston.format.printf() 允许你进一步定制最终的输出格式。

        // 示例
        // 以下是一个将两者结合使用的示例：

        // const winston = require('winston');
        // const logger = winston.createLogger({
        //   format: winston.format.combine(
        //     winston.format.colorize(),
        //     winston.format.timestamp(),
        //     winston.format.simple(),
        //     winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
        //   ),
        //   transports: [
        //     new winston.transports.Console()
        //   ]
        // });

        // logger.info('This is an informational message.');
        // 在这个配置中：

        // winston.format.colorize()：为日志级别添加颜色，便于在控制台中区分。
        // winston.format.timestamp()：为每个日志条目添加时间戳。
        // winston.format.simple()：添加一个简单的格式化，通常包括日志级别和消息。
        // winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
        // 使用 printf 函数进一步定制输出格式，这里它实际上覆盖了 simple 格式化的结果，并在前面添加了时间戳。

        // 输出结果
        // 上述配置的输出结果可能如下：

        // [2023-04-28 08:30:00.000] INFO: This is an informational message.

        // 注意
        // winston.format.simple() 已经包含了日志级别和消息，所以通常不需要与 winston.format.printf() 一起使用，除非你想要进一步定制输出格式。
        // winston.format.printf() 非常灵活，可以用来实现各种自定义格式，包括但不限于时间戳、日志级别、消息内容等。
        // 根据你的具体需求，你可以选择适当的格式化函数，或者组合使用它们来生成所需的日志格式。
        winston.format.printf(info => `${info.level}: ${info.message}`)  // 自定义输出格式
      )
    }),



    // winston-daily-rotate-file 是一个 winston 传输层（transport）模块，用于创建一个日志记录器，它会按照每天的日期来旋转日志文件。这意味着每天都会创建一个新的日志文件，而旧的日志文件不会被覆盖，从而保留了历史日志记录。

    // 这个模块的主要作用包括：

      // 日志文件分割：按照日期分割日志文件，使得日志管理更加方便。

      // 日志保留策略：可以设置日志文件的保留天数、文件大小等，超过设置条件的旧日志文件会被自动压缩和删除。

      // 日志压缩：旧的日志文件可以被压缩存储，节省磁盘空间。

      // 日志查询：按日期分割的日志文件便于进行历史日志的查询和分析。

      // 避免日志文件过大：通过限制日志文件的大小，避免单个日志文件过大影响性能。

    new DailyRotateFile({
      // 日志文件输出目录
      dirname: './logs',
      // 日志文件名，%DATE%会被替换成日期
      filename: 'app-%DATE%.log',


      // level: 'error', // 覆盖级别设置，只记录 'error' 级别以上的日志



      // 在 winston-daily-rotate-file 的配置中，format 属性定义了日志条目的格式。winston.format.combine 是一个用于组合多个格式化函数的方法，它允许你按照特定的格式来定制日志的输出。

      // winston.format.timestamp()
      // 这个格式化函数会在每个日志条目中添加一个时间戳。默认情况下，时间戳是根据当前的 UTC 时间来设置的，但你可以传递一个选项对象来自定义时间戳的格式。

      // winston.format.json()
      // 这个格式化函数会把日志条目格式化为 JSON 对象。这对于机器解析日志非常有帮助，因为 JSON 格式易于解析，并且可以包含复杂的结构。

      // 组合格式化函数
      // 使用 winston.format.combine 可以同时应用多个格式化函数。在提供的示例中，日志条目首先会被加上时间戳，然后整个条目会被格式化为 JSON 对象。

      // 示例详解
      // 假设我们有以下配置：

      // format: winston.format.combine(
      //   winston.format.timestamp(),
      //   winston.format.json()
      // )
      // 当你使用这个配置记录日志时，比如：

      // logger.info('This is an info message.');
      // 生成的日志条目可能会是这样的：

      // {
      //   "timestamp": "2023-04-28T08:30:00.000Z",
      //   "level": "info",
      //   "message": "This is an info message."
      // }

      // 在这个例子中：

      // timestamp() 函数添加了日志记录发生的时间，格式为 ISO 8601 字符串。
      // json() 函数将整个日志条目格式化为 JSON 对象，其中包含了时间戳、日志级别和消息。
      // 自定义时间戳格式
      // 如果你想要自定义时间戳的格式，可以向 timestamp() 函数传递一个选项对象：

      // winston.format.timestamp({
      //   format: 'YYYY-MM-DD HH:mm:ss'
      // }),
      // 使用这个自定义格式，时间戳将会按照 'YYYY-MM-DD HH:mm:ss' 的格式来显示。

      // 结论
      // 通过使用 winston.format.combine 和 winston.format.timestamp() 以及 winston.format.json()，你可以生成结构化且易于机器读取的日志，同时保证了时间信息的完整性。这对于自动化日志分析、监控系统以及长期日志存储都非常有用。

      // 日志格式化
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),



      // 日志切割频率
      datePattern: 'YYYY-MM-DD',
      // 僵尸日志文件的天数
      frequency: '1d', // 每天一个日志文件
      // 保留日志文件的最大天数
      maxFiles: '30d',
      // 当日志文件达到一定大小时，进行切割
      maxSize: '20m'
    })

    // 在这个配置中，winston-daily-rotate-file 将日志文件存放在 ./logs 目录下，并且每天都会创建一个新的日志文件，文件名以 app- 开头，后跟日期。日志文件将保留最多 30 天，并且每个日志文件的最大大小为 20MB。



  ]
});

// 中间件用于记录请求
app.use((req, res, next) => {
  const start = new Date();
  res.on('finish', () => {
    const end = new Date();
    logger.info({
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      responseTime: end - start,
    });
  });
  next();
});

// 一个简单的路由
app.get('/', (req, res) => {
  logger.info('Homepage accessed.'); // 使用 Winston 记录日志
  res.send('Hello, World!');
});

// 错误处理中间件
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

// 监听端口
app.listen(port, () => {
  logger.info(`Server running on http://localhost:${port}`);
});
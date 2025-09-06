const fs = require('fs')
const path = require('path')

const express = require('express')



// winston 是一个通用的日志记录库，用于 Node.js 应用程序。它提供了多种日志记录方式，包括请求日志记录。winston 支持多种日志级别，可以同时将日志输出到多个位置，如控制台、文件等。
const winston = require('winston');
// 创建一个日志记录器
const logger = winston.createLogger({
  // 定义日志级别
  level: 'info',
  // 定义日志格式
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  // 定义日志传输方式
  transports: [
    new winston.transports.Console({
      level: 'silly', // 控制台输出的日志级别
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    new winston.transports.File({
      filename: 'error.log',
      level: 'error', // 错误日志文件的日志级别
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    })
  ]
});



// 使用创建的日志记录器记录不同级别的日志：

// // 记录不同级别的日志
// logger.silly('This is a silly message');
// logger.debug('This is a debug message');
// logger.info('This is an info message');
// logger.warn('This is a warn message');
// logger.error('This is an error message');
// logger.crit('This is a critical message');



// winston 允许你记录元数据（metadata）与日志消息一起，这有助于提供更多上下文信息：

// logger.info('User profile viewed', { user: 'Alex', action: 'view' });



// winston 可以捕捉和记录未捕获的异常：

// process.on('uncaughtException', (err) => {
//   logger.error('Uncaught Exception:', err.message);
//   logger.error(err.stack);
//   process.exit(1);
// });



// 对于文件日志，winston 可以配置为每日日志切割，这样每天都会生成一个新的日志文件：

// const DailyRotateFile = require('winston-daily-rotate-file');

// logger.add(new DailyRotateFile({
//   filename: 'application-%DATE%.log',
//   datePattern: 'YYYY-MM-DD',
//   prepend: true,
//   level: 'info'
// }));







// 创建app对象
const app = express()

// 应用第三方中间件
const writeStream = fs.createWriteStream(path.resolve(__dirname, "../logs/access.log"))

// 编写中间件
app.post('/login', (req, res, next) => {
  res.end('登录成功, 欢迎回来~')
})

// 启动服务器
app.listen(3000, () => {
  console.log('express服务器启动成功~')
})








// winston 支持多种内置的传输层（transports），用于将日志发送到不同的目的地。以下是 winston 提供的一些常用传输层及其简要说明：

// Console Transport (winston.transports.Console):
// 用于将日志输出到控制台（stdout 或 stderr）。

    // new winston.transports.Console();


// File Transport (winston.transports.File):
// 用于将日志写入到一个文件中。

    // new winston.transports.File({ filename: 'combined.log' });


// DailyRotateFile Transport (winston-daily-rotate-file):
// 类似于 File Transport，但它会根据日期来旋转日志文件，每天创建一个新的日志文件。

    // const DailyRotateFile = require('winston-daily-rotate-file');
    // new DailyRotateFile({ filename: 'application-%DATE%.log' });


// Http Transport (winston.transports.Http):
// 允许你将日志发送到一个 HTTP 服务器。

    // new winston.transports.Http({ host: 'localhost', port: 8000 });


// Stream Transport (winston.transports.Stream):
// 可以将日志输出到任何可写流（如文件流）。

    // const fs = require('fs');
    // new winston.transports.Stream({ stream: fs.createWriteStream('stream.log') });


// Webhook Transport:
// 通过 Webhook 发送日志，这通常用于将日志发送到日志聚合服务或监控系统。

    // new winston.transports.Webhook({ host: 'example.com', port: 80 });


// Syslog Transport (winston.transports.Syslog):
// 将日志发送到系统日志守护进程。

    // new winston.transports.Syslog();


// MongoDB Transport (winston-mongodb):
// 将日志存储到 MongoDB 数据库中。

    // const MongoDB = require('winston-mongodb').MongoDB;
    // new MongoDB({ db: 'mongodb://localhost:27017/app_logs' });


// Couchdb Transport (winston-couchdb):
// 将日志存储到 CouchDB 数据库中。

    // const Couchdb = require('winston-couchdb').Couchdb;
    // new Couchdb({ db: 'http://localhost:5984/mydb' });


// Redis Transport (winston-redis):
// 将日志发送到 Redis 数据库。

    // const Redis = require('winston-redis').Redis;
    // new Redis({ port: 6379, host: 'localhost' });

    
// 请注意，一些传输层（如 MongoDB, Couchdb, Redis）可能需要安装额外的包。此外，winston 社区还提供了许多其他第三方传输层，用于满足特定的日志记录需求。

// 要使用这些传输层，你通常会在创建 winston 日志记录器时将它们作为 transports 属性的一部分传递：

// const winston = require('winston');
// const logger = winston.createLogger({
//   transports: [
//     new winston.transports.Console(),
//     new winston.transports.File({ filename: 'error.log', level: 'error' })
//   ]
// });
// 在这个例子中，日志记录器被配置为同时向控制台和名为 error.log 的文件记录日志，其中只有 error 级别及以上的日志会被记录到文件中。
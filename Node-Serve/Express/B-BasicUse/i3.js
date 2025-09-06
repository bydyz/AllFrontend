const fs = require('fs')
const path = require('path')

const express = require('express')
const DailyRotateFile = require('winston-daily-rotate-file');


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
        winston.format.colorize()
      )
    }),

    new DailyRotateFile({
      // 日志文件输出目录
      dirname: './logs',
      // 日志文件名，%DATE%会被替换成日期
      filename: 'app-%DATE%.log',

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
  ]
});


// 创建app对象
const app = express()

// 中间件用于记录请求
app.use((req, res, next) => {
  const start = new Date();

  // ！ 接口调用结束后才会走这里
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

// 编写中间件
app.post('/login', (req, res, next) => {
  logger.info('login accessed.'); // 使用 Winston 记录日志
  res.end('登录成功, 欢迎回来~')
})

// 错误处理中间件
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

// 启动服务器
app.listen(3000, () => {
  console.log('express服务器启动成功~')
})


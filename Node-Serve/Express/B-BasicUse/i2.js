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
        winston.format.colorize()
      )
    }),

    // !!日志输出到  同文件夹的error.log
    new winston.transports.File({
      filename: 'error.log',
      level: 'silly', // 错误日志文件的日志级别
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    }),

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


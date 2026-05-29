# 创建 vue项目

1. `npm create vue@latest`
2. `npm create vite`

# windows中 cmd命令

1. `cls`
2. `where node`     查看 node 和 npm 的安装位置
3. `where npm`      查看 node 和 npm 的安装位置
4. `echo xxx yyy`   控制台 显示 xxx yyy

# windows中 Win + R 后使用  在cmd中也可

1. `rundll32 sysdm.cpl,EditEnvironmentVariables`  直接打开 环境变量 窗口
2. `sysdm.cpl`  打开 系统属性

# npm命令

## 基础操作

| 命令 | 说明 |
|------|------|
| `npm init` | 初始化项目，创建 package.json |
| `npm init -y` | 跳过交互式提问，直接使用默认值创建 |
| `npm install` / `npm i` | 安装 package.json 中的依赖 |
| `npm install <package>` | 安装单个包 |
| `npm install <package> -D` | 安装为开发依赖（devDependencies） |
| `npm install <package> -g` | 全局安装 |
| `npm uninstall <package>` | 卸载包 |
| `npm uninstall <package> -D` | 卸载开发依赖 |
| `npm update` | 更新所有依赖 |
| `npm update <package>` | 更新单个包 |
| `npm root -g` | 查看 npm 全局安装的位置 |
| `npm config get prefix` | 配置确定位 |

## 运行脚本

| 命令 | 说明 |
|------|------|
| `npm run` | 列出所有可用脚本 |
| `npm run <script>` | 运行指定脚本 |
| `npm start` | 运行 start 脚本（如果有） |
| `npm test` | 运行 test 脚本（如果有） |

## 查看信息

| 命令 | 说明 |
|------|------|
| `npm list` | 列出已安装的包 |
| `npm list -g` | 列出全局安装的包 |
| `npm list <package>` | 查看特定包的版本 |
| `npm view <package>` | 查看包的详细信息 |
| `npm view <package> versions` | 查看包的所有版本 |
| `npm outdated` | 检查过时的包 |
| `npm docs <package>` | 打开包的文档 |
| `npm homepage <package>` | 打开包的主页 |

## 缓存与管理

| 命令 | 说明 |
|------|------|
| `npm cache clean --force` | 清除 npm 缓存 |
| `npm config list` | 查看 npm 配置 |
| `npm config set <key> <value>` | 设置配置 |
| `npm login` | 登录 npm 账号 |
| `npm publish` | 发布包到 npm |
| `npm logout` | 退出登录 |

## 其他

| 命令 | 说明 |
|------|------|
| `npm audit` | 安全审计 |
| `npm audit fix` | 自动修复安全漏洞 |
| `npm bin` | 查看 npm bin 目录 |
| `npm exec <command>` | 运行 npx 命令 |
| `npm ping` | 检测 npm 注册表连接 |

## npx 命令

| 命令 | 说明 |
|------|------|
| `npx <package>` | 运行包的命令（临时下载执行） |
| `npx <package> -y` | 跳过确认直接执行 |
| `npx create-vite <project>` | 使用 create-vite 创建项目 |
| `npx serve <folder>` | 启动静态文件服务器 |

## pnpm 命令（类似npm）

| 命令 | 说明 |
|------|------|
| `pnpm install` / `pnpm i` | 安装依赖 |
| `pnpm add <package>` | 添加包 |
| `pnpm add -D <package>` | 添加开发依赖 |
| `pnpm remove <package>` | 移除包 |
| `pnpm update` | 更新依赖 |
| `pnpm list` | 列出依赖 |
| `pnpm run` | 运行脚本 |

## yarn 命令（类似npm）

| 命令 | 说明 |
|------|------|
| `yarn install` | 安装依赖 |
| `yarn add <package>` | 添加包 |
| `yarn add -D <package>` | 添加开发依赖 |
| `yarn remove <package>` | 移除包 |
| `yarn upgrade` | 更新依赖 |
| `yarn list` | 列出依赖 |
| `yarn run` | 运行脚本 |
| `yarn create <package>` | 使用模板创建项目 |
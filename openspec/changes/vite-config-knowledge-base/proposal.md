## Why

Vite 配置体系庞大且分散（7 大配置分组、80+ 配置项、插件配置），缺乏系统性的中文学习资料。需要构建一个结构化的知识库，以层级文件夹的形式组织所有配置项，方便个人学习和快速查阅。

## What Changes

- 在 `DependenciesLearn/Vite/ViteKnowledge/Vite_Configuration/` 下创建完整的 Vite 配置知识库
- 每个配置项一个独立文件夹，包含 README.md（总叙述 + 配置方式 + 进阶配置 + 注意事项）和代码示例
- 保留已有的 `build/rollupOptions/input/` 内容，标注 `rollupOptions` 为废弃（Vite 8 已改用 `rolldownOptions`）
- 新增 `rolldownOptions` 配置目录
- 插件配置按来源分目录组织（如 `plugins/@vitejs/plugin-vue/`）
- 根目录创建总览 README.md，介绍整个配置体系

## Capabilities

### New Capabilities

- `vite-config-hierarchy`: 完整的 Vite 配置层级文件夹结构（shared、server、build、preview、optimizeDeps、ssr、worker 共 7 大分组）
- `vite-config-shared`: 共享配置项文档（root、base、mode、define、plugins、publicDir、cacheDir、resolve/*、html/*、css/*、json/*、oxc、assetsInclude 等）
- `vite-config-server`: 开发服务器配置项文档（host、port、proxy、cors、hmr、ws、middlewareMode、fs/* 等）
- `vite-config-build`: 构建配置项文档（target、outDir、sourcemap、rolldownOptions/*、lib、manifest 等）
- `vite-config-preview`: 预览服务器配置项文档
- `vite-config-optimize-deps`: 依赖优化配置项文档
- `vite-config-ssr`: SSR 配置项文档
- `vite-config-worker`: Worker 配置项文档
- `vite-plugins`: 插件配置文档（按来源分目录）

### Modified Capabilities

（无，这是全新创建）

## Impact

- 目标路径：`D:\desktop\all-frontend\DependenciesLearn\Vite\ViteKnowledge\Vite_Configuration\`
- 需要新建约 80+ 个文件夹和 README.md 文件
- 已有的 `build/rollupOptions/input/` 内容保留，补充 README.md
- 不影响任何运行时代码，纯文档项目

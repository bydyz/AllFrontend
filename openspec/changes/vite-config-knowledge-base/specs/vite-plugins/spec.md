## ADDED Requirements

### Requirement: 插件按来源分目录
`plugins/` 文件夹 SHALL 按插件来源（npm 包名）分子目录。

#### Scenario: 插件目录结构
- **WHEN** 查看 `plugins/` 目录
- **THEN** SHALL 按 `@vitejs/`、`vite-plugin-*` 等来源分组

### Requirement: @vitejs/plugin-vue 文档
`plugins/@vitejs/plugin-vue/` 文件夹 SHALL 包含该插件的配置说明。

#### Scenario: plugin-vue 配置
- **WHEN** 查看 `plugins/@vitejs/plugin-vue/README.md`
- **THEN** SHALL 包含插件的常用配置选项和代码示例

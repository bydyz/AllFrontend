## ADDED Requirements

### Requirement: shared 配置分组文档
`shared/` 文件夹 SHALL 包含所有 Vite 共享配置项的文档，覆盖 root、base、mode、define、plugins、publicDir、cacheDir、resolve/*、html/*、css/*、json/*、oxc、assetsInclude、logLevel、customLogger、clearScreen、envDir、envPrefix、appType、devtools、future。

#### Scenario: shared 分组覆盖范围
- **WHEN** 查看 `shared/` 目录
- **THEN** SHALL 包含至少 20 个子文件夹，对应所有 shared 配置项

### Requirement: resolve 子配置文档
`shared/resolve/` 文件夹 SHALL 包含 alias、dedupe、conditions、mainFields、extensions、preserveSymlinks、tsconfigPaths 共 7 个子配置的文档。

#### Scenario: resolve.alias 文档
- **WHEN** 查看 `shared/resolve/alias/README.md`
- **THEN** SHALL 包含 Object 格式和 Array 格式两种配置方式的说明和代码示例

### Requirement: css 子配置文档
`shared/css/` 文件夹 SHALL 包含 modules、postcss、preprocessorOptions、preprocessorMaxWorkers、devSourcemap、transformer、lightningcss 共 7 个子配置的文档。

#### Scenario: css.postcss 文档
- **WHEN** 查看 `shared/css/postcss/README.md`
- **THEN** SHALL 包含内联配置和外部配置文件两种方式的说明和代码示例

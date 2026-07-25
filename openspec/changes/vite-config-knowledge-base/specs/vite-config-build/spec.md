## ADDED Requirements

### Requirement: build 配置分组文档
`build/` 文件夹 SHALL 包含所有 Vite 构建配置项的文档，覆盖 target、modulePreload、outDir、assetsDir、assetsInlineLimit、cssCodeSplit、cssTarget、cssMinify、sourcemap、chunkImportMap、rolldownOptions/*、dynamicImportVarsOptions、lib、license、manifest、ssrManifest、ssr、emitAssets、minify、terserOptions、write、emptyOutDir、copyPublicDir、reportCompressedSize、chunkSizeWarningLimit、watch。

#### Scenario: build 分组覆盖范围
- **WHEN** 查看 `build/` 目录
- **THEN** SHALL 包含至少 25 个子文件夹，对应所有 build 配置项

### Requirement: rolldownOptions 文档
`build/rolldownOptions/` 文件夹 SHALL 包含对 Rolldown 打包选项的文档，作为 `rollupOptions` 的替代。

#### Scenario: rolldownOptions 说明
- **WHEN** 查看 `build/rolldownOptions/README.md`
- **THEN** SHALL 说明这是 `rollupOptions` 的新名称，并指向 Rolldown 官方文档

### Requirement: rollupOptions 废弃标注
`build/rollupOptions/` 文件夹 SHALL 保留已有内容，但在 `README.md` 中标注废弃状态。

#### Scenario: 废弃标注内容
- **WHEN** 查看 `build/rollupOptions/README.md`
- **THEN** SHALL 包含废弃说明，指向 `build/rolldownOptions/` 作为替代

### Requirement: build.lib 文档
`build/lib/README.md` SHALL 包含库模式的完整配置说明，包括 entry、name、formats、fileName、cssFileName。

#### Scenario: lib 配置示例
- **WHEN** 查看 `build/lib/README.md`
- **THEN** SHALL 包含 ES 和 UMD 格式的库模式配置代码示例

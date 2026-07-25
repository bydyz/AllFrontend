## ADDED Requirements

### Requirement: optimizeDeps 配置分组文档
`optimizeDeps/` 文件夹 SHALL 包含所有依赖优化配置项的文档，覆盖 entries、exclude、include、rolldownOptions、force、noDiscovery、holdUntilCrawlEnd、needsInterop。

#### Scenario: optimizeDeps 分组覆盖范围
- **WHEN** 查看 `optimizeDeps/` 目录
- **THEN** SHALL 包含 8 个子文件夹，对应所有 optimizeDeps 配置项

### Requirement: optimizeDeps.include 文档
`optimizeDeps/include/README.md` SHALL 包含强制预构建链接包和深度导入通配符的用法。

#### Scenario: include 通配符用法
- **WHEN** 查看 `optimizeDeps/include/README.md`
- **THEN** SHALL 包含 `my-lib/components/**/*.vue` 形式的通配符配置示例

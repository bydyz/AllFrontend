## ADDED Requirements

### Requirement: worker 配置分组文档
`worker/` 文件夹 SHALL 包含所有 Worker 配置项的文档，覆盖 format、plugins、rolldownOptions。

#### Scenario: worker 分组覆盖范围
- **WHEN** 查看 `worker/` 目录
- **THEN** SHALL 包含 3 个子文件夹，对应所有 worker 配置项

### Requirement: worker.plugins 文档
`worker/plugins/README.md` SHALL 说明 worker 插件需要返回新实例的原因（并行构建）。

#### Scenario: worker.plugins 说明
- **WHEN** 查看 `worker/plugins/README.md`
- **THEN** SHALL 说明函数应返回新插件实例，因为 worker 构建是并行的

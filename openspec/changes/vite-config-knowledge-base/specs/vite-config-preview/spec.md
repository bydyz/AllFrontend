## ADDED Requirements

### Requirement: preview 配置分组文档
`preview/` 文件夹 SHALL 包含所有 Vite 预览服务器配置项的文档，覆盖 host、allowedHosts、port、strictPort、https、open、proxy、cors、headers。

#### Scenario: preview 分组覆盖范围
- **WHEN** 查看 `preview/` 目录
- **THEN** SHALL 包含 9 个子文件夹，对应所有 preview 配置项

### Requirement: preview 配置继承说明
每个 preview 配置项的 README.md SHALL 说明其与对应 server 配置项的默认继承关系。

#### Scenario: preview.port 继承说明
- **WHEN** 查看 `preview/port/README.md`
- **THEN** SHALL 说明默认值继承自 `server.port`，但 preview 默认为 4173

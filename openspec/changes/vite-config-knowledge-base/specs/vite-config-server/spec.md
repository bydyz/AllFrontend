## ADDED Requirements

### Requirement: server 配置分组文档
`server/` 文件夹 SHALL 包含所有 Vite 开发服务器配置项的文档，覆盖 host、allowedHosts、port、strictPort、https、open、proxy、cors、headers、hmr、ws、forwardConsole、warmup、watch、middlewareMode、fs/*、origin、sourcemapIgnoreList。

#### Scenario: server 分组覆盖范围
- **WHEN** 查看 `server/` 目录
- **THEN** SHALL 包含至少 18 个子文件夹，对应所有 server 配置项

### Requirement: server.proxy 文档
`server/proxy/README.md` SHALL 包含字符串简写、对象配置、正则匹配、WebSocket 代理四种配置方式。

#### Scenario: proxy 配置方式
- **WHEN** 查看 `server/proxy/README.md`
- **THEN** SHALL 包含至少 4 种配置方式的代码示例，每种示例带中文注释

### Requirement: server.fs 子配置文档
`server/fs/` 文件夹 SHALL 包含 strict、allow、deny 三个子配置的文档。

#### Scenario: server.fs.deny 文档
- **WHEN** 查看 `server/fs/deny/README.md`
- **THEN** SHALL 包含默认拒绝列表和安全注意事项的说明

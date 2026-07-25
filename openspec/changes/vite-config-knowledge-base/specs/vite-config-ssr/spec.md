## ADDED Requirements

### Requirement: ssr 配置分组文档
`ssr/` 文件夹 SHALL 包含所有 SSR 配置项的文档，覆盖 external、noExternal、target、resolve/*。

#### Scenario: ssr 分组覆盖范围
- **WHEN** 查看 `ssr/` 目录
- **THEN** SHALL 包含 4 个直接子文件夹和 `resolve/` 子目录（含 conditions、externalConditions、mainFields）

### Requirement: ssr.external 与 ssr.noExternal 优先级说明
`ssr/external/README.md` 和 `ssr/noExternal/README.md` SHALL 说明两者的优先级关系。

#### Scenario: 优先级说明
- **WHEN** 查看 `ssr/noExternal/README.md`
- **THEN** SHALL 说明当 `noExternal: true` 和 `external: true` 同时配置时，`noExternal` 优先

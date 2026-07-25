## ADDED Requirements

### Requirement: 根目录总览文档
知识库根目录 SHALL 包含一个 `README.md` 文件，作为整个 Vite 配置体系的总览入口。

#### Scenario: 总览文档内容
- **WHEN** 用户打开 `Vite_Configuration/README.md`
- **THEN** 文件 SHALL 包含 Vite 配置体系的整体介绍、7 大分组的目录索引、以及指向各分组的链接

### Requirement: 配置层级文件夹结构
知识库 SHALL 按照 `vite.config.js` 的配置层级创建文件夹，每个配置项一个独立文件夹。

#### Scenario: 顶层配置分组
- **WHEN** 查看 `Vite_Configuration/` 目录
- **THEN** SHALL 包含 `shared/`、`server/`、`build/`、`preview/`、`optimizeDeps/`、`ssr/`、`worker/`、`plugins/` 共 8 个顶层分组文件夹

#### Scenario: 嵌套配置层级
- **WHEN** 某配置项包含子配置（如 `build.rollupOptions`）
- **THEN** SHALL 在父配置文件夹下创建子配置文件夹（如 `build/rolldownOptions/`）

### Requirement: 每个配置文件夹包含 README.md
每个配置项文件夹 SHALL 包含一个 `README.md` 文件，作为该配置项的文档。

#### Scenario: README 文件存在
- **WHEN** 查看任意配置项文件夹
- **THEN** SHALL 包含 `README.md` 文件

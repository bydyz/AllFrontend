# Windows dir 命令详解

`dir` 是 Windows 命令行（CMD 和 PowerShell）中最基础的目录查看命令，用于列出文件夹中的文件和子目录。

---

## 一、基础语法

```cmd
dir [路径] [参数]
```

直接输入 `dir` 会显示当前目录下的所有文件和文件夹列表（含创建时间、大小等）。

---

## 二、常用参数（开关）

| 参数 | 作用 | 示例 |
|------|------|------|
| `/b` | 简洁格式（仅显示文件名/文件夹名） | `dir /b` |
| `/s` | 递归显示所有子目录 | `dir /s` |
| `/a` | 显示所有文件（含隐藏和系统文件） | `dir /a` |
| `/ad` | 仅显示文件夹 | `dir /ad` |
| `/a-d` | 仅显示文件（不显示文件夹） | `dir /a-d` |
| `/o` | 排序显示 | `dir /on`（按名称）、`dir /os`（按大小）、`dir /ot`（按修改时间） |
| `/o-` | 反向排序 | `dir /o-s`（大小降序）、`dir /o-t`（时间降序） |
| `/p` | 分页显示（一屏一停） | `dir /p` |
| `/w` | 宽格式显示（横向多列） | `dir /w` |
| `/x` | 显示短文件名（8.3格式） | `dir /x` |
| `/q` | 显示文件所有者 | `dir /q` |
| `/r` | 显示备用数据流 | `dir /r` |
| `/t` | 指定时间字段 | `dir /tc`（创建时间）、`dir /ta`（访问时间）、`dir /tw`（写入时间） |
| `/nc` | 不显示组名 | `dir /nc` |
| `/ns` | 不显示大小 | `dir /ns` |
| `/nd` | 不显示目录列表 | `dir /nd` |
| `/ne` | 不显示扩展名 | `dir /ne` |
| `/nf` | 不显示文件名 | `dir /nf` |

---

## 三、配合通配符使用

| 通配符 | 含义 | 示例 |
|--------|------|------|
| `*` | 任意多个字符 | `dir *.txt` 列出所有文本文件 |
| `?` | 单个字符 | `dir file?.doc` 匹配 file1.doc、file2.doc |

---

## 四、实用场景示例

| 目的 | 命令 |
|------|------|
| 列出 D 盘根目录所有文件（含子目录） | `dir D:\ /s` |
| 仅查看当前目录下的文件夹 | `dir /ad` |
| 按修改时间倒序查看（最新在最前） | `dir /o-d` |
| 导出文件列表到文本文件 | `dir /b > filelist.txt` |
| 查找包含 "report" 的文件夹 | `dir *report* /ad /s` |
| 查看所有隐藏文件 | `dir /a:h` |
| 查看所有系统文件 | `dir /a:s` |
| 查看所有只读文件 | `dir /a:r` |
| 查看大于 100MB 的文件 | `dir /a /s /o-s`（按大小排序后查看） |
| 统计当前目录文件数量 | `dir /b /a-d` 配合管道计数 |
| 只显示文件夹名（不含路径） | `dir /b /ad` |
| 递归列出所有 .js 文件 | `dir /s /b *.js` |

---

## 五、组合参数技巧

参数可以自由组合，常用组合：

```cmd
# 列出所有文件的完整路径（不含文件夹）
dir /a-d /b /s

# 递归查看所有文件夹，简洁格式
dir /ad /b /s

# 按大小降序排列，分页显示
dir /o-s /p

# 查看隐藏的系统文件
dir /a:hs
```

---

## 六、注意事项

1. **大小写不敏感**：`DIR` 和 `dir` 等效
2. **路径支持**：可以使用相对路径或绝对路径
3. **PowerShell 差异**：在 PowerShell 中 `dir` 是 `Get-ChildItem` 的别名，参数基本兼容，但部分高级功能有区别。若需纯 CMD 行为，可使用 `cmd /c dir`
4. **重定向**：输出可以重定向到文件（`>` 覆盖，`>>` 追加）
5. **管道操作**：可以与其他命令配合使用，如 `dir /b | find ".txt"`

---

## 七、与 PowerShell 的对比

| CMD dir | PowerShell Get-ChildItem |
|---------|--------------------------|
| `dir /b` | `Get-ChildItem -Name` |
| `dir /s` | `Get-ChildItem -Recurse` |
| `dir /ad` | `Get-ChildItem -Directory` |
| `dir /a-d` | `Get-ChildItem -File` |
| `dir /a:h` | `Get-ChildItem -Force` |
| `dir /o-s` | `Get-ChildItem \| Sort-Object Length -Descending` |

---

## 八、总结

`dir` 命令是 Windows 命令行的基础工具，掌握常用参数和通配符可以高效地进行文件管理。对于复杂场景，PowerShell 的 `Get-ChildItem` 提供了更强大的功能和更好的可读性。

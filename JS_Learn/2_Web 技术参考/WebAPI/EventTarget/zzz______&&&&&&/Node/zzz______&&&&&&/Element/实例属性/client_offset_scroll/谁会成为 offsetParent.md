# 谁会成为 offsetParent？

浏览器决定 offsetParent 有一套明确的规则，会从当前元素的父级开始，向上逐级查找，直到找到符合条件的祖先元素


## 规则

1. 如果某个祖先元素的 CSS position 属性值为 relative、absolute、fixed 或 sticky，它就会被选为 offsetParent
2. 如果向上遍历完所有祖先，都没有找到符合上述条件的定位元素，那么 offsetParent 就会是 `<body>` 元素。
3. 在表格相关的元素中，`<td>`、`<th>` 或 `<table>` 本身也可能成为 offsetParent
4. offsetParent 返回 null
    * 元素或其任意祖先的 display 属性为 none
    * 元素自身是 <body> 或 <html> 标签
    * 元素自身是 position: fixed 且其包含块是视口（viewport）


# 常见陷阱

1. `display: none` 的影响：如果元素或其祖先被隐藏（`display: none`），`offsetParent` 会返回 `null`，同时 `offsetTop/Left/Width/Height` 等属性也会变为 0
2. `display: contents` 的“幽灵”效应：`display: contents` 会使元素自身在盒模型中“消失”，其子元素会向上“继承”。此时，子元素的 `offsetParent` 会直接跳过这个“幽灵”元素，去查找更上层的有效祖先。
3. `transform` 的影响：当一个元素应用了 `transform`、`perspective` 或 `filter` 等CSS属性时，它会创建一个新的包含块（containing block）。即使这个元素本身没有设置 `position` 属性，它也可能成为其子元素的 `offsetParent`。
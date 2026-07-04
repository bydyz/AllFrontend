# WebAPI1

#### clientXXX、 offsetXXX、 scrollXXX

##### 一般情况
clientWidth、clientHeight           内容 + padding - 滚动条
clientTop                           border-top
clientLeft                          border-left


scrollWidth、scrollHeight           无滚动条时     等同于  clientXXX；有滚动条时     所有内容的宽度，高度，包含margin  border 等
scrollTop、scrollLeft               内容滚动的距离


offsetWidth、offsetHeight           内容 + padding + 滚动条 + border
offsetLeft、offsetTop               左边界到左边界，上边界到上边界
offsetParent                        client_offset_scroll\谁会成为 offsetParent.md

##### 特殊情况，暂不考虑
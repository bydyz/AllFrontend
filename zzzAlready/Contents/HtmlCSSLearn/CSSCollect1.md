# CSSCollect 文件 放置以下内容的展示

1. 文本阴影     `text-shadow: 8px 22px 1px red, 5px 5px 10px yellow, 35px 35px 10px blue, XXX;`

    第一个参数，可正可负可0  x轴
    第二个参数，可正可负可0  y轴
    第三个参数，可正可0  模糊度，0则完全不发散，数值越大越模糊
    第四个参数  阴影颜色

    ```css
    text-shadow: inherit;
    text-shadow: initial;
    text-shadow: unset;
    ```


2. 盒子阴影     `box-shadow: 8px 22px 1px 10px red, 5px 5px 10px 10px yellow, 35px 35px 10px 10px blue, XXX;`

    第一个参数，可正可负可0  x轴
    第二个参数，可正可负可0  y轴
    第三个参数，可正可0  阴影模糊半径，0则完全不发散，数值越大越模糊
    第四个参数，可正可负可0  阴影扩散半径；正值 视觉效果则是往外围扩大；负值  视觉效果则是缩小
    第五个参数，阴影颜色

    ```css
    text-shadow: inherit;
    text-shadow: initial;
    text-shadow: unset;
    ```


3. box-sizing.md
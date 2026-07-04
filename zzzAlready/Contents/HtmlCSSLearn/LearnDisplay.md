## flex grid

* `justify-content`   主轴上项目的对齐方式
* `justify-items`   控制  所有项目  相对于  自己所处框框  而言的，主轴方向上的排列；**flex无用**
* `justify-self`   控制  单个项目  相对于  自己所处框框  而言的，主轴方向上的排列；**flex无用**


* `align-content`   主轴在侧轴方向上的排列
* `align-items`    控制  所有项目  相对于  自己所处框框  而言的，侧轴方向上的排列
* `align-self`    控制  单个项目  相对于  自己所处框框  而言的，侧轴方向上的排列

### flex
  `justify-items` 、 `justify-self`  在 flex 中无用


### grid
  `grid-template-rows`, `grid-template-columns`  
    // 固定值  
      200px 200px 200px;  
      100px 200px auto;  
    // 百分比  
      33.3% 33.3% 33.4%;  
      1fr 50% 1fr;  
    // repeat  
      repeat(3, 33.33%);  
      repeat(auto-fill, 200px);  
      repeat(auto-fill, minmax(250px, 1fr));  
    // fr 单位  
      1fr 2fr 1fr;  
    // minmax  
      minmax(200px, auto);  
      minmax(100px, 200px) 200px 100px;  

  `gap`: 0;  

  `grid-column`: 1 / -1; /* 横跨所有列 */  
  `grid-row`: 1; /* 占据第一行 */  
  `grid-row`: span 2; /* 占两行 */  
  `grid-column`: span 2; /* 占两列 */  
  `grid-row`: 1 / span 2; /* 占两行 */  
  `grid-column`: 7 / span 6; /* 占6列 */  

  `grid-template-areas`:  
    "a e e"  
    "d e e"  
    "g h i";  
  `grid-area`: e;
<template>
  <div class="box">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
    <div>7</div>
    <div>8</div>
    <div>9</div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.box{
    width: 600px;
    height: 600px;
    border:5px solid gray;
    display: grid;
    grid-template-rows: repeat(3, 100px);
    grid-template-columns: repeat(3, 100px);

    grid-auto-flow: row; 
        /* 改变排列的顺序 */
        /* grid-auto-flow的属性值有column和row，默认自是row */


    justify-content: space-between;
        /* justify-content的属性值有start  end  center  stretch
                    space-around  space-between space-evenly */
        /* 作用的部分相当于主轴排列方式 */


    align-content: center;
        /* align-content的属性值有start  end  center  stretch
                    space-around  space-between space-evenly */
        /* 作用的部分相当于侧轴的排列方式 */

    /* place-content: center center; */
    /* place-content: <justify-content> <align-content>  复合式写法 */


    justify-items: stretch;
        /* justify-items的属性值有start  end  center  stretch */
        /* 默认设置格子中项目的水平位置 */

    align-items: center;
        /* align-items的属性值有start  end  center  stretch */
        /* 默认设置格子中项目的竖直位置 */

    /* place-items: center center; */
    /* place-items: <justify-items>  <align-items> */
    }

.box div{
    border:1px solid green;
    min-width: 50px;
    min-height: 50px;
}
</style>

<template>
  <div class="tableArea">
    <table>
      <thead>
        <tr>
          <th>服务项目</th>
          <th>服务内容</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td rowspan="4">安全建设咨询</td>
          <td>前期调研</td>
        </tr>
        <tr v-for="(item, index) in pageInfo.rowOneList" :key="`${index}a`">
          <td>{{ item }}</td>
        </tr>
        <tr>
          <td rowspan="5">定级备案咨询</td>
          <td>定级对象基本情况调研</td>
        </tr>
        <tr v-for="(item, index) in pageInfo.rowTwoList" :key="`${index}b`">
          <td>{{ item }}</td>
        </tr>
        <tr>
          <td rowspan="7">等级保护测评服务</td>
          <td>安全技术要求测评</td>
        </tr>
        <tr v-for="(item, index) in pageInfo.rowThreeList" :key="`${index}c`">
          <td>{{ item }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
let pageInfo = {
  title: "服务内容",
  rowOneList: ["从技术和管理层面对定级对象进行差距分析", "设计定级对象等级保护整体框架", "出具定级对象安全防护整改意见"],
  rowTwoList: ["协助用户确定定级对象安全等级", "协助用户编写定级报告、备案表", "协助用户召开定级专家评审会", "指导用户进行定级备案"],
  rowThreeList: ["安全管理要求测评", "云计算安全扩展要求测评", "移动互联安全扩展要求测评", "物联网安全扩展要求测评", "工业控制系统安全扩展要求测评", "大数据应用场景(安全扩展要求)测评"],
};
</script>

<style lang="scss" scope>
.tableArea {
  margin: 0 auto;
  width: 1200px;
  table {
    /*
    border-collapse CSS 属性是用来决定表格的边框是分开的还是合并的。在分隔模式下，相邻的单元格都拥有独立的边框。在合并模式下，相邻单元格共享边框

    collapse    合并
    separate    分隔
    */

    /*
    cellspacing 已弃用
      这个属性定义了水平和垂直方向上两个单元格之间空间的大小，使用百分比或像素，包括了表格的顶部与第一行的单元格、表的左边与第一列单元格、表的右边与最后一列的单元格、表的底部与最后一行单元格之间的空间。

      为了实现相似的效果，可以在 <table> 元素上使用 CSS 属性 border-spacing。border-spacing 在 border-collapse 设置为 collapse 时将无效。 */
    border-spacing: 0;
    width: 100%;
    thead {
      tr {
        height: 72px;
        background: #f8f9fb;
        th {
          border: 1px solid #f0f0f0;
        }
      }
    }

    tbody {
      tr {
        height: 50px;
        td {
          line-height: 50px;
          text-align: center;
          border: 1px solid #f0f0f0;
        }
      }
    }
  }
}
</style>

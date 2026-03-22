<template>
  <div class="h5_page">
    <div class="top_header bg-f2">
      <div class="header_title flex height-24 padding-left-16 padding-right-16 text-3 ">
        <div class="font-10 ">中国移动</div>
        <div class="font-10 ">4:20AM</div>
        <div class="font-10 ">WIFI</div>
      </div>
      <div class="header_title flex height-42 padding-left-16 padding-right-16 text-3 font-15">
        <div class="el-icon-close"></div>
        <div>首页</div>
        <div>···</div>
      </div>
    </div>
    <div class="bottom_nav flex ">
      <div
        class="bottom_nav_item flex column "
        v-for="(item,index) in options.menu"
        :key='index'
      >
        <el-avatar
          fit="cover"
          v-if='index===current'
          shape="square"
          size='small'
          :src="item.focusIconUrl"
        ></el-avatar>
        <el-avatar
          fit="cover"
          v-else
          shape="square"
          size='small'
          :src="item.iconUrl"
        ></el-avatar>

        <span>{{item.navbarName}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      current: 0,
    };
  },
};
</script>

<style scoped lang="stylus">
.h5_page {
  width: 360px;
  position: relative;
  height: 614px;
  background-color: GLOBAL_BACKGROUND_COLOR;

  .bottom_nav {
    background: NEUTRAL_COLOR_F;
    position: absolute;
    width: 360px;
    height: 65px;
    bottom: 0;
    justify-content: space-around;
    align-items: center;

    .bottom_nav_item {
      align-items: center;

      >>>.el-avatar {
        img {
          width: 100%;
        }
      }
    }
  }

  .header_title {
    align-items: center;
    justify-content: space-between;
  }
}
</style>
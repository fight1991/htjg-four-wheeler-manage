<template>
  <div class="container">
    <el-container class="outside-container">
      <el-aside :class="{'main-aside':true, 'open-duration': isDuration }" :width="$store.state.collapse ? '64px': distance + 'px'">
        <div class="aside-box">
          <div class="logo">
            <img :src="logoSrc">
            <div class="sys-text">电动自行车后台管理系统</div>
          </div>
          <layout-aside :startP="startP" :endP="endP" @getMoveDistance="getMoveDistance"></layout-aside>
        </div>
      </el-aside>
      <el-container class="main-container" v-loading="currentTabInfo.loadingNum > 0">
        <el-header class="main-header" height="70px">
          <layout-header @openEditpwDialog="openEditpwDialog"></layout-header>
          <layout-tab></layout-tab>
        </el-header>
        <el-main class="main-tab">
          <tab-view></tab-view>
        </el-main>
        <el-footer height="auto">
          <div class="copyright">Copyright ©2021 航天吉光科技有限公司,版权所有</div>
        </el-footer>
      </el-container>
    </el-container>
    <editpw-dialog :visible.sync="pwEditDialog"></editpw-dialog>
  </div>
</template>

<script>
import layoutHeader from '@/views/components/layout/header'
import layoutTab from '@/views/components/layout/myTab'
import layoutAside from '@/views/components/layout/sliderBar/aside'
import tabView from '@/views/components/layout/tabView'
import editpwDialog from '@/views/login/editpwDialog'
import { mapGetters } from 'vuex'
export default {
  name: 'router-main',
  components: {
    layoutHeader,
    layoutAside,
    tabView,
    layoutTab,
    editpwDialog
  },
  data () {
    return {
      pwEditDialog: false,
      logoSrc: require('@/assets/logo.png'),
      distance: 260,
      startP: 260,
      endP: 420
    }
  },
  created () {

  },
  computed: {
    isDuration () {
      return this.distance > this.initValue
    },
    ...mapGetters([
      'currentTabInfo'
    ])
  },
  methods: {
    btnClick () {

    },
    // 打开密码框
    openEditpwDialog () {
      this.pwEditDialog = true
    },
    getMoveDistance (x) {
      this.distance = x
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
}
.logo {
  display: flex;
  align-items: center;
  height: 70px;
  // padding-left: 10px;
  background-color: rgba(255,255,255,.1);
  box-sizing: border-box;
  img {
    width: 60px;
  }
  .sys-text {
    // flex: 1;
    min-width: 176px;
    margin-left: 4px;
    overflow: hidden;
    color: #f5f5f5;
    // margin-left: 15px;
    font-size: 16px;
  }
}
.outside-container {
  height: 100%;
}
.main-header {
  // background-color: @sys-main-header;
  background-color: #fff;
  position: relative;
  z-index: 3;
  box-shadow: 0 1px 4px rgba(0, 0, 0, .09);
  padding: 0;
  margin-bottom: 10px;
}
.aside-box {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: @sys-aside-bg;
}
.main-container {
  // overflow-x: auto;
  // overflow-y: hidden;
  // .main-inner {
  //   min-width: 600px;
  //   width: 100%;
  //   display: flex;
  //   flex-direction: column;
  // }
}
.main-tab {
  padding: 0;
  overflow: hidden;
}
.main-aside {
  border-right: 1px solid #ccc;
}
.copyright {
  text-align: center;
  font-size: 12px;
  color: @sys-input-placeholder;
  padding-bottom: 5px;
}
</style>

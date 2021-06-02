<template>
  <div class="tab-container">
    <el-tabs v-model="$store.state.tab.currentTab" type="card" @tab-remove="removeTab" @tab-click="tabClick">
      <template v-for="(item, index) in tabList">
        <el-tab-pane
          :closable="index > 0"
          :key="item.name + item.tabId"
          :name="item.name">

          <!-- 页签区域开始 -->
          <span slot="label" v-show="index==0"><i class="iconfont icon-home"></i></span>
          <span slot="label" v-show="index > 0">{{item.title}}</span>
          <!-- 页签区域结束 -->
        </el-tab-pane>
      </template>
    </el-tabs>
    <div class="tab-right">
      <el-dropdown trigger="click" @command="closeTab">
        <span class="el-dropdown-link">
          <i class="iconfont icon-caidan" title="操作页签"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command="1">关闭所有页签</el-dropdown-item>
          <el-dropdown-item :command="2">关闭其它页签</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'my-tab',
  data () {
    return {

    }
  },
  provide () {},
  computed: {
    ...mapState({
      tabList: state => state.tab.tabList,
      currentTab: state => state.tab.currentTab
    }),
    ...mapGetters([
      'currentTabInfo'
    ])
  },
  created () {},
  methods: {
    tabClick (tabInfo) {
      // tabInfo tab实例, .name得到tabId
      let { name, query, params } = this.tabList.find(v => v.name === tabInfo.name)
      if (name === this.$route.name) return
      this.$router.push({
        name,
        query,
        params
      })
    },
    removeTab (name) {
      if (name === this.currentTab) {
        this.$tab.closeActiveTab(name)
      } else {
        this.$tab.closeInactiveTab(name)
      }
    },
    closeTab (type) {
      if (type === 1) {
        this.$tab.closeAllTab()
      } else {
        this.$tab.closeOtherTab()
      }
    }
  }
}
</script>
<style lang="less" scoped>
.tab-refresh {
  text-align: center;
  cursor: pointer;
  .el-icon-refresh {
    margin-right: 4px;
  }
  font-size: 12px;
  &:hover {
    background-color: #f5f5f5;
    color: @sys-main-header;
  }
}
.el-dropdown-link i{
  cursor: pointer;
  font-size: 20px;
  line-height: 35px;
}
.el-icon-s-home {
  font-size: 20px;
  line-height: 30px;
}
.tab-container {
  position: relative;
  .tab-right {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 30px;
    overflow: hidden;
    border-left: 1px solid #E4E7ED;
    line-height: 30px;
    // text-align: center;
    position: absolute;
    z-index: 5;
    right: 0;
    top: 0;
  }
}
.copy-right {
  font-size: 12px;
  color: #ccc;
  margin-top: 10px;
  text-align: center;
  height: 16px;
}
</style>

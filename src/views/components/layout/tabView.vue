<template>
  <!-- 组件内容区域开始 -->
  <div class="tab-content-box">
    <template v-for="item in tabList">
      <div class="content-item" v-show="item.name === currentTab" :key="item.name + item.tabId">
        <el-scrollbar wrap-class="tab-scrollbar-wrapper">
          <div class="tab-content" v-if="item.isShow">
            <component :is="item.components[item.components.length-1]"></component>
            <!-- <div v-show="index>0" class="copy-right">版权所有</div> -->
          </div>
        </el-scrollbar>
      </div>
    </template>
    <!-- 组件内容区域结束 -->
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'tab-view',
  data () {
    return {

    }
  },
  provide () {
    return {
      reload: this.reload
    }
  },
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
    reload (item) {
      let tabInfo = item || this.currentTabInfo
      if (!tabInfo.isShow || tabInfo.loadingNum > 0) return // 节流
      tabInfo.isShow = false
      this.$nextTick(() => {
        tabInfo.isShow = true
      })
    }
  }
}
</script>
<style lang="less" scoped>
.tab-content-box,.content-item {
  height: 100%;
}

</style>

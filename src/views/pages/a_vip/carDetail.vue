<template>
  <section class="sys-main view-port-min bg-c">
    <div class="tab-content">
      <el-tabs>
        <el-tab-pane label="车辆信息" name="car">用户管理</el-tab-pane>
        <el-tab-pane label="会员信息" name="vip">用户管理</el-tab-pane>
        <el-tab-pane label="电子车牌" name="elec">用户管理</el-tab-pane>
      </el-tabs>
    </div>
  </section>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
<style lang="less" scoped>
.tab-content {
  padding: 20px;
}
</style>

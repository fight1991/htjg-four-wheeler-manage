<template>
  <section class="sys-main view-port-min bg-c">
    <card-box>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="电动自行车信息" name="car">
          <vehicle-detail :aid="accountId" :vid="vehicleId"></vehicle-detail>
        </el-tab-pane>
        <el-tab-pane label="车主信息" name="owner">
          <personal-detail :aid="accountId" :vid="vehicleId"></personal-detail>
        </el-tab-pane>
      </el-tabs>
    </card-box>
  </section>
</template>
<script>
import vehicleDetail from './components/vehicleDetail'
import personalDetail from './components/personalDetail'
export default {
  components: {
    vehicleDetail,
    personalDetail
  },
  created () {
    let { accountId, vehicleId } = this.$route.query
    this.accountId = accountId
    this.vehicleId = vehicleId
  },
  data () {
    return {
      activeName: 'car',
      accountId: '',
      vehicleId: '',
      busInfo: {}, // 电动自行车信息
      ownerInfo: {} // 车主信息
    }
  },
  methods: {
    handleClick () {}
  }
}
</script>
<style lang="less" scoped>
.img-box {
  padding-top: 40px;
  display: flex;
  align-items: center;
  .img-item {
    display: flex;
    align-items: flex-start;
    margin-right: 50px;
    .title {
      margin-right: 20px;
    }
  }
  .img-detail, .img {
    width: 200px;
    height: 200px;
  }
  .img-detail {
    background-color: @sys-bg;
  }
}
</style>

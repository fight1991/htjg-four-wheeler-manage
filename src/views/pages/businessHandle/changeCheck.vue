<template>
  <section class="sys-main view-port-min bg-c">
    <card-box>
      <!-- 表单回显区域 -->
      <div class="part-one">
        <el-form label-position="left" label-width="110px">
          <el-row :gutter="10">
            <el-col :sm="12" :md="8">
              <el-form-item label="车牌号码:">
                <div>{{detailForm.plateNo}}</div>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :md="8">
              <el-form-item label="整车编号:">
                <div>{{detailForm.vin}}</div>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :md="8">
              <el-form-item label="车辆品牌:">
                <div>{{detailForm.brand}}</div>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :md="8">
              <el-form-item label="型号规格:">
                <div>{{detailForm.specificationsModel}}</div>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :md="8">
              <el-form-item label="车辆属性:">
                <div>{{detailForm.properties == 'STANDARD' ? '国标' : '非国标'}}</div>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :md="8">
              <el-form-item label="原车主:">
                <div>{{detailForm.idName}}</div>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :md="8">
              <el-form-item label="原车主联系方式:">
                <div>{{detailForm.mobile}}</div>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :md="8">
              <el-form-item label="新车主:">
                <div>{{detailForm.idName2}}</div>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :md="8">
              <el-form-item label="新车主联系方式:">
                <div>{{detailForm.mobile2}}</div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- 审核意见区域 -->
      <div class="part-two">
        <check
          type="change"
          pageFlag="owner"
          :ways="''"
          :accountId="accountId"
          :vehicleId="vehicleId">
        </check>
      </div>
    </card-box>
  </section>
</template>
<script>
import check from './components/check'
import { changeDetail } from '@/api/operator'
export default {
  components: {
    check
  },
  data () {
    return {
      accountId: '',
      vehicleId: '',
      detailForm: {}
    }
  },
  created () {
    let { accountId, vehicleId } = this.$route.query
    this.accountId = accountId
    this.vehicleId = vehicleId
    this.getDetail()
  },
  methods: {
    // 获取详情
    async getDetail () {
      let { result } = await changeDetail({
        accountId: this.accountId,
        vehicleId: this.vehicleId
      })
      if (result) {
        this.detailForm = result
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>

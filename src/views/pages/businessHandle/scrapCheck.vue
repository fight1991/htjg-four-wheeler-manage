<template>
  <section class="sys-main view-port-min bg-c">
    <card-box>
      <!-- 表单回显区域 -->
      <div class="part-one">
        <el-form label-position="left" label-width="100px">
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
              <el-form-item label="申请人:">
                <div>{{detailForm.idName}}</div>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :md="8">
              <el-form-item label="申请时间:">
                <div>{{detailForm.createdTime}}</div>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :md="8">
              <el-form-item label="联系方式:">
                <div>{{detailForm.mobile}}</div>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :md="8">
              <el-form-item label="申请原因:">
                <div>{{detailForm.reason}}</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :sm="12" :md="8">
              <el-form-item label="车辆合格证:">
                <div class="img-detail">
                  <el-image class="img" fit="contain" :src="detailForm.urlCertification"></el-image>
                </div>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :md="8">
              <el-form-item label="车架号图片:">
                <div class="img-detail">
                  <el-image class="img" fit="contain" :src="detailForm.urlVin"></el-image>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- 审核意见区域 -->
      <div class="part-two">
        <check
          type="scrap"
          :ways="''"
          :pageFlag="pageFlag"
          :accountId="accountId"
          :vehicleId="vehicleId">
        </check>
      </div>
    </card-box>
  </section>
</template>
<script>
import check from './components/check'
import { scrapDetail, industryScrapDetail } from '@/api/operator'
const apiMap = {
  owner: scrapDetail,
  industry: industryScrapDetail
}
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
    let { accountId, vehicleId, pageFlag } = this.$route.query
    this.accountId = accountId
    this.vehicleId = vehicleId
    this.pageFlag = pageFlag
    this.getDetail()
  },
  methods: {
    // 获取详情
    async getDetail () {
      let { result } = await apiMap[this.pageFlag]({
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
.img-box {
  display: flex;
}
.img-detail {
  width: 100%;
  height: 250px;
}
.img {
  width: 100%;
  height: 100%;
}
.img-text {
  text-align: center;
  padding: 10px 0;
  font-size: 12px;
}
</style>

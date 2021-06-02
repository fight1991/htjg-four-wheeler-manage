<template>
  <!-- 表单回显区域 -->
  <div class="part-one">
    <el-form label-position="left" label-width="100px">
      <el-row :gutter="10">
        <el-col :sm="12" :md="8">
          <el-form-item label="车主姓名:">
            <div>{{detailForm.idName}}</div>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8">
          <el-form-item label="性别:">
            <div>{{detailForm.gender}}</div>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8">
          <el-form-item label="身份证:">
            <div>{{detailForm.idNo}}</div>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8">
          <el-form-item label="联系方式:">
            <div>{{detailForm.mobile}}</div>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8">
          <el-form-item label="联系地址:">
            <div>{{detailForm.cityCodeIndex && detailForm.cityCodeIndex.toString()}}</div>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8">
          <el-form-item label="详细地址:">
            <div>{{detailForm.contactAddress}}</div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { getBasicUserInfo } from '@/api/user'
export default {
  props: ['aid', 'vid'],
  data () {
    return {
      accountId: '',
      vehicleId: '',
      detailForm: {}
    }
  },
  mounted () {
    this.getDetail(this.aid, this.vid)
  },
  methods: {
    // 获取详情
    async getDetail (accountId, vehicleId) {
      let { result } = await getBasicUserInfo({
        accountId,
        vehicleId
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

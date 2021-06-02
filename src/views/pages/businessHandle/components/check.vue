<template>
  <div class="check-area">
    <el-form ref="form" :model="checkForm" :rules="rules" label-width="90px" label-position="left">
      <el-row :gutter="10">
        <div class="form-item">
          <el-form-item label="审核结果">
            <el-radio-group v-model="checkForm.status">
              <el-radio label="success">通过</el-radio>
              <el-radio label="failure">不通过</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
      </el-row>
      <el-row :gutter="10" v-show="checkForm.status == 'failure'">
        <div class="form-item">
          <el-form-item label="不通过原因" prop="failReason">
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              v-model="checkForm.failReason">
            </el-input>
          </el-form-item>
        </div>
      </el-row>
    </el-form>
    <!-- 提交按钮区域 -->
    <div class="submit-btn">
      <el-row type="flex" justify="center">
        <el-button type="primary" @click="submitBtn">提交</el-button>
        <el-button @click="cancelBtn">取消</el-button>
      </el-row>
    </div>
  </div>
</template>
<script>
import { recordCheck, scrapCheck, changeCheck, industryRecordCheck, industryScrapCheck } from '@/api/operator'
const opApi = {
  owner: {
    record: recordCheck,
    scrap: scrapCheck,
    change: changeCheck
  },
  industry: {
    record: industryRecordCheck,
    scrap: industryScrapCheck
  }
}
export default {
  name: 'my-check',
  // ways 0:邮寄到家、1:安装点安装
  props: ['type', 'ways', 'accountId', 'vehicleId', 'pageFlag'],
  data () {
    return {
      checkForm: {
        status: 'success',
        failReason: ''
      },
      rules: {
        failReason: [{ required: true, message: '原因必填', trigger: 'blur' }]
      }
    }
  },
  computed: {

  },
  methods: {
    // 表单提交
    async submitBtn () {
      let { failReason, status } = this.checkForm
      let isPass = true
      if (status === 'failure') { // 选择了审核不通过
        this.$refs.form.validate(valid => (isPass = valid))
      }
      if (!isPass) return
      let { result } = await opApi[this.pageFlag][this.type]({
        accountId: this.accountId,
        vehicleId: this.vehicleId,
        status,
        failReason
      })
      console.log(this.pageFlag, this.type)
      if (result) {
        let pageFlag = this.pageFlag || ''
        this.$tab.back({
          name: 'bus-businessH-' + pageFlag + this.type,
          refresh: true
        })
      }
    },
    // 取消按钮, 关闭当前页签, 并刷新返回列表页
    cancelBtn () {
      let pageFlag = this.pageFlag || ''
      this.$tab.back({
        name: 'bus-businessH-' + pageFlag + this.type
      })
    }
  }
}
</script>
<style lang="less" scoped>
.check-area {
  border-top: 1px solid #ccc;
  padding: 20px 0;
}
.form-item {
  width: 450px;
}
</style>

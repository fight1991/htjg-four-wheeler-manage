<template>
<div class="form-box">
  <el-form :model="formData" :rules="rules" label-width="130px" ref="form" label-position="left">
    <el-row>
      <el-col :span="24">
        <el-form-item label="安装员手机" prop="mobile">
          <el-select
            style="width:100%;"
            v-model="formData.mobile"
            filterable
            clearable
            remote
            default-first-option
            reserve-keyword
            placeholder="请输入手机号"
            :remote-method="remoteMethod"
            :loading="loading">
            <el-option
              v-for="item in options"
              :key="item.accountId"
              :label="item.mobile"
              :value="item.mobile">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</div>
</template>
<script>
import { operatorQuery, operatorAdd } from '@/api/operator'
export default {
  data () {
    return {
      options: [],
      formData: {
        mobile: ''
      },
      list: [],
      loading: false,
      rules: {
        mobile: [{ required: true, message: '请选择手机号', trigger: 'change' }]
      }
    }
  },
  computed: {
    currentAccountId () {
      let obj = this.options.find(v => v.mobile === this.formData.mobile)
      if (obj) {
        return obj.accountId
      } else {
        return ''
      }
    }
  },
  methods: {
    async remoteMethod (query) {
      // 输入4个字符开始模糊查询
      if (query && query.trim().length > 3) {
        // 显示loading
        this.loading = true
        await this.getOptions(query)
        this.loading = false
      } else {
        this.options = []
      }
    },
    // 获取模糊查询api
    async getOptions (query) {
      let { result } = await operatorQuery({
        mobile: query
      })
      if (result) {
        // list {accountId, mobile}
        let tempList = result
        if (tempList && tempList.length > 0) {
          this.options = tempList.slice(0, 5)
        } else {
          this.options = []
        }
      }
      return true
    },
    // 清除表单校验
    clearFormValid () {
      this.formData.mobile = ''
      this.$refs.form.clearValidate()
    },
    // 添加操作员
    async addInstaller () {
      let isPass = true
      this.$refs.form.validate(valid => (isPass = valid))
      if (!isPass) return
      let { result } = await operatorAdd({
        accountId: this.currentAccountId
      })
      if (result) {
        this.$message.success('添加成功!')
        // 清空输入值
        this.formData.mobile = ''
      }
      return result
    }
  }
}
</script>
<style lang="less" scoped>
.form-box {
  padding: 20px 40px 80px;
}
</style>

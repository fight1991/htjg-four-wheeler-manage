<template>
  <el-dialog
    title="会员详情"
    width="60%"
    @closed="closeDialog"
    @opened="openDialog"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :modal-append-to-body="false">
    <div class="box">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="line-item">
            <div class="left">注册手机号:</div>
            <div class="right">{{details.mobile || ''}}</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="line-item">
            <div class="left">姓名:</div>
            <div class="right">{{details.memberName || ''}}</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="line-item">
            <div class="left">身份证号:</div>
            <div class="right">{{details.idNo || ''}}</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="line-item">
            <div class="left">注册时间:</div>
            <div class="right">{{details.registerTime || ''}}</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>
<script>
import { memberDetail } from '@/api/user'
export default {
  props: ['visible', 'id'],
  data () {
    return {
      dialogVisible: false,
      details: {
        memberId: '',
        idNo: '',
        memberName: '',
        mobile: '',
        registerTime: ''
      }
    }
  },
  watch: {
    'visible': function (newData) {
      this.dialogVisible = newData
    }
  },
  methods: {
    closeDialog () {
      this.$emit('update:visible', false)
    },
    async openDialog () {
      if (!this.id) return
      let { result } = await memberDetail(this.id)
      if (result) {
        this.details = result
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .line-item {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    .left {
      margin-right: 10px;
    }
  }
</style>

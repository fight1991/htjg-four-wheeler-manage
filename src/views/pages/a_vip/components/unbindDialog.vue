<template>
  <el-dialog
    title="解绑"
    @closed="closeDialog"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :modal-append-to-body="false">
    <div class="box">
      <el-form label-width="80px" label-position="left" :model="dataForm">
        <el-row>
          <el-col :span="18" :offset="3">
            <el-form-item label="解绑原因:">
              <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入解绑原因"
                v-model="dataForm.reason">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="18" :offset="3">
            <el-form-item label="备注:">
              <div>解绑后该电子车牌将和原绑定车牌号失去绑定关系, 车主无法使用原绑定电子车牌进行相关操作, 请谨慎操作</div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-row type="flex" justify="center">
      <el-button @click="cancelBtn">取消</el-button>
      <el-button type="primary" @click="confirmBtn">确定</el-button>
    </el-row>
  </el-dialog>
</template>
<script>
import { eviUnbind } from '@/api/elec'
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
      },
      dataForm: {
        reason: ''
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
    cancelBtn () {
      this.dialogVisible = false
      this.$emit('update:visible', false)
      this.dataForm.reason = ''
    },
    async confirmBtn () {
      if (!this.dataForm.reason) {
        this.$message.warning('请填写原因')
        return
      }
      let { result } = await eviUnbind({
        ...this.dataForm,
        eviId: this.id
      })
      if (result) {
        this.$message.success('解绑成功')
        this.$emit('close')
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

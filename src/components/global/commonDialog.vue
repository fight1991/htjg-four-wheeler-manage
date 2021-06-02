<template>
  <div>
    <el-dialog
      :title="title"
      :width="width"
      @closed="closeDialog"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      :modal-append-to-body="false">
      <!-- 主要内容插槽 -->
      <slot></slot>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelBtn">取 消</el-button>
        <el-button type="primary" @click="confirmBtn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '标题'
    },
    width: {
      type: String,
      default: '600px'
    }
  },
  data () {
    return {
      dialogFormVisible: false
    }
  },
  watch: {
    'visible': function (newData) {
      this.dialogFormVisible = newData
    }
  },
  methods: {
    closeDialog () {
      this.$emit('update:visible', false)
      this.$emit('close')
    },
    cancelBtn () {
      this.$emit('cancelBtn')
    },
    confirmBtn () {
      this.$emit('confirmBtn')
    }
  }
}
</script>
<style lang="less" scoped>

</style>

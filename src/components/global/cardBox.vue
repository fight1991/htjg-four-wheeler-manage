<template>
  <el-card class="box-card" :shadow="shadow">
    <div v-if="showHeader" slot="header" class="clearfix">
      <slot name="left"></slot>
      <div style="float: right; padding: 3px 0" type="text">
        <slot name="right"></slot>
      </div>
    </div>
    <slot></slot>
  </el-card>
</template>
<script>
export default {
  props: {
    showHeader: {
      type: Boolean,
      default: false
    },
    shadow: {
      type: String,
      default: 'none'
    }
  }
}
</script>
<style lang="less" scoped>
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>

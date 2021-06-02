<template>
  <div class="box">
    <span :style="{'color': color}">
      <slot></slot>
    </span>
    <el-divider v-if="showDivider" direction="vertical"></el-divider>
  </div>
</template>
<script>
export default {
  props: {
    showDivider: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: '#1890FF'
    }
  },
  data () {
    return {

    }
  }
}
</script>
<style lang="less" scoped>
.text-color {
  color: @sys-theme;
}
.box {
  display: inline-block;
  cursor: pointer;
}
</style>

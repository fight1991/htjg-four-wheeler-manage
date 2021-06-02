<template>
  <div class="box" :style="pos">
    <div class="label"
      :style="'width:' + labelWidth +';' + 'text-align:' + labelPosition + ';'">
      {{label + ':'}}
    </div>
    <div class="value">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      value: ''
    },
    align: {
      type: String,
      value: 'center'
    },
    labelPosition: {
      type: String,
      value: 'left'
    },
    labelWidth: {
      type: String,
      value: 'auto'
    }
  },
  data () {
    return {
      alignObj: {
        center: 'align-items: center;',
        start: 'align-items: flex-start',
        end: 'align-items: flex-end'
      }
    }
  },
  computed: {
    pos () {
      return this.alignObj[this.align]
    }
  }
}
</script>
<style lang="less" scoped>
  .box {
    display: flex;
    padding: 10px 0;
  }
  .label {
    margin-right: 5px;
  }
  .value {
    padding: 0 5px;
  }
</style>

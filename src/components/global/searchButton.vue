
<script>
export default {
  components: {},
  data () {
    return {}
  },
  methods: {
    setTitle (icon) {
      switch (icon) {
        case 'icon-clear':
          return '重置'
        case 'icon-search':
          return '查询'
        case 'icon-hs_close':
          return '普通查询'
        case 'icon-hs_open':
          return '高级查询'
        default:
          return ''
      }
    }
  },
  render (createElement) {
    return createElement(
      'el-button',
      {
        attrs: {
          type: this.type,
          icon: 'iconfont ' + this.icon,
          size: 'mini',
          title: this.setTitle(this.icon) || this.title
        },
        on: {
          click: (e) => {
            this.$emit('click', e)
          }
        }
      }
    )
  },
  props: {
    type: {
      default: ''
    },
    icon: {
      default: 'icon-search'
    },
    title: {
      default: ''
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类

</style>

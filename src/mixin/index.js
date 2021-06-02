import { translateDic } from '@/api/dictionary'
export default {
  data () {
    return {
      pickerTimeOptions: {
        disabledDate (time) {
          // return time.getTime() > Date.now()
          return false
        }
      }
    }
  },
  created () {

  },
  computed: {

  },
  methods: {
    // 保留2位有效小数
    toFixed (data, abs, num = 2) {
      if (!data || isNaN(Number(data))) return 0
      let temp = Number(data)
      if (Math.abs(temp) < 0.01) { // 防止出现-0.002 --> -0.00
        return 0
      }
      if (abs) {
        return Math.abs(temp.toFixed(num))
      }
      return temp.toFixed(num)
    },
    translateDic: translateDic
  }
}

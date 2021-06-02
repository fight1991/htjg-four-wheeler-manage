export default {
  data () {
    return {
      industryList: []
    }
  },
  methods: {
    async initIndustryList () {
      let res = await this.translateDic('industry', 'list')
      this.industryList = res || []
      return true
    }
  }
}

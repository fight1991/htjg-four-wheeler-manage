export default {
  data () {
    return {
      countryShortName: '',
      timer: null,
      gMapAdress: { // 谷歌地图暂存容器
        country: '', // 国家
        administrative_area_level_1: '', // 省
        locality: '', // 市
        placeId: '',
        lat: '',
        lng: ''
      }
    }
  },
  mounted () {},
  methods: {
    // 加载地图
    importMap () {
      this.$refs.gaodeMap.loadMap().then(this.initAMap)
    },
    // 初始化高德地图
    initAMap ({ AMap, map }) {
      let $input = this.$refs['place-map']
      $input.focus()
      var autoComplete = new AMap.Autocomplete({
        input: $input
      })
      // var placeSearch = new AMap.PlaceSearch({ map })
      AMap.event.addListener(autoComplete, 'select', (e) => {
        // TODO 针对选中的poi实现自己的功能
        this.isSelectMap = true
        this.resetPosition()
        // placeSearch.search(e.poi.name)
        // 添加marker
        this.dataForm.address = e.poi.name
        addMarker(e.poi.location)
        var geocoder = new AMap.Geocoder()
        let { lng, lat } = e.poi.location
        geocoder.getAddress([lng, lat], (status, result) => {
          if (status === 'complete' && result.regeocode) {
            var addressObj = result.regeocode.addressComponent
            this.countryShortName = 'CN'
            let { citycode, city } = addressObj
            this.initGaodeForm({ lat, lng, citycode, city })
          }
        })
        this.timer = setTimeout(() => {
          document.documentElement.click()
        }, 300)
      })
      // 编辑 初始化地图
      if (this.opType === 'edit') {
        let { latitude, longitude } = this.dataForm
        addMarker([Number(longitude), Number(latitude)])
      }
      function addMarker (position) {
        var marker = new AMap.Marker({
          map,
          position: position
        })
        map.setCenter(marker.getPosition())
      }
    },
    initGaodeForm ({ lat, lng, citycode, city }) {
      this.dataForm.latitude = lat
      this.dataForm.longitude = lng
      this.dataForm.cityCode = citycode
      this.dataForm.cityName = city
    },
    resetPosition () {
      this.dataForm.cityCode = ''
      this.dataForm.latitude = ''
      this.dataForm.longitude = ''
      this.dataForm.cityName = ''
    }
  }
}

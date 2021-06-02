<template>
  <section class="sys-main view-port-min bg-c">
    <div class="content">
      <el-form size="mini" ref="form" :rules="rules" label-width="140px" label-position="right" :model="dataForm">
        <el-row :gutter="30">
          <el-col :lg="8" :md="12">
            <el-form-item label="企业名称" prop="orgName">
              <el-input v-model="dataForm.orgName" :disabled="inputController" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="12">
            <el-form-item label="所属行业" prop="industry">
              <el-select v-model="dataForm.industry" :disabled="inputController" style="width:100%">
                <el-option
                  v-for="item in industryList"
                  :key="item.code"
                  :label="item.value"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="12">
            <el-form-item label="联系人" prop="contactName">
              <el-input v-model="dataForm.contactName" :disabled="inputController" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="12">
            <el-form-item label="联系电话" prop="contactMobile">
              <el-input v-model="dataForm.contactMobile" :disabled="inputController" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="12">
            <el-form-item label="门店地址" prop="address">
              <el-input v-model="dataForm.address" :disabled="inputController" clearable></el-input>
              <el-popover
                @show="importMap()"
                popper-class="map-popper"
                placement="bottom"
                :disabled="inputController"
                trigger="click">
                <span title="在地图上查找地址" class="chooseMap-btn" slot="reference" v-show="!inputController"><i class="map-icon el-icon-location-information"></i></span>
                <div class="map-place">
                  <div class="input-box flex-vertical-center">
                    <span class="key-word">关键词</span>
                    <input class="native-input" ref="place-map" @change="addressChange" @blur="addressBlur" v-model="dataForm.address">
                  </div>
                  <a-map ref="gaodeMap" :autoGps="opType=='add'"></a-map>
                </div>
              </el-popover>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="12">
            <el-form-item label="管理员账号" prop="adminMobile">
              <el-input v-model="dataForm.adminMobile" :disabled="inputController" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="12">
            <el-form-item label="管理员身份证" prop="adminIdNo">
              <el-input v-model="dataForm.adminIdNo" :disabled="inputController" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :lg="8" :md="12">
            <el-form-item label="是否分部">
              <el-radio-group v-model="dataForm.branch" :disabled="inputController">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="12">
            <el-form-item label="统一社会信用代码" prop="socialCreditCode">
              <el-input v-model="dataForm.socialCreditCode" :disabled="inputController" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="12" v-if="!dataForm.branch">
            <el-form-item label="总部名称" prop="headquarters">
              <el-input v-model="dataForm.headquarters" :disabled="inputController" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :lg="8" :md="12">
            <el-form-item label="门店照">
              <!-- urlOrgImage -->
              <upload :src.sync="dataForm.urlOrgImage" :isDisabled="inputController"></upload>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="12">
              <!-- urlBusinessLicense -->
            <el-form-item label="营业执照">
              <upload :src.sync="dataForm.urlBusinessLicense" :isDisabled="inputController"></upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row type="flex" justify="center" class="button-area" v-if="!inputController">
        <el-button size="small" @click="cancelBtn">取消</el-button>
        <el-button size="small" type="primary" @click="saveBtn">保存</el-button>
      </el-row>
    </div>
  </section>
</template>
<script>
import { orgAdd, orgDetail, orgEdit } from '@/api/org'
import aMap from '@/views/components/aMap'
import mapMethods from './mixins/mapMethods'
import common from './mixins/common'
const apiObj = {
  add: orgAdd,
  edit: orgEdit
}
export default {
  mixins: [mapMethods, common],
  components: {
    aMap
  },
  data () {
    return {
      opType: 'add', // 记录操作类型
      isSelectMap: false,
      dataForm: {
        orgName: '',
        nickName: '',
        industry: '',
        longitude: '',
        latitude: '',
        contactName: '',
        contactMobile: '',
        address: '',
        adminMobile: '',
        adminIdNo: '',
        branch: true,
        cityCode: '',
        cityName: '',
        socialCreditCode: '',
        headquarters: '',
        urlOrgImage: '',
        urlBusinessLicense: ''
      },
      copyForm: {},
      rules: {
        orgName: [{ required: true, message: '必填', trigger: 'blur' }],
        industry: [{ required: true, message: '必填', trigger: 'change' }],
        contactName: [{ required: true, message: '必填', trigger: 'blur' }],
        contactMobile: [
          { required: true, message: '必填', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '格式为11位的手机号', trigger: 'blur' }
        ],
        address: [{ required: true, message: '必填', trigger: 'blur' }],
        adminMobile: [{ required: true, message: '必填', trigger: 'blur' }],
        adminIdNo: [
          { required: true, message: '必填', trigger: 'blur' },
          { pattern: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/, message: '格式不正确', trigger: 'blur' }
        ],
        branch: true,
        socialCreditCode: [{ required: true, message: '必填', trigger: 'blur' }],
        headquarters: [{ required: true, message: '必填', trigger: 'blur' }]
      }
    }
  },
  computed: {
    inputController () {
      return this.opType === 'look'
    }
  },
  async created () {
    let { opType, orgId } = this.$route.query
    this.opType = opType
    await this.initIndustryList()
    if (opType !== 'add') {
      this.getDetail(orgId)
      this.isSelectMap = true
    }
  },
  methods: {
    // 查询详情
    async getDetail (id) {
      let { result } = await orgDetail(id)
      if (result) {
        this.dataForm = result
        this.copyForm = result
      }
    },
    async saveBtn () {
      let isPass = this.validForm()
      if (!isPass) return
      let { result } = await apiObj[this.opType](this.dataForm)
      if (result) {
        this.$message.success('操作成功!')
        this.$tab.back({
          name: 'bus-businessD-corpList',
          refresh: true
        })
      }
    },
    async cancelBtn () {
      let res = await this.$openConfirm({
        content: '您确定要放弃本次操作吗?'
      })
      if (!res) return
      if (this.opType === 'add') {
        this.dataForm = {}
        this.dataForm.branch = true
      }
      if (this.opType === 'edit') {
        this.dataForm = JSON.parse(JSON.stringify(this.copyForm))
      }
    },
    // 表单校验
    validForm () {
      let isPass = true
      this.$refs.form.validate(valid => (isPass = valid))
      if (!isPass) return false
      let { urlOrgImage, urlBusinessLicense } = this.dataForm
      if (!urlOrgImage) {
        this.$message.error('请上传门店照')
        return false
      }
      if (!urlBusinessLicense) {
        this.$message.error('请上传营业执照')
        return false
      }
      return true
    },
    addressBlur () {
      if (!this.isSelectMap) {
        this.dataForm.address = ''
      }
    },
    addressChange (e) {
      this.isSelectMap = false
      if (!e.target.value) {
        this.dataForm.cityCode = ''
        this.dataForm.cityName = ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .content {
    padding: 40px;
  }
  .button-area {
    padding-top: 50px;
  }
  .map-icon {
    font-size: 22px;
    color: @sys-theme;
    cursor: pointer;
    padding: 3px 5px 0;
    transition: all 1s;
    &:hover {
      transform: scale(1.2);
    }
  }
  .chooseMap-btn {
    position: absolute;
    top: 0;
    right: -35px;
  }
  .map-place {
    height: 300px;
    width: 400px;
    position: relative;
    .input-box {
      box-shadow: 0 2px 6px 0 rgba(114, 124, 245, .5);
      position: absolute;
      top: 10px;
      left: 10px;
      z-index: 667;
      padding: 10px;
      font-size: 12px;
      background-color: #fff;
      .key-word {
        background-color: #e9ecef;
        border: 1px solid #ced4da;
        border-right: none;
      }
      .native-input, .key-word{
        box-sizing: border-box;
        height: 24px;
        padding: 2px;
      }
    }
  }
</style>

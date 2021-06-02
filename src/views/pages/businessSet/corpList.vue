<template>
  <section class="sys-main view-port-min">
    <!-- 查询区域 -->
    <search-bar>
      <el-form size="mini" label-width="70px" label-position="left" :model="searchForm">
        <el-row :gutter="30">
          <el-col :lg="8" :md="12">
            <el-form-item label="城市">
              <el-select
                style="width:100%;"
                v-model="searchForm.cityCode"
                filterable clearable>
                <el-option
                  v-for="item in cityList"
                  :key="item.cityCode"
                  :label="item.cityName"
                  :value="item.cityCode">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="12">
            <el-form-item label="所属行业">
              <el-select
                style="width:100%;"
                v-model="searchForm.industry"
                filterable clearable>
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
            <el-form-item label="上线状态">
              <el-select v-model="searchForm.orgStatus" style="width:100%">
                <el-option label="上线" value="online"></el-option>
                <el-option label="下线" value="offline"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="12">
            <el-form-item label="搜索词">
              <el-input v-model="searchForm.searchKey" clearable placeholder="企业名称、联系人、联系电话"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="12">
            <el-form-item label="创建时间">
              <el-date-picker
                clearable
                style="width:100%"
                v-model="times"
                align="right"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                :picker-options="pickerTimeOptions"
                :default-time="['00:00:00', '23:59:59']"
                type="datetimerange">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="12" align="right">
            <el-button size="mini" @click="reset">重置</el-button>
            <el-button size="mini" type="primary" @click="search">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </search-bar>
    <!-- 表格区域 -->
    <func-bar>
      <el-row class="table-btn" type="flex" justify="start">
        <el-button size="mini" icon="iconfont icon-add" @click="routeTo({}, 'add', '新增')">添加</el-button>
      </el-row>
      <common-table :tableHeadData="tableHead" :tableList="resultList">
        <template #op="{row}">
          <div class="btn-list">
            <cell-btn color="#0ADD9E" @click.native="routeTo(row, 'edit', '编辑')">编辑</cell-btn>
            <cell-btn color="#FA6400" @click.native="updateStatus(row)">{{row.orgStatus == 'offline' ? '上线' : '下线'}}</cell-btn>
            <cell-btn @click.native="routeTo(row, 'look', '详情')">详情</cell-btn>
          </div>
        </template>
        <template #orgStatus="{row}">
          {{row.orgStatus === 'offline' ? '下线' : '上线'}}
        </template>
      </common-table>
      <div class="page-list">
        <page-box :pagination.sync="pagination" @change="getList"></page-box>
      </div>
    </func-bar>
  </section>
</template>
<script>
import { orgList, updateOrgStatus, cityList } from '@/api/org'
import common from './mixins/common'
export default {
  mixins: [common],
  data () {
    return {
      cityList: [],
      industryList: [],
      searchForm: {
        cityCode: '',
        createdTimeEnd: '',
        createdTimeStart: '',
        industry: '',
        orgStatus: '',
        searchKey: ''
      },
      times: [],
      resultList: [],
      pagination: {
        pageSize: 10,
        pageIndex: 1,
        total: 0
      },
      tableHead: [
        {
          label: '城市',
          prop: 'cityName',
          checked: true
        },
        {
          label: '企业名称',
          prop: 'orgName',
          checked: true,
          width: 180
        },
        {
          label: '所属行业',
          prop: 'industry',
          checked: true
        },
        {
          label: '门店地址',
          prop: 'address',
          checked: true
        },
        {
          label: '联系人',
          checked: true,
          prop: 'contactName'
        },
        {
          label: '联系电话',
          checked: true,
          prop: 'contactMobile'
        },
        {
          label: '上线状态',
          checked: true,
          prop: 'orgStatus',
          slotName: 'orgStatus'
        },
        {
          label: '创建时间',
          checked: true,
          prop: 'createdTime',
          width: 180
        },
        {
          label: '操作',
          checked: true,
          slotName: 'op',
          width: 120,
          fixed: 'right'
        }
      ]
    }
  },
  async created () {
    this.search()
    this.initIndustryList()
  },
  methods: {
    reset () {
      this.searchForm = {
        cityCode: '',
        createdTimeEnd: '',
        createdTimeStart: '',
        industry: '',
        orgStatus: '',
        searchKey: ''
      }
      this.times = []
      this.search()
    },
    search () {
      this.pagination.pageIndex = 1
      this.getList(this.pagination)
    },
    // 获取列表
    async getList (pagination) {
      let { result, page } = await orgList({
        page: pagination,
        data: this.searchForm
      })
      if (result) {
        this.resultList = result || []
        this.pagination.total = page.total
        this.pagination.pageIndex = page.pageIndex
        this.pagination.pageSize = page.pageSize
      }
    },
    // 初始化城市下拉列表
    async initCityList () {
      let { result } = await cityList()
      this.cityList = result || []
    },
    // 下线
    async updateStatus ({ orgId, orgStatus }) {
      let { result } = await updateOrgStatus({
        orgStatus: orgStatus === 'offline' ? 'online' : 'offline',
        orgId
      })
      if (result) {
        this.search()
      }
    },
    // 跳转到相关详情页面
    routeTo (row, type, title) {
      this.$tab.replace({
        name: 'bus-businessD-corpOption',
        tabTitle: '企业' + title,
        query: {
          opType: type,
          orgId: row.orgId || ''
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.btn-list {
  justify-content: space-around;
  display: flex;
}
</style>

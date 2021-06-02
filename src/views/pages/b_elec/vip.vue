<template>
  <section class="sys-main view-port-min">
    <!-- 查询区域 -->
    <search-bar>
      <el-form size="mini" label-width="70px" label-position="left" :model="searchForm">
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="车牌号">
              <el-input v-model="searchForm.plateNo" clearable placeholder="请输入车牌号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="整车编号">
              <el-input v-model="searchForm.vin" clearable placeholder="请输入整车编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
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
          <el-col :span="24" align="right">
            <el-button size="mini" @click="reset">重置</el-button>
            <el-button size="mini" type="primary" @click="search">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </search-bar>
    <!-- 表格区域 -->
    <func-bar>
      <common-table :tableHeadData="tableHead" :tableList="resultList">
        <template #op="{row}">
          <cell-btn @click.native="routeTo(row)">详情</cell-btn>
        </template>
      </common-table>
      <div class="page-list">
        <page-box :pagination.sync="pagination" @change="getList"></page-box>
      </div>
    </func-bar>
  </section>
</template>
<script>
import { vehicleList } from '@/api/operator'
export default {
  data () {
    return {
      searchForm: {
        plateNo: '',
        vin: '',
        registrationTimeStart: '',
        registrationTimeEnd: ''
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
          label: '车牌号',
          prop: 'plateNo',
          checked: true
        },
        {
          label: '车辆品牌',
          prop: 'brand',
          checked: true
        },
        {
          label: '整车编号',
          prop: 'vin',
          checked: true
        },
        {
          label: '车主名',
          prop: 'idName',
          checked: true
        },
        {
          label: '登记时间',
          prop: 'registrationTime',
          checked: true
        },
        {
          label: '操作',
          checked: true,
          slotName: 'op',
          fixed: 'right'
        }
      ]
    }
  },
  created () {
    this.search()
  },
  methods: {
    routeTo (row) {
      let { accountId, vehicleId } = row
      this.$tab.replace({
        name: 'bus-data-detail',
        query: {
          accountId,
          vehicleId
        }
      })
    },
    reset () {
      this.searchForm = {
        plateNo: '',
        vin: '',
        registrationTimeStart: '',
        registrationTimeEnd: ''
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
      if (this.times && this.times.length > 0) {
        this.searchForm.registrationTimeStart = this.times[0]
        this.searchForm.registrationTimeEnd = this.times[1]
      } else {
        this.searchForm.registrationTimeStart = ''
        this.searchForm.registrationTimeEnd = ''
      }
      let { result, page } = await vehicleList({
        page: pagination,
        data: this.searchForm
      })
      if (result) {
        this.resultList = result || []
        this.pagination.total = page.total
        this.pagination.pageIndex = page.pageIndex
        this.pagination.pageSize = page.pageSize
      }
    }
  }
}
</script>
<style lang="less" scoped>
</style>

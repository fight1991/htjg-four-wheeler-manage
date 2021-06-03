<template>
  <section class="sys-main view-port-min">
    <!-- 查询区域 -->
    <search-bar>
      <el-form size="mini" label-width="80px" label-position="left" :model="searchForm">
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="号牌种类">
              <el-select v-model="searchForm.plateColor" style="width:100%;">
                <el-option label="蓝牌" value="蓝牌"></el-option>
                <el-option label="绿牌" value="绿牌"></el-option>
                <el-option label="黄牌" value="黄牌"></el-option>
                <el-option label="黄绿牌" value="黄绿牌"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态">
              <el-select v-model="searchForm.status" style="width:100%;">
                <el-option label="已解绑" value="unbind"></el-option>
                <el-option label="已绑定" value="bind"></el-option>
                <el-option label="已申请" value="apply"></el-option>
                <el-option label="未申请" value="notApply"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="搜索词">
              <el-input v-model="searchForm.searchStr" clearable placeholder="请输入电子车牌/号牌号码"></el-input>
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
          <cell-btn @click.native="routeToDetailPage(row)">详情</cell-btn>
          <cell-btn color="#FA6400" v-if="row.status=='bind'" @click.native="unbindBtn(row)">解绑</cell-btn>
        </template>
        <template #status="{row}">
          {{mapStatus[row.status]}}
        </template>
      </common-table>
      <div class="page-list">
        <page-box :pagination.sync="pagination" @change="getList"></page-box>
      </div>
    </func-bar>
    <unbind-dialog :visible.sync="unbindVisible" :id="currentId" @close="search"></unbind-dialog>
  </section>
</template>
<script>
import { carList } from '@/api/elec'
import unbindDialog from './components/unbindDialog'
export default {
  components: {
    unbindDialog
  },
  data () {
    return {
      unbindVisible: false,
      currentId: '',
      searchForm: {
        searchStr: '',
        status: '',
        plateColor: ''
      },
      resultList: [],
      pagination: {
        pageSize: 10,
        pageIndex: 1,
        total: 0
      },
      mapStatus: {
        unbind: '已解绑',
        bind: '已绑定',
        apply: '已申请',
        notApply: '未申请'
      },
      tableHead: [
        {
          label: '号码号牌',
          prop: 'plateNo',
          checked: true
        },
        {
          label: '电子车牌',
          prop: 'eviId',
          checked: true
        },
        {
          label: '号牌种类',
          prop: 'plateColor',
          checked: true
        },
        {
          label: '车辆识别代号',
          prop: 'vin',
          checked: true
        },
        {
          label: '发动机号',
          prop: 'engineNumber',
          checked: true
        },
        {
          label: '车主',
          prop: 'ownerName',
          checked: true
        },
        {
          label: '申领人',
          prop: 'claimant',
          checked: true
        },
        {
          label: '状态',
          prop: 'status',
          checked: true,
          slotName: 'status'
        },
        {
          label: '注册时间',
          prop: 'registerTime',
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
    reset () {
      this.searchForm = {
        searchStr: '',
        status: '',
        plateColor: ''
      }
      this.search()
    },
    search () {
      this.pagination.pageIndex = 1
      this.getList(this.pagination)
    },
    // 获取列表
    async getList (pagination) {
      let { result, page } = await carList({
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
    async unbindBtn (row) {
      let { eviId } = row
      this.currentId = eviId
      this.unbindVisible = true
    },
    routeToDetailPage (row) {
      this.$tab.replace({
        name: 'vip-carDetail',
        query: {
          id: row.eviId
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>

<template>
  <section class="sys-main view-port-min">
    <!-- 查询区域 -->
    <search-bar>
      <el-form size="mini" label-width="80px" label-position="left" :model="searchForm">
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="注册手机号">
              <el-input v-model="searchForm.mobile" clearable placeholder="请输入手机号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="姓名">
              <el-input v-model="searchForm.memberName" clearable placeholder="请输入会员姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="注册时间">
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
          <cell-btn @click.native="openDialog(row)">详情</cell-btn>
        </template>
        <template #realName="{row}">
          {{row.realName ? '是' : '否'}}
        </template>
      </common-table>
      <div class="page-list">
        <page-box :pagination.sync="pagination" @change="getList"></page-box>
      </div>
    </func-bar>
    <detail-dialog :visible.sync="detailDialogVisible" :id="currentMemberId"></detail-dialog>
  </section>
</template>
<script>
import { memberList } from '@/api/user'
import detailDialog from './components/vipDetailDialog'
export default {
  components: {
    detailDialog
  },
  data () {
    return {
      detailDialogVisible: false,
      currentMemberId: '',
      searchForm: {
        memberName: '',
        mobile: '',
        startTime: '',
        endTime: ''
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
          label: '会员ID',
          prop: 'memberId',
          checked: true
        },
        {
          label: '注册手机号',
          prop: 'mobile',
          checked: true
        },
        {
          label: '是否实名认证',
          prop: 'realName',
          checked: true,
          slotName: 'realName'
        },
        {
          label: '姓名',
          prop: 'memberName',
          checked: true
        },
        {
          label: '身份证号',
          prop: 'idNo',
          checked: true
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
    openDialog (row) {
      let { memberId } = row
      this.currentMemberId = memberId
      this.detailDialogVisible = true
    },
    reset () {
      this.searchForm = {
        memberName: '',
        mobile: '',
        startTime: '',
        endTime: ''
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
        this.searchForm.startTime = this.times[0]
        this.searchForm.endTime = this.times[1]
      } else {
        this.searchForm.startTime = ''
        this.searchForm.endTime = ''
      }
      let { result, page } = await memberList({
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

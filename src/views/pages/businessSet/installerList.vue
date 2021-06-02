<template>
  <section class="sys-main view-port-min">
    <!-- 查询区域 -->
    <search-bar>
      <el-form size="mini" label-width="70px" label-position="left" :model="searchForm">
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="姓名">
              <el-input v-model="searchForm.idName" clearable placeholder="请输入姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号">
              <el-input v-model="searchForm.mobile" clearable placeholder="请输入手机号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="身份证号">
              <el-input v-model="searchForm.idNo" clearable placeholder="请输入身份证号"></el-input>
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
      <el-row class="table-btn" type="flex" justify="start">
        <el-button size="mini" icon="iconfont icon-add" @click="openDialog">添加</el-button>
      </el-row>
      <common-table :tableHeadData="tableHead" :tableList="resultList">
        <template #op="{row}">
          <cell-btn color="red" @click.native="deleteBtn(row)">删除</cell-btn>
        </template>
      </common-table>
      <div class="page-list">
        <page-box :pagination.sync="pagination" @change="getList"></page-box>
      </div>
    </func-bar>
    <!-- 添加安装员的dialog -->
    <common-dialog
      :visible.sync="addDialogVisible"
      @close="closeDialog"
      @cancelBtn="cancelBtn"
      @confirmBtn="confirmBtn"
      title="安装员添加">
      <add-installer-form ref="installerForm"></add-installer-form>
    </common-dialog>
  </section>
</template>
<script>
import { operatorList, operatorDelete } from '@/api/operator'
import AddInstallerForm from './components/addInstallerForm.vue'
export default {
  components: { AddInstallerForm },
  data () {
    return {
      searchForm: {
        createdTime: '',
        idName: '',
        idNo: '',
        mobile: ''
      },
      addDialogVisible: false, // 安装员添加dialog
      resultList: [],
      pagination: {
        pageSize: 10,
        pageIndex: 1,
        total: 0
      },
      tableHead: [
        {
          label: '姓名',
          prop: 'idName',
          checked: true
        },
        {
          label: '手机号',
          prop: 'mobile',
          checked: true
        },
        {
          label: '身份证号',
          prop: 'idNo',
          checked: true
        },
        {
          label: '创建时间',
          prop: 'createdTime',
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
        createdTime: '',
        idName: '',
        idNo: '',
        mobile: ''
      }
      this.search()
    },
    search () {
      this.pagination.pageIndex = 1
      this.getList(this.pagination)
    },
    // 获取列表
    async getList (pagination) {
      let { result, page } = await operatorList({
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
    // 打开添加安装员dialog
    openDialog () {
      this.addDialogVisible = true
    },
    // 弹框取消
    cancelBtn () {
      this.addDialogVisible = false
    },
    // 弹框关闭
    closeDialog () {
      this.$refs.installerForm.clearFormValid()
    },
    // 弹框中的确认按钮
    async confirmBtn () {
      let res = await this.$refs.installerForm.addInstaller()
      // 添加成功, 关闭dialog, 并刷新列表
      if (res) {
        this.addDialogVisible = false
        this.search()
      }
    },
    // 删除安装员
    async deleteBtn (row) {
      let res = await this.$openConfirm({
        content: '您确定要删除吗?'
      })
      if (!res) return
      let { accountId } = row
      let { result } = await operatorDelete({
        accountId
      })
      if (result) {
        this.$message.success('删除成功!')
        this.search()
      }
    }
  }
}
</script>
<style lang="less" scoped>
</style>

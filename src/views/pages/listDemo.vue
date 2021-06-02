<template>
  <section class="sys-main">
    <!-- 查询区域 -->
    <search-bar>
      <el-form size="mini" label-width="70px" label-position="left" :model="searchForm">
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="姓名">
              <el-input v-model="searchForm.version" placeholder="请输入姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号">
              <el-input v-model="searchForm.version" placeholder="请输入手机号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="身份证号">
              <el-input v-model="searchForm.version" placeholder="请输入身份证号"></el-input>
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
        <el-button size="mini" icon="iconfont icon-import">添加</el-button>
      </el-row>
      <common-table :tableHeadData="tableHead" :tableList="resultList">
        <template v-slot:op="{row}">
          删除
        </template>
      </common-table>
      <div class="page-list">
        <page-box :pagination.sync="pagination" @change="getList"></page-box>
      </div>
    </func-bar>
  </section>
</template>
<script>
export default {
  data () {
    return {
      searchForm: {
        version: '',
        type: '',
        status: ''
      },
      typeList: [],
      statusList: [],
      resultList: [
        { type: '张三' },
        { type: '张三' },
        { type: '张三' }
      ],
      selection: [],
      pagination: {
        pageSize: 10,
        pageIndex: 1,
        total: 50
      },
      tableHead: [
        {
          label: '姓名',
          prop: 'type',
          checked: true
        },
        {
          label: '手机号',
          prop: 'type',
          checked: true
        },
        {
          label: '身份证号',
          prop: 'type',
          checked: true
        },
        {
          label: '创建时间',
          prop: 'type',
          checked: true
        },
        {
          label: '操作',
          checked: true,
          slotName: 'op'
        }
      ]
    }
  },
  methods: {
    reset () {
      this.searchForm = {
        version: '',
        type: '',
        status: ''
      }
      this.search()
    },
    search () {
      this.pagination.pageIndex = 1
      this.getList(this.pagination)
    },
    // 获取列表
    async getList (pagination) {
      this.selection = []
      let { result, page } = await this.$post({
        url: '/c/v0/module/list',
        data: this.searchForm,
        page: pagination
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

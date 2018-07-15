<template>
  <el-card class="box-card">
    <!-- 1 面包屑 -->
    <my-brand level1="权限管理" levle2="角色列表" class="brands"></my-brand>
    <el-row>
      <el-col :span="24">
        <el-input
        placeholder="请输入内容"
        class="search">
        <!-- 搜索功能 -->
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" plain @click="dialogFormVisible = true">添加</el-button>
      </el-col>
    </el-row>
    <!-- 2 表格部分 -->
    <el-table
      border
      style="width: 100%"
      :data="list"
      >
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="180">
      </el-table-column>
      <el-table-column
        prop="level"
          label="层级"
          width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.level === '0'">一级</span>
            <span v-else-if="scope.row.level === '1'">二级</span>
            <span v-else-if="scope.row.level === '2'">三级</span>
          </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    async loadData () {
      // 发送请求前, 获取 token
      // const token = sessionStorage.getItem('token')
      // // 在请求头中设置 token
      // this.$http.defaults.headers.common['Authorization'] = token
      const res = await this.$http.get('rights/list')
      const data = res.data
      this.list = data.data
    }
  }
}
</script>

<style>
.box-card {
  height: 100%;
  overflow: auto;
  background-color: #e9eef3;
}

.el-card__body {
  padding: 0;
}

.box-card .brands {
  height: 45px;
  line-height: 45px;
  background-color: #d3dce6;
  padding-left: 10px;
}

.search {
  width: 300px;
  margin-top: 10px;
  margin-bottom: 5px;
}
</style>

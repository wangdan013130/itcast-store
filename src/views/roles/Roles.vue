<template>
  <el-card class="box-card">
    <my-brandcrum level1="权限管理" levle2="角色列表" class="brands"></my-brandcrum>
    <el-button>添加角色</el-button>
    <!-- 3 表格显示 -->
     <el-table
      :data="list"
      border
      highlight-current-row
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="250">
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="角色描述"
        width="250">
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
      // resData 是服务器返回的数据
      // const res = await this.$http.get('roles')
      // console.log(res)
      const {data: resData} = await this.$http.get('roles')
      const {data, meta: {status, msg}} = resData
      if (status === 200) {
        this.$message.success(msg)
        this.list = data
      } else {
        this.$message.success(msg)
      }
    }
  }
}
</script>

<style>
.box-card {
  height: 100%;
  overflow: auto;
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
</style>

<template>
  <el-card class="box-card">
    <!-- 1 面包屑 -->
   <my-brandcrum level1="权限管理" levle2="角色列表" class="brands"></my-brandcrum>
   <el-button type="success" plain>添加分类</el-button>
   <!-- 3 表格 -->
    <el-table
    ref="cateGory"
    :data="list"
    border
    highlight-current-row
    style="width: 100%">
    <el-table-column
      prop="cat_name"
      label="分类名称"
      width="250">
    </el-table-column>
    <el-table-column
      label="级别"
      width="200">
      <template slot-scope="scope">
        <span v-if="scope.row.cat_level === 0">一级</span>
        <span v-if="scope.row.cat_level === 1">二级</span>
        <span v-if="scope.row.cat_level === 2">三级</span>
      </template>
    </el-table-column>
    <el-table-column
      width="180"
      label="是否有效">
      <template slot-scope="scope">
        {{scope.row.cat_deleted ? '有效' : '无效'}}
      </template>
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
        <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
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
      const {data: resData} = await this.$http.get('categories?type=1')
      // console.log(resData)
      const {meta: {status, msg}, data} = resData
      if (status === 200) {
        this.$message.success(msg)
        this.list = data
      } else {
        this.$message.error(msg)
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

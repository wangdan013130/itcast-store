<template>
  <el-card>
    <!-- 1 面包屑 -->
    <my-brand-crum level1="商品管理" levle2="商品列表"></my-brand-crum>
    <!-- 2 搜索框 -->
    <el-row>
      <el-col :span="24">
        <el-input placeholder="请输入内容" class="searchBtn" clearable>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="primary" plain>添加商品</el-button>
      </el-col>
    </el-row>
    <!-- 3 表格部分 -->
    <el-table
      :data="list"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="name"
        label="商品名称"
        width="400">
      </el-table-column>
      <el-table-column
        prop="province"
        label="商品价格(元)"
        width="150">
      </el-table-column>
      <el-table-column
        prop="city"
        label="商品重量"
        width="150">
      </el-table-column>
      <el-table-column
        prop="address"
        label="创建时间"
        width="150">
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 4 分页部分 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>
</template>

<script>
  export default {
    data () {
      return {
        list: [],
        // 分页所需数据
        pagenum: 1,
        pagesize: 10,
        total: ''
      }
    },
    created () {
      this.loadData()
    },
    methods: {
      async loadData () {

      }
    }
  } 
</script>

<style>
.searchBtn {
  width: 350px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>

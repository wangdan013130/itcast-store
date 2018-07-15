<template>
  <el-card>
    <!-- 1 面包屑 -->
    <my-brand level1="商品管理" levle2="商品列表"></my-brand>
    <!-- 2 搜索框 -->
    <el-row>
      <el-col :span="24">
        <el-input placeholder="请输入内容" class="searchBtn" clearable>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="primary" plain @click="$router.push({name: 'goods-add'})">添加商品</el-button>
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
        prop="goods_name"
        label="商品名称"
        width="380">
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格(元)"
        width="120">
      </el-table-column>
      <el-table-column
        prop="goods_weight"
        label="商品重量"
        width="120">
      </el-table-column>
      <el-table-column
        prop="upd_time"
        label="创建时间"
        width="150">
        <template slot-scope="scope">
          {{scope.row.upd_time | getTime('YYYY-MM-DD')}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="150">
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
      :current-page.sync="pagenum"
      :page-sizes="[20, 40, 60, 80]"
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
      pagesize: 5,
      total: 0
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    // 加载分页数据
    handleSizeChange (val) {
      this.pagesize = val
      this.loadData()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.loadData()
      console.log(`当前页: ${val}`)
    },
    async loadData () {
      // 此处应将 type 改为 3,  获取到完整数据
      const {data: resData} = await this.$http.get(`goods?pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      console.log(resData)
      const {data, meta: {status, msg}} = resData
      if (status === 200) {
        this.list = data.goods
        this.total = data.goods.total
      } else {
        this.$message.error(msg)
      }
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

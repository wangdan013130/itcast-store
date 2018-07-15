<template>
  <el-card class="box-card">
    <my-brand level1="权限管理" levle2="角色列表" class="brands"></my-brand>
    <el-table
      border=""
      :data="list"
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="order_number"
        label="订单编号"
        width="250">
      </el-table-column>
      <el-table-column
        prop="order_price"
        label="订单价格"
        width="120">
      </el-table-column>
      <el-table-column
        prop="city"
        label="是否付款"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="300">
      </el-table-column>
      <el-table-column
        prop="zip"
        label="邮编"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData4)"
            type="text"
            size="small">
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list : []
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    loadData () {

    }
  }
}
</script>

<style>
.box-card {
  height: 100%;
}
</style>

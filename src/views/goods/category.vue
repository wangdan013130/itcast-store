<template>
  <el-card class="box-card">
    <!-- 1 面包屑 -->
    <my-brandcrum level1="权限管理" levle2="角色列表" class="brands"></my-brandcrum>
    <el-button type="success" plain>添加分类</el-button>
    <!-- 3 表格 -->
    <el-table
      :data="list"
      border
      style="width: 100%">
      <!-- tree grid 
      treeKey 绑定到id，给每一个节点设置一个唯一值
      parentKey 绑定到父id属性，区分父子节点
      levelKey 绑定到层级的属性
      childKey 绑定到存储子元素的属性-->
      <el-tree-grid
        label="分类名称"
        prop="cat_name"
        treeKey="cat_id"
        parentKey="cat_pid"
        levelKey="cat_level"
        childKey="children"
        :indentSize="30">
      </el-tree-grid>
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
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" plain size="mini"  @click="dialogHandleCategory = true"></el-button>
          <el-button type="danger" icon="el-icon-delete" plain size="mini" @click="handleDelete(scope.row.cat_id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 4 分页部分 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pagenum"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- 5 弹出修改部分-->

  </el-card>
</template>

<script>
// 下载包 , 引入包
import ElTreeGrid from 'element-tree-grid'

export default {
  data () {
    return {
      list: [],
      // 配置分页所需数据,
      pagenum: 1,
      pagesize: 10,
      total: 0,
      // 设置修改隐藏框显示与隐藏所需数据
      dialogHandleCategory: true
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
      const {data: resData} = await this.$http.get(`categories?type=3&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      // console.log(resData)
      const {meta: {status, msg}} = resData
      const {data: {result, total}} = resData
      if (status === 200) {
        this.$message.success(msg)
        this.list = result
        this.total = total
      }
    },
    // 删除分类数据
    handleDelete (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const {data: resData} = await this.$http.delete(`categories/${id}`)
        const {meta: {status, msg}} = resData
        if (status === 200) {
          this.$message.success(msg)
          this.loadData()
        } else {
          this.$message.error(msg)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })        
      })
    },
    // 修改分类数据
    handleEditCategory (id) {

    }
  },
  components: {
    ElTreeGrid
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

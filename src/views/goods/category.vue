<template>
  <el-card class="box-card">
    <!-- 1 面包屑 -->
    <my-brand level1="权限管理" levle2="角色列表" class="brands"></my-brand>
    <el-button type="success" plain @click="handleAddDialg">添加分类</el-button>
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
          <el-button type="primary" icon="el-icon-edit" plain size="mini"  @click="handleEditCategory(scope.row.cat_id)"></el-button>
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
    <el-dialog title="编辑商品名称" :visible.sync="dialogHandleCategory">
      <el-form label-width="100px" data="fromData">
        <el-form-item label="名称分类">
          <el-input auto-complete="off" v-model="fromData.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogHandleCategory = false">取 消</el-button>
        <el-button type="primary" @click="handleEditRoles(fromData.cat_id)">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 6 弹出添加分类部分 -->
    <el-dialog title="添加商品分类" :visible.sync="dialogFormAdd">
      <el-form :model="formAdd" label-width="100px" ref="addForm">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="formAdd.cat_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类名称">
          <el-cascader
            expand-trigger="hover"
            change-on-select
            clearable
            placeholder="默认是一级分类"
            :options="options"
            :props="{
              value: 'cat_id',
              label: 'cat_name',
              children: 'children'
            }"
            v-model="selectedOptions">
          </el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormAdd = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>
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
      dialogHandleCategory: false,
      fromData: {
        cat_name: ''
      },
      dialogFormAdd: false,
      formAdd: {
        cat_name: ''
      },
      options: [],
      selectedOptions: []
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
    async handleEditCategory (id) {
      this.dialogHandleCategory = true
      const {data: resData} = await this.$http.get(`categories/${id}`)
      const {data, meta: {status, msg}} = resData
      if (status === 200) {
        this.$message.success(msg)
        this.fromData = data
      }
    },
    // 修改角色权限
    async handleEditRoles (id) {
      const {data: resData} = await this.$http.put(`categories/${id}`, {
        cat_name: this.fromData.cat_name
      })
      const {meta: {status, msg}} = resData
      if (status === 200) {
        this.$message.success(msg)
        this.dialogHandleCategory = false
        this.loadData()
      } else {
        this.$message.error(msg)
      }
    },
    // 获取添加分类三级联动所需数据
    async handleAddDialg () {
      this.dialogFormAdd = true
      // 获取商品分类数据绑定到级联动
      const {data: resData} = await this.$http.get('categories', {
        params: {
          type: 2
        }
      })
      const {data, meta: {status, msg}} = resData
      if (status === 200) {
        this.$message.success(msg)
        this.options = data
        console.log(data)
      } else {
        this.$message.error(msg)
      }
    },
    // 添加分类
    async handleAdd () {
      // 如果没有选择任何节点，则 cat_pid 是 0
      let catPid = 0
      if (this.selectedOptions[0]) {
        catPid = this.selectedOptions[this.selectedOptions.length - 1]
      }
      const fromData = {
        ...this.formAdd,
        cat_pid: catPid,
        cat_level: this.selectedOptions.length
      }
      console.log(fromData)
      const {data: resData} = await this.$http.post('categories', fromData)
      const {meta: {status, msg}} = resData
      console.log(resData)
      if (status === 201) {
        this.$message.success(msg)
        this.loadData()
        this.$refs['addForm'].resetFields()
        this.dialogFormAdd = false
      } else {
        this.$message.error(msg)
      }
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

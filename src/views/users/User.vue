<template>
  <el-card class="box-card">
    <!-- 1. 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 2 搜索框 -->
    <el-row>
      <el-col :span="24">
        <el-input
        placeholder="请输入内容"
        v-model="searchValue"
        class="search">
        <!-- 搜索功能 -->
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
        <el-button type="success" plain @click="dialogFormVisible = true">添加</el-button>
      </el-col>
    </el-row>
    <!-- 3 表格 -->
    <el-table
      :data="list"
      height="400"
      border
      style="width: 100%"
      :v-loading="loading">
      <el-table-column
      type="index"
      width="50">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="100">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
        width="180">
      </el-table-column>
      <el-table-column
        label="用户状态"
        width="180">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="创建日期"
        width="180">
        <template slot-scope="scope">
          <!--  scope.row 就是当前行绑定的数据对象 -->
          {{scope.row.create_time | getTime('YYYY-MM-DD')}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-row>
            <el-button type="success" icon="el-icon-edit" size="mini" plain  @click="handleShowEditDialog(scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDeleteUser(scope.row.id)" plain></el-button>
            <el-button type="success" icon="el-icon-check" size="mini" plain @click="handleSelectRoles(scope.row)"></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <!-- 4 分页部分 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- 5 添加部分弹出框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form
        :rules="rules"
        ref="myform"
        label-width="100px"
        :model="formData">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formData.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formData.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddUser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 6 修改部分弹出框 -->
    <el-dialog title="修改用户" :visible.sync="editUserDialogVisible">
      <el-form
        :rules="rules"
        ref="myform"
        :model="formData">
        <el-form-item  label="用户名" prop="username">
          <el-input disabled v-model="formData.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formData.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formData.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editUserDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 7  分配角色选择框-->
      <el-dialog title="分配角色" :visible.sync="handleSelectRole">
      <el-form
        :rules="rules"
        ref="myform">
        <el-form-item  label="当前用户" prop="username">
          {{currentUsername}}
        </el-form-item>
        <el-form-item label="请选择角色">
         <el-select v-model="currentRoleId">
            <!-- 注意：下拉框绑定的值的类型，应该跟option的value的值的类型是一致的 -->
            <el-option disabled label="请选择" :value="-1"></el-option>
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.roleName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleSelectRole = false">取 消</el-button>
        <el-button type="primary" @click="handleEditRoles">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      // 用户状态参数
      value2: true,
      // 页面加载需要的参数
      loading: true,
      // 分页所需参数
      pagesize: 2,
      currentPage: 1,
      total: 8,
      // 搜索所需数据
      searchValue: '',
      // 关闭添加框所需数据
      dialogTableVisible: false,
      dialogFormVisible: false,
      // 添加用户所需数据
      formData: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 验证用户是否输入合法规则
      rules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ]
      },
      // 控制修改用户框的隐藏与显示
      editUserDialogVisible: false,
      // 控制角色选择框的隐藏与显示
      handleSelectRole: false,
      // 角色分配所需数据
      currentUsername: '',
      currentUserId: -1,
      currentRoleId: -1,
      roles: []
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    // 用户列表数据加载
    async loadData () {
      const token = sessionStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = token
      // 用 query 将要查询的数据传递过去
      const res = await this.$http.get(`users?pagenum=${this.currentPage}&pagesize=${this.pagesize}&query=${this.searchValue}`)
      // 请求头中携带 token
      const data = res.data
      const {meta: {status, msg}} = data
      if (status === 200) {
        this.$message.success(msg)
        const {data: {users, total}} = data
        this.total = total
        console.log(total)
        this.list = users
        this.loading = false
      } else {
        this.$message.error(msg)
      }
    },
    // 分页部分
    handleSizeChange (val) {
      this.pagesize = val
      this.loadData()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.loadData()
      console.log(`当前页: ${val}`)
    },
    // 搜索功能
    handleSearch () {
      this.loadData()
    },
    // 删除功能
    // 提示是否删除,发送请求
    async handleDeleteUser (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`users/${id}`)
        const data = res.data
        const {meta: {status, msg}} = data
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
    // 添加用户
    async handleAddUser () {
      // 表单的 DOM对象 this.$refs.myform
      this.$refs.myform.validate(async (valid) => {
        if (!valid) {
          return this.$message.error('请完整输入内容')
        }
        const res = await this.$http.post('users', this.formData)
        // 相当于回调函数中的处理
        const data = res.data
        const {meta: {status, msg}} = data
        if (status === 201) {
          this.$message.success(msg)
          // 添加成功
          // 删除对话框, 清除输入框,重新加载页面
          this.dialogFormVisible = false
          this.loadData()
          for (let key in this.formData) {
            this.formData[key] = ''
          }
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 修改用户数据展示
    handleShowEditDialog (users) {
      // 将原有数据放入表格中
      this.editUserDialogVisible = true
      this.formData = users
      this.currentUserId = users.id
    },
    // 点击确定按钮,修改用户
    async handleEdit () {
      const res = await this.$http.put(`users/${this.formData.id}`, {
        email: this.formData.email,
        mobile: this.formData.mobile
      })
      const data = res.data
      console.log(data)
      const {meta: {status, msg}} = data
      if (status === 200) {
        this.$message.success(msg)
        this.loadData()
        this.editUserDialogVisible = false
      } else {
        this.$message.error(msg)
      }
    },
    // 分配角色展示
    async handleSelectRoles (users) {
      this.handleSelectRole = true
      this.currentUsername = users.username
      const res = await this.$http.get('roles')
      this.roles = res.data.data
      // 根据用户id 获取角色
      const res1 = await this.$http.get(`users/${users.id}`)
      this.currentRoleId = res1.data.data.rid
    },
    // 分配角色修改
    async handleEditRoles () {
      const res = await this.$http.put(`users/${this.currentUserId}/role`, {
        rid: this.currentRoleId
      })
      const data = res.data
      const {meta: {status, msg}} = data
      if (status === 200) {
        this.$message.success(msg)
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
  background-color: #e9eef3;
}
.search {
  width: 300px;
  margin-top: 10px;
  margin-bottom: 5px;
}
</style>

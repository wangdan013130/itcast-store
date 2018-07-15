<template>
  <el-card class="box-card">
    <my-brand level1="权限管理" levle2="角色列表" class="brands"></my-brand>
    <el-button>添加角色</el-button>
    <!-- 3 表格显示 -->
     <el-table
      v-loading="loading"
      :data="list"
      border
      highlight-current-row
      style="width: 100%">
      <el-table-column type="expand" class="rowRoles">
        <!-- 展开列  -->
        <template slot-scope="scope">
          <el-row
            v-for="item in scope.row.children"
            :key="item.id">
            <el-col :span="4">
              <!-- 一级分类数据 -->
              <!-- 测试删除角色某个权限 -->
              <!-- <el-tag
                @close="handleColse"
                closable>
                <span>djkajlk</span>
              </el-tag> -->
              <el-tag
                @close="handleCloseRoles(scope.row, item.id)"
                closable>
                <span>{{item.authName}}</span>
              </el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <!-- 二级分类数据 -->
            <el-col :span="20">
              <el-row
                v-for="item1 in item.children"
                :key="item1.id">
                <el-col :span="4">
                  <el-tag
                  type="success"
                  @close="handleCloseRoles(scope.row, item1.id)"
                  closable>
                  <!-- 动态编辑标签可以通过点击标签关闭按钮后触发的 close 事件来实现 -->
                    <span>{{item1.authName}}</span>
                  </el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <!-- 三级分类数据 -->
                <el-col :span="20">
                  <el-tag
                    v-for="item2 in item1.children"
                    :key="item2.id"
                    type="warning"
                    @close="handleCloseRoles(scope.row, item2.id)"
                    closable
                    class="tagRoles">
                    <span>{{item2.authName}}</span>
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <!-- 设置无权限样式 -->
          <el-row v-if="scope.row.children.length === 0">
            <el-col>没有分配权限</el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="350">
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="角色描述"
        width="350">
      </el-table-column>
      <el-table-column
        label="操作"
        width="350">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
          <el-button @click="handleOpenRolesDialog(scope.row)" type="success" icon="el-icon-check" plain size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 4 分配权限树节点显示 -->
    <el-dialog
      title="分配权限"
      :visible.sync="dialogVisible"
      @open="handleOpenRoles">
      <!-- data :提供树形数据   props: 数据中显示的属性-->
      <!-- default-expanded-keys和default-checked-keys
        使用时必须设置node-key，其值为节点数据中的一个字段名，
        该字段在整棵树中是唯一的。 -->
      <el-tree
        ref="tree"
        :data="treeData"
        :props="defaultProps"
        v-loading="loadingTree"
        show-checkbox
        default-expand-all
        node-key="id"
        :default-checked-keys="checkList">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditRoles">确 定</el-button>
      </span>
      <!-- data : 提供树形数据   props: 设置数据中展示的属性 -->
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      // 页面加载所需数据
      loading: true,
      loadingTree: true,
      expand: true,
      // 设置分配角色权限的显示与隐藏
      dialogVisible: false,
      // 设置分配列表 tree 所需数据
      treeData: [],
      // 配置要展示数据中的哪个属性
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      // 获取要选择的节点
      checkList: [],
      // 记录当前修改的角色 id
      currentRoleId: -1
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    // 加载列表所需数据
    async loadData () {
      // resData 是服务器返回的数据
      // const res = await this.$http.get('roles')
      // console.log(res)
      this.loading = true
      const {data: resData} = await this.$http.get('roles')
      this.loading = false
      const {data, meta: {status, msg}} = resData
      if (status === 200) {
        this.$message.success(msg)
        this.list = data
      } else {
        this.$message.success(msg)
      }
    },
    // 测试删除角色某个权限
    // handleColse () {
    //   alert('确定删除吗?')
    // },
    // 删除角色某个权限
    async handleCloseRoles (role, rightId) {
      console.log('关闭')
      // 返回数据,返回当前所有拥有的角色信息
      const {data: resData} = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
      const {meta: {status, msg}, data} = resData
      // console.log(resData)
      if (status === 200) {
        // 删除成功, 重新加载当前数据
        this.$message.success(msg)
        // 重新获取用户分配的数据
        role.children = data
      } else {
        this.$message.error(msg)
      }
    },
    // 获取所有权限
    async handleOpenRoles () {
      this.loadingTree = true
      const {data: resData} = await this.$http.get('rights/tree')
      this.loadingTree = false
      const { data } = resData
      this.treeData = data
    },
    // 获取当前角色权限并实现勾选
    async handleOpenRolesDialog (roles) {
      this.dialogVisible = true
      // 记录下角色 id , 分配权限时使用
      this.currentRoleId = roles.id
      // 获取当前角色所拥有的权限的 id
      // 遍历一级权限
      const arr = []
      roles.children.forEach((item1) => {
        // 遍历二级权限
        item1.children.forEach((item2) => {
          // 遍历三级权限
          item2.children.forEach((item3) => {
            arr.push(item3.id)
          })
        })
      })
      this.checkList = arr
    },
    // 更改角色权限
    async handleEditRoles () {
      // 获取到被选中的节点集合数组
      const checkedKeys = this.$refs.tree.getCheckedKeys()
      // 获取到得半选中的节点集合数组
      const halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys()
      // console.log(checkedKeys, halfCheckedKeys)
      const newArray = [...checkedKeys, ...halfCheckedKeys]
      // console.log(newArray)
      const {data: resData} = await this.$http.post(`roles/${this.currentRoleId}/rights`, {
        rids: newArray.join(',')
      })
      const {meta: {status, msg}} = resData
      if (status === 200) {
        this.dialogVisible = false
        this.$message.success(msg)
        this.loadData()
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

.rowRoles {
  margin: 10px;
}

.tagRoles {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>

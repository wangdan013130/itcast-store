<template>
  <el-card class="box-card">
    <my-brandcrum level1="权限管理" levle2="角色列表" class="brands"></my-brandcrum>
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
              <el-tag
                @click="handleClose"
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
                  @click="handleClose"
                  closable>
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
                    @click="handleClose"
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
          <el-button type="success" icon="el-icon-check" plain size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      // 页面加载所需数据
      loading: true,
      expand: true
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
    handleClose () {
      console.log('关闭')
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

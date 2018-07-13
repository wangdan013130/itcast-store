<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <img src="../../static/logo.png" alt="">
        </el-col>
        <el-col :span="19">
          <h2>电商后台管理系统</h2>
        </el-col>
        <el-col :span="1">
          <a href="#" @click.prevent="handleLogout">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="container">
      <el-aside class="aside" width="200px">
        <!-- 侧边栏 -->
        <el-menu
          unique-opened
          default-active="1-1"
          :router="true"
          class="menu">
          <!-- 一级菜单 -->
          <el-submenu
            v-for="item in menus"
            :key="item.id"
            :index="item.id + ''">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              v-for="item1 in item.children"
              :key="item1.id"
              :index="'/' + item1.path">
              <i class="el-icon-menu"></i>
              <span slot="title">{{item1.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      menus: []
    }
  },
  // 判断是否登录
  // beforeCreate () {
  //   // 从 sessionStorage 中获取 token
  //   const token = sessionStorage.getItem('token')
  //   // 判断 token 是否存在
  //   if (!token) {
  //     // 跳转页面
  //     this.$router.push({name: 'login'})
  //     this.$message.error('请先登录')
  //   }
  // },
  created () {
    this.loadData()
  },
  methods: {
    async loadData () {
      const {data: resData} = await this.$http.get('menus')
      const {data, meta: {status}} = resData
      if (status === 200) {
        // console.log(data)
        this.menus = data
      }
    },
    // 退出登录
    handleLogout () {
      // 删除 sessionStorage 中的 token
      sessionStorage.clear()
      this.$router.push({name: 'login'})
      this.$message.success('退出成功')
    }
  }
}
</script>

<style>
.container {
  height: 100%;
}

.header {
  background-color: #b3c0d1;
  padding-left: 0;
  line-height: 60px;
}

.header h2 {
  text-align: center;
  color: #fff;
}

.header a {
  text-decoration: none;
  color: orange;
}

.aside {
  background-color: #fff;
}
.aside .menu {
  height: 100%;
}

.main {
  background-color: #e9eef3;
  height: 100%;
  padding-top: 0;
}
</style>

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
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/users">
            <!-- :router="true" 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
              <i class="el-icon-menu"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="/roles">
              <i class="el-icon-menu"></i>
              <span slot="title">角色管理</span>
            </el-menu-item>
            <el-menu-item index="/goods">
              <i class="el-icon-menu"></i>
              <span slot="title">权限管理</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-menu"></i>
              <span slot="title">商品列表</span>
            </el-menu-item>
            <el-menu-item index="3-2">
              <i class="el-icon-menu"></i>
              <span slot="title">分类参数</span>
            </el-menu-item>
            <el-menu-item index='/category'>
              <i class="el-icon-menu"></i>
              <span slot="title">商品分类</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-menu"></i>
              <span slot="title">订单列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="5-1">
              <i class="el-icon-menu"></i>
              <span slot="title">数据报表</span>
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
  // 判断是否登录
  beforeCreate () {
    // 从 sessionStorage 中获取 token
    const token = sessionStorage.getItem('token')
    // 判断 token 是否存在
    if (!token) {
      // 跳转页面
      this.$router.push({name: 'login'})
      this.$message.error('请先登录')
    }
  },
  methods: {
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

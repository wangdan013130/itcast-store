<template>
<div class="login-wrap">
  <el-form
    class="login-from"
    label-position="top"
    label-width="80px"
    :model="formData">
    <h2>用户登录</h2>
    <el-form-item label="用户名">
      <el-input type="text" v-model="formData.username"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input type="password" @keyup.enter.native="handleLogin" v-model="formData.password"></el-input>
    </el-form-item>
    <el-button type="primary"  class="login-btn" @click="handleLogin">登录</el-button>
  </el-form>
</div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        username: '',
        passeord: ''
      }
    }
  },
  methods: {
    // 登录功能
    async handleLogin () {
      const res = await this.$http.post('login', this.formData)
      const data = res.data
      const {meta: {status, msg}} = data
      console.log(data)
      if (status === 200) {
        this.$message.success(msg)
        // 获取到用户成功登陆时的 token
        const {data: {token}} = data
        // 记录下 token
        sessionStorage.setItem('token', token)
        console.log(token)
        this.$router.push({name: 'home'})
      } else {
        this.$message.error(msg)
      }
    }
  }
}
</script>

<style>
.login-wrap {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-wrap .login-from {
  background-color: #fff;
  width: 400px;
  padding: 30px;
  border-radius: 5px;
}

.login-wrap .login-from .login-btn {
  width: 100%;
}
</style>

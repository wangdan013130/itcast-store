<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>{{this.level1}}</el-breadcrumb-item>
  <el-breadcrumb-item>{{this.levle2}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'MyBrands',
  props: ['level1', 'levle2']
}
</script>

<style>

</style>

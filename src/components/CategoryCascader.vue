<template>
<el-cascader
  expand-trigger="hover"
  change-on-select
  :options="options"
  :props="{
    value: 'cat_id',
    label: 'cat_name',
    children: 'children'
  }"
  @change="handleChange"
  v-model="selectedOptions">
</el-cascader>
</template>

<script>
export default {
  props: {
    type: {
      type: [String, Number],
      default: 2
    }
  },
  async created () {
    // 获取数据绑定到级联选择器
    const res = await this.$http({
      url: 'categories',
      params: {
        type: this.type
      }
    })
    this.options = res.data.data
  },
  methods: {
    // 每当级联选择器选择的节点改变就会发生改变
    // 就可以通过此方法将数据传递给父组件
    handleChange () {
      // console.log(this.selectedOptions)
      // 在此处对外部发布一个自定义事件, 外部就是此组件的父元素
      this.$emit('casesder', this.selectedOptions)
    }
  },
  data () {
    return {
      options: [],
      selectedOptions: []
    }
  }
}
</script>

<style>

</style>

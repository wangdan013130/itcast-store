<template>
  <el-card>
    <!-- 1 面包屑 -->
    <my-brand level1="权限管理" levle2="角色列表" class="brands"></my-brand>
    <!-- 2 步骤条 -->
    <el-steps :active="1" finish-status="success" align-center>
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- 3 树形表格-->
    <el-tabs tab-position="left">
      <el-tab-pane label="基本信息">
        <el-form :model="fromData" label-position="top">
          <el-form-item label="商品名称">
            <el-input type="text" v-model="fromData.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input type="text" v-model="fromData.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input type="text" v-model="fromData.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input type="text" v-model="fromData.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <CategoryCascader type="3" @casesder="handleGetCase"></CategoryCascader>
          </el-form-item>
          <!-- <el-form-item>
            <el-button type="primary" @click="handleAdd">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item> -->
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品图片">商品参数
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList2"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-tab-pane>
      <el-tab-pane label="商品内容">
        <!-- bidirectional data binding（双向数据绑定） -->
        <quill-editor
          v-model="fromData.goods_introduce"
          ref="myQuillEditor"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)">
        </quill-editor>
        <el-row>
          <el-col :span="4">
            <el-button type="primary" @click="handleAdd">立即创建</el-button>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import CategoryCascader from '@/components/CategoryCascader.vue'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  data () {
    return {
      fromData: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_cat: '',
        goods_introduce: ''
      },
      fileList2: [{
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }]
    }
  },
  methods: {
    async handleAdd () {
      const res = await this.$http({
        url: 'goods',
        methods: 'post',
        data: this.fromData
      })
      console.log(res)
      console.log(this.fromData)
      const {meta: {status, msg}} = res.data
      if (status === 201) {
        this.$message.success(msg)
      } else {
        this.$message.error(msg)
      }
    },
    handleGetCase (data) {
      // console.log(data)
      // 处理成我们需要的数据
      this.fromData.goods_cat = data.join(',')
    },
    // 图片上传所需函数
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    // 富文本编辑器
    onEditorBlur (quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus (quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady (quill) {
      console.log('editor ready!', quill)
    }
  },
  components: {
    CategoryCascader,
    quillEditor
  }
}
</script>

<style>
.brands {
  height: 60px;
  line-height: 60px;
  background-color: #e9eef3;
  margin-bottom: 10px;
  padding-left: 10px;
}

.el-card__body {
  padding: 0;
}
</style>

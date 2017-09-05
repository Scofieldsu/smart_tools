<template>
    <div>
      <el-input v-model="title" placeholder="标题" style="margin: 20px 0;width: 80%"></el-input>
      <div class="editor-container" style="width: 80%;overflow:auto">
        <md-editor id='contentEditor' ref="contentEditor" v-model='content' :height="600" :zIndex='20'></md-editor>
      </div>
      <div style="margin-top: 50px">
        <el-button type="primary" @click="handlesubmit">发布</el-button>
        <el-button>取消</el-button>
      </div>
    </div>
</template>

<script>
  import MdEditor from './Mdeditor.vue'
  import ElInput from '../../../node_modules/element-ui/packages/input/src/input'
  import ElButton from '../../../node_modules/element-ui/packages/button/src/button'
  export default {
    components: {
      ElButton,
      ElInput,
      MdEditor},
    data () {
      return {
        title: '',
        content: ''
      }
    },
    methods: {
      handlesubmit () {
        console.log(typeof (this.content))
      }
    }
  }
</script>

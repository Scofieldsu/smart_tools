<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="转换工具" name="first">
      <span>
        <el-tag type="success">MD5转换</el-tag>
        <el-input style="width: 400px;margin-left: 10px" v-model="old_md5_data"></el-input>
        <el-button type="primary" style="margin-left: 10px" @click="trans_md5">转换</el-button>
        <el-input style="width: 400px;margin-left: 10px" v-model="trans_md5_data"></el-input>
      </span>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  import md5 from 'md5'
  import ElTag from '../../../node_modules/element-ui/packages/tag/src/tag'
  import ElInput from '../../../node_modules/element-ui/packages/input/src/input'
  import ElButton from '../../../node_modules/element-ui/packages/button/src/button'
  export default {
    components: {
      ElButton,
      ElInput,
      ElTag},
    data () {
      return {
        activeName: 'first',
        old_md5_data: '',
        trans_md5_data: ''
      }
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
      },
      trans_md5 () {
        this.trans_md5_data = md5(this.old_md5_data)
      }
    }
  }
</script>

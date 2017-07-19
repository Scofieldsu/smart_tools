<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="服务器设置" name="first">
      <el-tag type="primary" style="font-size: medium;margin: 20px 0">服务器API_URL</el-tag>
     <el-input v-model="api_url" class="api_url" ></el-input>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  import ElInput from '../../../node_modules/element-ui/packages/input/src/input'
  export default {
    components: {ElInput},
    data () {
      return {
        activeName: 'first',
        api_url: ''
      }
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
      }
    }
  }
</script>

<style scoped>
  .api_url {
    width: 500px;
    margin: 20px 0 20px 20px;
  }

</style>

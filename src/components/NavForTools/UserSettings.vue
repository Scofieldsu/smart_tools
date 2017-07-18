<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="修改密码" name="first">
      <el-tag type="primary" class="tag">原始密码</el-tag><el-input class="input"></el-input><br/>
      <el-tag type="success" class="tag">新密码</el-tag><el-input class="input"></el-input><br/>
      <el-tag type="danger" class="tag">确认密码</el-tag><el-input class="input"></el-input><br>
      <el-button type="primary" class="button">提交修改</el-button>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
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
        activeName: 'first'
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
  .tag {
    width: 65px;
    text-align: center;
    margin: 10px;
    font-size: small;
  }
  .input {
    width: 300px;
    margin: 10px;
  }
  .button {
    margin: 20px 20px;
  }
</style>

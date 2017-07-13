<template>
  <div>
    <el-alert
      title="xxx 发布了 内网api-test服务！"
      @close="handle_close"
      type="success">
    </el-alert>
    <br/>
    <el-alert
      title="xxx 发布了 内网服务2 ！"
      type="info">
    </el-alert>
    <br/>
    <el-alert
      title="xxx 发布了 内网服务3！"
      type="warning">
    </el-alert>
    <br/>
    <el-alert
      title="xxx 发布了 内网服务4！"
      type="error">
    </el-alert>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    methods: {
      handle_close (title) {
        console.log(title)
      }
    }
  }
</script>

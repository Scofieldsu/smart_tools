<template>
  <div>
    <span>
      <el-tag type="primary" style="width: 50px">URL</el-tag>
      <el-input v-model="url" placeholder="url" class="input_test"></el-input>
    </span>
    <br/>
    <span>
      <el-tag type="primary" style="width: 50px">Method</el-tag>
      <el-input v-model="test_input" class="input_test"></el-input>
    </span>
    <br/>
    <el-button type="success" @click="for_test" style="margin: 20px 0">测试</el-button>
    <br/>
    <span>
      <el-tag type="danger" style="width: 50px;font-size: small">Result</el-tag>
      <el-input v-model="result" type="textarea" autosize style="margin: 0 10px;width: 70%"></el-input>
    </span>
  </div>
</template>

<script>
  import ElInput from '../../../node_modules/element-ui/packages/input/src/input'
  export default {
    components: {ElInput},
    data () {
      return {
        test_input: 'get_exchange_data',
        url: 'http://127.0.0.1:5050/api',
        result: ''
      }
    },
    methods: {
      for_test () {
        let RpcMethod = this.test_input
        let Resource = {
          'jsonrpc': '2.0',
          'method': RpcMethod,
          'params': {},
          'id': 111
        }
        console.log(JSON.stringify(Resource))
        this.axios.post(this.url, Resource)
          .then((res) => {
            console.log(res)
            this.result = JSON.stringify(res.data.result, null, 4)
          }
          )
      }
    }
  }
</script>

<style scoped>
  .input_test {
    width: 50%;
    margin: 20px;
  }

</style>

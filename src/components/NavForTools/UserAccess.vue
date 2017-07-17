<template>
  <div>
    <el-input v-model="url" placeholder="url"></el-input>
    <el-input v-model="test_input"></el-input>
    <el-button type="success" @click="for_test">成功按钮</el-button>
    <el-input v-model="result" type="textarea" autosize="true"></el-input>
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

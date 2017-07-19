<template>
  <div style="width: 100%">
    <div style="width: 50%;float: left">
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
      <span >
      <el-tag type="primary" style="width: 50px;float: left;margin-top: 20px">Params</el-tag>
      <el-input v-model="test_params" class="input_test" type="textarea"  :autosize="{ minRows: 5, maxRows: 20 }"></el-input>
    </span>
      <br/>
      <el-button type="success" @click="for_test" style="margin: 20px 0">测试</el-button>
    </div>
    <div style="width: 50%;float: left">
      <span>
        <el-tag type="danger" style="width: 50px;font-size: small;margin: 10px">Result</el-tag>
        <el-input v-model="result" type="textarea" :autosize="{ minRows: 10, maxRows: 35 }" style="margin: 0 10px;width: 100%" rows="15"></el-input>
      </span>
    </div>
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
        test_params: '',
        result: ''
      }
    },
    methods: {
      for_test () {
        let RpcMethod = this.test_input
        let TemParams = this.test_params
        if (!TemParams) {
          TemParams = '{}'
        }
        let Resource = {
          'jsonrpc': '2.0',
          'method': RpcMethod,
          'params': JSON.parse(TemParams),
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
    width: 80%;
    margin: 20px;
  }

</style>

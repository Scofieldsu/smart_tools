<template>
  <div>
    <div style="width: 100%;height: 150px">
      <el-input type="textarea" v-model="message" :autosize="{ minRows: 3, maxRows: 15}" style="width: 500px;margin-bottom: 20px"></el-input>
      <br/>
      <el-button @click="leave_message" type="primary" style="margin-bottom: 20px">留言</el-button>
    </div>
    <div style="width: 100%;height: 350px">
      <el-table
        :data="tableData"
        height="800"
        border
        style="width: 100%"
        :default-sort = "{prop: 'name', order: 'descending'}">
        <el-table-column
          prop="message"
          label="留言内容"
          width="900px">
        </el-table-column>
        <el-table-column
          prop="message_time"
          label="留言时间"
          sortable
          width="180px">
        </el-table-column>
        <el-table-column
          prop="message_user"
          label="留言用户"
          sortable
          width="150px">
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-radio-group v-model="radio">
              <el-radio-button label="赞未修改"></el-radio-button>
              <el-radio-button label="已修改"></el-radio-button>
              <el-radio-button label="需讨论"></el-radio-button>
            </el-radio-group>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import ElInput from '../../../node_modules/element-ui/packages/input/src/input'
  import ElButton from '../../../node_modules/element-ui/packages/button/src/button'
  export default {
    components: {
      ElButton,
      ElInput},
    data () {
      return {
        tableData: [],
        radio: '暂未修改',
        message: ''
      }
    },
    computed: {
      ...mapGetters([
        'getApiUrl'
      ])
    },
    created () {
      let that = this
      let getapiUrl = localStorage.getItem('api_url')
      if (!getapiUrl) {
        getapiUrl = this.getApiUrl
      }
      let userid = window.localStorage.getItem('user_id')
      if (userid) {
        userid = Number(userid)
      }
      let resourse = {
        'jsonrpc': '2.0',
        'method': 'leave_message',
        'id': 1111,
        'params': {
          'user_id': userid,
          'message': this.message
        }
      }
      that.axios.post(getapiUrl, resourse)
        .then(function (res) {
          that.tableData = res.data.result
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    methods: {
    }
  }
</script>

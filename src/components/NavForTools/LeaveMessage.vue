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
          width="1300px">
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
      ElInput
    },
    data () {
      return {
        tableData: [],
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
        'method': 'messageapi.get_message_list',
        'id': 1111,
        'params': {
          'user_id': userid
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
      leave_message () {
        let userid = window.localStorage.getItem('user_id')
        if (userid) {
          userid = Number(userid)
        }
        if (!userid) {
          this.$notify({
            title: '无效的用户',
            type: 'error',
            duration: 1200
          })
        } else if (!this.message) {
          this.$notify({
            title: '留言不能为空！',
            type: 'error',
            duration: 1200
          })
        } else {
          let resourse = {
            'jsonrpc': '2.0',
            'method': 'messageapi.add_message',
            'id': 1111,
            'params': {
              'user_id': userid,
              'content': this.message
            }
          }
          let getapiUrl = localStorage.getItem('api_url')
          if (!getapiUrl) {
            getapiUrl = this.getApiUrl
          }
          this.axios.post(getapiUrl, resourse)
            .then((res) => {
              console.log(res)
              if (res.data !== '' && 'result' in res.data) {
                if ('msg' in res.data.result) {
                  if (res.data.result.msg === 'success') {
                    this.$notify({
                      title: 'Add Message Success',
                      type: 'success',
                      duration: 1200
                    })
                    this.message = ''
                    this.$router.push('/test/message')
                  } else {
                    let msg = res.data.result.msg
                    this.$notify({
                      title: 'Add Message Failed',
                      message: msg,
                      type: 'error',
                      duration: 1200
                    })
                  }
                }
              } else if ('error' in res.data) {
                let error = res.data.error
                this.$notify({
                  title: 'Add Message Failed',
                  message: error,
                  type: 'error',
                  duration: 1200
                })
              } else {
                this.$notify({
                  title: 'Add Message Failed',
                  message: 'Some abnormal error has happened!',
                  type: 'error',
                  duration: 1200
                })
              }
            })
            .catch((err) => {
              console.error(err)
              this.$notify({
                title: 'Add Message Failed',
                type: 'error',
                duration: 1200
              })
            })
        }
      }
    }
  }
</script>

<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="用户管理" name="first">
      <el-table
        :data="tableData"
        height="800"
        border
        style="width: 100%"
        :default-sort = "{prop: 'id', order: 'ascending'}">
        <el-table-column
          prop="id"
          label="用户ID"
          sortable
          width="120px">
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          sortable
          width="300px">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          sortable
          width="400px">
        </el-table-column>
        <el-table-column
          prop="active"
          label="有效"
          sortable
          width="100px">
        </el-table-column>
        <el-table-column label="操作" >
          <template scope="scope">
            <el-button
              style="margin-left: 30px"
              size="small"
              type="success"
              @click="handleEnable(scope.$index, scope.row)">启用</el-button>
            <el-button
              style="margin-left: 30px"
              size="small"
              type="primary"
              @click="handleDisable(scope.$index, scope.row)">禁用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="所属用户组" name="second">
      <el-table
        :data="tableData2"
        height="800"
        border
        style="width: 100%"
        :default-sort = "{prop: 'id', order: 'ascending'}">
        <el-table-column
          prop="id"
          label="用户组ID"
          sortable
          width="120px">
        </el-table-column>
        <el-table-column
          prop="name"
          label="组名"
          sortable
          width="200px">
        </el-table-column>
        <el-table-column
          prop="description"
          label="用户组备注"
          sortable
          width="200px">
        </el-table-column>
        <el-table-column
          prop="web_url"
          label="访问地址"
          sortable
          width="400px">
        </el-table-column>
        <el-table-column
          prop="parent_id"
          label="上级用户组ID"
          sortable
          width="200px">
        </el-table-column>
        <el-table-column label="操作" >
          <template scope="scope">
            <el-button
              style="margin-left: 30px"
              size="small"
              type="success"
              @click="handleVisit(scope.$index, scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        activeName: 'first',
        value: true,
        tableData: [],
        tableData2: []
      }
    },
    computed: {
      ...mapGetters([
        'getApiUrl'
      ])
    },
    created () {
      let that = this
      let userid = window.localStorage.getItem('user_id')
      if (userid) {
        userid = Number(userid)
      }
      let resourse = {
        'jsonrpc': '2.0',
        'method': 'userapi.get_user_list',
        'id': 1111,
        'params': {
          'user_id': userid
        }
      }
      that.axios.post(this.getApiUrl, resourse)
        .then(function (res) {
          that.tableData = res.data.result
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    methods: {
      handleClick (tab, event) {
        if (tab.name === 'second') {
          let groupurl = 'https://gitlab.dianchu.cc/api/v4/groups?access_token='
          let that = this
          let userid = window.localStorage.getItem('user_id')
          if (userid) {
            userid = Number(userid)
          }
          let resourse = {
            'jsonrpc': '2.0',
            'method': 'userapi.get_access_token',
            'id': 1111,
            'params': {
              'user_id': userid
            }
          }
          that.axios.post(this.getApiUrl, resourse)
            .then((res) => {
              if (res.data !== '' && 'result' in res.data) {
                if ('msg' in res.data.result) {
                  if (res.data.result.msg === 'success') {
                    this.axios.get(groupurl + res.data.result.access_token)
                      .then((res) => {
                        console.log(res.data)
                        that.tableData2 = res.data
                      })
                  } else {
                    let msg = res.data.result.msg
                    this.$notify({
                      title: 'Get access_token Failed',
                      message: msg,
                      type: 'error',
                      duration: 1200
                    })
                  }
                }
              } else if ('error' in res.data) {
                let error = res.data.error
                this.$notify({
                  title: 'Get access_token Failed',
                  message: error,
                  type: 'error',
                  duration: 1200
                })
              } else {
                this.$notify({
                  title: 'Get access_token Failed',
                  message: 'Some abnormal error has happened!',
                  type: 'error',
                  duration: 1200
                })
              }
            })
            .catch((err) => {
              console.error(err)
              this.$notify({
                title: 'Get access_token Failed',
                type: 'error',
                duration: 1200
              })
            })
        }
      },
      handleVisit (index, row) {
        window.open(row.web_url)
      },
      handleEnable (index, row) {
        let that = this
        let userid = window.localStorage.getItem('user_id')
        if (userid) {
          userid = Number(userid)
        }
        let resourse = {
          'jsonrpc': '2.0',
          'method': 'userapi.set_user_enable',
          'id': 1111,
          'params': {
            'user_id': userid,
            'op_user_id': row.id
          }
        }
        that.axios.post(this.getApiUrl, resourse)
          .then((res) => {
            console.log(res)
            if (res.data !== '' && 'result' in res.data) {
              if ('msg' in res.data.result) {
                if (res.data.result.msg === 'success') {
                  this.$message({
                    message: 'Set User Enable Success',
                    type: 'success'
                  })
                  this.$router.push('/manager/user_access')
                } else {
                  let msg = res.data.result.msg
                  this.$notify({
                    title: 'Set User Enable Failed',
                    message: msg,
                    type: 'error',
                    duration: 1200
                  })
                }
              }
            } else if ('error' in res.data) {
              let error = res.data.error
              this.$notify({
                title: 'Set User Enable Failed',
                message: error,
                type: 'error',
                duration: 1200
              })
            } else {
              this.$notify({
                title: 'Set User Enable Failed',
                message: 'Some abnormal error has happened!',
                type: 'error',
                duration: 1200
              })
            }
          })
          .catch((err) => {
            console.error(err)
            this.$notify({
              title: 'Set User Enable Failed',
              type: 'error',
              duration: 1200
            })
          })
      },
      handleDisable (index, row) {
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
          'method': 'userapi.set_user_disable',
          'id': 1111,
          'params': {
            'user_id': userid,
            'op_user_id': row.id
          }
        }
        that.axios.post(getapiUrl, resourse)
          .then((res) => {
            console.log(res)
            if (res.data !== '' && 'result' in res.data) {
              if ('msg' in res.data.result) {
                if (res.data.result.msg === 'success') {
                  this.$message({
                    message: 'Set User Disable Success',
                    type: 'success'
                  })
                  this.$router.push('/manager/user_access')
                } else {
                  let msg = res.data.result.msg
                  this.$notify({
                    title: 'Set User Disable Failed',
                    message: msg,
                    type: 'error',
                    duration: 1200
                  })
                }
              }
            } else if ('error' in res.data) {
              let error = res.data.error
              this.$notify({
                title: 'Set User Disable Failed',
                message: error,
                type: 'error',
                duration: 1200
              })
            } else {
              this.$notify({
                title: 'Set User Disable Failed',
                message: 'Some abnormal error has happened!',
                type: 'error',
                duration: 1200
              })
            }
          })
          .catch((err) => {
            console.error(err)
            this.$notify({
              title: 'Set User Disable Failed',
              type: 'error',
              duration: 1200
            })
          })
      }
    }
  }
</script>

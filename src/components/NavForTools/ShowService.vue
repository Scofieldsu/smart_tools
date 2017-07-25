<template>
  <el-table
    :data="tableData"
    height="800"
    border
    style="width: 100%"
    :default-sort = "{prop: 'name', order: 'descending'}">
    <el-table-column
      prop="name"
      label="名称"
      sortable
      width="250px">
    </el-table-column>
    <el-table-column
      prop="link"
      label="链接"
      sortable
      width="400px">
    </el-table-column>
    <el-table-column
      prop="shortcut"
      label="短称"
      sortable
      width="120px">
    </el-table-column>
    <el-table-column
      prop="tag"
      label="标签"
      sortable
      width="100px">
    </el-table-column>
    <el-table-column
      prop="publish_user"
      label="发布人"
      sortable
      width="100px">
    </el-table-column>
    <el-table-column
      prop="publish_time"
      label="发布时间"
      sortable
      width="180px">
    </el-table-column>
    <el-table-column
      prop="change_time"
      label="上次修改时间"
      sortable
      width="180px">
    </el-table-column>
    <el-table-column label="操作" width="300px">
      <template scope="scope">
        <el-button
          style="margin-left: 30px"
          size="small"
          type="success"
          @click="handleVisit(scope.$index, scope.row)">访问</el-button>
        <el-button
          style="margin-left: 30px"
          size="small"
          type="primary"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          style="margin-left: 30px"
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        tableData: []
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
        'method': 'serviceapi.get_service_list',
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
      handleEdit (index, row) {
        this.$router.push('/manager/edit_service')
      },
      handleDelete (index, row) {
        this.$confirm('此操作将永久删除该服务, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
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
            'method': 'serviceapi.delete_service',
            'id': 1111,
            'params': {
              'user_id': userid,
              'service_link': row.link
            }
          }
          that.axios.post(getapiUrl, resourse)
            .then((res) => {
              console.log(res)
              if (res.data !== '' && 'result' in res.data) {
                if ('msg' in res.data.result) {
                  if (res.data.result.msg === 'success') {
                    this.$message({
                      type: 'success',
                      message: 'Delete Service Success'
                    })
                    this.$router.push('/manager/show_service')
                  } else {
                    let msg = res.data.result.msg
                    this.$notify({
                      title: 'Delete Service Failed',
                      message: msg,
                      type: 'error',
                      duration: 1200
                    })
                  }
                }
              } else if ('error' in res.data) {
                let error = res.data.error
                this.$notify({
                  title: 'Delete Service Failed',
                  message: error,
                  type: 'error',
                  duration: 1200
                })
              } else {
                this.$notify({
                  title: 'Delete Service Failed',
                  message: 'Some abnormal error has happened!',
                  type: 'error',
                  duration: 1200
                })
              }
            })
            .catch((err) => {
              console.error(err)
              this.$notify({
                title: 'Delete Service Failed',
                type: 'error',
                duration: 1200
              })
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      handleVisit (index, row) {
        console.log(index, row)
        window.open(row.link)
      }
    }
  }
</script>

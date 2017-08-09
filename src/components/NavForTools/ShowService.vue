<template>
  <div>
    <el-table
      :data="tableData"
      height="800"
      border
      style="width: 100%"
      :default-sort = "{prop: 'id', order: 'ascending'}">
      <el-table-column
        prop="id"
        label="ID"
        sortable
        width="80px">
      </el-table-column>
      <el-table-column
        prop="count"
        label="访问量"
        sortable
        width="100px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        sortable
        width="240px">
      </el-table-column>
      <el-table-column
        prop="link"
        label="链接"
        sortable
        width="380px">
      </el-table-column>
      <el-table-column
        prop="shortcut"
        label="短称"
        sortable
        width="100px">
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
      <el-table-column label="操作" width="250px">
        <template scope="scope">
          <el-button
            style="margin-left: 10px"
            size="small"
            type="success"
            @click="handleVisit(scope.$index, scope.row)">访问</el-button>
          <el-button
            style="margin-left: 20px"
            size="small"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            style="margin-left: 20px"
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="change_time"
        label="上次修改时间"
        sortable
        width="180px">
      </el-table-column>
      <el-table-column
        prop="update_user"
        label="修改人"
        sortable
        width="100px">
      </el-table-column>
    </el-table>
    <el-dialog title="服务详情" :visible.sync="dialogTableVisible">
      <el-form  :model="editform" label-width="80px">
        <el-form-item label="服务ID">
            <el-input v-model="editform.id" style="width: 500px" readonly disabled></el-input>
        </el-form-item>
        <el-form-item label="服务名称">
          <el-tooltip class="item" effect="dark" content="为了更好显示效果，请控制在20汉字或40字符以内。" placement="right-start">
            <el-input v-model="editform.name" style="width: 500px" ></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="短称">
          <el-tooltip class="item" effect="dark" content="为了更好显示效果，请控制在9汉字或18字符以内,将以空格为分隔符进行换行显示，最多可分3行显示。" placement="right-start">
            <el-input v-model="editform.shortcut" style="width: 500px"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="链接">
          <el-tooltip class="item" effect="dark" content="请输入有效的服务链接地址。" placement="right-start">
            <el-input v-model="editform.link" style="width: 500px" ></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="通知链接">
          <el-tooltip class="item" effect="dark" content="默认打开此开关，则发布成功后会在个人首页的通知项显示一条通知。" placement="right-start">
            <el-switch
              v-model="editform.notice"
              on-text=""
              off-text="">
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="标签">
          <el-tooltip class="item" effect="dark" content="为你的服务添加个性标签。" placement="right-start">
            <el-input v-model="editform.tag" style="width: 500px" ></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="简介">
          <el-tooltip class="item" effect="dark" content="简短的介绍你的服务。" placement="right-start">
            <el-input type="textarea" v-model="editform.desc" :autosize="{ minRows: 3, maxRows: 15}" style="width: 500px" ></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="update_service">提交修改</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    components: {},
    data () {
      return {
        dialogTableVisible: false,
        editform: {
          id: 0,
          count: 0,
          name: '',
          shortcut: '',
          tag: '',
          notice: true,
          link: '',
          desc: ''
        },
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
      that.axios.post(this.getApiUrl, resourse)
        .then(function (res) {
          that.tableData = res.data.result
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    methods: {
      handleEdit (index, row) {
        let userid = window.localStorage.getItem('user_id')
        if (userid) {
          userid = Number(userid)
        }
        let resourse = {
          'jsonrpc': '2.0',
          'method': 'serviceapi.get_service',
          'id': 1111,
          'params': {
            'user_id': userid,
            'service_id': row.id
          }
        }
        this.axios.post(this.getApiUrl, resourse)
          .then((res) => {
            this.$store.commit('Service', res.data.result)
            this.editform = res.data.result
            this.dialogTableVisible = true
          })
          .catch(function (err) {
            console.log(err)
          })
      },
      update_service () {
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
        } else if (!this.editform.name) {
          this.$notify({
            title: '请输入服务器名称',
            type: 'error',
            duration: 1200
          })
        } else if (!this.editform.link) {
          this.$notify({
            title: '请输入链接地址',
            type: 'error',
            duration: 1200
          })
        } else {
          let notice = this.editform.notice
          if (notice) {
            notice = 1
          } else {
            notice = 0
          }
          let resourse = {
            'jsonrpc': '2.0',
            'method': 'serviceapi.update_service',
            'id': 1111,
            'params': {
              'user_id': userid,
              'service_id': this.editform.id,
              'service_name': this.editform.name,
              'link': this.editform.link,
              'tag': this.editform.tag,
              'shortcut': this.editform.shortcut,
              'desc': this.editform.desc,
              'notice': this.editform.notice
            }
          }
          this.axios.post(this.getApiUrl, resourse)
            .then((res) => {
              console.log(res)
              if (res.data !== '' && 'result' in res.data) {
                if ('msg' in res.data.result) {
                  if (res.data.result.msg === 'success') {
                    this.$notify({
                      title: 'Update Service Success',
                      type: 'success',
                      duration: 1200
                    })
                    this.dialogTableVisible = false
                    this.$router.push('/manager/show_service')
                  } else {
                    let msg = res.data.result.msg
                    this.$notify({
                      title: 'Update Service Failed',
                      message: msg,
                      type: 'error',
                      duration: 1200
                    })
                  }
                }
              } else if ('error' in res.data) {
                let error = res.data.error
                this.$notify({
                  title: 'Update Service Failed',
                  message: error,
                  type: 'error',
                  duration: 1200
                })
              } else {
                this.$notify({
                  title: 'Update Service Failed',
                  message: 'Some abnormal error has happened!',
                  type: 'error',
                  duration: 1200
                })
              }
            })
            .catch((err) => {
              console.error(err)
              this.$notify({
                title: 'Update Service Failed',
                type: 'error',
                duration: 1200
              })
            })
        }
      },
      cancel () {
        this.dialogTableVisible = false
      },
      handleDelete (index, row) {
        this.$confirm('此操作将永久删除该服务, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let that = this
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
              'service_id': row.id
            }
          }
          that.axios.post(this.getApiUrl, resourse)
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
        window.open(row.link)
        let userid = window.localStorage.getItem('user_id')
        if (userid) {
          userid = Number(userid)
        }
        let resourse = {
          'jsonrpc': '2.0',
          'method': 'serviceapi.visit_service',
          'id': 1111,
          'params': {
            'user_id': userid,
            'service_id': row.id
          }
        }
        this.axios.post(this.getApiUrl, resourse).then((res) => {
          console.log(res)
          if (res.data !== '' && 'result' in res.data) {
            if ('msg' in res.data.result) {
              if (res.data.result.msg === 'success') {
                console.log('visit success!')
              } else {
                let msg = res.data.result.msg
                console.log('visit failed!' + msg)
              }
            }
          } else if ('error' in res.data) {
            let error = res.data.error
            console.log('visit failed!' + error)
          } else {
            console.log('visit failed!')
          }
        })
          .catch((err) => {
            console.error(err)
            console.log('visit failed!')
          })
      }
    }
  }
</script>

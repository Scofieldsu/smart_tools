<template>
  <div>
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
    <el-dialog title="服务详情" :visible.sync="dialogTableVisible">
      <el-form  :model="editform" label-width="80px">
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
  import ElTable from '../../../node_modules/element-ui/packages/table/src/table'
  export default {
    components: {ElTable},
    data () {
      return {
        dialogTableVisible: false,
        editform: {
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
        this.dialogTableVisible = true
      },
      update_service () {
        this.dialogTableVisible = false
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

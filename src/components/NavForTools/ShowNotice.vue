<template>
  <div style="width: 100%">
    <div style="width: 40%;height: 500px;float: left">
      <div>
        <span>
         <i class="el-icon-information"></i>
         <label style="font-size: large;font-weight: bolder">最新动态</label><i>(7天内)</i>
        </span>
      </div>
      <div style="margin-top: 20px">
        <el-alert v-for="notice in noticeData" :key="notice.time"
          @close="handle_close(notice.id)" title="" style="margin-top: 10px;background-color: lightcoral">
          <span v-show="false">{{notice.id}}</span>
          <span style="color: #333333;font-weight: bold">{{notice.user_name}}</span>
          <span style="color: gold">{{notice.action}}</span>
          <span style="color: black;font-weight: normal">{{notice.service_name}}</span> ！
          <span style="float: right;margin-right: 20px;font-size: small">( {{ notice.time}})</span>
          <el-button v-if="notice.action !== '删除'" @click="handlelook(notice.link)" style="background-color:lightcoral;color: #324157;float: right;margin-right:30px" type="text" size="small">去看看</el-button>
        </el-alert>
      </div>
    </div>
    <div style="width: 60%;height:100%;float:left;">
      <div style="margin-left: 50px">
        <span style="margin-left:20px">
          <i class="fa fa-tachometer"></i>
          <label style="font-size: large;font-weight: bolder">公告</label>
        </span>
      </div>
      <el-card class="box-card" v-for="pubinfo in publicData " :key="pubinfo.title">
        <div  class="text item">
          <i style="font-weight: bolder;color: #ff4949">{{pubinfo.title}}</i>
          <br/>
          {{pubinfo.summary }} <i style="font-weight: bolder">......</i>
          <br/>
          <el-button type="text" style="float: right" @click="showdetail(pubinfo.id)">展开</el-button>
          <br/>
          <i style="font-size: small;font-weight: lighter;color: #324157;">{{pubinfo.user}}</i>
          <i style="font-size: small;font-weight: lighter;color: lightseagreen; margin-left: 5px">{{pubinfo.time}}</i>
          <br/>
          <i v-if="!(pubinfo.time===pubinfo.update_time)" style="font-size: small;font-weight: lighter;color: #ff6d6d;">update by</i>
          <i v-if="!(pubinfo.time===pubinfo.update_time)" style="font-size: small;font-weight: lighter;color: #324157;">{{pubinfo.update_user}}</i>
          <i v-if="!(pubinfo.time===pubinfo.update_time)" style="font-size: small;font-weight: lighter;color: lightseagreen; margin-left: 5px">{{pubinfo.update_time}}</i>
        </div>
      </el-card>
      <el-dialog title="公告详情" :visible.sync="dialogTableVisible">
        <el-input v-model="id"  v-show="false" style="margin: 20px 0;"></el-input>
        <el-input v-model="title" placeholder="标题"  type="textarea" :autosize={minRows:1,maxRows:10} style="margin: 20px 0;"></el-input>
        <div class="editor-container" style="overflow:auto">
          <md-editor id='contentEditor' ref="contentEditor" v-model='content' :height="600" :zIndex='20'></md-editor>
        </div>
            <el-button type="primary" @click="update_pubinfo">提交修改</el-button>
            <el-button @click="cancel">取消</el-button>
           <el-button type="danger" style="float: right" @click="handleDelete(this.id)">删除</el-button>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import MdEditor from './Mdeditor.vue'
  import ElButton from '../../../node_modules/element-ui/packages/button/src/button'
  import ElAlert from '../../../node_modules/element-ui/packages/alert/src/main'
  export default {
    components: {
      ElAlert,
      MdEditor,
      ElButton},
    data () {
      return {
        id: '',
        title: '',
        content: '',
        input_select: '',
        select: '',
        dialogTableVisible: false,
        resultData: [
          {
            tag: 'default',
            shortcut: 'default',
            name: 'service_name'
          }
        ],
        noticeData: [],
        publicData: []
      }
    },
    computed: {
      ...mapGetters([
        'getApiUrl',
        'getService'
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
        'method': 'collections.get_collect_service_list',
        'id': 1111,
        'params': {
          'user_id': userid
        }
      }
      that.axios.post(this.getApiUrl, resourse)
        .then(function (res) {
          that.resultData = res.data.result
        })
        .catch(function (err) {
          console.log(err)
        })
      let resnotice = {
        'jsonrpc': '2.0',
        'method': 'noticeapi.get_notice_list',
        'id': 1111,
        'params': {
          'user_id': userid
        }
      }
      that.axios.post(this.getApiUrl, resnotice)
        .then(function (res) {
          that.noticeData = res.data.result
        })
      let respublic = {
        'jsonrpc': '2.0',
        'method': 'publicinfoapi.get_public_info_list',
        'id': 1111,
        'params': {
          'user_id': userid
        }
      }
      that.axios.post(this.getApiUrl, respublic)
        .then(function (res) {
          that.publicData = res.data.result
        })
    },
    methods: {
      showdetail (pubinfoid) {
        let userid = window.localStorage.getItem('user_id')
        if (userid) {
          userid = Number(userid)
        }
        let resourse = {
          'jsonrpc': '2.0',
          'method': 'publicinfoapi.get_public_info',
          'id': 1111,
          'params': {
            'user_id': userid,
            'pubinfo_id': pubinfoid
          }
        }
        this.axios.post(this.getApiUrl, resourse)
          .then((res) => {
            this.id = res.data.result.id
            this.title = res.data.result.title
            this.content = res.data.result.content
            this.dialogTableVisible = true
          })
          .catch(function (err) {
            console.log(err)
          })
      },
      update_pubinfo () {
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
        } else if (!this.title) {
          this.$notify({
            title: '标题不能为空',
            type: 'error',
            duration: 1200
          })
        } else if (!this.content) {
          this.$notify({
            title: '内容不能为空',
            type: 'error',
            duration: 1200
          })
        } else {
          let resourse = {
            'jsonrpc': '2.0',
            'method': 'publicinfoapi.update_public_info',
            'id': 1111,
            'params': {
              'user_id': userid,
              'pubinfo_id': this.id,
              'title': this.title,
              'content': this.content
            }
          }
          this.axios.post(this.getApiUrl, resourse)
            .then((res) => {
              if (res.data !== '' && 'result' in res.data) {
                if ('msg' in res.data.result) {
                  if (res.data.result.msg === 'success') {
                    this.$notify({
                      title: 'Update Public info Success',
                      type: 'success',
                      duration: 1200
                    })
                  } else {
                    let msg = res.data.result.msg
                    this.$notify({
                      title: 'Update Public info Failed',
                      message: msg,
                      type: 'error',
                      duration: 1200
                    })
                  }
                }
              } else if ('error' in res.data) {
                let error = res.data.error
                this.$notify({
                  title: 'Update Public info Failed',
                  message: error,
                  type: 'error',
                  duration: 1200
                })
              } else {
                this.$notify({
                  title: 'Update Public info Failed',
                  message: 'Some abnormal error has happened!',
                  type: 'error',
                  duration: 1200
                })
              }
            })
            .catch((err) => {
              console.error(err)
              this.$notify({
                title: 'Update Public info Failed',
                type: 'error',
                duration: 1200
              })
            })
        }
        this.dialogTableVisible = false
      },
      handleDelete () {
        this.$confirm('此操作将永久删除该公告, 是否继续?', '提示', {
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
            'method': 'publicinfoapi.delete_public_info',
            'id': 1111,
            'params': {
              'user_id': userid,
              'pubinfo_id': this.id
            }
          }
          that.axios.post(this.getApiUrl, resourse)
            .then((res) => {
              if (res.data !== '' && 'result' in res.data) {
                if ('msg' in res.data.result) {
                  if (res.data.result.msg === 'success') {
                    this.dialogTableVisible = false
                    this.$message({
                      type: 'success',
                      message: 'Delete Public info Success'
                    })
                  } else {
                    let msg = res.data.result.msg
                    this.$notify({
                      title: 'Delete Public info Success Failed',
                      message: msg,
                      type: 'error',
                      duration: 1200
                    })
                  }
                }
              } else if ('error' in res.data) {
                let error = res.data.error
                this.$notify({
                  title: 'Delete  Public info Success Failed',
                  message: error,
                  type: 'error',
                  duration: 1200
                })
              } else {
                this.$notify({
                  title: 'Delete  Public info Success Failed',
                  message: 'Some abnormal error has happened!',
                  type: 'error',
                  duration: 1200
                })
              }
            })
            .catch((err) => {
              console.error(err)
              this.$notify({
                title: 'Delete Delete Public info Success Failed',
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
      cancel () {
        this.dialogTableVisible = false
      },
      handle_close (noticeid) {
        console.log(noticeid)
        let userid = window.localStorage.getItem('user_id')
        if (userid) {
          userid = Number(userid)
        }
        let resourse = {
          'jsonrpc': '2.0',
          'method': 'noticeapi.check_notice',
          'id': 1111,
          'params': {
            'user_id': userid,
            'notice_id': noticeid
          }
        }
        this.axios.post(this.getApiUrl, resourse).then((res) => {
          if (res.data !== '' && 'result' in res.data) {
            if ('msg' in res.data.result) {
              if (res.data.result.msg === 'success') {
                console.log('check notice success!')
              } else {
                let msg = res.data.result.msg
                console.log('check notice failed!' + msg)
              }
            }
          } else if ('error' in res.data) {
            let error = res.data.error
            console.log('check notice failed!' + error)
          } else {
            console.log('check notice failed!')
          }
        })
          .catch((err) => {
            console.error(err)
            console.log('check notice failed!')
          })
      },
      handlelook (link) {
        window.open(link)
      }
    }
  }
</script>

<style scoped>
  .box-card {
    width: 400px;
    margin-left: 60px;
    margin-top: 20px;
    float: left;
    background-color: blanchedalmond;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button_go {
    padding: 0;
    float: right;
  }

  .image {
    width: 80%;
    height: 160px;
    display: block;
    font-size: 42px;
    font-weight: bold;
    color: lightseagreen;
    word-wrap: break-word;
    word-break: break-all;
    white-space: normal;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>

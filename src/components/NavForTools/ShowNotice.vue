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
        <el-alert v-for="notice in noticeData" :key="notice.id"
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
      <h1 style="margin-left: 60px;color: black">暂无</h1>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import ElButton from '../../../node_modules/element-ui/packages/button/src/button'
  import ElAlert from '../../../node_modules/element-ui/packages/alert/src/main'
  export default {
    components: {
      ElAlert,
      ElButton},
    data () {
      return {
        proclamation: '',
        input_select: '',
        select: '',
        dialogTableVisible: false,
        editform: {
          id: 0,
          name: '',
          shortcut: '',
          tag: '',
          notice: true,
          link: '',
          desc: ''
        },
        resultData: [
          {
            tag: 'default',
            shortcut: 'default',
            name: 'service_name'
          }
        ],
        noticeData: []
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
    },
    methods: {
      doselect (inputselect) {
        if (inputselect === '') {
          this.input_select = ''
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
        } else {
          let temresult = JSON.parse(JSON.stringify(this.resultData))
          let lenth = temresult.length
          let contion = this.select
          for (let x = 0; x < lenth; x++) {
            if (contion === '') {
              let serchtype = ['name', 'tag', 'shortcut', 'link']
              let flag = 1
              for (let x of serchtype) {
                if (temresult[0][x].toLowerCase().replace(' ', '').indexOf(inputselect.toLowerCase()) !== -1) {
                  let tem = temresult.shift()
                  temresult.push(tem)
                  flag = 0
                }
              }
              if (flag === 1) {
                temresult.shift()
              }
            } else {
              let temvalue = temresult[0][contion]
              if (contion === 'shortcut') {
                temvalue = temvalue.replace(' ', '')
              }
              if (temvalue.toLowerCase().indexOf(inputselect.toLowerCase()) === -1) {
                temresult.shift()
              } else {
                let tem = temresult.shift()
                temresult.push(tem)
              }
            }
          }
          this.resultData = temresult
        }
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
      },
      arrive (link, serviceid) {
        window.open(link)
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
            'service_id': serviceid
          }
        }
        this.axios.post(this.getApiUrl, resourse).then((res) => {
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
              if (res.data !== '' && 'result' in res.data) {
                if ('msg' in res.data.result) {
                  if (res.data.result.msg === 'success') {
                    this.$notify({
                      title: 'Update Service Success',
                      type: 'success',
                      duration: 1200
                    })
                    this.$router.push('/yours/notices')
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
        this.dialogTableVisible = false
      },
      cancel () {
        this.dialogTableVisible = false
      },
      get_detail (id) {
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
            'service_id': id
          }
        }
        this.axios.post(this.getApiUrl, resourse)
          .then((res) => {
            this.editform = res.data.result
            this.dialogTableVisible = true
          })
          .catch(function (err) {
            console.log(err)
          })
      },
      star_off (serviceid) {
        let that = this
        let userid = window.localStorage.getItem('user_id')
        if (userid) {
          userid = Number(userid)
        }
        let resourse = {
          'jsonrpc': '2.0',
          'method': 'collections.star_off_service',
          'id': 1111,
          'params': {
            'user_id': userid,
            'service_id': serviceid
          }
        }
        that.axios.post(this.getApiUrl, resourse)
          .then((res) => {
            if (res.data !== '' && 'result' in res.data) {
              if ('msg' in res.data.result) {
                if (res.data.result.msg === 'success') {
                  this.$message({
                    message: '已取消收藏',
                    type: 'success'
                  })
                  this.$router.push('/yours/notices')
                } else {
                  let msg = res.data.result.msg
                  this.$notify({
                    title: 'Star  Failed',
                    message: msg,
                    type: 'error',
                    duration: 1200
                  })
                }
              }
            } else if ('error' in res.data) {
              let error = res.data.error
              this.$notify({
                title: 'Star off Failed',
                message: error,
                type: 'error',
                duration: 1200
              })
            } else {
              this.$notify({
                title: 'Star off Failed',
                message: 'Some abnormal error has happened!',
                type: 'error',
                duration: 1200
              })
            }
          })
          .catch((err) => {
            console.error(err)
            this.$notify({
              title: 'Star off Failed',
              type: 'error',
              duration: 1200
            })
          })
      }
    }
  }
</script>

<style scoped>
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

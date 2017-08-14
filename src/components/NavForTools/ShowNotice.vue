<template>
  <div style="width: 100%">
    <div style="width: 40%;height: 500px;float: left">
      <div>
        <span>
         <i class="el-icon-information"></i>
         <label style="font-size: large;font-weight: bolder">最新动态</label>
        </span>
      </div>
      <div style="margin-top: 20px">
        <el-alert v-for="notice in noticeData" :key="notice.id"
          @close="handle_close" title="noticeservice"
          type="info" style="margin-top: 10px">
        </el-alert>
        <br/>
        <el-alert
          title="xxx 发布了 内网服务2 ！"
          type="info">
        </el-alert>
        <br/>
        <el-alert
          title="xxx 发布了 内网服务3！"
          type="warning">
        </el-alert>
        <br/>
        <el-alert
          title="xxx 发布了 内网服务4！"
          type="error">
        </el-alert>
      </div>
    </div>
    <div style="width: 60%;height:100%;float: left">
      <div>
        <span style="margin-left:20px">
          <i class="el-icon-star-on"></i>
          <label style="font-size: large;font-weight: bolder">收藏夹</label>
        </span>
      </div>
      <div style="margin: 20px;">
        <el-input placeholder="请输入内容" v-model="input_select" style="width: 400px" @keyup.enter.native="doselect(input_select)">
          <el-select v-model="select" slot="prepend" placeholder="综合搜索" style="width: 110px">
            <el-option label="服务名称" value="name"></el-option>
            <el-option label="标签" value="tag"></el-option>
            <el-option label="短称" value="shortcut"></el-option>
            <el-option label="链接" value="link"></el-option>
          </el-select>
          <el-button slot="append"  @click="doselect(input_select)">搜索</el-button>
        </el-input>
      </div>
      <div style="margin-top: 20px">
        <el-row v-model="resultData">
          <el-col :span="8" v-for="resultitem in resultData" :key="resultitem.name"  style="height: 40px;width: 200px;margin: 0px 20px 270px 20px">
            <el-card :body-style="{ padding: '0px' }">
              <el-tag type="danger">{{resultitem.tag}}</el-tag>
              <el-button type="text" style="float: right;margin-right: 10px;margin-top: 10px" @click="star_off(resultitem.id)">取消收藏</el-button>
              <el-button type="text" class="image" @click="arrive(resultitem.link,resultitem.id)">{{resultitem.shortcut}}</el-button>
              <div style="padding: 14px;">
                <span>{{resultitem.name}}</span>
                <div class="bottom clearfix">
                  <el-button type="text" class="button_go" @click="get_detail(resultitem.id)">详情</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
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
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
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
        noticeData: [
          {
            user_name: '',
            action: '',
            service_name: ''
          }
        ]
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
          console.log(res.data.result)
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
      handle_close (title) {
        console.log(title)
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
            console.log(res)
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
    font-size: 50px;
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

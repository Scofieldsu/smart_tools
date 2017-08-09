<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="修改密码" name="first">
      <el-tag type="gray" class="tag">邮箱</el-tag><el-input class="input" readonly v-model="email"></el-input><br/>
      <el-tag type="gray" class="tag">姓名</el-tag><el-input class="input" readonly v-model="username"></el-input><br/>
      <el-tag type="primary" class="tag">原始密码</el-tag><el-input class="input" type="password" v-model="old_pwd"></el-input><br/>
      <el-tag type="success" class="tag">新密码</el-tag><el-input class="input" type="password" v-model="new_pwd"></el-input><br/>
      <el-tag type="danger" class="tag">确认密码</el-tag><el-input class="input" type="password" v-model="confirm_pwd"></el-input><br>
      <el-button type="primary" class="button" @click="change_pwd">提交修改</el-button>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  import { mapGetters } from 'vuex'
  import md5 from 'md5'
  import ElTag from '../../../node_modules/element-ui/packages/tag/src/tag'
  import ElInput from '../../../node_modules/element-ui/packages/input/src/input'
  import ElButton from '../../../node_modules/element-ui/packages/button/src/button'
  export default {
    components: {
      ElButton,
      ElInput,
      ElTag},
    data () {
      let username = localStorage.getItem('user_name')
      let email = localStorage.getItem('email')
      return {
        activeName: 'first',
        username: username,
        email: email,
        old_pwd: '',
        new_pwd: '',
        confirm_pwd: ''
      }
    },
    computed: {
      ...mapGetters([
        'getApiUrl'
      ])
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
      },
      change_pwd () {
        let oldpwd = this.old_pwd
        let newpwd = this.new_pwd
        let confirmPwd = this.confirm_pwd
        if (confirmPwd === '') {
          this.$notify({
            title: 'Change Password Failed',
            message: 'The confirm password is empty! ',
            type: 'error',
            duration: 1200
          })
        } else if (newpwd !== confirmPwd) {
          this.$notify({
            title: 'Change Password Failed',
            message: 'The password for the two time is inconsistent',
            type: 'error',
            duration: 1200
          })
        } else {
          let userid = localStorage.getItem('user_id', 0)
          let resourse = {
            'jsonrpc': '2.0',
            'method': 'userapi.change_pwd',
            'id': 1111,
            'params': {
              'user_id': userid,
              'old_pwd': md5(oldpwd),
              'new_pwd': md5(newpwd)
            }
          }
          this.axios.post(this.getApiUrl, resourse)
            .then((res) => {
              console.log(res)
              if (res.data !== '' && 'result' in res.data) {
                if ('msg' in res.data.result) {
                  if (res.data.result.msg === 'success') {
                    this.$notify({
                      title: 'Change Password Success',
                      type: 'success',
                      duration: 1200
                    })
                    this.old_pwd = this.new_pwd = this.confirm_pwd = ''
                  } else {
                    let msg = res.data.result.msg
                    this.$notify({
                      title: 'Change Password Failed',
                      message: msg,
                      type: 'error',
                      duration: 1200
                    })
                  }
                }
              } else if ('error' in res.data) {
                let error = res.data.error
                this.$notify({
                  title: 'Change Password Failed',
                  message: error,
                  type: 'error',
                  duration: 1200
                })
              } else {
                this.$notify({
                  title: 'Change Password Failed',
                  message: 'Some abnormal error has happened!',
                  type: 'error',
                  duration: 1200
                })
              }
            })
            .catch((err) => {
              console.error(err)
              this.$notify({
                title: 'Change Password Failed',
                type: 'error',
                duration: 1200
              })
            })
        }
      }
    }
  }
</script>

<style scoped>
  .tag {
    width: 65px;
    text-align: center;
    margin: 10px;
    font-size: small;
  }
  .input {
    width: 300px;
    margin: 10px;
  }
  .button {
    margin: 20px 20px;
  }
</style>

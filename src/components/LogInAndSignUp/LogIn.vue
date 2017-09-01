<template>
    <el-col :span="24" class="login-layout">
      <el-form :model="ruleForm" ref="ruleForm"  class="login-form">
        <img src='../../assets/index_icon.gif' width="48" height="48" style="margin: 0 40%" >
        <h2 class="title">Sign in to One-Platform</h2>
        <el-form-item label="" >
          <label class="login-label">Email address</label>
          <el-input v-model="ruleForm.email" class="login-input" placeholder="" @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <el-form-item label=""  style="margin-top: -20px">
          <label class="login-label">Password</label>
          <el-input v-model="ruleForm.password" class="login-input" placeholder="" type="password"  @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="submitForm('ruleForm')" class="login-btn">Sign In</el-button>
          <el-button @click="resetForm('ruleForm')" class="sign_up-btn">Sign Up</el-button>
        </el-form-item>
        <el-form-item>
          <span>
            <i style="font-weight: bold">Sign with: </i>
            <el-button @click="togitlab" style="height: 32px;width: 32px;margin: 10px;padding: 0"><img src="../../assets/gitlab.png" width="32" height="32"  ></el-button>
          </span>
        </el-form-item>
      </el-form>
    </el-col>
</template>
<script>
  import { mapGetters } from 'vuex'
  import ElIcon from '../../../node_modules/element-ui/packages/icon/src/icon'
  import md5 from 'md5'
  import ElButton from '../../../node_modules/element-ui/packages/button/src/button'
  export default {
    components: {
      ElButton,
      ElIcon},
    data () {
      return {
        api_url_input: this.getApiUrl,
        dialogVisible: false,
        ruleForm: {
          email: '',
          password: ''
        }
      }
    },
    computed: {
      ...mapGetters([
        'getApiUrl'
//        'getGitlabInfo',
//        'getApplication'
      ])
    },
    methods: {
      togitlab () {
        let that = this
        let resourse = {
          'jsonrpc': '2.0',
          'method': 'settingapi.get_info',
          'id': 1111,
          'params': {}
        }
        that.axios.post(this.getApiUrl, resourse)
          .then((res) => {
            console.log(res)
            if (res.data.result.msg === 'success') {
              let result = res.data.result
              let path = '/oauth/authorize?'
              let others = '&response_type=code&state=oneplatform&scope=read_user'
              window.location.href = result.gitlab_url + path + 'client_id=' + result.client_id + '&redirect_uri=' + result.redirect_uri + others
            } else {
              let msg = res.data.result.msg
              this.$notify({
                title: 'Get_info Failed',
                message: msg,
                type: 'error',
                duration: 1200,
                offset: 40
              })
            }
          })
          .catch((err) => {
            console.error(err)
            that.$notify({
              title: 'Get_info Failed',
              message: 'Network error. Please check your settings.',
              type: 'error',
              duration: 1200
            })
          })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
        this.$router.replace('/sign_up')
      },
      submitForm (formName) {
        if (this.ruleForm.email === '') {
          this.$notify({
            title: 'Login Failed',
            message: 'Please enter email_address',
            type: 'error',
            duration: 1200,
            offset: 40
          })
        } else if (this.ruleForm.password === '') {
          this.$notify({
            title: 'Login Failed',
            message: 'Please enter password',
            type: 'error',
            duration: 1200,
            offset: 40
          })
        } else {
          console.log('login submit!')
          let that = this
          let passwordHash = md5(that.ruleForm.password)
          let resourse = {
            'jsonrpc': '2.0',
            'method': 'userapi.sign_in',
            'id': 1111,
            'params': {
              'email': that.ruleForm.email,
              'password': passwordHash
            }
          }
          this.$refs[formName].validate((valid) => {
            if (valid) {
              that.axios.post(this.getApiUrl, resourse)
                .then((res) => {
                  console.log(res)
                  if (res.data.result.msg === 'success') {
                    let userid = res.data.result.user_id
                    let username = res.data.result.user_name
                    window.localStorage.setItem('email', that.ruleForm.email)
                    window.localStorage.setItem('user_id', userid)
                    window.localStorage.setItem('user_name', username)
                    window.sessionStorage['login'] = true
                    this.$router.push('/yours/all_tools')
                  } else {
                    let msg = res.data.result.msg
                    this.$notify({
                      title: 'Login Failed',
                      message: msg,
                      type: 'error',
                      duration: 1200,
                      offset: 40
                    })
                  }
                })
                .catch((err) => {
                  console.error(err)
                  that.$notify({
                    title: 'Login Failed',
                    message: 'Network error. Please check your settings.',
                    type: 'error',
                    duration: 1200
                  })
                })
            }
          }
        )
        }
      }
    }
  }
</script>
<style scoped>
  h3 {
    margin: 0;
    padding: 0;
  }
  .login-form {
    position: relative;
    top: 30%;
    height: 460px;
    width: 308px;
    background-color: rgba(255,255,255,0.2);
    padding: 30px;
    margin: -160px auto 0;
  }
  .title {
    font-size: 20px;
    font-weight: lighter;
    color: #1F2D3D;
    text-align: center;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    margin-bottom: 20px;
  }
  .login-layout {
    position: absolute;
    background-color: rgba(255,255,255,0.5);
    height: 100%;
    background-image: url('../../assets/background_login_2.png');
  }
  .login-input {
    margin-left: 10%;
    width: 85%;
  }
  .remember-pwd{
    font-weight: bold;
    padding-bottom: 10px;
    margin: -15px 0 -15px 10%;
  }
  .login-btn, .sign_up-btn {
    width: 85%;
    margin: 0 0 25px 10%;
  }
  .login-label {
    font-weight: bolder;
    margin-left: 10%
  }
</style>

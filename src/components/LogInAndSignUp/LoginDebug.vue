<template>
  <el-col :span="24" class="login-layout">
    <el-button type="text" @click="dialogVisible = true" style="float: right;margin:0 10px"><i class="el-icon-setting"></i></el-button>
    <el-dialog
      title="设置"
      :visible.sync="dialogVisible"
      size="small"
      :before-close="handleClose">
      <el-tabs v-model="activeName">
        <el-tab-pane label="服务设置" name="first">
          <span>
            <el-tag type="primary" style="font-size: medium;margin: 5px">ApiUrl</el-tag>
            <el-input v-model="api_url_input" style="width: 50%"></el-input>
          </span>
          <br/>
          <span style="margin-top: 50px;float: right">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="set_url">确 定</el-button>
          </span>
        </el-tab-pane>
        <el-tab-pane label="Gitlab验证设置" name="second">
          <span>
            <el-tag type="danger" style="font-size: medium;margin: 5px;width: 140px">*Application</el-tag>
            <el-input v-model="application_name" style="width: 60%;margin-top: 10px"></el-input>
          </span>
          <br/>
          <span>
            <el-tag type="danger" style="font-size: medium;margin: 5px;width: 140px">*Gitlab地址</el-tag>
            <el-input v-model="gitlab_url" style="width: 60%;margin-top: 10px"></el-input>
          </span>
          <br/>
          <span>
            <el-tag type="primary" style="font-size: medium;margin: 5px;width: 140px">*Client_ID</el-tag>
            <el-input v-model="client_id" style="width: 60%;margin-top: 10px"></el-input>
          </span>
          <br/>
          <span>
            <el-tag type="primary" style="font-size: medium;margin: 5px;width: 140px">*Client_Secret</el-tag>
            <el-input v-model="client_secret" style="width: 60%;margin-top: 10px"></el-input>
          </span>
          <br/>
          <span>
            <el-tag type="success" style="font-size: medium;margin: 5px;width: 140px">*Redirect_Uri</el-tag>
            <el-input v-model="redirect_uri" style="width: 60%;margin-top: 10px"></el-input>
          </span>
          <br/>
          <span>
            <el-tag type="success" style="font-size: medium;margin: 5px;width: 140px">*Redirect_Server</el-tag>
            <el-input v-model="redirect_server" style="width: 60%;margin-top: 10px"></el-input>
          </span>
          <br/>
          <span style="margin-top: 50px;float: right">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="set_gitlab">确 定</el-button>
          </span>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <el-form :model="ruleForm" ref="ruleForm"  class="login-form">
      <img src='../../assets/index_icon.gif' width="48" height="48" style="margin: 0 40%" >
      <h2 class="title">Sign in to One-Platform</h2>
      <el-form-item label="" >
        <label class="login-label">Email address</label>
        <el-input v-model="ruleForm.email" class="login-input" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label=""  style="margin-top: -20px">
        <label class="login-label">Password</label>
        <el-input v-model="ruleForm.password" class="login-input" placeholder="" type="password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
      </el-form-item>
      <el-form-item label="">
        <!--<el-checkbox label="" v-model="rememberPWD" name="rememberPWD" class="remember-pwd">remember password</el-checkbox>-->
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="submitForm('ruleForm')" class="login-btn">Sign In</el-button>
        <el-button @click="resetForm('ruleForm')" class="sign_up-btn">Sign Up</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</template>
<script>
  import { mapGetters } from 'vuex'
  import ElIcon from '../../../node_modules/element-ui/packages/icon/src/icon'
  //  import commonJs from '../../util/common'
  import md5 from 'md5'
  export default {
    components: {ElIcon},
    data () {
      return {
        activeName: 'first',
        api_url_input: this.getApiUrl,
        application_name: '',
        gitlab_url: '',
        client_id: '',
        client_secret: '',
        redirect_uri: '',
        redirect_server: '',
        dialogVisible: false,
        rememberPWD: false,
        ruleForm: {
          email: '',
          password: ''
        }
      }
    },
    computed: {
      ...mapGetters([
        'getApiUrl'
      ])
    },
    methods: {
      set_url () {
        let apiurl = this.api_url_input
        if (!apiurl) {
          apiurl = this.getApiUrl
        }
        if (!apiurl.startsWith('http://')) {
          apiurl = 'http://'.concat(apiurl)
        }
        this.$store.commit('SETAPIURL', apiurl)
        this.dialogVisible = false
      },
      set_gitlab () {
        if (this.application_name && this.gitlab_url && this.client_id && this.client_secret && this.redirect_uri && this.redirect_server) {
          let that = this
          let resourse = {
            'jsonrpc': '2.0',
            'method': 'settingapi.set_info',
            'id': 1111,
            'params': {
              'application_name': this.application_name,
              'gitlab_url': this.gitlab_url,
              'client_id': this.client_id,
              'client_secret': this.client_secret,
              'redirect_uri': this.redirect_uri,
              'redirect_server': this.redirect_server
            }
          }
          that.axios.post(this.getApiUrl, resourse)
            .then((res) => {
              console.log(res)
              if (res.data.result.msg === 'success') {
                this.$notify({
                  title: 'Setting success',
                  message: 'success',
                  type: 'success',
                  duration: 1200,
                  offset: 40
                })
                this.dialogVisible = false
              } else {
                let msg = res.data.result.msg
                this.$notify({
                  title: 'Setting Failed',
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
        } else {
          this.$notify({
            title: 'Setting Failed',
            message: 'Please confirm your settings',
            type: 'error',
            duration: 1200,
            offset: 40
          })
        }
      },
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
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
                    this.$router.push('/yours/notices')
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
    height: 450px;
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

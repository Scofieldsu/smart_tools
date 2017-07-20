<template>
  <el-col :span="24" class="login-layout">
    <el-button type="text" @click="dialogVisible = true" style="float: right;margin:0 10px"><i class="el-icon-setting"></i></el-button>
    <el-dialog
      title="设置"
      :visible.sync="dialogVisible"
      size="tiny"
      :before-close="handleClose">
            <span>
              <el-tag type="primary" style="font-size: medium;margin: 5px">服务器api_url</el-tag>
              <el-input v-model="api_url" style="width: 50%"></el-input>
            </span>
      <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="set_url">确 定</el-button>
              </span>
    </el-dialog>
    <el-form :model="ruleForm" ref="ruleForm"  class="login-form">
      <img src='../../assets/home.png' width="48" height="48" style="margin: 0 40%" >
      <h2 class="title">Sign in to One-Platform</h2>
      <el-form-item label="" >
        <label class="login-label">Email address</label>
        <el-input v-model="ruleForm.email" class="login-input" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label=""  style="margin-top: -20px">
        <label class="login-label">Password</label>
        <el-input v-model="ruleForm.password" class="login-input" placeholder="" type="password"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-checkbox label="" v-model="rememberPWD" name="rememberPWD" class="remember-pwd">remember password</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="submitForm('ruleForm')" class="login-btn">Sign In</el-button>
        <el-button @click="resetForm('ruleForm')" class="sign_up-btn">Sign Up</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import ElIcon from '../../../node_modules/element-ui/packages/icon/src/icon'
  //  import commonJs from '../../util/common'
  import md5 from 'md5'
  export default {
    components: {ElIcon},
    data () {
      let getapiUrl = localStorage.getItem('api_url')
      return {
        api_url: getapiUrl,
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
      ...mapActions({
        setApiUrl: 'setApiUrl'
      }),
      set_url () {
        console.log(this)
        this.dialogVisible = false
        let apiurl = this.api_url
        if (!apiurl) {
          apiurl = 'http://localhost:5050/api'
        }
        if (!apiurl.startsWith('http://')) {
          apiurl = 'http://'.concat(apiurl)
        }
        window.localStorage.setItem('api_url', apiurl)
        this.setApiUrl({
          setApiUrl: this.api_url
        })
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
            'method': 'sign_in',
            'id': 1111,
            'params': {
              'email': that.ruleForm.email,
              'password': passwordHash
            }
          }
          this.$refs[formName].validate((valid) => {
            if (valid) {
              let getapiUrl = localStorage.getItem('api_url', 'http://localhost:5050/api')
              that.axios.post(getapiUrl, resourse)
                .then((res) => {
                  console.log(res)
                  if (res.data.result.msg === 'success') {
                    let userid = res.data.result.user_id
                    let username = res.data.result.user_name
                    window.localStorage.setItem('email', that.ruleForm.email)
                    window.localStorage.setItem('user_id', userid)
                    window.localStorage.setItem('user_name', username)
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

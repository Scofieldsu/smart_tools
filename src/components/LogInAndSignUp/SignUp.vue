<template>
  <el-col :span="24" class="login-layout">
      <el-form :model="signupForm" :rules="rules" ref="ruleForm"  class="login-form">
        <img src='../../assets/home.png' width="48" height="48" style="margin: 0 40%" >
        <h2 class="title">Sign Up to One-Platform</h2>
        <el-form-item label="" prop="email">
          <el-input v-model="signupForm.email" class="login-input" placeholder="*email_address"></el-input>
        </el-form-item>
        <el-form-item label="" prop="name">
          <el-input v-model="signupForm.name" class="login-input" placeholder="*user_name"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input v-model="signupForm.password" class="login-input" type="password" placeholder="*password"></el-input>
        </el-form-item>
        <el-form-item label="" prop="passwordComfirm">
          <el-input v-model="signupForm.passwordComfirm" class="login-input" type="password" placeholder="*Confirm_password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="submitForm('ruleForm')" class="signin-btn">Sign Up</el-button>
          <el-button @click="resetForm('ruleForm')" class="login-btn">Back to Sign in</el-button>
        </el-form-item>
      </el-form>
  </el-col>
</template>
<script>
  import md5 from 'md5'
  import ElTag from '../../../node_modules/element-ui/packages/tag/src/tag'
  export default {
    components: {ElTag},
    data () {
      var validatePassComfirm = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('*Please enter confirm password!'))
        } else if (value !== this.signupForm.password) {
          callback(new Error('The password for the two time is inconsistent!'))
        } else {
          callback()
        }
      }
      return {
        signupForm: {
          email: '',
          name: '',
          password: '',
          passwordComfirm: ''
        },
        rules: {
          email: [
            { required: true, message: '*Please enter email_address!', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '*Please enter user_name!', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '*Please enter password!', trigger: 'blur' }
          ],
          passwordComfirm: [
            {required: true, validator: validatePassComfirm, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      resetForm () {
        this.$router.replace('/login')
      },
      submitForm (formName) {
        let that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let passwordHash = md5(that.signupForm.passwordComfirm)
            let resourse = {
              'jsonrpc': '2.0',
              'method': 'sign_up',
              'id': 1111,
              'params': {
                'email': that.signupForm.email,
                'username': that.signupForm.name,
                'password': passwordHash
              }
            }
            that.axios.post('/api', resourse)
            .then((res) => {
              console.log(res)
              if (res.data !== '' && 'result' in res.data) {
                if ('msg' in res.data.result) {
                  if (res.data.result.msg === 'success') {
                    that.$notify({
                      title: 'Sign Up Success',
                      type: 'success',
                      duration: 1200
                    })
                    that.$router.push('/login')
                  } else {
                    let msg = res.data.result.msg
                    that.$notify({
                      title: 'Sign Up Failed',
                      message: msg,
                      type: 'error',
                      duration: 1200
                    })
                  }
                }
              } else if ('error' in res.data) {
                let error = res.data.error
                that.$notify({
                  title: 'Sign Up Failed',
                  message: error,
                  type: 'error',
                  duration: 1200
                })
              } else {
                that.$notify({
                  title: 'Sign Up Failed',
                  message: 'Some abnormal error has happened!',
                  type: 'error',
                  duration: 1200
                })
              }
            })
            .catch((err) => {
              console.error(err)
              that.$notify({
                title: 'Sign Up Failed',
                type: 'error',
                duration: 1200
              })
            })
          }
        })
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
    background-image: url('../../assets/background_login_1.png');
  }
  .login-input {
    margin-left: 10%;
    width: 85%;
    float: left;
  }

  .login-btn, .signin-btn {
    width: 85%;
    margin: 10px 0 15px 10%;
  }
  .login-label {
    font-weight: bolder;
    margin-left: 10%
  }
</style>

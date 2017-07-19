<template>
    <el-col :span="24" class="login-layout">
      <el-form :model="ruleForm" ref="ruleForm"  class="login-form">
        <img src='../../assets/home.png' width="48" height="48" style="margin: 0 40%" >
        <h2 class="title">Sign in to SmtTol</h2>
        <el-form-item label="" prop="name" >
          <label class="login-label">Email address</label>
          <el-input v-model="ruleForm.name" class="login-input" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="" prop="password" style="margin-top: -20px">
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
  import ElIcon from '../../../node_modules/element-ui/packages/icon/src/icon'
//  import commonJs from '../../util/common'
//  import md5 from 'md5'
  export default {
    components: {ElIcon},
    data () {
      return {
        rememberPWD: false,
        ruleForm: {
          name: '',
          password: ''
        }
      }
    },
    methods: {
      resetForm (formName) {
        this.$refs[formName].resetFields()
        this.$router.replace('/sign_up')
      },
      submitForm (formName) {
        if (!this.ruleForm.name) {
          this.$notify({
            title: 'Warning',
            message: 'Please enter email_address',
            type: 'error',
            duration: 1200,
            offset: 40
          })
        } else if (!this.ruleForm.password) {
          this.$notify({
            title: 'Warning',
            message: 'Please enter password',
            type: 'error',
            duration: 1200,
            offset: 40
          })
        } else {
          console.log('login submit!')
          this.$router.push('/yours/notices')
        }
//        let cookieMaker = commonJs.cookieMaker
        let that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // that.$router.push('/')
            window.localStorage.setItem('ms_username', that.ruleForm.name)
//            that.axios.post('/login', qs.stringify({
//              name: that.ruleForm.name,
//              password: md5(that.ruleForm.password)
//            }))
//            .then((res) => {
//              console.log(res)
//              if (res.data === 'success') {
            if (that.rememberPWD) {
//              cookieMaker.save('name', that.ruleForm.name, 30)
//              cookieMaker.save('password', md5(that.ruleForm.password), 30)
              // cookieMaker.save('token', res.data.token, 7)
            }
//              } else {
//                that.$notify({
//                  title: '登录失败',
//                  type: 'error',
//                  duration: 2000
//                })
//              }
//            if (res.data.SignIn === 'true') {
//              window.sessionStorage['name'] = that.ruleForm.name
//              window.sessionStorage['password'] = that.ruleForm.password
//            }
//            })
//              .catch((err) => {
//                console.error(err)
//                that.$notify({
//                  title: '登录失败',
//                  type: 'error',
//                  duration: 2000
//                })
//              })
//          } else {
//            console.log('error submit!!')
//            return false
//          }
//          }
//        },)
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

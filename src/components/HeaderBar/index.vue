<template>
  <el-col :span="24" class="panel-top">
    <el-col :span="20" style="font-size: 26px">
      <span class="logo-text"><el-button type="text" class="top-button" @click="return_all">One-Platform</el-button></span>
      <i class="fa fa-navicon sideBar-toggle-btn" @click="centerRightWidth"></i>
    </el-col>
    <el-col :span="4">
      <el-tooltip class="item tip-logout" effect="dark" content="退出" placement="bottom">
        <span padding-top="4px"><i class="fa fa-sign-out" @click="logout"></i></span>
      </el-tooltip>
      <h5 class="admin"><i class="fa fa-user user-logo" aria-hidden="true"></i>欢迎 <span style="color: #41B883">{{ username }}</span></h5>
    </el-col>
  </el-col>
</template>

<script>
  /* eslint-disable no-unneeded-ternary,no-undef */

  import commonJs from '../../util/common'
  import { mapActions } from 'vuex'
  import ElButton from '../../../node_modules/element-ui/packages/button/src/button'
  export default {
    components: {ElButton},
    name: 'HeaderBar',
    computed: {
      username () {
        let username = localStorage.getItem('user_name')
        return username ? username : this.name
      }
    },
    props: {
      myMessage: {
        type: String,
        default: '欢迎管理员'
      }
    },
    created () {
    },
    methods: {
      ...mapActions([
        'centerRightWidth'
      ]),
      return_all () {
        this.$router.push('/tools/all_tools')
      },
      logout () {
        localStorage.removeItem('user_name')
        localStorage.removeItem('user_id')
        localStorage.removeItem('email')
        sessionStorage.removeItem('login')
        let cookieMaker = commonJs.cookieMaker
        cookieMaker.remove('name')
        cookieMaker.remove('password')
        console.log('logout')
        this.$router.push('/login')
      }
    }
  }
</script>

<style scoped>
.panel-top {
  height: 50px;
  line-height: 50px;
  background: #475669;
  color:#c0ccda;
}

.top-button {
  font-size: 30px;
  color: lightseagreen;
}
.tip-logout{
  float: right;
  margin-right: 20px;
}

.tip-logout i{
  cursor: pointer;
}
.logo {
  width: 40px;
  float: left;
  margin: 10px 10px 10px 18px;
}

.logo-text {
  float: left;
  margin-left: 10px;
}

.sideBar-toggle-btn {
  margin-left: 20px;
  cursor: pointer;
}

.user-logo {
  margin-right: 5px;
}

.admin {
  margin: 0 20px;
  float: right;
  text-align: center;
  color: #c0ccda;
}
</style>

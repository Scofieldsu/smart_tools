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
      <el-card class="box-card" v-for="o in 10" :key="o">
        <div  class="text item">
          <i style="font-weight: bolder;color: #ff4949">{{'公告标题'}}</i>
          <br/>
          {{'公告内容' + o }}
          <br/>
          <el-button type="text" style="float: right">展开</el-button>
          <br/>
          <i style="font-size: small;font-weight: lighter;color: #324157;">{{'公告作者'}}</i>
          <i style="font-size: small;font-weight: lighter;color: lightseagreen; margin-left: 5px">{{'2017-09-05'}}</i>
        </div>
      </el-card>
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

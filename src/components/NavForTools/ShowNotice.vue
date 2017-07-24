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
        <el-alert
          title="xxx 发布了 内网api-test服务！"
          @close="handle_close"
          type="success">
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
      <div style="margin-top: 20px">
        <el-row v-model="resultData">
          <el-col :span="8" v-for="resultitem in resultData" :key="resultitem.name"  style="height: 40px;width: 200px;margin: 0px 20px 260px 20px">
            <el-card :body-style="{ padding: '0px' }">
              <el-tag type="danger">{{resultitem.tag}}</el-tag>
              <el-button type="text" style="float: right;margin-right: 10px;margin-top: 10px" @click="star_off">取消收藏</el-button>
              <el-button type="text" class="image" @click="arrive(resultitem.link)">{{resultitem.shortcut}}</el-button>
              <div style="padding: 14px;">
                <span>{{resultitem.name}}</span>
                <div class="bottom clearfix">
                  <el-button type="text" class="button_go" @click="get_detail(resultitem.id)">详情</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        resultData: [
          {
            tag: 'default',
            shortcut: 'default',
            name: 'service_name'
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
      let getapiUrl = localStorage.getItem('api_url')
      if (!getapiUrl) {
        getapiUrl = this.getApiUrl
      }
      let userid = window.localStorage.getItem('user_id')
      if (userid) {
        userid = Number(userid)
      }
      let resourse = {
        'jsonrpc': '2.0',
        'method': 'get_service_list',
        'id': 1111,
        'params': {
          'user_id': userid
        }
      }
      that.axios.post(getapiUrl, resourse)
        .then(function (res) {
          that.resultData = res.data.result
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    methods: {
      handle_close (title) {
        console.log(title)
      },
      arrive (link) {
        window.open(link)
      },
      star_off () {
        this.$message({
          message: '已取消收藏',
          type: 'success'
        })
      }
    }
  }
</script>

<style>
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

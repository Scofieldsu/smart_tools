<template>
  <el-row v-model="resultData">
    <el-col :span="8" v-for="resultitem in resultData" :key="resultitem.name" :offset="index > 0 ? 2 : 0" style="height: 40px;width: 200px;margin: 0px 20px 260px 20px">
      <el-card :body-style="{ padding: '0px' }">
        <el-tag type="danger">{{resultitem.tag}}</el-tag>
        <el-button type="text" style="float: right;margin-right: 10px;margin-top: 10px" @click="star_on">收藏</el-button>
        <el-button type="text" class="image" @click="arrive(resultitem.link)">{{resultitem.shortcut}}</el-button>
        <div style="padding: 14px;">
          <span>{{resultitem.name}}</span>
          <div class="bottom clearfix">
            <el-button type="text" class="button_go" >详情</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  import { mapGetters } from 'vuex'
  import ElTag from '../../../node_modules/element-ui/packages/tag/src/tag'
  import ElButton from '../../../node_modules/element-ui/packages/button/src/button'
  import ElInput from '../../../node_modules/element-ui/packages/input/src/input'
  export default {
    components: {
      ElInput,
      ElButton,
      ElTag},
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
        'getApiUrl'
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
      arrive (link) {
        window.open(link)
      },
      star_on () {
        this.$message({
          message: '已收藏',
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
    word-break: keep-all;
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

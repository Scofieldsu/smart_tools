<template>
  <el-row>
    <el-col :span="8" v-for="(o, index) in 20" :key="o" :offset="index > 0 ? 2 : 0" style="height: 40px;width: 200px;margin: 0px 20px 250px 20px">
      <el-card :body-style="{ padding: '0px' }">
        <el-tag type="danger">docker</el-tag>
        <img src='../../assets/home.png' class="image">
        <div style="padding: 14px;">
          <span>内网服务</span>
          <div class="bottom clearfix">
            <el-button type="text" class="button_go" @click="arrive">访问</el-button>
            <el-button type="text" class="button_detail" >详情</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  import ElTag from '../../../node_modules/element-ui/packages/tag/src/tag'
  export default {
    components: {ElTag},
    data () {
      return {
      }
    },
    methods: {
      arrive () {
        window.open('http://192.168.5.91:5000/api_test')
      }
    }
  }
</script>


<style>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button_go {
    padding: 0;
    float: right;
  }

  .button_detail {
    padding: 0;
    float: left;
  }

  .image {
    width: 80%;
    display: block;
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

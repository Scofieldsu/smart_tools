<template>
  <el-row>
    <el-col :span="8" v-for="(o, index) in 20" :key="o" :offset="index > 0 ? 2 : 0" style="height: 40px;width: 200px;margin: 0px 20px 260px 20px">
      <el-card :body-style="{ padding: '0px' }">
        <el-tag type="danger">docker</el-tag>
        <el-button type="text" style="float: right;margin-right: 10px;margin-top: 10px" @click="star_on">收藏</el-button>
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
  import ElButton from '../../../node_modules/element-ui/packages/button/src/button'
  export default {
    components: {
      ElButton,
      ElTag},
    data () {
      return {
      }
    },
    methods: {
      arrive () {
        window.open('http://192.168.5.91:5000/api_test')
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

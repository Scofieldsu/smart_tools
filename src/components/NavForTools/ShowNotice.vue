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
        <el-row>
          <el-col :span="8" v-for="(o, index) in 5" :key="o" :offset="index > 0 ? 2 : 0" style="height: 40px;width: 200px;margin: 0px 20px 260px 20px">
            <el-card :body-style="{ padding: '0px' }">
              <el-button type="text" style="float: right;margin-right: 10px;margin-top: 10px" @click="star_off">取消收藏</el-button>
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
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    methods: {
      handle_close (title) {
        console.log(title)
      },
      arrive () {
        window.open('http://192.168.5.91:5000/api_test')
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

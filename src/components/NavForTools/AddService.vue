<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" >
    <el-tab-pane label="发布服务" name="first">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="服务名称">
          <el-tooltip class="item" effect="dark" content="为了更好显示效果，请控制在20汉字或40字符以内。" placement="right-start">
            <el-input v-model="form.name" style="width: 500px" ></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="短称">
          <el-tooltip class="item" effect="dark" content="为了更好显示效果，请控制在9汉字或18字符以内,将以空格为分隔符进行换行显示，最多可分3行显示。" placement="right-start">
            <el-input v-model="form.shortcut" style="width: 500px"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="链接">
          <el-tooltip class="item" effect="dark" content="请输入有效的服务链接地址。" placement="right-start">
            <el-input v-model="form.link" style="width: 500px"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="通知链接">
          <el-tooltip class="item" effect="dark" content="默认打开此开关，则发布成功后会在个人首页的通知项显示一条通知。" placement="right-start">
            <el-switch
              v-model="form.notice"
              on-text=""
              off-text="">
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="标签">
          <el-tooltip class="item" effect="dark" content="为你的服务添加个性标签。" placement="right-start">
            <el-input v-model="form.tag" style="width: 500px"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="简介">
          <el-tooltip class="item" effect="dark" content="简短的介绍你的服务。" placement="right-start">
            <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 3, maxRows: 15}" style="width: 500px"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">发布</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>

</template>

<script>
  import { mapGetters } from 'vuex'
  import ElFormItem from '../../../node_modules/element-ui/packages/form/src/form-item'
  import ElTabPane from '../../../node_modules/element-ui/packages/tabs/src/tab-pane'
  export default {
    components: {
      ElTabPane,
      ElFormItem},
    data () {
      return {
        activeName: 'first',
        form: {
          name: '',
          link: '',
          shortcut: '',
          notice: true,
          tag: '',
          desc: ''
        }
      }
    },
    computed: {
      ...mapGetters([
        'getApiUrl'
      ])
    },
    methods: {
      handleClick () {},
      onSubmit () {
        console.log('submit!')
        let userid = window.localStorage.getItem('user_id')
        if (userid) {
          userid = Number(userid)
        }
        if (!userid) {
          this.$notify({
            title: '无效的用户',
            type: 'error',
            duration: 1200
          })
        } else if (!this.form.name) {
          this.$notify({
            title: '请输入服务器名称',
            type: 'error',
            duration: 1200
          })
        } else if (!this.form.link) {
          this.$notify({
            title: '请输入链接地址',
            type: 'error',
            duration: 1200
          })
        } else {
          let notice = this.form.notice
          if (notice) {
            notice = 1
          } else {
            notice = 0
          }
          let resourse = {
            'jsonrpc': '2.0',
            'method': 'serviceapi.add_service',
            'id': 1111,
            'params': {
              'user_id': userid,
              'service_name': this.form.name,
              'link': this.form.link,
              'tag': this.form.tag,
              'shortcut': this.form.shortcut,
              'desc': this.form.desc,
              'notice': notice
            }
          }
          this.axios.post(this.getApiUrl, resourse)
            .then((res) => {
              console.log(res)
              if (res.data !== '' && 'result' in res.data) {
                if ('msg' in res.data.result) {
                  if (res.data.result.msg === 'success') {
                    this.$notify({
                      title: 'Add Service Success',
                      type: 'success',
                      duration: 1200
                    })
                    this.$router.push('/yours/all_tools')
                  } else {
                    let msg = res.data.result.msg
                    this.$notify({
                      title: 'Add Service Failed',
                      message: msg,
                      type: 'error',
                      duration: 1200
                    })
                  }
                }
              } else if ('error' in res.data) {
                let error = res.data.error
                this.$notify({
                  title: 'Add Service Failed',
                  message: error,
                  type: 'error',
                  duration: 1200
                })
              } else {
                this.$notify({
                  title: 'Add Service Failed',
                  message: 'Some abnormal error has happened!',
                  type: 'error',
                  duration: 1200
                })
              }
            })
            .catch((err) => {
              console.error(err)
              this.$notify({
                title: 'Add Service Failed',
                type: 'error',
                duration: 1200
              })
            })
        }
      }
    }
  }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .item {
    margin: 4px;
  }
</style>

<template>
    <div>
      <el-input v-model="title" placeholder="标题"  type="textarea" :autosize={minRows:1,maxRows:10} style="margin: 20px 0;width: 80%"></el-input>
      <div class="editor-container" style="width: 80%;overflow:auto">
        <md-editor id='contentEditor' ref="contentEditor" v-model='content' :height="600" :zIndex='20'></md-editor>
      </div>
      <div style="margin-top: 50px">
        <el-button type="primary" @click="handlesubmit">发布</el-button>
      </div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import MdEditor from './Mdeditor.vue'
  import ElInput from '../../../node_modules/element-ui/packages/input/src/input'
  import ElButton from '../../../node_modules/element-ui/packages/button/src/button'
  export default {
    components: {
      ElButton,
      ElInput,
      MdEditor},
    computed: {
      ...mapGetters([
        'getApiUrl'
      ])
    },
    data () {
      return {
        title: '',
        content: ''
      }
    },
    methods: {
      handlesubmit () {
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
        } else if (!this.title) {
          this.$notify({
            title: '标题不能为空！',
            type: 'error',
            duration: 1200
          })
        } else if (!this.content) {
          this.$notify({
            title: '内容不能为空！',
            type: 'error',
            duration: 1200
          })
        } else {
          let resourse = {
            'jsonrpc': '2.0',
            'method': 'publicinfoapi.add_public_info',
            'id': 1111,
            'params': {
              'user_id': userid,
              'title': this.title,
              'content': this.content
            }
          }
          this.axios.post(this.getApiUrl, resourse)
            .then((res) => {
              console.log(res)
              if (res.data !== '' && 'result' in res.data) {
                if ('msg' in res.data.result) {
                  if (res.data.result.msg === 'success') {
                    this.$notify({
                      title: 'Add PublicInfo Success',
                      type: 'success',
                      duration: 1200
                    })
                    this.title = ''
                    this.content = ''
                    this.$router.push('/yours/notices')
                  } else {
                    let msg = res.data.result.msg
                    this.$notify({
                      title: 'Add PublicInfo Failed',
                      message: msg,
                      type: 'error',
                      duration: 1200
                    })
                  }
                }
              } else if ('error' in res.data) {
                let error = res.data.error
                this.$notify({
                  title: 'Add PublicInfo Failed',
                  message: error,
                  type: 'error',
                  duration: 1200
                })
              } else {
                this.$notify({
                  title: 'Add PublicInfo Failed',
                  message: 'Some abnormal error has happened!',
                  type: 'error',
                  duration: 1200
                })
              }
            })
            .catch((err) => {
              console.error(err)
              this.$notify({
                title: 'Add PublicInfo Failed',
                type: 'error',
                duration: 1200
              })
            })
        }
      }
    }
  }
</script>

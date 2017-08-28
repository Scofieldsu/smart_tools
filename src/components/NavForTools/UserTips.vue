<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="个人链接" name="first">
      <div>
        <el-form :model="alltips">
          <template>
            <el-form-item label="Add Tips:">
              <div>
                <i class="el-icon-plus" @click="onAddHeader('addHeader')" style="cursor: pointer" ></i>
              </div>
              <div v-for="(item, name) in methodParams" v-bind:key="name" style="margin-bottom:10px;">
                <el-input v-model.trim="item.name" style="width: 15%;" ></el-input>
                <el-input v-model.trim="item.link" style="width: 30%;" ></el-input>
                <i class="el-icon-delete" @click="onRemoveHeader('delHeader',name)"></i>
              </div>
            </el-form-item>
          </template>
        </el-form>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  export default {
    components: {},
    data () {
      return {
        activeName: 'first',
        alltips: {},
        methodParams: [{name: '', link: '', explain: ''}]
      }
    },
    watch: {},
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
      },
      onAddHeader (type) {
        if (type === 'addHeader') {
          this.methodParams.push({name: null, link: null, explain: ''})
        }
      },
      onRemoveHeader (type, name) {
        if (type === 'delHeader') {
          this.methodParams.splice(name, 1)
        }
      }
    }
  }
</script>

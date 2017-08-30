<template>
  <div>
    <el-card style="width: 550px;float: left">
      <schart canvasId="bar" :data="data1" type="bar" :options="options1"></schart>
    </el-card>
    <el-card style="width: 550px;float: left">
      <schart canvasId="bar" :data="data1" type="bar" :options="options1"></schart>
    </el-card>
  </div>
</template>

<script>
  import Schart from 'vue-schart'
  import ElCard from '../../../node_modules/element-ui/packages/card/src/main'
  import ElTag from '../../../node_modules/element-ui/packages/tag/src/tag'

  export default {
    components: {
      ElTag,
      ElCard,
      Schart},
    data () {
      return {
        data1: [
          {name: 'API-test', value: 890},
          {name: 'pypi', value: 699},
          {name: 'docker文档', value: 460},
          {name: '工具资料', value: 170},
          {name: 'docker镜像站', value: 90}
        ],
        width: 1000,
        height: 800,
        options1: {
          title: '服务访问量排行前5名',
          bgColor: '#5e7382',
          titleColor: '#ffffff',
          fillColor: '#ff6d6d',
          axisColor: '#eeeeee',
          contentColor: '#bbbbbb'
        }
      }
    }
  }
</script>

<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" >
    <el-tab-pane label="服务统计" name="first">
      <div>
        <div id="main" style="width: 1400px;height:400px;"></div>
        <div id="piechart" style="width: 1000px;height:400px;"></div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import { mapGetters } from 'vuex'
  import ElButton from '../../../node_modules/element-ui/packages/button/src/button'
  export default {
    components: {ElButton},
    data () {
      return {
        activeName: 'first'
      }
    },
    computed: {
      ...mapGetters([
        'getApiUrl'
      ])
    },
    methods: {
      handleClick () {
      }
    },
    mounted () {
      let that = this
      let namelist = []
      let countlist = []
      let userid = window.localStorage.getItem('user_id')
      if (userid) {
        userid = Number(userid)
      }
      let resourse = {
        'jsonrpc': '2.0',
        'method': 'serviceapi.get_service_visit_count',
        'id': 1111,
        'params': {
          'user_id': userid
        }
      }
      that.axios.post(this.getApiUrl, resourse)
        .then(function (res) {
          let alldata = []
          namelist = res.data.result.name
          countlist = res.data.result.count
          for (let i = 0; i < namelist.length; i++) {
            let tempdict = {name: '', value: 0}
            tempdict.name = namelist[i]
            tempdict.value = countlist[i]
            alldata.push(tempdict)
          }
          myChart.setOption({
            title: { text: '服务访问量排行Top 10' },
            tooltip: {},
            legend: {
              data: ['访问量']
            },
            xAxis: {
              axisLabel: {interval: 0},
              data: namelist.slice(0, 10)
            },
            yAxis: {},
            series: [{
              name: '访问量',
              type: 'bar',
              barWidth: 30,
              data: countlist.slice(0, 10)
            }]
          })
          pieChart.setOption({
            title: { text: '服务' },
            tooltip: {},
            legend: {
              data: namelist
            },
            series: [
              {
                name: '服务-访问量',
                type: 'pie',
                radius: '55%',
                data: alldata
              }
            ]
          })
        })
        .catch(function (err) {
          console.log(err)
        })
      let myChart = this.$echarts.init(document.getElementById('main'))
      let pieChart = this.$echarts.init(document.getElementById('piechart'))
    }
  }
</script>


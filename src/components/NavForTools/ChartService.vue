<template>
  <div>
    <div id="main" style="width: 1000px;height:400px;"></div>
    <div id="piechart" style="width: 1000px;height:400px;"></div>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    mounted () {
      let myChart = this.$echarts.init(document.getElementById('main'))
      let pieChart = this.$echarts.init(document.getElementById('piechart'))
      myChart.setOption({
        title: { text: '服务访问量排行' },
        tooltip: {},
        legend: {
          data: ['访问量', '收藏量']
        },
        xAxis: {
          axisLabel: {interval: 0},
          data: ['API-test', 'pypi内网', 'docker文档', '工具资料', 'docker镜像站', 'rancher', 'API-test', 'pypi内网', 'docker文档', '工具资料']
        },
        yAxis: {},
        series: [{
          name: '访问量',
          type: 'bar',
          data: [50, 200, 360, 100, 100, 200, 50, 200, 360, 100]
        }, {
          name: '收藏量',
          type: 'bar',
          data: [50, 200, 360, 100, 100, 200, 50, 200, 360, 100]
        }
        ]
      })
      pieChart.setOption({
        title: { text: '服务统计' },
        tooltip: {},
        legend: {
          data: ['tom', 'lucy', 'bob', 'Lina', 'kobe']
        },
        series: [
          {
            name: '发布人',
            type: 'pie',
            radius: '55%',
            data: [
              {value: 235, name: 'tom'},
              {value: 274, name: 'lucy'},
              {value: 310, name: 'bob'},
              {value: 335, name: 'Lina'},
              {value: 400, name: 'kobe'}
            ]
          }
        ]
      })
    }
  }
</script>


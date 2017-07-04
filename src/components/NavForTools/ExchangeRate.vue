<template>
  <div id="whole_div">
    <div id="left_half" style="margin: 10px 0;width: 45%;float: left">
      <div id="left_half_top_div" style="width: 700px;height: 200px">
        <div class="child_div_left">
          <el-tag type="primary" style="font-size: larger;margin: 10px 0">货币兑换</el-tag>
          <br/>
          <span style="font-size: 30px;font-weight: bold;color: #20A0FF" v-text="msg1"></span><br/>
          <span style="font-size: 30px;font-weight: bold;color: #13CE66" v-text="msg2"></span>
        </div>
        <div class="child_div_right">
           <span>
             <el-tag type="success"  style="font-size: large;margin: 10px">银行</el-tag>
             <el-select v-model="bank_value" placeholder="请选择">
               <el-option
                 v-for="item in banks"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
               </el-option>
             </el-select>
           </span>
        </div>
      </div>
      <div id="left_half_mid" style="width: 700px;height: 200px">
        <el-select v-model="origin_currency" >
          <el-option
            v-for="item in origins"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            <span style="float: left">{{ item.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
          </el-option>
        </el-select>
        <el-button type="primary">换位</el-button>
        <el-select v-model="trans_currency" >
          <el-option
            v-for="item in trans"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            <span style="float: left">{{ item.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
          </el-option>
        </el-select>
        <br/>
        <el-input v-model="input_num" placeholder="请输入金额" style="width: 280px;margin: 10px 0"></el-input>
        <el-button type="danger" style="margin: 10px 0">转换货币</el-button>
      </div>
      <div id="left_half_bottom" style="width: 700px">
        <el-table
          :data="tableData3"
          height="400"
          border
          style="width: 100%">
          <el-table-column
            prop="type"
            label="货币种类"
            width="100px">
          </el-table-column>
          <el-table-column
            prop="hui_in"
            label="现汇买入价">
          </el-table-column>
          <el-table-column
            prop="chao_out"
            label="现钞卖出">
          </el-table-column>
          <el-table-column
            prop="chao_in"
            label="现钞买入">
          </el-table-column>
          <el-table-column
            prop="hui_out"
            label="现汇卖出">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div style="float: left;width: 45%;margin: 10px 0 0 10px">
      <div class="content-title">柱状图</div>
      <schart canvasId="bar" width="700" height="350" :data="data1" type="bar" :options="options1"></schart>
      <div class="content-title">折线图</div>
      <schart canvasId="line" width="700" height="350" :data="data1" type="line" :options="options1"></schart>
    </div>
  </div>
</template>

<script>
  import Schart from 'vue-schart'
  import ElInput from '../../../node_modules/element-ui/packages/input/src/input'
  import ElButton from '../../../node_modules/element-ui/packages/button/src/button'
  export default {
    components: {
      Schart,
      ElButton,
      ElInput},
    data () {
      return {
        msg1: '1美元=6.7977人民币',
        msg2: '1人民币=0.1477美元',
        input_num: 1,
        bank_value: 'ICBC',
        origin_currency: 'USD',
        trans_currency: 'RMB',
        data1: [
          {name: '2012', value: 1141},
          {name: '2013', value: 1499},
          {name: '2014', value: 2260},
          {name: '2015', value: 1170},
          {name: '2016', value: 970},
          {name: '2017', value: 1450}
        ],
        options1: {
          title: '某银行某货币现汇买入走势图',
          bgColor: '#829dda',
          titleColor: '#ffffff',
          fillColor: '#72f6ff',
          axisColor: '#eeeeee',
          contentColor: '#bbbbbb'
        },
        banks: [{
          value: 'ICBC',
          label: '工商银行'
        }, {
          value: 'BOC',
          label: '中国银行'
        }, {
          value: 'ABCHINA',
          label: '农业银行'
        }, {
          value: 'BANKCOMM',
          label: '交通银行'
        }, {
          value: 'CCB',
          label: '建设银行'
        }, {
          value: 'CMBCHINA',
          label: '招商银行'
        }, {
          value: 'CEBBANK',
          label: '光大银行'
        }, {
          value: 'SPDB',
          label: '浦发银行'
        }, {
          value: 'CIB',
          label: '兴业银行'
        }, {
          value: 'ECITIC',
          label: '中信银行'
        }],
        origins: [
          {
            value: 'JPY',
            label: '日元'
          },
          {
            value: 'SGD',
            label: '新加坡元'
          },
          {
            value: 'HKD',
            label: '港币'
          },
          {
            value: 'MOP',
            label: '澳门元'
          },
          {
            value: 'CAD',
            label: '加拿大元'
          },
          {
            value: 'ZAR',
            label: '南非兰特'
          },
          {
            value: 'NZD',
            label: '新西兰元'
          },
          {
            value: 'AUD',
            label: '澳大利亚元'
          },
          {
            value: 'GBP',
            label: '英镑'
          },
          {
            value: 'DKK',
            label: '丹麦克朗'
          },
          {
            value: 'NOK',
            label: '挪威克朗'
          },
          {
            value: 'SEK',
            label: '瑞典克朗'
          },
          {
            value: 'MYR',
            label: '林吉特'
          },
          {
            value: 'BRL',
            label: '巴西里亚尔'
          },
          {
            value: 'CHF',
            label: '瑞士法郎'
          },
          {
            value: 'EUR',
            label: '欧元'
          },
          {
            value: 'RUB',
            label: '卢布'
          },
          {
            value: 'PHP',
            label: '菲律宾比索'
          },
          {
            value: 'USD',
            label: '美元'
          },
          {
            value: 'THB',
            label: '泰铢'
          },
          {
            value: 'RMB',
            label: '人民币'
          },
          {
            value: 'KRW',
            label: '韩元'
          },
          {
            value: 'TWD',
            label: '新台币'
          }
        ],
        trans: [
          {
            value: 'JPY',
            label: '日元'
          },
          {
            value: 'SGD',
            label: '新加坡元'
          },
          {
            value: 'HKD',
            label: '港币'
          },
          {
            value: 'MOP',
            label: '澳门元'
          },
          {
            value: 'CAD',
            label: '加拿大元'
          },
          {
            value: 'ZAR',
            label: '南非兰特'
          },
          {
            value: 'NZD',
            label: '新西兰元'
          },
          {
            value: 'AUD',
            label: '澳大利亚元'
          },
          {
            value: 'GBP',
            label: '英镑'
          },
          {
            value: 'DKK',
            label: '丹麦克朗'
          },
          {
            value: 'NOK',
            label: '挪威克朗'
          },
          {
            value: 'SEK',
            label: '瑞典克朗'
          },
          {
            value: 'MYR',
            label: '林吉特'
          },
          {
            value: 'BRL',
            label: '巴西里亚尔'
          },
          {
            value: 'CHF',
            label: '瑞士法郎'
          },
          {
            value: 'EUR',
            label: '欧元'
          },
          {
            value: 'RUB',
            label: '卢布'
          },
          {
            value: 'PHP',
            label: '菲律宾比索'
          },
          {
            value: 'USD',
            label: '美元'
          },
          {
            value: 'THB',
            label: '泰铢'
          },
          {
            value: 'RMB',
            label: '人民币'
          },
          {
            value: 'KRW',
            label: '韩元'
          },
          {
            value: 'TWD',
            label: '新台币'
          }
        ],
        tableData3: [{
          type: '新台币',
          hui_in: '6.12',
          chao_out: '6.11',
          chao_in: '5.89',
          hui_out: '6.08'
        }, {
          type: '港币',
          hui_in: '6.12',
          chao_out: '6.11',
          chao_in: '5.89',
          hui_out: '6.08'
        }, {
          type: '美元',
          hui_in: '6.12',
          chao_out: '6.11',
          chao_in: '5.89',
          hui_out: '6.08'
        }, {
          type: '韩元',
          hui_in: '6.12',
          chao_out: '6.11',
          chao_in: '5.89',
          hui_out: '6.08'
        }, {
          type: '日元',
          hui_in: '6.12',
          chao_out: '6.11',
          chao_in: '5.89',
          hui_out: '6.08'
        }, {
          type: '泰铢',
          hui_in: '6.12',
          chao_out: '6.11',
          chao_in: '5.89',
          hui_out: '6.08'
        }, {
          type: '欧元',
          hui_in: '6.12',
          chao_out: '6.11',
          chao_in: '5.89',
          hui_out: '6.08'
        }, {
          type: '卢布',
          hui_in: '6.12',
          chao_out: '6.11',
          chao_in: '5.89',
          hui_out: '6.08'
        }, {
          type: '英镑',
          hui_in: '6.12',
          chao_out: '6.11',
          chao_in: '5.89',
          hui_out: '6.08'
        }, {
          type: '新加坡元',
          hui_in: '6.12',
          chao_out: '6.11',
          chao_in: '5.89',
          hui_out: '6.08'
        }, {
          type: '澳门元',
          hui_in: '6.12',
          chao_out: '6.11',
          chao_in: '5.89',
          hui_out: '6.08'
        }
        ]
      }
    }
  }
</script>

<style scoped>
  .child_div_left {
    float: left;
    margin: 10px;
  }
  .child_div_right {
    float: right;
    margin-right: 10px;
  }
  .content-title{
    clear: both;
    font-weight: 400;
    line-height: 50px;
    margin: 10px 0;
    font-size: 22px;
    color: #1f2f3d;
  }
</style>

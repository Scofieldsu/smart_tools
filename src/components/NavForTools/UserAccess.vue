<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="用户管理" name="first">
      <el-table
        :data="tableData"
        height="800"
        border
        style="width: 100%"
        :default-sort = "{prop: 'id', order: 'ascending'}">
        <el-table-column
          prop="id"
          label="用户ID"
          sortable
          width="120px">
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          sortable
          width="300px">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          sortable
          width="400px">
        </el-table-column>
        <el-table-column
          prop="active"
          label="有效"
          sortable
          width="100px">
        </el-table-column>
        <el-table-column label="操作" >
          <template scope="scope">
            <el-button
              style="margin-left: 30px"
              size="small"
              type="success"
              @click="handleEnable(scope.$index, scope.row)">启用</el-button>
            <el-button
              style="margin-left: 30px"
              size="small"
              type="primary"
              @click="handleDisable(scope.$index, scope.row)">禁用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
  </el-tabs>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        activeName: 'first',
        value: true,
        tableData: []
      }
    },
    computed: {
      ...mapGetters([
        'getApiUrl'
      ])
    },
    created () {
      let that = this
      let getapiUrl = localStorage.getItem('api_url')
      if (!getapiUrl) {
        getapiUrl = this.getApiUrl
      }
      let userid = window.localStorage.getItem('user_id')
      if (userid) {
        userid = Number(userid)
      }
      let resourse = {
        'jsonrpc': '2.0',
        'method': 'get_user_list',
        'id': 1111,
        'params': {
          'user_id': userid
        }
      }
      that.axios.post(getapiUrl, resourse)
        .then(function (res) {
          that.tableData = res.data.result
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
      },
      handleEnable (index, row) {
        this.$message({
          message: '启用成功',
          type: 'success'
        })
      },
      handleDisable (index, row) {
        this.$message({
          message: '禁用成功'
        })
      }
    }
  }
</script>

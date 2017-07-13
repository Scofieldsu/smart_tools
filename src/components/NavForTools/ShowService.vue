<template>
  <el-table
    :data="tableData"
    height="500"
    border
    style="width: 100%"
    :default-sort = "{prop: 'name', order: 'descending'}">
    <el-table-column
      prop="name"
      label="名称"
      sortable
      width="250px">
    </el-table-column>
    <el-table-column
      prop="link"
      label="链接"
      width="400px">
    </el-table-column>
    <el-table-column
      prop="type"
      label="分类"
      width="150px">
    </el-table-column>
    <el-table-column
      prop="tag"
      label="标签"
      width="120px">
    </el-table-column>
    <el-table-column
      prop="publish_time"
      label="发布时间"
      sortable
      width="180px">
    </el-table-column>
    <el-table-column
      prop="change_time"
      label="上次修改时间"
      sortable
      width="180px">
    </el-table-column>
    <el-table-column label="操作">
      <template scope="scope">
        <el-button
          style="margin-left: 8%"
          size="small"
          type="success"
          @click="handleVisit(scope.$index, scope.row)">访问</el-button>
        <el-button
          style="margin-left: 8%"
          size="small"
          type="primary"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          style="margin-left: 8%"
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data () {
      return {
        tableData: [{
          name: '1内网api-test',
          link: 'http://192.168.5.91:5000/api_test',
          type: 'common',
          tag: 'api',
          publish_time: '2017-07-07',
          change_time: '2017-07-10'
        }, {
          name: '2内网api-test',
          link: 'http://192.168.5.91:5000/api_test',
          type: 'common',
          tag: 'api',
          publish_time: '2017-07-08',
          change_time: '2017-07-09'
        }, {
          name: '3内网api-test',
          link: 'http://192.168.5.91:5000/api_test',
          type: 'common',
          tag: 'api',
          publish_time: '2017-07-09',
          change_time: '2017-07-10'
        }, {
          name: '内网api-test',
          link: 'http://192.168.5.91:5000/api_test',
          type: 'common',
          tag: 'api',
          publish_time: '2017-07-07',
          change_time: '2017-07-10'
        }, {
          name: '内网api-test',
          link: 'http://192.168.5.91:5000/api_test',
          type: 'common',
          tag: 'api',
          publish_time: '2017-07-07',
          change_time: '2017-07-10'
        }, {
          name: '内网api-test',
          link: 'http://192.168.5.91:5000/api_test',
          type: 'common',
          tag: 'api',
          publish_time: '2017-07-07',
          change_time: '2017-07-10'
        }]
      }
    },
    methods: {
      handleEdit (index, row) {
        console.log(index, row)
      },
      handleDelete (index, row) {
        console.log(index, row)
      },
      handleVisit (index, row) {
        console.log(index, row)
        window.open(row.link)
      }
    }
  }
</script>

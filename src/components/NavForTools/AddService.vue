<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="服务名称">
      <el-input v-model="form.name" style="width: 500px"></el-input>
    </el-form-item>
    <el-form-item label="链接">
      <el-input v-model="form.link" style="width: 500px"></el-input>
    </el-form-item>
    <el-form-item label="通知链接">
      <el-switch
        v-model="form.notice"
        on-text=""
        off-text="">
      </el-switch>
    </el-form-item>
    <el-form-item label="标签">
      <el-input v-model="form.tag" style="width: 500px"></el-input>
    </el-form-item>
    <el-form-item label="简介">
      <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 3, maxRows: 15}" style="width: 500px"></el-input>
    </el-form-item>
    <el-form-item label="上传图片">
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus
           avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">发布</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import ElFormItem from '../../../node_modules/element-ui/packages/form/src/form-item'
  export default {
    components: {ElFormItem},
    data () {
      return {
        form: {
          name: '',
          link: '',
          notice: true,
          tag: '',
          desc: '',
          imageUrl: ''
        }
      }
    },
    methods: {
      onSubmit () {
        console.log('submit!')
      },
      handleAvatarSuccess (res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload (file) {
        let isJPG = file.type === 'image/jpeg'
        let isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      }
    }
  }
</script>

<style>
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
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

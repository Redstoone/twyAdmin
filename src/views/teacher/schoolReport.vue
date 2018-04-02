<template>
  <section>
    <div class="cheader">
      <span @click="goback" class="goback">返回</span>
      <div class="">{{clazzName}}</div>
    </div>
    <div class="report-wrap">
      <div class="report-opt">
        <el-checkbox v-model="checked">填写完成</el-checkbox>
        <a href="javascript:;" class="btn-save" @click="studentReportEdit">保存</a>
      </div>
      <div class="report-cont">
        <div class="reprot-header">
          <p class="title">天唯印记<br/>艺星素养发展评价报告</p>
          <p class="p1">班级：{{clazzName}}</p>
          <p class="p1">姓名：{{studentName}}</p>
          <p class="p1">学号：{{studentNum}}</p>
        </div>
        <p class="p2">老师寄语</p>
        <div class="report-commont">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请老师填写孩子的综合评语"
            v-model="comment">
          </el-input>
        </div>
        <p class="p2">评价</p>
        <div class="report-star">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请老师填写孩子的评价"
            v-model="starComment">
          </el-input>
        </div>
        <p class="p2">成长足迹</p>
        <div class="report-img">
          <el-upload
            action="http://api.twyxedu.com//api/upload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :before-upload="beforeUpload"
            :on-success="handlePictureSuccess"
            :on-change="handleChange"
            :file-list="fileList">
            <i class="el-icon-plus"></i>
          </el-upload>
        </div>
      </div>
    </div>
    <div class="report-bg"></div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl">
    </el-dialog>
  </section>
</template>

<script>
import api from '../../api/index.js'

export default {
  name: 'Clazz',
  data () {
    return {
      name: null,
      sId: null,
      clazzName: null,
      studentName: null,
      studentNum: null,
      comment: null,
      starComment: null,
      status: null,
      imageUrl: null,
      dialogImageUrl: '',
      dialogVisible: false,
      checked: false,
      imgList: [],
      imageList: [],
      fileList: []
    }
  },
  created () {
    this.sId = this.$route.query.sid
    this.name = this.$route.query.name
    this.getStudentReport(this.sId)
  },
  methods: {
    getStudentReport (sId) {
      api.studentReport({studentId: sId}).then(res => {
        if (res.status === 'succ') {
          this.clazzName = res.data.clazzName
          this.studentName = res.data.studentName
          this.studentNum = res.data.studentNum
          this.comment = res.data.comment
          this.starComment = res.data.starComment
          if (res.data.status === '已完成') {
            this.checked = true
          } else {
            this.checked = false
          }
          this.imageList = res.data.imgUrls ? res.data.imgUrls.split(',') : []
          this.imageList.forEach(item => {
            this.fileList.push({url: item})
          })
          if (this.imageList.length >= 4) {
            document.querySelector('.el-upload--picture-card').style.display = 'none'
          }
        }
      })
    },
    studentReportEdit () {
      api.studentReportEdit({
        studentId: this.sId,
        comment: this.comment,
        starComment: this.starComment,
        imgUrls: this.imageList.join(','),
        status: this.checked ? '已完成' : '已填写未完成'
      }).then(res => {
        if (res.status === 'succ') {
          this.$notify({
            message: '编辑成绩单成功',
            type: 'success'
          })
        } else {
          this.$notify({
            message: res.message,
            type: 'error',
            duration: 0
          })
        }
      })
    },
    goback () {
      window.close()
    },
    // 上传图片
    beforeUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 1
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 1MB!')
      }
      return isLt2M
    },
    handleRemove (file, fileList) {
      this.imageList = []
      fileList.forEach(item => {
        if (file && file.response) {
          this.imageList.push(item.response)
        } else {
          this.imageList.push(item.url)
        }
      })
      this.fileList = fileList
      if (this.imageList.length < 4) {
        document.querySelector('.el-upload--picture-card').style.display = 'inline-block'
      }
    },
    handlePictureSuccess (res, file) {
      this.imageList.push(file.response)
      this.fileList.push(file)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleChange (file, fileList) {
      if (fileList.length >= 4) {
        document.querySelector('.el-upload--picture-card').style.display = 'none'
      } else {
        this.fileList = fileList
      }
    }
  }
}
</script>

<style scoped>
.report-bg{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #bfcbd1;
  z-index: 0;
}
.cheader{
  height: 70px;
  border-bottom: 1px solid #e1e1e1;
  line-height: 50px;
  font-size: 20px;
  position: relative;
  width: 100%;
  margin: 0 auto;
  padding: 20px 3% 0;
  box-sizing: border-box;
  text-align: center;
  z-index: 11;
  background-color: #fff;
}
.cheader .goback{
  position: absolute;
  font-size:14px;
  color:#4a4a4a;
  left: 3%;
  top: 20px;
  cursor: pointer;
}
.cheader .goback:hover{
  text-decoration: underline;
  color: blue;
}
.report-wrap{
  padding: 30px 0;
  position: relative;
  z-index: 10;
}
.report-wrap .report-cont{
  background:#fff;
  box-shadow:0 0 24px 0 rgba(0,0,0,0.08);
  border-radius:8px;
  width:375px;
  margin: 0 auto;
  padding: 20px 0;
}
.report-wrap .reprot-header{
  text-align: center;
  margin-bottom: 20px;
}
.report-wrap .title{
  font-size:20px;
  line-height: 28px;
  color:#000;
  text-align:center;
  padding: 0 0 20px;
}
.report-wrap .p1{
  font-size:14px;
  color:#000;
  width:150px;
  margin: 8px auto;
  text-align: left;
}
.report-wrap .p2{
  font-size:14px;
  color:#000;
  text-align: center;
}
.report-commont,
.report-star,
.report-img{
  width: 320px;
  margin: 0 auto;
}
.btn-save{
  background:#0e971e;
  border-radius:5px;
  width:89px;
  height:36px;
  line-height: 36px;
  text-align: center;
  color: #fff;
  display: inline-block;
}
.report-opt{
  position: absolute;
  right: 15px;
  top: 15px;
}
</style>

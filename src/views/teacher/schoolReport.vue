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
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :file-list="imgList">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>
      </div>
    </div>
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
      imgList: []
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
          this.imgList = res.data.imgUrls ? res.data.imgUrls.split(',') : []
        }
      })
    },
    studentReportEdit () {
      api.studentReportEdit({
        studentId: this.sId,
        comment: this.comment,
        starComment: this.starComment,
        imgUrls: this.imgList.join(','),
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
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>
.cheader{
  height: 50px;
  border-bottom: 1px solid #e1e1e1;
  line-height: 50px;
  font-size: 20px;
  position: relative;
  width: 94%;
  margin: 20px auto 0;
  text-align: center;
}
.cheader .goback{
  position: absolute;
  font-size:14px;
  color:#4a4a4a;
  left: 15px;
  top: 0;
  cursor: pointer;
}
.cheader .goback:hover{
  text-decoration: underline;
  color: blue;
}
.report-wrap{
  background-color: #bfcbd1;
  padding: 10px 0;
  position: relative;
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

<template>
  <section>
    <div class="cheader">
      <span @click="goback" class="goback">返回</span>
      <div class="">{{clazzName}}</div>
    </div>
    <div class="report-wrap">
      <div class="report-cont">
        <div class="reprot-header">
          <p class="title">天唯印记<br/>艺星素养发展评价报告</p>
          <p class="p1">班级：{{clazzName}}</p>
          <p class="p1">姓名：{{studentName}}</p>
          <p class="p1">学号：{{studentNum}}</p>
        </div>
        <p class="p2">老师寄语</p>
        <div class="report-commont">{{comment?comment:'老师未写寄语'}}</div>
        <p class="p2">评价</p>
        <div class="report-star">{{starComment?comment:'老师未写评价'}}</div>
        <p class="p2">成长足迹</p>
        <div class='img-list'>
          <div class="img" v-for="(item, index) in imageList" :key="index">
            <img :src="item">
          </div>
        </div>
      </div>
    </div>
    <div class="report-bg"></div>
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
        }
      })
    },
    goback () {
      window.close()
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
.report-commont,
.report-star{
  min-height: 100px;
  margin-bottom: 20px;
}
.img-list{
  width: 350px;
  margin: 0 auto;
}
.img-list .img{
  width: 110px;
  height: 110px;
  margin-right: 10px;
  margin-bottom: 10px;
  display: inline-block;
}
.img-list .img:nth-child(3n){
  margin-right: 0;
}
.img-list img{
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
</style>

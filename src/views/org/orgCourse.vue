<template>
  <section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px">
      <el-button size="small" type="primary" @click="handleAddCourse">课程添加</el-button>
    </el-col>

    <!-- <el-col :span="24" class="toolbar txt-right" style="padding-bottom: 0px" v-else>
      <el-button size="small" type="primary" @click="goBack">取消返回</el-button>
      <el-button size="small" type="primary" @click="createCourse">保存</el-button>
    </el-col> -->

    <el-col class="" :loading="listLoading">
      <ul class="course-list">
        <li class="course-item" v-for="(item, index) in courseList" :key="index">
          <div class="edit-wrap">
            <span @click="courseUnpublish(item, item.release, index)" v-if="item.release">取消发布</span>
            <span @click="coursePublish(item, item.release, index)" v-else>立即发布</span>
            <span @click="courseDel(item.id)">删除</span>
            <span @click="editCourse(item)">编辑查看</span>
          </div>
          <p class="name">{{item.name}}</p>
          <!-- <p>适合年龄：{{item.age}}</p> -->
          <!-- <p>课时安排：{{item.time}}</p> -->
          <!-- <p>介绍：{{item.desc}}</p> -->
          <p v-if="item.feeType == 1">价格：{{item.fee}}元/学期</p>
          <p v-else>价格：按课时计算（只适用于钢琴课，当面询价付款）</p>
          <p><el-checkbox v-model="item.order" @change="changeOrder(item)">允许预约体验</el-checkbox></p>
        </li>
      </ul>
    </el-col>

    <!-- <el-col v-else> -->
      <!-- <el-form :model="addCourse" label-width="100px" :rules="addCourseRules" ref="addCourse">
        <el-form-item label="课程名称" prop="name">
          <el-input v-model="addCourse.name" auto-complete="off" placeholder="请输入课程名称"></el-input>
        </el-form-item>
        <el-form-item label="适合年龄" prop="age">
          <el-input v-model="addCourse.age" auto-complete="off" placeholder="请输入适合年龄"></el-input>
        </el-form-item>
        <el-form-item label="课程收费" prop="address">
          <el-radio-group v-model="addCourse.address">
            <div class="">
              <el-radio :label="1">按课时算</el-radio>
              <div>设置金额</div>
            </div>
            <div class="">
              <el-radio :label="2">按学期算</el-radio>
              <div>每学期金额：<el-input v-model="addCourse.age" auto-complete="off" placeholder="请输入"></el-input></div>
            </div>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="课程介绍" prop="content">
          <el-input v-model="addCourse.content" auto-complete="off" placeholder="请输入课程介绍"></el-input>
        </el-form-item>
      </el-form> -->
    <!-- </el-col> -->

    <el-dialog title="编辑网点" :visible.sync="courseVisible" :close-on-click-modal="false" width="480px">
      <el-form :model="addCourse" label-width="100px" :rules="addCourseRules" ref="addCourse">
        <el-form-item label="课程名称" prop="name">
          <el-input v-model="addCourse.name" auto-complete="off" placeholder="请输入课程名称"></el-input>
        </el-form-item>
        <el-form-item label="课程收费" prop="feeType">
          <el-radio-group v-model="addCourse.feeType">
            <div class="radio-item">
              <el-radio :label="0">按课时算</el-radio>
              <div class="radio-inline"><span class="radio-tip">(只适用于钢琴课，当面询价付款)</span></div>
            </div>
            <div class="radio-item">
              <el-radio :label="1">按学期算</el-radio>
              <div class="radio-inline" v-if="addCourse.feeType == 1"><span class="radio-tip">每学期金额：</span><el-input style="width:100px;" v-model="addCourse.fee" auto-complete="off" placeholder="请输入"></el-input></div>
            </div>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="courseVisible = false">取消</el-button>
        <el-button type="primary" @click.native="courseSubmit" :loading="courseLoading">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import api from '../../api/index.js'

export default {
  name: 'Course',
  data () {
    return {
      couseType: 'list',
      editCourseVisible: false,
      courseVisible: false,
      listLoading: false,
      courseList: [],
      addCourseRules: {
        name: [{ required: true, message: '请输入课程名称', trigger: 'blur' }],
        feeType: [{ required: true, message: '请选择课程收费', trigger: 'blur' }],
        reee: [{ required: true, message: '请输入学期金额', trigger: 'blur' }]
      },
      addCourse: {},
      courseLoading: false
    }
  },
  created () {
    this.getCourseList()
  },
  methods: {
    getCourseList () {
      api.orgCourseList({groupId: JSON.parse(sessionStorage.getItem('groupId'))}).then(res => {
        this.courseList = res.data.array
      })
      this.courseList = ''
    },
    handleAddCourse () {
      this.courseVisible = true
      this.addCourse = {
        groupId: JSON.parse(sessionStorage.getItem('groupId')),
        name: null,
        feeType: 1,
        fee: 3500
      }
    },
    editCourse (item) {
      this.addCourse = {
        courseId: item.id,
        name: item.name,
        feeType: parseInt(item.feeType),
        fee: item.fee,
        groupId: JSON.parse(sessionStorage.getItem('groupId'))
      }
      this.courseVisible = true
    },
    goBack () {
      this.couseType = 'list'
    },
    courseDel (courseId) {
      let that = this
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        that.listLoading = true
        api.orgCourseDel({courseId: courseId}).then((res) => {
          that.listLoading = false
          that.getCourseList()
        })
      })
    },
    createCourse () {
      this.$refs.addCourse.validate(valid => {
        if (valid) {
          this.addLoading = true
          let para = Object.assign({}, this.addCourse)
          console.log(para)
          if (this.addCourse.CourseId) {
            api.courseEdit(para).then(res => {
              if (res.data.status === 'succ') {
                this.addLoading = false
                this.$notify({
                  message: '修改课程成功',
                  type: 'success'
                })
                this.$refs['addCourse'].resetFields()
                this.courseType = 'list'
                this.getCourseList()
              } else {
                this.$notify({
                  message: res.data.message,
                  type: 'error',
                  duration: 0
                })
              }
            })
          } else {
            api.courseAdd(para).then(res => {
              if (res.data.status === 'succ') {
                this.addLoading = false
                this.$notify({
                  message: '添加课程成功',
                  type: 'success'
                })
                this.$refs['addCourse'].resetFields()
                this.courseType = 'list'
                this.getCourseList()
              } else {
                this.$notify({
                  message: res.data.message,
                  type: 'error',
                  duration: 0
                })
              }
            })
          }
        }
      })
    },
    coursePublish (item, status, idx) {
      api.orgCourseRelease({courseId: item.id, status: !status}).then(res => {
        if (res.status === 'succ') {
          item.release = !status
          this.$set(this.courseList, idx, item)
        } else {
          this.$notify({
            message: res.data.message,
            type: 'error',
            duration: 0
          })
        }
      })
    },
    courseUnpublish (item, status, idx) {
      this.$confirm('确认取消发布吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.coursePublish(item, status, idx)
      })
    },
    changeOrder (item) {
      api.orgCourseOrder({courseId: item.id, status: item.order}).then(res => {
        if (res.status === 'succ') {
          ;
        } else {
          this.$notify({
            message: res.data.message,
            type: 'error',
            duration: 0
          })
        }
      })
    },
    courseSubmit () {
      this.$refs.addCourse.validate(valid => {
        if (valid) {
          this.courseLoading = true
          let para = Object.assign({}, this.addCourse)
          if (para.courseId) {
            api.orgCourseEdit(para).then((res) => {
              if (res.status === 'succ') {
                this.courseLoading = false
                this.$notify({
                  message: '修改课程成功',
                  type: 'success'
                })
                this.$refs['addCourse'].resetFields()
                this.courseVisible = false
                this.getCourseList()
              } else {
                this.$notify({
                  message: res.message,
                  type: 'error',
                  duration: 0
                })
              }
            })
          } else {
            api.orgCourseAdd(para).then((res) => {
              if (res.status === 'succ') {
                this.courseLoading = false
                this.$notify({
                  message: '添加课程成功',
                  type: 'success'
                })
                this.$refs['addCourse'].resetFields()
                this.courseVisible = false
                this.getCourseList()
              } else {
                this.$notify({
                  message: res.message,
                  type: 'error',
                  duration: 0
                })
              }
            })
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.course-list{
  margin: 0;
  list-style: none;
  padding-left: 0;
}
.course-list li{
  border:1px solid #e1e1e1;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
  margin-bottom: 15px;
}
.course-list p{
  margin: 8px 0;
  font-size: 14px;
}
.course-list .name{
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}
.course-list a{
  color:#0086e4;;
  text-decoration: underline;
}
.edit-wrap{
  position: absolute;
  right: 15px;
  font-size: 14px;
  color: #0086e4;
}
.edit-wrap span{
  text-decoration: underline;
  cursor: pointer;
}
.txt-right{
  text-align: right;
}
.radio-item{
  margin-top: 13px;
}
.radio-inline{
  display: inline-block;
}
.radio-tip{
  font-size: 14px;
  margin-left: 15px;
}
</style>

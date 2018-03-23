<template>
  <section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px" v-if="couseType == 'list'">
      <el-button size="small" type="primary" @click="handleAddCourse">课程添加</el-button>
    </el-col>
    <el-col :span="24" class="toolbar txt-right" style="padding-bottom: 0px" v-else>
      <el-button size="small" type="primary" @click="goBack">取消返回</el-button>
      <el-button size="small" type="primary" @click="createCourse">保存</el-button>
    </el-col>

    <el-col class="" :loading="listLoading" v-if="couseType == 'list'">
      <ul class="course-list">
        <li class="course-item" v-for="(item, index) in courseList" :key="index">
          <div class="edit-wrap">
            <span @click="couusePublish(item.id)">立即发布</span>
            <span @click="couuseUnpublish(item.id)">取消发布</span>
            <span @click="courseDel(item.id)">删除</span>
            <span @click="editCourse(item)">编辑查看</span>
          </div>
          <p class="name">{{item.name}}</p>
          <p>适合年龄：{{item.age}}</p>
          <p>课时安排：{{item.time}}</p>
          <p>介绍：{{item.desc}}</p>
          <p>价格：{{item.price}}</p>
          <p><el-checkbox v-model="item.yuyue">允许预约体验</el-checkbox></p>
        </li>
      </ul>
    </el-col>

    <el-col v-else>
      <el-form :model="addCourse" label-width="100px" :rules="addCourseRules" ref="addCourse">
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
      </el-form>
    </el-col>
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
      listLoading: false,
      courseList: [
        {
          name: '民族舞',
          age: '123',
          time: '123',
          desc: '123',
          price: '123',
          yuyue: false
        }
      ],
      addCourseRules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        age: [{ required: true, message: '请输入活动时间', trigger: 'blur' }],
        address: [{ required: true, message: '请输入活动地点', trigger: 'blur' }],
        content: [{ required: true, message: '请输入活动内容', trigger: 'blur' }]
      },
      addCourse: {}
    }
  },
  methods: {
    getCourseList () {
      this.courseList = ''
    },
    handleAddCourse () {
      this.couseType = 'add'
      this.addCourse = {
        name: null,
        age: null,
        address: null,
        content: null
      }
    },
    editCourse (item) {
      this.addCourse = {
        courseId: item.id,
        name: item.name,
        age: item.age,
        address: item.address
      }
      this.couseType = 'edit'
    },
    goBack () {
      this.couseType = 'list'
    },
    courseDel (courseId) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        // api.courseDel({courseId: courseId}).then((res) => {
        //   this.listLoading = false
        //   this.getCourseList()
        // })
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
    couusePublish () {
      console.log('发布')
    },
    couuseUnpublish () {
      this.$confirm('确认取消发布吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
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
</style>

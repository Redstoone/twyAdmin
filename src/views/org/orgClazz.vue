<template>
  <section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px" v-if="classType == 'list'">
      <el-button size="small" type="primary" @click="handleAddClass">添加班级</el-button>
    </el-col>
    <el-col :span="24" class="toolbar txt-right" v-else>
      <el-button size="small" type="primary" @click="goBack">取消返回</el-button>
      <el-button size="small" type="primary" @click="createClass">发布</el-button>
    </el-col>

    <el-col class="" v-if="classType == 'list'">
      <div class="" v-for="(item, index) in clazzList" :key="index">
        <div class="clazz-name">{{item.name}} ({{item.clazzs.length}})</div>
        <el-table class="ctable" :data="item.clazzs" stripe border highlight-current-row v-loading="listLoading" style="width: 100%" v-if="item.clazzs.length > 0">
        <el-table-column prop="name" label="班级">
        </el-table-column>
        <el-table-column label="老师">
          <template slot-scope="scope">
            {{scope.row.teacherAName}} / {{scope.row.teacherBName}}
          </template>
        </el-table-column>
        <el-table-column label="学生人数" sortable>
          <template slot-scope="scope">
            {{scope.row.studentNum}} <a hrefr="javascript:;" class="btn-option" @class="viewStudent">查看点到/成绩</a>
          </template>
        </el-table-column>
        <el-table-column prop="cellphone" label="上课时间" sortable>
          <template slot-scope="scope">
            {{scope.row.time}},{{scope.row.duration}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <a hrefr="javascript:;" class="btn-option" size="mini" @click="handleDel(scope.$index, scope.row)">删除</a>
            <a hrefr="javascript:;" class="btn-option" size="mini" @click="handleEdit(scope.row)">编辑</a>
            <a hrefr="javascript:;" class="btn-option" size="mini" @click="handleAddStudent(scope.$index, scope.row)">添加学生</a>
          </template>
        </el-table-column>
      </el-table>
      </div>
    </el-col>
    <el-col :loading="listLoading" v-else>
      <el-form :model="addClass" label-width="100px" :rules="addClassRules" ref="addClass">
        <el-form-item label="班级名称" prop="name">
          <el-input v-model="addClass.name" auto-complete="off" placeholder="请输入班级名称"></el-input>
        </el-form-item>
        <el-form-item label="选择课程" prop="courseId">
          <el-select v-model="addClass.courseId" placeholder="请选择" style="width:100%;">
            <el-option
              v-for="item in courseList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上课老师" prop="teacherAId">
          <el-col :span="24" style="margin-bottom: 10px;">
            <el-col :span="2"> A：</el-col>
            <el-col :span="22">
              <el-select v-model="addClass.teacherAId" placeholder="请选择" style="width:100%;">
                <el-option
                  v-for="item in teacherList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="2"> B：</el-col>
            <el-col :span="22">
              <el-select v-model="addClass.teacherBId" placeholder="请选择" style="width:100%;">
                <el-option
                  v-for="item in teacherList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-col>
        </el-form-item>
        <el-form-item label="课时安排" prop="num">
          <el-col :span="8">
            <el-col :span="6"> 次数：</el-col>
            <el-col :span="17">
              <el-input  v-model="addClass.num" auto-complete="off" placeholder="请输入课时安排"></el-input>
            </el-col>
          </el-col>
          <el-col :span="8">
             <el-col :span="6"> 时间：</el-col>
            <el-col :span="17">
              <el-input v-model="addClass.time" auto-complete="off" placeholder="请输入课时安排"></el-input>
            </el-col>
          </el-col>
          <el-col :span="8"> 
            <el-col :span="10"> 几点到几点：</el-col>
            <el-col :span="14">
              <el-input v-model="addClass.duration" auto-complete="off" placeholder="请输入课时安排"></el-input>
            </el-col>
          </el-col>
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
      classType: 'list',
      listLoading: false,
      addClass: {},
      addClassRules: {
        name: [{ required: true, message: '请输入教师姓名', trigger: 'blur' }],
        courseId: [{ required: true, message: '请选择课程', trigger: 'blur' }],
        teacherAId: [{ required: true, message: '请选择教师', trigger: 'blur' }],
        num: [{ required: true, message: '请输入次数', trigger: 'blur' }]
      },
      courseList: [],
      teacherList: [],
      clazzList: []
    }
  },
  created () {
    api.orgCourseList({groupId: JSON.parse(sessionStorage.getItem('groupId'))}).then(res => {
      res.data.array.forEach(item => {
        this.courseList.push({label: item.name, value: item.id})
      })
    })

    api.orgTeacherList({groupId: JSON.parse(sessionStorage.getItem('groupId'))}).then(res => {
      res.data.array.forEach(item => {
        this.teacherList.push({label: item.name, value: item.teacherId})
      })
    })

    this.getClazzList()
  },
  methods: {
    getClazzList () {
      api.orgClazzList({groupId: JSON.parse(sessionStorage.getItem('groupId'))}).then(res => {
        this.clazzList = res.data.array
      })
    },
    handleAddClass () {
      this.classType = 'add'
    },
    handleEdit (item) {
      this.classType = 'edit'
      this.addClass = {
        clazzId: item.id,
        name: item.name,
        courseId: item.name,
        teacherAId: item.teacherAId,
        teacherBId: item.teacherBId,
        num: item.num,
        time: item.time,
        duration: item.duration
      }
    },
    goBack () {
      this.classType = 'list'
      this.addClass = {
        name: null,
        courseId: null,
        teacherAId: null,
        teacherBId: null,
        num: null,
        time: null,
        duration: null
      }
    },
    createClass () {
      this.$refs.addClass.validate(valid => {
        if (valid) {
          this.addLoading = true
          let para = Object.assign({}, this.addClass)
          if (para.clazzId) {
            api.orgClazzEdit(para).then(res => {
              this.addLoading = false
              if (res.status === 'succ') {
                this.$notify({
                  message: '修改班级功',
                  type: 'success'
                })
                this.$refs['addClass'].resetFields()
                this.classType = 'list'
                this.getClazzList()
              } else {
                this.$notify({
                  message: res.message,
                  type: 'error',
                  duration: 0
                })
              }
            })
          } else {
            api.orgClazzAdd(para).then(res => {
              this.addLoading = false
              if (res.status === 'succ') {
                this.$notify({
                  message: '添加班级成功',
                  type: 'success'
                })
                this.$refs['addClass'].resetFields()
                this.classType = 'list'
                this.getClazzList()
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
    },
    handleDel (idx, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        api.orgClazzDel({clazzId: row.id}).then((res) => {
          if (res.status === 'succ') {
            this.listLoading = false
            this.getClazzList()
          } else {
            this.$notify({
              message: res.message,
              type: 'error',
              duration: 0
            })
          }
        })
      })
    },

    viewStudent () {
    }
  }
}
</script>

<style scoped>
.clazz-name{
  font-size:18px;
  color:#283040;
  margin:20px 0 10px;
  position: relative;
  padding-left: 18px;
}
.clazz-name::before{
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: #283040;
  left: 0;
  top: 5px;
}
</style>

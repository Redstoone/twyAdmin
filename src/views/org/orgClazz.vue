<template>
  <section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px" v-if="classType == 'list'">
      <el-button size="small" type="primary" @click="handleAddClass">添加班级</el-button>
    </el-col>
    <el-col :span="24" class="toolbar txt-right" v-else-if="classType == 'studentList'">
      <el-button size="small" type="primary" @click="goBack">返回</el-button>
      <el-button size="small" type="primary" @click="exportStudent">导出学生</el-button>
      <el-button size="small" type="primary" @click="handleAddStudent(clazzId, 1)">添加学生</el-button>
    </el-col>
    <el-col :span="24" class="toolbar txt-right" v-else>
      <el-button size="small" type="primary" @click="goBack">返回</el-button>
      <el-button size="small" type="primary" @click="createClass">保存</el-button>
    </el-col>

    <el-col class="" v-if="classType == 'list'">
      <div v-if="clazzList.length > 0">
        <div class="" v-for="(item, index) in clazzList" :key="index" >
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
              {{scope.row.studentNum}}人&nbsp;<a hrefr="javascript:;" class="btn-option" @click="viewStudent(scope.row.id)">查看点到/成绩</a>
            </template>
          </el-table-column>
          <el-table-column label="上课时间" sortable>
            <template slot-scope="scope">
              {{scope.row.time}},&nbsp;{{scope.row.duration}}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <a hrefr="javascript:;" class="btn-option" size="mini" @click="handleDel(scope.$index, scope.row)">删除</a>
              <a hrefr="javascript:;" class="btn-option" size="mini" @click="handleEdit(scope.row)">编辑</a>
              <a hrefr="javascript:;" class="btn-option" size="mini" @click="handleAddStudent(scope.row.id, 2)">添加学生</a>
            </template>
          </el-table-column>
        </el-table>
        </div>
      </div>
      <div class="no-data" v-else>没有数据</div>
    </el-col>
    <el-col class="" v-else-if="classType == 'studentList'">
      <el-table class="ctable" :data="studentList" stripe border highlight-current-row v-loading="listLoading" style="width: 100%">
        <el-table-column prop="number" label="学号">
        </el-table-column>
        <el-table-column prop="name" label="学生名字">
        </el-table-column>
        <el-table-column label="年龄/性别">
          <template slot-scope="scope">
            {{scope.row.age}} / {{scope.row.sex}}
          </template>
        </el-table-column>
        <el-table-column prop="cellphone" label="衣尺码/鞋尺码" >
          <template slot-scope="scope">
            {{scope.row.clothsize}}/{{scope.row.shoessize}}
          </template>
        </el-table-column>
        <el-table-column prop="cellphone" label="父母名字/手机" width="180">
          <template slot-scope="scope">
            {{scope.row.momname}} ({{scope.row.momphone}}) <br />
            <span v-if="scope.row.dadname">{{scope.row.dadname}} ({{scope.row.dadphone}})</span>
          </template>
        </el-table-column>
        <el-table-column prop="cellphone" label="就读学校">
          <template slot-scope="scope">
            {{scope.row.nursery}}
          </template>
        </el-table-column>
        <el-table-column prop="arrive" label="点到次数"></el-table-column>
        <el-table-column prop="cellphone" label="成绩">
          <template slot-scope="scope">
            <a hrefr="javascript:;" class="btn-option" size="mini" @click="viewReport(scope.row)">查看</a>
          </template>
        </el-table-column>
        <el-table-column prop="cellphone" label="删除">
          <template slot-scope="scope">
            <a hrefr="javascript:;" class="btn-option" size="mini" @click="handleStudentDel(scope.row)">删除</a>
          </template>
        </el-table-column>
      </el-table>
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
            <span style="float: left;"> 次数：</span>
            <el-col :span="17">
              <el-input  v-model="addClass.num" auto-complete="off" placeholder="请输入课时安排"></el-input>
            </el-col>
          </el-col>
          <el-col :span="8">
             <span style="float: left;"> 时间：</span>
            <el-col :span="17">
              <el-input v-model="addClass.time" auto-complete="off" placeholder="请输入课时安排"></el-input>
            </el-col>
          </el-col>
          <el-col :span="8">
            <span style="float: left;"> 几点到几点：</span>
            <el-col :span="14">
              <el-input v-model="addClass.duration" auto-complete="off" placeholder="请输入课时安排"></el-input>
            </el-col>
          </el-col>
        </el-form-item>
      </el-form>
    </el-col>

    <el-dialog title="添加学生" :visible.sync="clazzVisible" :close-on-click-modal="false" width="560px">
      <el-form :model="addStudent" label-width="100px" :rules="addStudentRules" ref="addStudent">
        <el-form-item label="孩子姓名" prop="name">
          <el-input v-model="addStudent.name" auto-complete="off" placeholder="请输入孩子姓名"></el-input>
        </el-form-item>
        <el-form-item label="就读幼儿园" prop="nursery">
          <el-input v-model="addStudent.nursery" auto-complete="off" placeholder="请输入就读幼儿园"></el-input>
        </el-form-item>
        <el-form-item label="家庭住址" prop="address">
          <el-input v-model="addStudent.address" auto-complete="off" placeholder="请输入家庭住址"></el-input>
        </el-form-item>
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item label="年龄" prop="age">
              <el-input v-model="addStudent.age" auto-complete="off" placeholder="请输入年龄"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="sex">
              <el-input v-model="addStudent.sex" auto-complete="off" placeholder="请输入性别"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item label="衣尺码" prop="clothsize">
              <el-input v-model="addStudent.clothsize" auto-complete="off" placeholder="请输入衣尺码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="鞋尺码" prop="shoessize">
              <el-input v-model="addStudent.shoessize" auto-complete="off" placeholder="请输入鞋尺码"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item label="妈妈姓名" prop="momname">
              <el-input v-model="addStudent.momname" auto-complete="off" placeholder="请输入妈妈姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机" prop="momphone">
              <el-input v-model="addStudent.momphone" auto-complete="off" placeholder="请输入手机"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item label="爸爸姓名" prop="dadname">
              <el-input v-model="addStudent.dadname" auto-complete="off" placeholder="请输入爸爸姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机" prop="dadphone">
              <el-input v-model="addStudent.dadphone" auto-complete="off" placeholder="请输入手机"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="clazzVisible = false">取消</el-button>
        <el-button type="primary" @click.native="studentSubmit" :loading="clazzLoading">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import api from '../../api/index.js'

export default {
  name: 'Clazz',
  data () {
    return {
      classType: 'list',
      listLoading: false,
      addClass: {},
      addClassRules: {
        name: [{ required: true, message: '请输入班级姓名', trigger: 'blur' }],
        courseId: [{ required: true, message: '请选择课程', trigger: 'blur' }],
        teacherAId: [{ required: true, message: '请选择教师', trigger: 'blur' }],
        num: [{ required: true, message: '请输入次数', trigger: 'blur' }]
      },
      courseList: [],
      teacherList: [],
      clazzList: [],
      clazzVisible: false,
      clazzLoading: false,
      addStudent: {},
      addStudentRules: {
        name: [{ required: true, message: '请输入孩子姓名', trigger: 'blur' }],
        age: [{ required: true, message: '请输入年龄', trigger: 'blur' }],
        sex: [{ required: true, message: '请输入性别', trigger: 'blur' }],
        clothsize: [{ required: true, message: '请输入衣尺码', trigger: 'blur' }],
        shoessize: [{ required: true, message: '请输入鞋尺码', trigger: 'blur' }],
        momname: [{ required: true, message: '请输入妈妈姓名', trigger: 'blur' }],
        momphone: [{ required: true, message: '请输入手机', trigger: 'blur' }],
        dadname: [{ required: true, message: '请输入爸爸姓名', trigger: 'blur' }],
        dadphone: [{ required: true, message: '请输入手机', trigger: 'blur' }]
      },
      clazzId: null,
      studentList: [],
      addStudentType: 2
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
    handleEdit (item) {
      this.classType = 'edit'
      this.addClass = {
        clazzId: item.id,
        name: item.name,
        courseId: item.courseId,
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
      this.getClazzList()
    },
    createClass () {
      this.$refs.addClass.validate(valid => {
        if (valid) {
          if (this.addClass.teacherAId === this.addClass.teacherBId) {
            this.$notify({
              message: '老师A与老师B不能选择同一位老师',
              type: 'error',
              duration: 0
            })
            return false
          }
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

    viewStudent (id) {
      this.clazzId = id
      this.classType = 'studentList'
      this.getStudentList()
    },
    handleAddStudent (clazzId, type) {
      this.clazzVisible = true
      this.addStudent = {
        clazzId: clazzId,
        name: null,
        age: null,
        sex: null,
        clothsize: null,
        shoessize: null,
        momname: null,
        momphone: null,
        dadname: null,
        dadphone: null,
        nursery: null,
        address: null
      }
      this.addStudentType = type
    },
    studentSubmit () {
      this.$refs.addStudent.validate(valid => {
        if (valid) {
          this.clazzLoading = true
          let para = Object.assign({}, this.addStudent)
          api.orgStudentAdd(para).then((res) => {
            if (res.status === 'succ') {
              this.clazzLoading = false
              this.$notify({
                message: '添加学生成功',
                type: 'success'
              })
              this.$refs['addStudent'].resetFields()
              this.clazzVisible = false
              if (this.addStudentType === 2) {
                this.getClazzList()
              } else {
                this.getStudentList()
              }
            } else {
              this.$notify({
                message: res.message,
                type: 'error',
                duration: 0
              })
            }
          })
        }
      })
    },
    exportStudent () {
      api.orgStudentExport({clazzId: this.clazzId}).then(res => {
        if (res.status === 'succ') {
          window.open(res.data.value)
        } else {
          this.$notify({
            message: res.message,
            type: 'error',
            duration: 0
          })
        }
      })
    },
    getStudentList () {
      api.orgStudentList({clazzId: this.clazzId}).then(res => {
        this.studentList = res.data.array
      })
    },
    handleStudentDel (row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        api.orgStudentDel({id: row.id}).then((res) => {
          if (res.status === 'succ') {
            this.listLoading = false
            this.getStudentList()
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
    viewReport (row) {
      window.open('/org/report?sid=' + row.studentId)
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

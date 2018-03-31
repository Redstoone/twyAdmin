<template>
  <section>
    <el-col>
      <el-select v-model="course" placeholder="请选择课程">
        <el-option
          v-for="item in courseOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <el-select v-model="course" placeholder="请选择支付状态">
        <el-option
          v-for="item in payOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <el-select v-model="course" placeholder="请选择年龄">
        <el-option
          v-for="item in ageOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-col>

    <el-col>
      <el-table class="ctable" :data="studentList" stripe border highlight-current-row v-loading="listLoading" style="width: 100%" v-if="studentList.length">
        <el-table-column prop="name" label="孩子姓名"></el-table-column>
        <el-table-column prop="courseName" label="课程名"></el-table-column>
        <el-table-column label="年龄/性别">
          <template slot-scope="scope">
            {{scope.row.age}} / {{scope.row.sex}}
          </template>
        </el-table-column>
        <el-table-column label="母亲姓名电话">
          <template slot-scope="scope">
            {{scope.row.momname}}<br/>{{scope.row.momphone}}
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{scope.row.payMethod}}-{{scope.row.payStatus}}
          </template>
        </el-table-column>
          <el-table-column prop="cellphone" label="提交时间/备注查看">
          <template slot-scope="scope">
            {{scope.row.createTime}}
            <a hrefr="javascript:;" class="btn-option" size="mini" @click="viewRemark(scope.row)">查看</a>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <a href="javascript:;" class="btn-option" size="mini" @click="handleDel(scope.$index, scope.row)">删除</a>
            <a href="javascript:;" class="btn-option" size="mini" @click="handleClazz(scope.row)">分配到班</a>
          </template>
        </el-table-column>
      </el-table>
    </el-col>

    <el-dialog title="分配到班" :visible.sync="distVisible" :close-on-click-modal="false" width="480px">
      <el-form :model="addDist" label-width="100px" :rules="addDistRules" ref="addDist">
        <el-form-item label="" prop="name">
          <el-radio-group v-model="clazzId">
            <el-radio :label="item.id" v-for="(item, index) in clazzOption" :key="index">{{item.name}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="distVisible = false">取消</el-button>
        <el-button type="primary" @click.native="distSubmit" :loading="courseLoading">提交</el-button>
      </div>
    </el-dialog>

    <el-dialog title="查看备注" :visible.sync="remarkVisible" :close-on-click-modal="false" width="480px">
      <div style="text-align: center;">{{remark ? remark : '该用户没有填写备注'}}</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="remarkVisible = false">取消</el-button>
        <el-button type="primary" @click.native="remarkVisible = false" :loading="courseLoading">提交</el-button>
      </div>
    </el-dialog>

  </section>
</template>

<script>
import api from '../../api/index.js'

export default {
  name: 'Baoming',
  data () {
    return {
      studentList: [],
      distVisible: false,
      listLoading: false,
      addDist: {},
      courseLoading: false,
      addDistRules: {
        name: [{ required: true, message: '请输入课程名称', trigger: 'blur' }]
      },
      name: 1,
      remark: null,
      remarkVisible: false,
      clazzList: [],
      clazzOption: [],
      clazzId: null,
      id: null,
      courseOptions: [],
      course: null,
      payOptions: [
        {
          label: '未支付',
          value: '未支付'
        },
        {
          label: '未支付',
          value: '已支付'
        }
      ],
      ageOptions: [
        {
          label: '3-5岁',
          value: '3,5'
        },
        {
          label: '5-7岁',
          value: '5,7'
        },
        {
          label: '7-9岁',
          value: '7,9'
        },
        {
          label: '9-12岁',
          value: '9,12'
        }
      ]
    }
  },
  created () {
    this.getStudentList()
    this.getCourseList()
  },
  methods: {
    getStudentList (type) {
      api.orgCourseStudentList({ groupId: JSON.parse(localStorage.getItem('groupId')), type: 1 }).then(res => {
        this.studentList = res.data.array
      })
    },
    getCourseList () {
      api.orgCourseList({groupId: JSON.parse(localStorage.getItem('groupId'))}).then(res => {
        res.data.array.forEach((item, index) => {
          this.courseOptions.push({ 'value': item.id, 'label': item.name })
        })
      })
    },
    handleClazz (row) {
      this.distVisible = true
      this.id = row.id
      this.getCourseClazz(row.courseId)
    },
    getCourseClazz (courseId) {
      this.clazzOption = []
      api.orgCourseClazz({courseId: courseId}).then(res => {
        res.data.array.forEach((item, index) => {
          this.clazzOption.push({id: item.id, name: item.name})
        })
      })
    },
    handleDel (idx, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        api.orgCourseStudentDel({id: row.id}).then((res) => {
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
    handledistribution () {
      this.distVisible = true
    },
    viewRemark (row) {
      this.remark = row.remark
      this.remarkVisible = true
    },
    distSubmit () {
      api.orgCourseAddClazz({id: this.id, clazzId: this.clazzId}).then(res => {
        if (res.status === 'succ') {
          this.distVisible = false
          this.$notify({
            message: '分配班级成功',
            type: 'success'
          })
          this.getStudentList()
        } else {
          this.$notify({
            message: '分配班级失败',
            type: 'error',
            duration: 0
          })
        }
      })
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
}
.ctable{
  margin-top: 20px;
}
</style>

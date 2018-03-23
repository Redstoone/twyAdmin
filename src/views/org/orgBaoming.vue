<template>
  <section>
    <el-col>
      <div class="">
        <div class="clazz-name" @click="handledistribution">民族舞（4）</div>
        <el-table class="ctable" :data="studentList" stripe border highlight-current-row v-loading="listLoading" style="width: 100%">
          <el-table-column prop="name" label="孩子姓名">
          </el-table-column>
          <el-table-column label="年龄/性别">
            <template slot-scope="scope">
              {{scope.row.age}} / {{scope.row.sex}}
            </template>
          </el-table-column>
          <el-table-column label="母亲姓名电话" sortable>
            <template slot-scope="scope">
              {{scope.row.momname}}<br/>{{scope.row.momphone}}
            </template>
          </el-table-column>
          <el-table-column prop="cellphone" label="状态" sortable>
            <template slot-scope="scope">
              {{scope.row.time}},{{scope.row.duration}}
            </template>
          </el-table-column>
           <el-table-column prop="cellphone" label="提交时间/备注查看" sortable>
            <template slot-scope="scope">
              {{scope.row.time}},{{scope.row.duration}}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <a hrefr="javascript:;" class="btn-option" size="mini" @click="handleDel(scope.$index, scope.row)">删除</a>
              <a hrefr="javascript:;" class="btn-option" size="mini" @click="handledistribution">分配到班</a>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-col>

    <el-dialog title="分配到班" :visible.sync="distVisible" :close-on-click-modal="false" width="480px">
      <el-form :model="addDist" label-width="100px" :rules="addDistRules" ref="addDist">
        <el-form-item label="" prop="name">
          <el-radio-group v-model="name">
            <el-radio :label="1">备选项</el-radio>
            <el-radio :label="2">备选项</el-radio>
            <el-radio :label="3">备选项</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="distVisible = false">取消</el-button>
        <el-button type="primary" @click.native="distSubmit" :loading="courseLoading">提交</el-button>
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
      name: 1
    }
  },
  methods: {
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
    handledistribution () {
      this.distVisible = true
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
</style>

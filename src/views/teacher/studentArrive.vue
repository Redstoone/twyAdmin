<template>
  <section>
    <el-col class="sign-wrap">
      <el-table class="ctable" border :data="studentList" >
        <el-table-column prop="number" label="学号" width="150"></el-table-column>
        <el-table-column prop="name" label="姓名" width="150"></el-table-column>
         <el-table-column prop="name" label="点到：默认状态灰色表示未开始，点击一下是绿色表示已到，再点击一下是红色表示未到">
           <template slot-scope="scope">
              <div class="" v-for="(item, index) in scope.row.arriveList" :key="index">
                <div @click="btnArrive(scope.row, item, index)" class="sign-item" :class="{'succ': item == '1' || item == 'true', 'err': item == '0' || item == 'false', 'curr': index == curr}">{{index+1}}</div>
              </div>
            </template>
         </el-table-column>
      </el-table>
    </el-col>
  </section>
</template>

<script>
import api from '../../api/index.js'

export default {
  name: 'Clazz',
  data () {
    return {
      clazzId: null,
      studentList: [],
      times: 0,
      curr: 0
    }
  },
  created () {
    this.clazzId = this.$route.query.clazz
    this.getStudentList(this.clazzId)
  },
  methods: {
    getStudentList (clazzId) {
      api.orgStudentList({clazzId: clazzId}).then(res => {
        this.studentList = res.data.array
        this.curr = res.data.array[0].arrive.split('/')[0]
        this.times = res.data.array[0].arrive.split('/')[1]

        this.studentList = res.data.array.map((item, index) => {
          let _item = item
          _item.arriveList = _item.arriveDetail ? _item.arriveDetail.split('') : []
          for (let i = this.curr; i < this.times; i++) {
            _item.arriveList.push('')
          }
          console.log(_item)
          return _item
        })
      })
    },
    btnArrive (row, item, idx) {
      if (this.curr === idx) {
        let _row = row
        this.$set(_row.arriveList, this.curr, ~parseInt(item) + 2)
        this.$set(this.studentList, 0, _row)
        api.studentArrive({id: row.id, arrive: _row.arriveList.join('')}).then(res => {
          if (res.status === 'succ') {
            this.$notify({
              message: '签到成功',
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
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>
.sign-wrap{
  width: 94%;
  display: block;
  margin: 20px auto;
  float: initial;
}
.sign-item{
  background:#bbbbbb;
  border:1px solid #979797;
  border-radius:3px;
  width:26px;
  height:26px;
  line-height: 26px;
  float: left;
  text-align: center;
  color: #fff;
  margin-left: 10px;
  cursor: not-allowed
}
.sign-item.succ{
  background:#0e971e;
}
.sign-item.err{
  background:#d2474d;
}
.sign-item.curr{
  cursor: pointer;
}
</style>

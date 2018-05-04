<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 150px;" class="filter-item" :placeholder="$t('table.printId')" v-model="listQuery.printId">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 150px;" class="filter-item" :placeholder="$t('table.agency')" v-model="listQuery.agency">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 150px;" class="filter-item" :placeholder="$t('table.taskId')" v-model="listQuery.taskId">
      </el-input>
      <el-select clearable class="filter-item" style="width: 200px" v-model="listQuery.status" :placeholder="$t('table.status')">
        <el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key">
        </el-option>
      </el-select>
      


      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">{{$t('table.add')}}</el-button>
      <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">{{$t('table.export')}}</el-button>
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%">
      <el-table-column align="center" :label="$t('table.printId')" width="65">
        <template slot-scope="scope">
          <span>{{scope.row.printId}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" :label="$t('table.date')">
        <template slot-scope="scope">
          <span>{{scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="80px" align="center" :label="$t('table.printkey')">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.printkey}}</span>
          <el-tag>{{scope.row.status | typeFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column min-width="80px" align="center" :label="$t('table.taskId')">
        <template slot-scope="scope">
          <span>{{scope.row.taskId}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="80px" align="center" :label="$t('table.agency')">
        <template slot-scope="scope">
          <span>{{scope.row.agency}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="80px" align="center" :label="$t('table.printData')">
        <template slot-scope="scope">
          <span>{{scope.row.printData}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" align="center" :label="$t('table.logmsg')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.logmsg}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" align="center" :label="$t('table.othermsg')">
        <template slot-scope="scope">
          <span>{{scope.row.othermsg}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{$t('table.edit')}}</el-button>
          <el-button size="mini" type="success" @click="">{{$t('table.view')}}</el-button>
          <el-button size="mini" type="danger" @click="handleModifyStatus(scope.row,'deleted')">{{$t('table.delete')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
        <el-form-item :label="$t('table.date')" prop="timestamp">
          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('table.agency')" prop="agency">
          <el-input v-model="temp.agency"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.status')" prop="status">
          <el-input v-model="temp.status"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" @click="updateData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { printerList , createPrinter, updatePrinter } from '@/api/printer'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
const calendarTypeOptions = [
  { key: 'status1', display_name: '状态1' },
  { key: 'status2', display_name: '状态2' },
  { key: 'status3', display_name: '状态3' }
]

// arr to obj ,such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'user',
  directives: {
    waves
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        printkey: undefined,
        taskId: undefined,
        printId: undefined,
        agency: undefined
      },
      temp: {
        id: undefined,
        timestamp: new Date(),
        agency: '',
        status: ''
      },
      rules: {
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        agency: [{ required: true, message: 'agency is required', trigger: 'blur' }],
        status: [{ required: true, message: 'status is required', trigger: 'blur' }]
      },
      calendarTypeOptions,
      downloadLoading: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogFormVisible: false
    }
  },
  filters: {
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      printerList(this.listQuery).then(response => {
        console.log(response)
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        timestamp: new Date(),
        name: '',
        phone: '',
        email: ''
      }
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          createPrinter(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updatePrinter(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['printId', 'printkey', 'taskId', 'agency', 'printData','status','timestamp','logmsg','othermsg']
        const filterVal = ['printId', 'printkey', 'taskId', 'agency', 'printData','status','timestamp','logmsg','othermsg']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const printerList = []
const count = 100

for (let i = 0; i < count; i++) {
  printerList.push(Mock.mock({
    printId: '@increment',
    printkey: '@string',
    taskId: '@integer',
    agency: '@first',
    printData: '打印数据',
    'status|1': ['status1','status2','status3'],
    timestamp: +Mock.Random.date('T'),
    logmsg: '@title(5, 10)',
    othermsg: "额外信息"
  }))
}
export default {
  getPrinterList: config => {
    const {agency, printkey, taskId, printId, page = 1, limit = 20 } = param2Obj(config.url)

    let mockList = printerList.filter(item => {
      if (agency && item.agency.indexOf(agency) < 0) return false
      if (printkey && item.printkey.indexOf(printkey) < 0) return false
      if (taskId && item.taskId.indexOf(taskId) < 0) return false
      if (printId && item.printId.indexOf(printId) < 0) return false
      return true
    })

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  },
  createPrinter: () => ({
    data: 'success'
  }),
  updatePrinter: () => ({
    data: 'success'
  })
}

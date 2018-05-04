import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const logInLogList = [], operateLogList = [], printLogList = [], produceLogList = [];
const count = 100

for (let i = 0; i < count; i++) {
  logInLogList.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    name: '@name',
    'authority|1': ['admin1','admin2','admin3']
  }))
}

for (let i = 0; i < count; i++) {
  operateLogList.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    name: '@name',
    'authority|1': ['admin1','admin2','admin3'],
    operation: '@title(5, 10)'
  }))
}

for (let i = 0; i < count; i++) {
  printLogList.push(Mock.mock({
    printId: '@increment',
    timestamp: +Mock.Random.date('T'),
    taskId: '@integer',
    agency: '@first',
    'authority|1': ['admin1','admin2','admin3'],
    'oparationType|1': ["发送", '打印', '状态']
  }))
}

for (let i = 0; i < count; i++) {
  produceLogList.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    name: '@name',
    stationsNum: '@integer'
  }))
}

export default {
  getLogInLogList: config => {
    const { name, authority, page = 1, limit = 20 } = param2Obj(config.url)

    let mockList = logInLogList.filter(item => {
      if (authority && item.authority !== authority) return false
      if (name && item.name.indexOf(name) < 0) return false
      return true
    })

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  },
  getOperateLogList: config => {
    const { name, authority, page = 1, limit = 20 } = param2Obj(config.url)

    let mockList = operateLogList.filter(item => {
      if (authority && item.authority !== authority) return false
      if (name && item.name.indexOf(name) < 0) return false
      return true
    })

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  },
  getPrintLogList: config => {
    const { taskId, agency, authority, oparationType, page = 1, limit = 20 } = param2Obj(config.url)

    let mockList = printLogList.filter(item => {
      if (taskId && item.taskId.indexOf(taskId) < 0) return false
      if (agency && item.agency.indexOf(agency) < 0) return false
      if (authority && item.authority !== authority) return false
      if (oparationType && item.oparationType !== oparationType) return false
      return true
    })

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  },
  getProduceLogList: config => {
    const { name, stationsNum, page = 1, limit = 20 } = param2Obj(config.url)

    let mockList = produceLogList.filter(item => {
      if (name && item.name.indexOf(name) < 0) return false
      if (stationsNum && item.stationsNum.indexOf(name) < 0) return false
      return true
    })

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  }
}

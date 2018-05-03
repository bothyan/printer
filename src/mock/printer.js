import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const merchantList = []
const count = 100

for (let i = 0; i < count; i++) {
  merchantList.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    name: '@name',
    email: '@email',
    phone: '@integer(10000000000, 99999999999)',
    logmsg: '@title(5, 10)',
    othermsg: "额外信息"
  }))
}


export default {
  getPrinterList: config => {
    const { name, email, type, phone, page = 1, limit = 20 } = param2Obj(config.url)

    let mockList = merchantList.filter(item => {
      if (type && item.type !== type) return false
      if (name && item.name.indexOf(name) < 0) return false
      if (phone && item.phone.indexOf(phone) < 0) return false
      if (email && item.email.indexOf(email) < 0) return false
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

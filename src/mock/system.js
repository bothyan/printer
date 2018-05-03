import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const userList = []
const count = 100

for (let i = 0; i < count; i++) {
  userList.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    name: '@name',
    email: '@email',
    phone: '@integer(10000000000, 99999999999)',
    'type|1': ['admin1','admin2','admin3'],
    logmsg: '@title(5, 10)',
    othermsg: "额外信息"
  }))
}


const roleList = [
    {
      id: 1,
      timestamp: +Mock.Random.date('T'),
      name: "超级管理员",
      value: "admin1",
      authority : "权限1"
    },
    {
      id: 2,
      timestamp: +Mock.Random.date('T'),
      name: "普通管理员",
      value: "admin2",
      authority : "权限2"
    },
    {
      id: 3,
      timestamp: +Mock.Random.date('T'),
      name: "生产管理员",
      value: "admin3",
      authority : "权限3"
    },
    {
      id: 4,
      timestamp: +Mock.Random.date('T'),
      name: "普通商户",
      value: "admin4",
      authority : "权限4"
    }
]

const authorityList = [
    {
      id: 1,
      timestamp: +Mock.Random.date('T'),
      name: "权限1",
      value: "value1",
      authority: "所有权限"
    },
    {
      id: 2,
      timestamp: +Mock.Random.date('T'),
      name: "权限2",
      value: "value2",
      authority: "日志权限"
    },
    {
      id: 3,
      timestamp: +Mock.Random.date('T'),
      name: "权限3",
      value: "value3",
      authority: "商户权限"
    }
]

export default {
  getUserList: config => {
    const { name, email, type, phone, page = 1, limit = 20 } = param2Obj(config.url)

    let mockList = userList.filter(item => {
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
  createUser: () => ({
    data: 'success'
  }),
  updateUser: () => ({
    data: 'success'
  }),
  getRoleList: config => {
    const { name, value, page = 1, limit = 20 } = param2Obj(config.url)

    const pageList = roleList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: roleList.length,
      items: pageList
    }
  },
  createRole: () => ({
    data: 'success'
  }),
  updateRole: () => ({
    data: 'success'
  }),
  getAuthorityList: config => {
    const { name, value, page = 1, limit = 20 } = param2Obj(config.url)

    const pageList = authorityList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: authorityList.length,
      items: pageList
    }
  },
  createAuthority: () => ({
    data: 'success'
  }),
  updateAuthority: () => ({
    data: 'success'
  })
}

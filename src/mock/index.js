import Mock from 'mockjs'
import loginAPI from './login'
import systemAPI from './system'
import merchantAPI from './merchant'
import printerAPI from './printer'
import logAPI from './logs'
import remoteSearchAPI from './remoteSearch'

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
Mock.mock(/\/admin\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/admin\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)


// 系统管理相关
Mock.mock(/\/user\/list/, 'get', systemAPI.getUserList)
Mock.mock(/\/user\/create/, 'post', systemAPI.createUser)
Mock.mock(/\/user\/update/, 'post', systemAPI.updateUser)

Mock.mock(/\/role\/list/, 'get', systemAPI.getRoleList)
Mock.mock(/\/role\/create/, 'post', systemAPI.createRole)
Mock.mock(/\/role\/update/, 'post', systemAPI.updateRole)

Mock.mock(/\/authority\/list/, 'get', systemAPI.getAuthorityList)
Mock.mock(/\/authority\/create/, 'post', systemAPI.createAuthority)
Mock.mock(/\/authority\/update/, 'post', systemAPI.updateAuthority)


//商户管理相关
Mock.mock(/\/merchant\/list/, 'get', merchantAPI.getMerchantList)
Mock.mock(/\/merchant\/create/, 'post', merchantAPI.createMerchant)
Mock.mock(/\/merchant\/update/, 'post', merchantAPI.updateMerchant)


//打印机管理相关
Mock.mock(/\/printer\/list/, 'get', printerAPI.getPrinterList)
Mock.mock(/\/printer\/create/, 'post', printerAPI.createPrinter)
Mock.mock(/\/printer\/update/, 'post', printerAPI.updatePrinter)

//日志相关
Mock.mock(/\/logInLog\/list/, 'get', logAPI.getLogInLogList)
Mock.mock(/\/operateLog\/list/, 'get', logAPI.getOperateLogList)
Mock.mock(/\/printLog\/list/, 'get', logAPI.getPrintLogList)
Mock.mock(/\/produceLog\/list/, 'get', logAPI.getProduceLogList)


// 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)

export default Mock

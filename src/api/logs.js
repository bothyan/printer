import request from '@/utils/request'

export function logInLogList(query) {
  return request({
    url: '/logInLog/list',
    method: 'get',
    params: query
  })
}

export function operateLogList(query) {
  return request({
    url: '/operateLog/list',
    method: 'get',
    params: query
  })
}

export function printLogList(query) {
  return request({
    url: '/printLog/list',
    method: 'get',
    params: query
  })
}


export function produceLogList(query) {
  return request({
    url: '/produceLog/list',
    method: 'get',
    params: query
  })
}


import request from '@/utils/request'

export function printerList(query) {
  return request({
    url: '/printer/list',
    method: 'get',
    params: query
  })
}

export function createPrinter(data) {
  return request({
    url: '/printer/create',
    method: 'post',
    data
  })
}

export function updatePrinter(data) {
  return request({
    url: '/printer/update',
    method: 'post',
    data
  })
}


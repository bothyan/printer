import request from '@/utils/request'

export function merchantList(query) {
  return request({
    url: '/merchant/list',
    method: 'get',
    params: query
  })
}

export function createMerchant(data) {
  return request({
    url: '/merchant/create',
    method: 'post',
    data
  })
}

export function updateMerchant(data) {
  return request({
    url: '/merchant/update',
    method: 'post',
    data
  })
}


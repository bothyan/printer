import request from '@/utils/request'

export function userList(query) {
  return request({
    url: '/user/list',
    method: 'get',
    params: query
  })
}

export function createUser(data) {
  return request({
    url: '/user/create',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}

export function roleList(query) {
  return request({
    url: '/role/list',
    method: 'get',
    params: query
  })
}

export function createRole(data) {
  return request({
    url: '/role/create',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: '/role/update',
    method: 'post',
    data
  })
}

export function authorityList(query) {
  return request({
    url: '/authority/list',
    method: 'get',
    params: query
  })
}

export function createAuthority(data) {
  return request({
    url: '/authority/create',
    method: 'post',
    data
  })
}

export function updateAuthority(data) {
  return request({
    url: '/authority/update',
    method: 'post',
    data
  })
}
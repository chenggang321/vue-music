import axios from 'axios'

//  banner
export function getRecommend() {
  return axios.get('/api/banner?type=2')
}

export function getDiscList() {
  return axios.get('/api/top/playlist?limit=30')
}

export function getSongList(id) {
  return axios.get('/api/playlist/detail?id=' + id)
}

export function getSongUrl(id) {
  return axios.get('/api/song/url?id=' + id)
}

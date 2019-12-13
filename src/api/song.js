import axios from 'axios'

export function getLyric(id) {
  return axios.get('/api/lyric?id=' + id)
}

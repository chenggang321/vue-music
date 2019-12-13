import { getLyric } from 'api/song'
import { getSongUrl } from 'api/recommend'
import { Base64 } from 'js-base64'

export default class Song {
  constructor ({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
  }

  getLyric () {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.id).then((res) => {
        console.log(res)
        if (res.data.code === 200) {
          console.log(res.data)
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject(new Error('no lyric'))
        }
      })
    })
  }

  getSongUrl () {
    if (this.url) {
      return Promise.resolve(this.url)
    }
    return new Promise((resolve, reject) => {
      getSongUrl(this.id).then((res) => {
        if (res.data.code === 200) {
          this.url = res.data.data[0].url
          resolve(this.url)
        } else {
          reject(new Error('no song url'))
        }
      })
    })
  }
}

export function createSong (musicData) {
  if (!musicData.id) return false
  const song = new Song({
    id: musicData.id,
    singer: filterSinger(musicData.ar),
    name: musicData.name,
    album: musicData.al.name,
    duration: 4 * 60,
    image: musicData.al.picUrl
  })
  song.getSongUrl()
  return song
}

function filterSinger (singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}

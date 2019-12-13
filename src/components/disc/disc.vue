<template>
  <transition name="slide">
    <music-list :title="title"
                :bgImage="bgImage"
                :songs="songs"
    ></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
import MusicList from 'components/music-list/music-list'
import { mapGetters } from 'vuex'
import { getSongList } from 'api/recommend'
import { createSong } from 'common/js/song'

export default {
  computed: {
    title () {
      return this.disc.name
    },
    bgImage () {
      return this.disc.coverImgUrl
    },
    ...mapGetters([
      'disc'
    ])
  },
  data () {
    return {
      songs: []
    }
  },
  created () {
    this._getSongList()
  },
  methods: {
    _getSongList () {
      if (!this.disc.id) {
        this.$router.push('/recommend')
      }
      getSongList(this.disc.id).then((res) => {
        if (res.data.code === 200) {
          this.songs = this._normallizeSongs(res.data.playlist.tracks)
        }
      })
    },
    _normallizeSongs (list = []) {
      let ret = []
      list.forEach((musicData) => {
        if (musicData.id && musicData.name) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>

<style scoped lang="stylus" type="text/stylus">
.slide-enter-active, .slide-leave-active
  transition: all 0.3s

.slide-enter, .slide-enter-to
  transition: translate3d(100%, 0, 0)
</style>

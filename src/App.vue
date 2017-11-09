<template lang="pug">
  #app
    img(src='https://juan-carlos-correa.github.io/platzimusic/dist/logo.png')
    h1 PlatziMusic
    select(v-model="selectedCountry")
      option(v-for="country in countries" v-bind:value="country.value") {{ country.name }}
    spinner(v-show="loading")
    ul
      artist(v-for="artist in artists" v-bind:artist="artist" :key="artist.mbid")
</template>

<script>

import getArtist from './api'
import Artist from './components/Artist.vue'
import Spinner from './components/Spiner.vue'

export default {
  name: 'app',
  data () {
    return {
      artists: [],
      countries: [
        { name: 'Argentina', value: 'Argentina' },
        { name: 'Colombia', value: 'Colombia' },
        { name: 'España', value: 'Spain' }
      ],
      selectedCountry: 'Argentina',
      loading: true
    }
  },
  components: {
    Artist,
    Spinner
  },
  mounted() {
    this.refreshArtists()
  },
  methods: {
    refreshArtists() {
      const self = this
      this.loading = true
      this.artists = []
      getArtist(this.selectedCountry)
        .then(function (artists) {
          self.loading = false
          self.artists = artists
        })
    }
  },
  watch: {
    selectedCountry: function () {
      this.refreshArtists()
    }
  }
}
</script>

<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px

h1, h2
  font-weight normal

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px

a
  color #42b983
</style>

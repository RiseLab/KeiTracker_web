<template>
  <yandex-map
          :coords="map.coords"
          :zoom="map.zoom"
          :bounds="mapBounds">
    <ymap-marker
            v-for="(track, idx) in tracks"
            marker-type="polyline"
            :marker-stroke="getTrackStyle()"
            :marker-id="idx"
            :coords="getTrackLine(track)"
            :key="idx" />
  </yandex-map>
</template>

<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps'
import db from '@/firebase'

export default {
  components: { yandexMap, ymapMarker },
  name: 'GlobalMap',
  data () {
    return {
      map: {
        coords: [0, 0],
        zoom: 4
      },
      tracks: []
    }
  },
  firebase: {
    tracks: db.ref('checkpoints')
  },
  computed: {
    mapBounds () {
      let latMin = 90
      let latMax = -90
      let lngMin = 180
      let lngMax = -180

      Array.from(this.tracks).forEach((track) => {
        Array.from(Object.entries(track)).forEach((checkpoint) => {
          if (checkpoint[1].latitude < latMin) { latMin = checkpoint[1].latitude }
          if (checkpoint[1].latitude > latMax) { latMax = checkpoint[1].latitude }
          if (checkpoint[1].longitude < lngMin) { lngMin = checkpoint[1].longitude }
          if (checkpoint[1].longitude > lngMax) { lngMax = checkpoint[1].longitude }
        })
      })

      return [
        [latMin, lngMin],
        [latMax, lngMax]
      ]
    }
  },
  methods: {
    getTrackLine (track) {
      let trackLine = []

      Array.from(Object.entries(track)).forEach((checkpoint) => {
        trackLine.push([
          checkpoint[1].latitude,
          checkpoint[1].longitude
        ])
      })

      return trackLine
    },
    getTrackStyle () {
      return {
        color: 'b22222', // Math.random().toString(16).substr(-6)
        width: 3
      }
    }
  }
}
</script>

<style scoped>
.ymap-container {
  height: 100%;
  width: 100%;
}
</style>

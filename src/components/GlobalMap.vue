<template>
  <yandex-map
          :coords="map.coords"
          :zoom="map.zoom"
          :bounds="map.bounds">
    <template v-for="(track, tid) in freshTracks">
      <ymap-marker
              v-for="(trackSection, sid) in getTrackSections(track)"
              marker-type="polyline"
              :marker-stroke="trackSection.style"
              :marker-id="`${tid}_${sid}`"
              :coords="trackSection.points"
              :key="`${tid}_${sid}`" />
    </template>
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
        zoom: 4,
        bounds: [[-45, -90], [45, 90]]
      },
      tracks: []
    }
  },
  computed: {
    freshTracks () {
      let tracks = []
      this.tracks.forEach((track) => {
        tracks.push(Array.from(Object.entries(track.checkpoints)).filter((point) => {
          return (Date.now() - point[1].fixedAt) / 1000 < 60 * 60 // checkpoints for last hour
        }))
      })
      return tracks
    }
  },
  methods: {
    getMapBounds () {
      let latMin = 90
      let latMax = -90
      let lngMin = 180
      let lngMax = -180

      this.tracks.forEach((track) => {
        Array.from(Object.entries(track.checkpoints)).forEach((checkpoint) => {
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
    },
    getTrackSections (track) {
      let sections = []
      for (let i = 0; i < track.length - 1; i++) {
        sections.push({
          points: [
            [ track[i][1].latitude, track[i][1].longitude ],
            [ track[i + 1][1].latitude, track[i + 1][1].longitude ]
          ],
          style: {
            color: 'b22222',
            opacity: 1 - (Date.now() - track[i + 1][1].fixedAt) / 3600000,
            width: 3
          }
        })
      }
      return sections
    }
  },
  mounted () {
    this.$rtdbBind('tracks', db.ref('users/public'))
      .then((data) => {
        this.map.bounds = this.getMapBounds()
      })
      .catch((error) => {
        console.log(`[Error] ${error.message}`)
      })
  }
}
</script>

<style scoped>
.ymap-container {
  height: 100%;
  width: 100%;
}
</style>

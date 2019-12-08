<template>
  <yandex-map
          :coords="map.coords"
          :zoom="map.zoom"
          :bounds="map.bounds">
    <template v-for="(track, tid) in tracks">
      <ymap-marker
              marker-type="polyline"
              :marker-stroke="getTrackStyle()"
              :marker-id="tid"
              :coords="getTrackLine(track)"
              :key="tid" />
      <!--ymap-marker
              v-for="(checkpoint, cid) in track"
              marker-type="placemark"
              :marker-id="`${tid}_${cid}`"
              :coords="[checkpoint.latitude, checkpoint.longitude]"
              :key="cid" /-->
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
  computed: {},
  methods: {
    getMapBounds () {
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
    },
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
        color: 'b22222',
        width: 3
      }
    }
  },
  mounted () {
    this.$rtdbBind('tracks', db.ref('checkpoints'))
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

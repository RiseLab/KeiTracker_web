<template>
  <div>
    <div v-for="(track, index) in tracks" :key="index">
      {{ trackFirstCheckpoint(track) }}
    </div>
  </div>
</template>

<script>
import db from '@/firebase'

export default {
  name: 'GlobalMap',
  data () {
    return {
      tracks: []
    }
  },
  methods: {
    trackFirstCheckpoint (track) {
      return Object.entries(track)[0][1]
    }
  },
  firebase: {
    tracks: db.ref('checkpoints')
  }
}
</script>

<style scoped>

</style>

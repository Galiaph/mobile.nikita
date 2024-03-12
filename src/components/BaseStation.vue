<template>
  <ymap-marker v-if="show"
      :marker-id="name + id"
      :cluster-name="color"
      :coords="geoLocation"
      :balloon="{header: comment}"
      :icon="{content: name, color: getColor(color, status)}">
    </ymap-marker>
</template>

<script>
export default {
  name: 'BaseStation',
  props: {
    id: Number,
    geoLocation: Array,
    comment: String,
    name: String,
    color: Number,
    status: Number,
    show: Boolean
  },
  methods: {
    getColor (cl, st) {
      if (cl == 10)
          return 'gray'
      else {
        switch (st) {
          case 0:
            return 'green'
          case 1:
            return 'red'
          case 2:
            return 'yellow'
          case 3:
            return 'violet'
          default:
            return 'pink'
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
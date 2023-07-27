<template>
  <ymap-marker
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
    getColor (id, st) {
      if (st == 0)
          return 'green'
      else {
        switch (id) {
          case 10:
            return 'gray'
          default:
            if (st == 2)
              return 'yellow'
            else
              return 'red'
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
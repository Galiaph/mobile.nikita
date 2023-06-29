<template>
  <div id="map" class="cnt">
    <yandex-map
      
      :coords="coords"
      :zoom="zooms"
      :controls="[
        'geolocationControl',
        'rulerControl',
        'searchControl',
        'typeSelector',
        'zoomControl',
      ]"
    >
    </yandex-map>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line
    name: 'Map',
    data: () => ({
      myMap: null,
      coords: [46.63, 32.62],
      zooms: 12
    }),
    methods: {
      handler: function (el) {
        this.myMap = el
      }
    }
}
</script>

<style>
</style>

<template>
  <div id="map" class="cnt">
    <yandex-map
      @map-was-initialized="handler"
      :coords="coords"
      :zoom="zooms"
      :controls="[
        'geolocationControl',
        'rulerControl',
        'searchControl',
        'typeSelector',
        'zoomControl',
      ]"
      :detailed-controls="button"
    >
      <baseStations
        v-for="item in baseStationsArr"
        :key="item"
        :id="item.id"
        :show="item.show"
        :comment="item.bs_comment"
        :status="item.station != null ? 1 : item.bs_status"
        :geoLocation="[item.bs_latitude, item.bs_longitude]"
        :name="item.bs_name"
        :color="item.station != null ? 10 : item.bs_operator"
      />
    </yandex-map>
  </div>
</template>

<script>
import baseStations from '@/components/BaseStation.vue'

export default {
  // eslint-disable-next-line
    name: 'Map',
    components: {
      baseStations
    },
    props: {
      baseStationsArr: Object
    },
    data: () => ({
      myMap: null,
      coords: [46.63, 32.62],
      zooms: 12,
      statM: false
    }),
    computed: {
      button() {
        return {
          'Mir-Tele': {
            options: {
              float: 'right',
              selectOnClick: true,
            },
            events: {
              click: this.buttonM,
            },
          },
          'K-Tele': {
            options: {
              float: 'right',
              selectOnClick: true,
            },
            events: {
              click: this.buttonK,
            },
          },
          'Phoenix': {
            options: {
              float: 'right',
              selectOnClick: true,
            },
            events: {
              click: this.buttonP,
            },
          }
        }
      }
    },
    methods: {
      handler: function (el) {
        this.myMap = el
      },
      buttonM() {
        this.statM = !this.statM
        this.$emit('clickButtonM', this.statM)
      },
      buttonK() {
        this.statK = !this.statK
        this.$emit('clickButtonK', this.statK)
      },
      buttonP() {
        this.statP = !this.statP
        this.$emit('clickButtonP', this.statP)
      }
    }
}
</script>

<style>
</style>

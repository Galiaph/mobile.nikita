<template>
  <div id="map" class="cnt">
    <yandex-map
      @map-was-initialized="handler"
      :coords="coords"
      :zoom="zoom"
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
      <date-picker :isShow="showDatepicker" :position="pointDatepicker" :dateEnabled="enableDate" @choiseDate="choiseDate"/>
    </yandex-map>
  </div>
</template>

<script>
import baseStations from '@/components/BaseStation.vue'
import DatePicker from '@/components/Datepicker.vue'
import moment from 'moment'
import axios from 'axios'

export default {
  // eslint-disable-next-line
    name: 'Map',
    components: {
      baseStations,
      DatePicker
    },
    props: {
      baseStationsArr: Object,
      coords: Array,
      zoom: Number
    },
    data: () => ({
      myMap: null,
      statM: false,
      showDatepicker: false,
      pointDatepicker: { right: '10px', top: '132px'},
      enableDate: []
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
          },
          'Замеры': {
            options: {
              float: 'none',
              position: {
                right: '10px',
                top: '45px'
              },
              selectOnClick: false,
            },
            events: {
              click: this.buttonD,
            },
          }
        }
      }
    },
    methods: {
      handler: function (el) {
        this.myMap = el
      },
      buttonM () {
        this.statM = !this.statM
        this.$emit('clickButtonM', this.statM)
      },
      buttonK () {
        this.statK = !this.statK
        this.$emit('clickButtonK', this.statK)
      },
      buttonP () {
        this.statP = !this.statP
        this.$emit('clickButtonP', this.statP)
      },
      buttonD () {
        this.showDatepicker = !this.showDatepicker
      },
      choiseDate (event) {
        this.showDatepicker = false
        console.log(event)
      },
      async getDateQuality () {
        const resp = await axios.get(`http://151.0.10.245:5001/qualitydate`)
        this.enableDate = resp.data.map(el => {
          return moment(el.date_control, "YYYY-MM-DD")
        })
      }
    },
    mounted () {
      this.getDateQuality()
    }
}
</script>

<style>
</style>

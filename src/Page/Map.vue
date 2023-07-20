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
      <base-stations
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

      <point
        v-for="item in mapQualityArr"
        :key="item"
        :markerId="item.id"
        marker-type="placemark"
        :coords="[item.lat, item.lon]"
        :icon="{ content: item.dbm }"
        :options="{preset: getIconColor(item.dbm)}"/>
      <date-picker :isShow="showDatepicker" :position="pointDatepicker" :dateEnabled="enableDate" @choiseDate="choiseDate"/>
    </yandex-map>
  </div>
</template>

<script>
// <div class="form-group">
//       <div class="el-picker-panel el-date-picker el-popper" style="top: 135px;  right: 10px; z-index: 2017; position: absolute;">
//         <div class="el-picker-panel__body-wrapper">
//           <p>statistic</p>
//         </div>
//       </div>
//     </div>
import BaseStations from '@/components/BaseStation.vue'
import DatePicker from '@/components/Datepicker.vue'
import Point from '@/components/Point.vue'
import moment from 'moment'
import axios from 'axios'

export default {
  // eslint-disable-next-line
    name: 'Map',
    components: {
      BaseStations,
      DatePicker,
      Point
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
      enableDate: [],
      mapQualityArr: []
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
        const el = this.getDateID(event)

        if (el)
          this.getQualityDataById(el.id)
        else
          this.mapQualityArr = []
      },
      getIconColor (dbm) {
        if (dbm >= -94 && dbm < -80) {
          return 'islands#blueCircleIcon'
        } else if (dbm >= -104 && dbm < -94) {
          return 'islands#yellowCircleIcon'
        } else if (dbm >= -110 && dbm < -104) {
          return 'islands#orangeCircleIcon'
        } else if (dbm >= -116 && dbm < -110) {
          return 'islands#orangeCircleIcon'
        } else if (dbm < -116) {
          return 'islands#greyCircleIcon'
        }

        return 'islands#greenCircleIcon'
      },
      getDateID (date) {
        return this.enableDate.find(el => el.date.format('YYYYMMDD') == date.format('YYYYMMDD'))
      },
      async getQualityDataById (id) {
        const resp = await axios.get(`http://151.0.10.245:5001/qualitydata/${id}`)
        this.mapQualityArr = resp.data
      },
      async getDateQuality () {
        const resp = await axios.get(`http://151.0.10.245:5001/qualitydate`)
        this.enableDate = resp.data.map(el => {
          return {
            id: el.id,
            date: moment(el.date_control, "YYYY-MM-DD")
          }
        })
      }
    },
    mounted () {
      this.getDateQuality()
    }
}
</script>

<style>
.test {
  width: 90px;
  height: 150px;
  right: 10px;
  top: 140px;
  background-color: black;
  position: absolute;
}
</style>

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
        :show="item.show"
        marker-type="placemark"
        :coords="[item.lat, item.lon]"
        :icon="{ content: item.dbm }"
        :options="{ preset: getIconColor(item.dbm) }"/>
      <date-picker :isShow="showDatepicker" :position="pointDatepicker" :dateEnabled="enableDate" @choiseDate="choiseDate">
        <template #header>
          <select-input @change="changeSelect" :itemList="arrSelect" :startSelect="itemSelect" />
          <select-input @change="changeDisSelect" :itemList="districts" :startSelect="disSelect" />
        </template>
      </date-picker>
    </yandex-map>
  </div>
</template>

<script>
//  <div class="form-group">
//         <div class="el-picker-panel el-date-picker el-popper" style="top: 135px;  right: 10px; z-index: 2010; position: absolute;">
//            <div class="el-picker-panel__body-wrapper">
//             <span><p>statistic</p></span>
//             <div @click="checked4G = !checked4G" :class="[ checked4G ? 'bootstrap-switch-on' : 'bootstrap-switch-off' ]" class="bootstrap-switch bootstrap-switch-wrapper bootstrap-switch-animate">
//               <div class="bootstrap-switch-container">
//                 <span class="bootstrap-switch-handle-on bootstrap-switch-"></span>
//                 <span class="bootstrap-switch-label"></span>
//                 <span class="bootstrap-switch-handle-off bootstrap-switch-default"></span>
//               </div>
//             </div>
//             LTE: {{ percentLTE }}
//            </div>
//          </div>
//        </div>
import BaseStations from '@/components/BaseStation.vue'
import DatePicker from '@/components/Datepicker.vue'
import SelectInput from '@/components/Select.vue'
import Point from '@/components/Point.vue'
import moment from 'moment'
import axios from 'axios'

export default {
  // eslint-disable-next-line
    name: 'Map',
    components: {
      BaseStations,
      SelectInput,
      DatePicker,
      Point
    },
    props: {
      baseStationsArr: Object,
      coords: Array,
      zoom: Number
    },
    data () {
      return {
        myMap: null,
        statM: false,
        showDatepicker: false,
        checked4G: true,
        pointDatepicker: { right: '10px', top: '132px'},
        enableDate: [],
        mapQualityArr: [],
        itemSelect: 0,
        districts: [{
          name: 'Все МО',
          isSelected: true,
          value: 0
        }],
        disSelect: 0,
        arrSelect: [
          {
            name: 'Мир-Телеком',
            isSelected: true,
            value: 1
          },
          {
            name: 'К-Телеком',
            isSelected: false,
            value: 2
          },
          {
            name: 'Феникс',
            isSelected: false,
            value: 3
          }
        ]
      }
    },
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
      },
      percentLTE () {
        let per = 0

        if (this.mapQualityArr && this.mapQualityArr.length > 0) {
          this.mapQualityArr.forEach(el => el)
        }

        return per
      }
    },
    methods: {
      handler (el) {
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
        this.mapQualityArr = resp.data.map(el => {
          return {
            show: true,
            ...el
          }
        })
      },
      async getDateQuality () {
        const resp = await axios.get(`http://151.0.10.245:5001/qualitydate`)
        this.enableDate = resp.data.map(el => {
          return {
            id: el.id,
            operator_id: el.operator_id,
            date: moment(el.date_control, "YYYY-MM-DD")
          }
        }).filter(el => el.operator_id == this.arrSelect[this.itemSelect].value)
      },
      changeSelect (ev) {
        this.arrSelect.forEach(el => el.isSelected = el.name == ev.name ? true : false)
        this.itemSelect = this.arrSelect.findIndex(el => el.name == ev.name)
        this.getDateQuality()
      },
      changeDisSelect (ev) {
        this.districts.forEach(el => el.isSelected = el.name == ev.name ? true : false)
        this.disSelect = this.districts.findIndex(el => el.name == ev.name)
      },
      async getDistricts () {
        const resp = await axios.get('http://151.0.10.245:5001/districts')
        this.districts = this.districts.concat(resp.data.map(item => {
            return {
              isSelected: false,
              name: item.district_name,
              value: item.id
            }
        }))
      }
    },
    mounted () {
      try {
        this.getDateQuality()
        this.getDistricts() 
      } catch (err) {
        console.log('Error in mouted Map' + err)
      }
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

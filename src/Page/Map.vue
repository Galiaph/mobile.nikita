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

      <base-stations
        v-for="item in mapQualityArr"
        :key="item"
        :id="item.id"
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
    <div class="fixed-plugin" style="top: 145px;" id="menu" v-show="showSettings" @click.prevent="openDropDown">
      <font-awesome-icon icon="fa fa-cog fa-2x"></font-awesome-icon>
    </div>
    <div class="form-group" v-show="showMenu" v-click-outside="closeDropDown" style="right: 5px; top: 132px; z-index: 2007; position: absolute;">
      <div class="el-picker-panel el-date-picker el-popper">
        <div class="el-picker-panel__body-wrapper">
          <div>
            <div @click="click4G" :class="[ checked4G ? 'bootstrap-switch-on' : 'bootstrap-switch-off' ]" class="bootstrap-switch bootstrap-switch-wrapper bootstrap-switch-animate">
              <div class="bootstrap-switch-container">
                <span class="bootstrap-switch-handle-on bootstrap-switch-"></span>
                <span class="bootstrap-switch-label"></span>
                <span class="bootstrap-switch-handle-off bootstrap-switch-default"></span>
              </div>
            </div>
            LTE ({{ statLTE.col }}): {{ statLTE.percent }}%
            <div>
              <ul class="sett">
                <li class="red">&ge; -116 to &lt; -110 ()</li>
                <li>&ge; -110 to &lt; -104 ()</li>
                <li>&ge; -104 to &lt; -94 ()</li>
                <li>&ge; -94 to &lt; -80 ()</li>
                <li>&ge; -80 ()</li>
              </ul>
            </div>
          </div>
          <div>
            <div @click="click3G" :class="[ checked3G ? 'bootstrap-switch-on' : 'bootstrap-switch-off' ]" class="bootstrap-switch bootstrap-switch-wrapper bootstrap-switch-animate">
              <div class="bootstrap-switch-container">
                <span class="bootstrap-switch-handle-on bootstrap-switch-"></span>
                <span class="bootstrap-switch-label"></span>
                <span class="bootstrap-switch-handle-off bootstrap-switch-default"></span>
              </div>
            </div>
            UMTS ({{ statUMTS.col }}): {{ statUMTS.percent }}%
            <div>
              <ul class="sett">
                <li class="red">&ge; -116 to &lt; -110 ()</li>
                <li>&ge; -110 to &lt; -104 ()</li>
                <li>&ge; -104 to &lt; -94 ()</li>
                <li>&ge; -94 to &lt; -80 ()</li>
                <li>&ge; -80 ()</li>
              </ul>
            </div>
          </div>
          <div>
            <div @click="click2G" :class="[ checked2G ? 'bootstrap-switch-on' : 'bootstrap-switch-off' ]" class="bootstrap-switch bootstrap-switch-wrapper bootstrap-switch-animate">
              <div class="bootstrap-switch-container">
                <span class="bootstrap-switch-handle-on bootstrap-switch-"></span>
                <span class="bootstrap-switch-label"></span>
                <span class="bootstrap-switch-handle-off bootstrap-switch-default"></span>
              </div>
            </div>
            GSM ({{ statGSM.col }}): {{ statGSM.percent }}%
            <div>
              <ul class="sett">
                <li class="red">&ge; -116 to &lt; -110 ()</li>
                <li>&ge; -110 to &lt; -104 ()</li>
                <li>&ge; -104 to &lt; -94 ()</li>
                <li>&ge; -94 to &lt; -80 ()</li>
                <li>&ge; -80 ()</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseStations from '@/components/BaseStation.vue'
import DatePicker from '@/components/Datepicker.vue'
import SelectInput from '@/components/Select.vue'
// import Point from '@/components/Point.vue'
import moment from 'moment'
import axios from 'axios'

export default {
  // eslint-disable-next-line
    name: 'Map',
    components: {
      BaseStations,
      SelectInput,
      DatePicker,
      // Point
    },
    props: {
      baseStationsArr: Object,
      coords: Array,
      zoom: Number
    },
    data () {
      return {
        myMap: null,
        showMenu: false,
        showSettings: false,
        statM: false,
        statK: false,
        statP: false,
        showDatepicker: false,
        checked4G: true,
        checked3G: true,
        checked2G: true,
        pointDatepicker: { right: '10px', top: '132px'},
        enableDate: [],
        mapQualityArr: [],
        itemSelect: 0,
        statLTE: {
          percent: 0,
          col: 0,
          red_per: 0,
          red_col: 0
        },
        statUMTS: {
          percent: 0,
          col: 0
        },
        statGSM: {
          percent: 0,
          col: 0
        },
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

        if (el) {
          this.getQualityDataById(el.id)
          this.showSettings = true
        } else {
          this.mapQualityArr = []
          this.showSettings = false
        }
      },
      click4G () {
        this.checked4G = !this.checked4G

        this.mapQualityArr.forEach(el => {
          if (el.net_type == 1)
            el.show = this.checked4G
        })
      },
      click3G () {
        this.checked3G = !this.checked3G

        this.mapQualityArr.forEach(el => {
          if (el.net_type == 0)
            el.show = this.checked3G
        })
      },
      click2G () {
        this.checked2G = !this.checked2G

        this.mapQualityArr.forEach(el => {
          if (el.net_type == 2)
            el.show = this.checked2G
        })
      },
      openDropDown () {
        setTimeout(() => {
            this.showMenu = true
          }, 1)
      },
      closeDropDown () {
        if (this.showMenu)
          this.showMenu = false
      },
      getLTE () {
        if (this.mapQualityArr && this.mapQualityArr.length > 0) {
          const arr = this.mapQualityArr.filter(el => el.net_type == 1)

          // console.log(arr.find(el => (el.dbm < -116)))
          this.statLTE.percent =  ((arr.length/this.mapQualityArr.length)*100).toFixed(0)
          this.statLTE.col = arr.length
          // this.statLTE.red_col = arr.find(el => el.dbm < -116).length
          // this.statLTE.red_per = ((this.statLTE.red_col/this.statLTE.col)*100).toFixed(0)
        }
      },
      getUMTS () {
        if (this.mapQualityArr && this.mapQualityArr.length > 0) {
          const arr = this.mapQualityArr.filter(el => el.net_type == 2)

          // console.log(arr.find(el => (el.dbm < -116)))
          this.statUMTS.percent =  ((arr.length/this.mapQualityArr.length)*100).toFixed(0)
          this.statUMTS.col = arr.length
          // this.statLTE.red_col = arr.find(el => el.dbm < -116).length
          // this.statLTE.red_per = ((this.statLTE.red_col/this.statLTE.col)*100).toFixed(0)
        }
      },
      getGSM () {
        if (this.mapQualityArr && this.mapQualityArr.length > 0) {
          const arr = this.mapQualityArr.filter(el => el.net_type == 0)

          // console.log(arr.find(el => (el.dbm < -116)))
          this.statGSM.percent =  ((arr.length/this.mapQualityArr.length)*100).toFixed(0)
          this.statGSM.col = arr.length
          // this.statLTE.red_col = arr.find(el => el.dbm < -116).length
          // this.statLTE.red_per = ((this.statLTE.red_col/this.statLTE.col)*100).toFixed(0)
        }
      },
      getIconColor (dbm) {
        if (dbm != null) {
          if (dbm >= -80)
            return 'islands#greenCircleIcon'
          else if (dbm >= -94 && dbm < -80) {
            return 'islands#blueCircleIcon'
          } else if (dbm >= -104 && dbm < -94) {
            return 'islands#yellowCircleIcon'
          } else if (dbm >= -110 && dbm < -104) {
            return 'islands#orangeCircleIcon'
          } else if (dbm >= -116 && dbm < -110) {
            return 'islands#redCircleIcon'
          } else if (dbm < -116) {
            return 'islands#greyCircleIcon'
          }
        }

        return 'islands#blackCircleIcon'
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
        this.getLTE()
        this.getUMTS()
        this.getGSM()
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
.sett {
  font-size: 12px;
  list-style-type: none;
}

.red li::before {
  content:'';
  width: 2em;
  height: 2em;
  border-radius: 1em;
  background: red;
  margin-right: 1em;
  display: inline-block;
  position: relative;
}
</style>

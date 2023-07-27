<template>
  <div class="form-group" v-if="isShow">
    <div class="el-picker-panel el-date-picker el-popper" :style="{top: posTop,  right: posRight}" style="z-index: 2017; position: absolute;">
      <div class="el-picker-panel__body-wrapper">
        <div class="el-picker-panel__body">
          <div class="el-date-picker__header">
            <slot name="header">
            </slot>
            <button @click.prevent="prevYear()" type="button" aria-label="Previous Year" class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left"></button>
            <button @click.prevent="prevMonth()" type="button" aria-label="Previous Month" class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-arrow-left"></button>
            <span role="button" class="el-date-picker__header-label">{{ currentDate.format('YYYY') }} </span>
            <span role="button" class="el-date-picker__header-label">{{ currentDate.format('MMMM') }}</span>
            <button @click.prevent="nextYear()" type="button" aria-label="Next Year" class="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right"></button>
            <button @click.prevent="nextMonth()" type="button" aria-label="Next Month" class="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-arrow-right"></button>
          </div>

          <div class="el-picker-panel__content">
            <table cellspacing="0" cellpadding="0" class="el-date-table">
              <tbody>
                <tr>
                  <th>Sun</th>
                  <th>Mon</th>
                  <th>Tue</th>
                  <th>Wed</th>
                  <th>Thu</th>
                  <th>Fri</th>
                  <th>Sat</th>
                </tr>
                <tr class="el-date-table__row" v-for="w in weeksOnMonth" :key="w">
                  <td :class="d.class" v-for="d in dayOnWeek(w)" :key="d" @click.prevent="choiseDate(d)">
                    <div><span>{{ d.day }}</span></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'DatePicker',
  props: {
    dateEnabled: Object,
    isShow: Boolean,
    position: Object
  },
  computed: {
    weeksOnMonth () {
      let monthStart     = moment(this.currentDate).date(1)
      let numDaysInMonth = moment(this.currentDate).endOf('month').date()
      return Math.ceil((numDaysInMonth + monthStart.day()) / 7)
    },
    posTop () {
      return this.position.top
    },
    posRight () {
      return this.position.right
    }
  },
  data () {
    return {
      currentDate: moment(),
      days: [],
      choise: null
    }
  },
  methods: {
    setDate () {
      const week = this.weeksOnMonth
      this.days = []

      for (let w = 0; w < week; w++) {
        const dObj = w > 0 ? moment(this.currentDate).date(1).weekday(w*7) : moment(this.currentDate).date(1)
        const month = moment(this.currentDate).month()
        for (let i = 0; i < 7; i++) {
          const el = {
            day: dObj.weekday(i).date(),
            month: dObj.month(),
            week: w,
            isCurentMonth: dObj.month() == month,
            isSelected: this.choise ? (this.choise.year() == dObj.year() && this.choise.month() == dObj.month() && this.choise.date() == dObj.date()) : false,
            isToday: this.dateEnabled ? this.dateEnabled.find(el => el.date.format('YYYYMMDD') == dObj.format('YYYYMMDD')) : false
          }

          el.class = {
            'available': el.isCurentMonth,
            'prev-month': !el.isCurentMonth,
            'today': el.isToday,
            'current': el.isSelected
          }
          this.days.push(el)
        }
      }
    },
    dayOnWeek (week) {
      week -= 1
      return this.days.filter(el => el.week == week)
    },
    prevYear () {
      this.currentDate = moment(this.currentDate).add(-1, 'year')
      this.setDate()
    },
    nextYear () {
      this.currentDate = moment(this.currentDate).add(1, 'year')
      this.setDate()
    },
    prevMonth () {
      this.currentDate = moment(this.currentDate).add(-1, 'month')
      this.setDate()
    },
    nextMonth () {
      this.currentDate = moment(this.currentDate).add(1, 'month')
      this.setDate()
    },
    choiseDate (el) {
      if (this.choise) {
        const item = this.days.find(i => this.choise.month() == i.month && this.choise.date() == i.day)
        
        if (item) {
          item.isSelected = false
          item.class.current = false
        }
      }

      el.isSelected = true
      el.class.current = true
      this.choise = moment().year(this.currentDate.year()).month(el.month).date(el.day)

      this.$emit('choiseDate', this.choise)
    }
  },
  mounted () {
    this.setDate()
  },
  watch: {
    dateEnabled (newData) {
      if (newData)
        this.setDate()
    }
  }
}
</script>

<style>

</style>
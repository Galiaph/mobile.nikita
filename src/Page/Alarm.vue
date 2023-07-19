<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-4">
          <date-picker :dateEnabled="dateArray" :isShow="showDatepicker"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from '@/components/Datepicker.vue'
import moment from 'moment'

export default {
  // eslint-disable-next-line
    name: 'Alarm',
    components: {
      DatePicker
    },
    data: () => ({
      dateArray: [moment().year(2023).month(6).date(17), moment().year(2023).month(6).date(21), moment().year(2023).month(6).date(30)],
      showDatepicker: true
    })
}
</script>

<style>

</style>
<template>
  <div class="card">
    <div class="card-header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <div class="card-body">
      <div>
        <highcharts class="chart" :options="chartOptions" :updateArgs="updateArgs"></highcharts>
      </div>
    </div>
    <div class="card-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>

export default {
    name: 'chart-card',
    props: {
      chartOptions: {
        type: Object
      }
    },
    data () {
      return {
        updateArgs: [true, true, {duration: 1000}],
      }
    }
}
</script>

<style>

</style>
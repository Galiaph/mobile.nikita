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
// import Card from './Card.vue'

export default {
    name: 'chart-card',
    components: {
      // Card
    },
    props: {
      chartType: {
        type: String,
        default: 'Line' // Line | Pie | Bar
      },
      // chartOptions: {
      //   type: Object,
      //   default: () => {
      //     return {}
      //   }
      // },
      chartData: {
        type: Object,
        default: () => {
          return {
            labels: [],
            series: []
          }
        }
      },
      responsiveOptions: [Object, Array]
    },
    data () {
      return {
        chartId: 'no-id',
        $Chartist: null,
        chart: null,
        updateArgs: [true, true, {duration: 1000}],
        chartOptions: {
          chart: {
            type: 'column'
          },
          title: {
            text: ''
          },
          xAxis: {
            categories: [
                '17.07',
                '18.07',
                '19.07',
                '20.07',
                '21.07',
                '22.07',
                '23.07',
                '24.07',
                '25.07',
                '26.07',
                '27.07',
                '28.07'
            ],
            crosshair: true
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Сайтов (шт)'
            }
          },
          tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat:  '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                          '<td style="padding:0"><b>{point.y} шт</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
          },
          plotOptions: {
            column: {
              pointPadding: 0.2,
              borderWidth: 0
            }
          },
          series: [{
            name: 'Общий',
            data: [19, 17, 16, 15, 18, 17, 14, 14, 19, 17, 15, 14]
          }, {
            name: 'Алешкинский',
            data: [7, 6, 5, 4, 7, 6, 4, 4, 8, 7, 5, 6]
          }, {
            name: 'Голопристанский',
            data: [9, 8, 8, 8, 8, 8, 7, 7, 8, 7, 7, 5]
          }, {
            name: 'Каховский',
            data: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
          }]
        }
      }
    },
    methods: {

    },
    async mounted () {
    }
}
</script>

<style>

</style>
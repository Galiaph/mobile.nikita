<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-3 col-md-6">
          <stats-card>
            <template #header>
              <i class="nc-icon nc-zoom-split text-primary"></i>
            </template>
            <template #content>
              <p class="card-category">Начало ОС работ</p>
              <h4 class="card-title">{{ startOfWork }}%</h4>
            </template>
            <template #footer>
              <hr/>
            </template>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <template #header>
              <i class="nc-icon nc-settings-90 text-success"></i>
            </template>
            <template #content>
              <p class="card-category">Завершение ОС работ</p>
              <h4 class="card-title">{{ startOfCMP }}%</h4>
            </template>
            <template #footer>
              <hr/>
            </template>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <template #header>
              <i class="nc-icon nc-settings-tool-66 text-primary"></i>
            </template>
            <template #content>
              <p class="card-category">Установка оборудования</p>
              <h4 class="card-title">{{ startOfRFI }}%</h4>
            </template>
            <template #footer>
              <hr/>
            </template>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <template #header>
              <i class="nc-icon nc-satisfied text-danger"></i>
            </template>
            <template #content>
              <p class="card-category">Запуск сайта в сервис</p>
              <h4 class="card-title">{{ startOfRFS }}%</h4>
            </template>
            <template #footer>
              <hr/>
            </template>
          </stats-card>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <chart-card :chartOptions="pieChart">
            <template #header>
              <h4 class="card-title">Понедельный график работ</h4>
            </template>
          </chart-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StatsCard from '@/components/Cards/StatsCard.vue'
import ChartCard from '@/components/Cards/ChartCard.vue'
import axios from 'axios'
import moment from 'moment'

export default {
  // eslint-disable-next-line
  name: 'Building',
  components: {
    StatsCard,
    ChartCard
  },
  data: () => ({
    buildingData: [],
    startOfWork: 0,
    startOfCMP: 0,
    startOfRFI: 0,
    startOfRFS: 0,
    pieChart: {
      chart: {
        type: 'column'
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: [],
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Количество (шт)'
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:  '<tr><td style="color:{series.color};padding:0">{series.name}:&nbsp;</td>' +
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
        name: 'Начало ОС работ',
        data: []
      }, {
        name: 'Завершение ОС работ',
        data: []
      }, {
        name: 'Установка оборудования',
        data: []
      }, {
        name: 'Запуск сайта в сервис',
        data: []
      }]
    }
  }),
  methods: {
    async loadData () {
      const resp = await axios.get(`http://151.0.10.245:5001/building`)
      this.tableData = resp.data

      const dataLength = this.tableData.length

      this.startOfWork = ((this.tableData.filter(el => el.bd_first != null).length/dataLength)*100).toFixed(0)
      this.startOfCMP = ((this.tableData.filter(el => el.bd_cmp != null).length/dataLength)*100).toFixed(0)
      this.startOfRFI = ((this.tableData.filter(el => el.bd_rfi != null).length/dataLength)*100).toFixed(0)
      this.startOfRFS = ((this.tableData.filter(el => el.bd_rfs != null).length/dataLength)*100).toFixed(0)

      const week = moment().format('W')
      for (let i = week-12; i < week; i++) {
        this.pieChart.xAxis.categories.push(i + ' неделя')

        let count = this.tableData.filter(el => moment(el.bd_first).format('W') == i).length
        this.pieChart.series[0].data.push(count)

        count = this.tableData.filter(el => moment(el.bd_cmp).format('W') == i).length
        this.pieChart.series[1].data.push(count)

        count = this.tableData.filter(el => moment(el.bd_rfi).format('W') == i).length
        this.pieChart.series[2].data.push(count)

        count = this.tableData.filter(el => moment(el.bd_rfs).format('W') == i).length
        this.pieChart.series[3].data.push(count)
      }
    }
  },
  mounted () {
    try {
      this.loadData() 
    } catch (err) {
      console.log('Error in mouted Building' + err)
    }
  }
}
</script>

<style>

</style>
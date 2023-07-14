<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-3 col-md-6">
          <stats-card>
            <template #header>
              <i class="nc-icon nc-settings-90 text-success"></i>
            </template>
            <template #content>
              <p class="card-category">Стройка завершена</p>
              <h4 class="card-title">{{ buildData.mir }}%</h4>
            </template>
            <template #footer>
              <hr/>
              <font-awesome-icon icon="fa fa-refresh"/>Обновлено вчера
            </template>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <template #header>
              <i class="nc-icon nc-vector text-danger"></i>
            </template>
            <template #content>
              <p class="card-category">Обрывов магистралей</p>
              <h4 class="card-title">{{ lastData }}</h4>
            </template>
            <template #footer>
              <hr/>
              <font-awesome-icon icon="fa-regular fa-calendar"/>За последнюю неделю
            </template>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <template #header>
              <i class="nc-icon nc-favourite-28 text-primary"></i>
            </template>
            <template #content>
              <p class="card-category">Поднятых базовых станций</p>
              <h4 class="card-title">+4</h4>
            </template>
            <template #footer>
              <hr/>
              <font-awesome-icon icon="fa-regular fa-clock"/>За сегодня
            </template>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <template #header>
              <i class="nc-icon nc-fav-remove text-danger"></i>
            </template>
            <template #content>
              <p class="card-category">Не работающих базовых станций</p>
              <h4 class="card-title">83</h4>
            </template>
            <template #footer>
              <hr/>
              <font-awesome-icon icon="fa fa-refresh"/>Обновлено вчера
            </template>
          </stats-card>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <chart-card :chartOptions="chartOptions">
            <template #header>
              <h4 class="card-title">Динамика лежащих сайтов</h4>
              <p class="card-category">Количество по полю лежат</p>
            </template>
            <template #footer>
              <hr>
              <div class="stats">
                <font-awesome-icon icon="fa-regular fa-calendar"/>За последние 12 дней
              </div>
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

export default {
  // eslint-disable-next-line
  name: 'Dashboard',
  components: {
    StatsCard,
    ChartCard
  },
  data: () => ({
    buildData: {},
    lastData: 0,
    chartOptions: {
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
  }),
  methods: {
    async loadPercent () {
      const resp = await axios.get(`http://151.0.10.245:5001/percentbuild`)
      this.buildData = resp.data[0]
      this.buildData.mir = ((this.buildData.ended/this.buildData.total)*100).toFixed(0)
    },
    async loadLastWeek () {
      const resp = await axios.get(`http://151.0.10.245:5001/lastweek`)
      this.lastData = resp.data[0]
    }
  },
  async mounted () {
    this.loadPercent()
  }
}
</script>

<style>
div .stats svg {
  margin-right: 4px;
}
</style>
<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6">
          <chart-card :chartOptions="topData">
            <template #header>
              <h4 class="card-title">Топ порывов</h4>
              <p class="card-category">Здесь могла быть Ваша реклама</p>
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
      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <template #header>
              <p class="card-category">Обрывы ВОЛС</p>
            </template>
            <l-table class="table-hover table-striped table-sm"
                     :columns="tableColumns"
                     :data="tableData">
              <template v-slot:default="{row}">
                <td>{{ row['operator'] }}</td>
                <td>{{ row['fiber'] }}</td>
                <td>{{ row['sector'] }}</td>
                <td>{{ row['first_time'] }}</td>
                <td>{{ row['last_time'] }}</td>
                <td class="td-actions text-center">
                  <button type="button" class="btn-simple btn btn-xs btn-info" v-if="row['comment']" @click="al(row['comment'])">
                    <i class="fa-regular fa-calendar">комментарии</i>
                  </button>
                </td>
              </template>
            </l-table>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LTable from '@/components/Table.vue'
import Card from '@/components/Cards/Card.vue'
import ChartCard from '@/components/Cards/ChartCard.vue'
import moment from 'moment'
import axios from 'axios'

export default {
  // eslint-disable-next-line
  name: 'Faiberalarm',
  components: {
    LTable,
    Card,
    ChartCard
  },
  data: () => ({
    tableColumns: [{
        data: 'operator',
        name: 'Оператор'
      },
      {
        data: 'fiber',
        name: 'Тип ВОЛС'
      },
      {
        data: 'sector',
        name: 'Участок'
      },
      {
        data: 'first_time',
        name: 'Дата начало'
      },
      {
        data: 'last_time',
        name: 'Дата восстановления'
      },
      {
        data: 'comment',
        name: 'Комментарии'
      }
    ],
    tableData: [],
    topData: {
      chart: {
        type: 'column'
      },
      title: {
        align: 'left',
        text: ''
      },
      subtitle: {
        align: 'left',
        text: ''
      },
      accessibility: {
        announceNewData: {
          enabled: true
        }
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        title: {
          text: 'Количество порывов'
        }
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{point.y}'
          }
        }
      },

      tooltip: {
        pointFormat: 'За все время: <b>{point.y}</b><br/>'
      },

      series: [
        {
          name: 'ВОЛС',
          colorByPoint: true,
          data: []
        }
      ],
      drilldown: {
        breadcrumbs: {
          position: {
            align: 'right'
          }
        },
        series: []
      }
    }
  }),
  methods: {
    async getFiberAlarms () {
      const resp = await axios.get(`http://151.0.10.245:5001/fiberalarms`)
      this.tableData = resp.data.map(item => {
        const mom = moment(item.first_time)
        const mom2 = moment(item.last_time)
        mom.utc()
        mom2.utc()
        item.first_time = mom.format('YYYY-MM-DD HH:mm')
        item.last_time = mom2.format('YYYY-MM-DD HH:mm')
        return item
      })
    },
    async getFiberAlarmsTop () {
      this.getFiberAlarms()
      const resp = await axios.get(`http://151.0.10.245:5001/fiberalarmtop`)
      this.topData.series[0].data = resp.data.map( (item, index) => {
        return {
          name: item.sector,
          y: item.p,
          drilldown: index + 1
        }
      })

      this.topData.drilldown.series = resp.data.map( (item, index) => {
        return {
          name: item.sector,
          id: index + 1,
          data: 
            this.tableData.filter(i => i.sector == item.sector).map(el => {
                return [el['first_time'].split(' ')[0], 1]
            })
        }
      })
    },
    al (text) {
      window.alert(text)
    }
  },
  mounted () {  
    this.getFiberAlarmsTop()
  }
}
</script>

<style>

</style>
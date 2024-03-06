<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <template #header>
              <p class="card-category">История восстановления сайтов</p>
            </template>
            <l-table class="table-hover table-striped table-sm"
                     :columns="tableColumns"
                     :data="tableData">
              <template v-slot:default="{row}">
                <td>{{ row['st'] }}</td>
                <td>{{ row['first_time'] }}</td>
                <td>{{ row['last_time'] }}</td>
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
import moment from 'moment'
import axios from 'axios'

export default {
  // eslint-disable-next-line
    name: 'Alarm',
    components: {
      LTable,
      Card
    },
    data: () => ({
      tableColumns: [{
          data: 'st',
          name: 'Сайт'
        },
        {
          data: 'first_time',
          name: 'Дата падения'
        },
        {
          data: 'last_time',
          name: 'Дата восстановления'
        }
      ],
      tableData: []
    }),
    methods: {
      async getBrokenHistory () {
        const resp = await axios.get(`http://151.0.10.245:5001/getbrohistory`)
        this.tableData = resp.data.map(item => {
          const mom = moment(item.first_time)
          const mom2 = moment(item.last_time)
          mom.utc()
          mom2.utc()
          item.first_time = mom.format('YYYY-MM-DD HH:mm')
          item.last_time = mom2.format('YYYY-MM-DD HH:mm')
          return item
        })
      }
    },
    mounted () {  
      this.getBrokenHistory()
    }
}
</script>

<style>

</style>
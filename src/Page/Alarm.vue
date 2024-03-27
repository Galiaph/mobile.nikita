<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-6">
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

        <div class="col-6">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <template #header>
              <p class="card-category">Вышли из чата сегодня</p>
            </template>
            <l-table class="table-hover table-striped table-sm"
                     :columns="tableColumns2"
                     :data="tableData2">
              <template v-slot:default="{row}">
                <td>{{ row['st'] }}</td>
                <td>{{ row['first_occurred'] }}</td>
              </template>
            </l-table>
          </card>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <template #header>
              <p class="card-category">Полная история сайтов</p>
            </template>
            <l-table-ex class="table-hover table-striped table-sm"
                     :columns="tableColumns"
                     :data="tableDataHistory">
              <template #counter>
                <select-input style="width: 200px;" @change="changeSelect" :itemList="arrSelect" :startSelect="itemSelect" />
              </template>
              <template #search>
                <div class="pull-right">
                  <label>
                    <input type="search" placeholder="Search records" aria-controls="datatables" class="form-control input-sm">
                  </label>
                </div>
              </template>
              <template v-slot:default="{row}">
                <td>{{ row['st'] }}</td>
                <td>{{ row['first_time'] }}</td>
                <td>{{ row['last_time'] }}</td>
              </template>
            </l-table-ex>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LTable from '@/components/Table.vue'
import LTableEx from '@/components/TableEx.vue'
import Card from '@/components/Cards/Card.vue'
import SelectInput from '@/components/Select.vue'
import moment from 'moment'
import axios from 'axios'

export default {
  // eslint-disable-next-line
    name: 'Alarm',
    components: {
      LTable,
      LTableEx,
      SelectInput,
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
      tableColumns2: [{
          data: 'st',
          name: 'Сайт'
        },
        {
          data: 'first_occurred',
          name: 'Дата падения'
        }
      ],
      tableData: [],
      tableData2: [],
      tableDataHistory: [],
      itemSelect: 0,
      arrSelect: [
          {
            name: '5',
            isSelected: true,
            value: 1
          },
          {
            name: '10',
            isSelected: false,
            value: 2
          },
          {
            name: '25',
            isSelected: false,
            value: 3
          },
          {
            name: '50',
            isSelected: false,
            value: 4
          }
        ]
    }),
    methods: {
      async getBrokenHistory () {
        const resp = await axios.get(`http://151.0.10.245:5001/getbrohistory`)
        this.tableDataHistory = resp.data.map(item => {
          const mom = moment(item.first_time)
          const mom2 = moment(item.last_time)
          mom.utc()
          mom2.utc()
          item.first_time = mom.format('YYYY-MM-DD HH:mm')
          item.last_time = mom2.format('YYYY-MM-DD HH:mm')
          return item
        })
      },
      async getRestoreList () {
        const resp = await axios.get(`http://151.0.10.245:5001/getressite`)
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
      async getBrokenList () {
        const resp = await axios.get(`http://151.0.10.245:5001/getbrosite`)
        this.tableData2 = resp.data.map(item => {
          const mom = moment(item.first_occurred)
          mom.utc()
          item.first_occurred = mom.format('YYYY-MM-DD HH:mm')
          return item
        })
      },
      changeSelect (ev) {
        this.arrSelect.forEach(el => el.isSelected = el.name == ev.name ? true : false)
        this.itemSelect = this.arrSelect.findIndex(el => el.name == ev.name)
      },
    },
    mounted () {  
      this.getBrokenHistory()
      this.getRestoreList()
      this.getBrokenList()
    }
}
</script>

<style>
.pull-right {
  float: right !important;
}
</style>
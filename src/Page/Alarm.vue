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
              <p class="card-category">Вышли из чата навсегда</p>
            </template>
            <l-table-ex
                     :columns="tableColumn3"
                     :data="queriedData">
              <template #counter>
                <select-input style="width: 200px;" @change="changeSelect" :itemList="arrSelect" :startSelect="itemSelect" />
              </template>
              <template v-slot:default="{row}">
                <td>{{ row['bs_name'] }}</td>
                <td>{{ row['district_name'] }}</td>
                <td>{{ row['place'] }}</td>
                <td>{{ row['status'] }}</td>
                <td>{{ row['damage'] }}</td>
                <td>{{ row['comment'] }}</td>
              </template>
            </l-table-ex>
            <div class="row">
              <div class="col-sm-6">
                <p class="card-category">Showing {{from + 1}} to {{to}} of {{total}} entries</p>
              </div>
              <div class="col-sm-6">
                <p-pagination class="pull-right"
                              v-model="pagination.currentPage"
                              :per-page="pagination.perPage"
                              :total="pagination.total"
                              @input="changePage">
                </p-pagination>
              </div>
            </div>
          </card>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <template #header>
              <p class="card-category">Полная история сайтов</p>
            </template>
            <l-table-ex class="table-hover table-striped table-sm"
                     :columns="tableColumns"
                     :data="queriedData2">
              <template #counter>
                <select-input style="width: 200px;" @change="changeSelect2" :itemList="arrSelect2" :startSelect="itemSelect2" />
              </template>
              <template #search>
                <div class="pull-right">
                  <label>
                    <input type="text" placeholder="Search records" v-model="searchQuery" aria-controls="datatables" class="form-control input-sm">
                  </label>
                </div>
              </template>
              <template v-slot:default="{row}">
                <td>{{ row['st'] }}</td>
                <td>{{ row['first_time'] }}</td>
                <td>{{ row['last_time'] }}</td>
              </template>
            </l-table-ex>
            <div class="row">
              <div class="col-sm-6">
                <p class="card-category">Showing {{from2 + 1}} to {{to2}} of {{total2}} entries</p>
              </div>
              <div class="col-sm-6">
                <p-pagination class="pull-right"
                              v-model="pagination2.currentPage"
                              :per-page="pagination2.perPage"
                              :total="pagination2.total"
                              @input="changePage2">
                </p-pagination>
              </div>
            </div>
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
import PPagination from '@/components/Pagination.vue'
import moment from 'moment'
import axios from 'axios'

export default {
  // eslint-disable-next-line
    name: 'Alarm',
    components: {
      LTable,
      LTableEx,
      SelectInput,
      Card,
      PPagination
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
      tableColumn3: [{
          data: 'bs_name',
          name: 'Сайт'
        },
        {
          data: 'district_name',
          name: 'МО'
        },
        {
          data: 'place',
          name: 'Населенный пункт'
        },
        {
          data: 'status',
          name: 'Состояние'
        },
        {
          data: 'damage',
          name: 'Повреждение'
        },
        {
          data: 'comment',
          name: 'Комментарии'
        }
      ],
      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0
      },
      pagination2: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0
      },
      tableData: [],
      tableData2: [],
      tableDataHistory: [],
      tableLostSite: [],
      searchQuery: '',
      itemSelect: 0,
      itemSelect2: 0,
      arrSelect: [
          {
            name: '5',
            isSelected: true,
            value: 5
          },
          {
            name: '10',
            isSelected: false,
            value: 10
          },
          {
            name: '25',
            isSelected: false,
            value: 25
          },
          {
            name: '50',
            isSelected: false,
            value: 50
          }
        ],
        arrSelect2: [
          {
            name: '5',
            isSelected: true,
            value: 5
          },
          {
            name: '10',
            isSelected: false,
            value: 10
          },
          {
            name: '25',
            isSelected: false,
            value: 25
          },
          {
            name: '50',
            isSelected: false,
            value: 50
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
      async getLostSite () {
        const resp = await axios.get(`http://151.0.10.245:5001/getlostsite`)
        this.tableLostSite = resp.data.map(item => {
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
        this.pagination.perPage = this.arrSelect[this.itemSelect].value
      },
      changeSelect2 (ev) {
        this.arrSelect2.forEach(el => el.isSelected = el.name == ev.name ? true : false)
        this.itemSelect2 = this.arrSelect2.findIndex(el => el.name == ev.name)
        this.pagination2.perPage = this.arrSelect2[this.itemSelect2].value
      },
      changePage (ev) {
        if (ev)
          this.pagination.currentPage = ev
      },
      changePage2 (ev) {
        if (ev)
          this.pagination2.currentPage = ev
      }
    },
    computed: {
      pagedData () {
        return this.tableLostSite.slice(this.from, this.to)
      },
      pagedData2 () {
        return this.tableDataHistory.slice(this.from2, this.to2)
      },
      queriedData () {
        // eslint-disable-next-line
        this.pagination.total = this.tableLostSite.length
        return this.pagedData
      },
      queriedData2 () {
        if (!this.searchQuery) {
          // eslint-disable-next-line
          this.pagination2.total = this.tableDataHistory.length
          return this.pagedData2
        }
        let result = this.tableDataHistory
          .filter((row) => {
            let isIncluded = false
            let rowValue = row['st'].toString()
            if (rowValue.includes && rowValue.includes(this.searchQuery)) {
              isIncluded = true
            }
            
            return isIncluded
          })
        // eslint-disable-next-line
        this.pagination2.total = result.length
        return result.slice(this.from2, this.to2)
      },
      to () {
        let highBound = this.from + this.pagination.perPage
        if (this.total < highBound) {
          highBound = this.total
        }
        return highBound
      },
      to2 () {
        let highBound = this.from2 + this.pagination2.perPage
        if (this.total2 < highBound) {
          highBound = this.total2
        }
        return highBound
      },
      from () {
        return this.pagination.perPage * (this.pagination.currentPage - 1)
      },
      from2 () {
        return this.pagination2.perPage * (this.pagination2.currentPage - 1)
      },
      total () {
        // eslint-disable-next-line
        this.pagination.total = this.tableLostSite.length
        return this.tableLostSite.length
      },
      total2 () {
        // eslint-disable-next-line
        // this.pagination2.total = this.tableDataHistory.length
        return this.pagination2.total
      }
    },
    mounted () {  
      this.getBrokenHistory()
      this.getRestoreList()
      this.getBrokenList()
      this.getLostSite()
    }
}
</script>

<style>
.pull-right {
  float: right !important;
}
</style>
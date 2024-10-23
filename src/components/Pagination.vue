<template>
  <ul class="pagination pag" :class="paginationClass">
    <li class="page-item prev-page" :class="{disabled: theCurrentPage === 1}">
      <a class="page-link" aria-label="Previous" @click="prevPage">
        <i class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left" aria-hidden="true"></i>
      </a>
    </li>
    <li class="page-item" :class="{active: theCurrentPage === item}" v-for="item in range(minPage, maxPage)" :key="item">
      <a class="page-link" @click="changePage(item)">{{ item }}</a>
    </li>
    <li class="page-item next-page" :class="{disabled: theCurrentPage === totalPages}">
      <a class="page-link" aria-label="Next" @click="nextPage">
        <i class="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right" aria-hidden="true"></i>
      </a>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'p-pagination',
    props: {
      type: {
        type: String,
        default: 'default',
        description: 'Pagination type (primary|info|danger|default|warning|success)'
      },
      pageCount: {
        type: Number,
        default: 0,
        description: 'Pagination page count. This should be specified in combination with perPage'
      },
      perPage: {
        type: Number,
        default: 10,
        description: 'Pagination per page. Should be specified with total or pageCount'
      },
      total: {
        type: Number,
        default: 0,
        description: 'Can be specified instead of pageCount. The page count in this case will be total/perPage'
      },
      value: {
        type: Number,
        default: 1,
        description: 'Pagination value'
      }
    },
    computed: {
      paginationClass() {
        return `pagination-${this.type}`
      },
      totalPages() {
        if (this.pageCount > 0) return this.pageCount
        if (this.total > 0) {
          return Math.ceil(this.total / this.perPage)
        }
        return 1
      },
      pagesToDisplay() {
        if (this.totalPages > 0 && this.totalPages < this.defaultPagesToDisplay) {
          return this.totalPages
        }
        return this.defaultPagesToDisplay
      },
      minPage() {
        if (this.theCurrentPage >= this.pagesToDisplay) {
          const pagesToAdd = Math.floor(this.pagesToDisplay / 2)
          const newMaxPage = pagesToAdd + this.theCurrentPage
          if (newMaxPage > this.totalPages) {
            return this.totalPages - this.pagesToDisplay + 1
          }
          return this.theCurrentPage - pagesToAdd
        } else {
          return 1
        }
      },
      maxPage() {
        if (this.theCurrentPage >= this.pagesToDisplay) {
          const pagesToAdd = Math.floor(this.pagesToDisplay / 2)
          const newMaxPage = pagesToAdd + this.theCurrentPage
          if (newMaxPage < this.totalPages) {
            return newMaxPage
          } else {
            return this.totalPages
          }
        } else {
          return this.pagesToDisplay
        }
      }
    },
    data() {
      return {
        defaultPagesToDisplay: 5,
        theCurrentPage: this.value
      }
    },
    methods: {
      range(min, max) {
        let arr = []
        for (let i = min; i <= max; i++) {
          arr.push(i)
        }
        return arr
      },
      changePage (item) {
        this.theCurrentPage = item
        this.$emit('input', this.theCurrentPage)
      },
      nextPage () {
        if (this.theCurrentPage < this.totalPages) {
          this.theCurrentPage = this.theCurrentPage + 1
          this.$emit('input', this.theCurrentPage)
        }
      },
      prevPage () {
        if (this.theCurrentPage > 1) {
          this.theCurrentPage = this.theCurrentPage - 1
          this.$emit('input', this.theCurrentPage)
        }
      }
    }
  }
</script>

<style>
.pag {
  margin: 20px 20px;
}
</style>
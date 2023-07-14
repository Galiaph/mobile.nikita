<template>
  <ul class="nav nav-mobile-menu">
    <li class="nav-item" v-if="routeName == 'Map'">
      <form v-if="routeName == 'Map'" role="search" class="navbar-form navbar-left navbar-search-form" @submit.prevent="search">
        <div class="input-group">
          <label for="searchInput"></label>
          <i class="nc-icon nc-zoom-split" style="margin-right: 10px;"></i>
          <input ref="searchinput" type="text" placeholder="Search..." class="form-control" style="color: #e3e3e3" v-model="searchText" @keyup="find" @focus="searchKey(true)" @blur="searchKey(false)">
        </div>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="mkdocs-search-query" ref="searchlist">
          <a v-for="item in searchItem" :key="item" class="dropdown-item" @click="searchClick(item)" href="#">{{ item.bs_name }}</a>
        </div>
      </form>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#pablo" @click.prevent="logOut">
        <span class="no-icon">Log out</span>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'mobile-menu',
  props: {
    baseStationsArr: Object,
    autoClose: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      searchText: '',
      searchItem: [{bs_name: 'No results found'}],
    }
  },
  computed: {
    routeName () {
      const {name} = this.$route
      return this.capitalizeFirstLetter(name)
    }
  },
  methods: {
    capitalizeFirstLetter (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    hideSidebar () {
      if (this.autoClose && this.$sidebar && this.$sidebar.showSidebar === true) {
        this.$sidebar.displaySidebar(false)
      }
    },
    async logOut () {
      try {
        await this.$store.dispatch('logout')
        this.$router.push('/')
      } catch (err) {
        this.$store.commit('auth_error')
      }
    },
    async searchKey (state) {
        if (state) {
          let search = this.$refs.searchlist
          let rect = this.$refs.searchinput.getBoundingClientRect()       
          search.style = 'top: ' + (rect.top + 30) +'px;'
          search.classList.add('show')
        } else {
          await setTimeout(() => {
            this.$refs.searchlist.classList.remove('show')
          }, 100)
        }
      },
      find () {
        if (this.searchText.length != 0) {
          this.searchItem = this.baseStationsArr.filter(item => {
            return item.bs_name.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase())
          }).slice(0, 5)
        } else {
          this.searchItem = [{bs_name: 'No results found'}]
        }
      },
      searchClick (item) {
        if (item.bs_name === 'No results found') return

        this.searchText = item.bs_name
        this.search()
        this.hideSidebar()
      },
      search () {
        this.$emit('searchBase', this.searchText)
      }
  }
}
</script>

<style>
</style>
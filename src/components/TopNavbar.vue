<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <a class="navbar-brand">{{ routeName }}</a>
      <button type="button"
              class="navbar-toggler navbar-toggler-right"
              :class="{toggled: $sidebar.showSidebar}"
              aria-controls="navigation-index"
              aria-expanded="false"
              aria-label="Toggle navigation"
              @click="toggleSidebar">
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="nav navbar-nav mr-auto">
          <form v-if="routeName == 'Map'" role="search" class="navbar-form navbar-left navbar-search-form" @submit.prevent="search">
            <div class="input-group">
              <label for="searchInput"></label>
              <i class="nc-icon nc-zoom-split" style="margin-right: 10px;"></i>
              <input ref="searchinput" type="text" placeholder="Search..." class="form-control" v-model="searchText" @keyup="find" @focus="searchKey(true)" @blur="searchKey(false)">
            </div>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="mkdocs-search-query" ref="searchlist">
              <a v-for="item in searchItem" :key="item" class="dropdown-item" @click="searchClick(item)" href="#">{{ item.bs_name }}</a>
            </div>
          </form>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="logOut">
              Log out
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
// import BaseDropdown from './BaseDropdown.vue'

export default {
  components: {
    // BaseDropdown
  },
  props: {
    baseStationsArr: Object
  },
  computed: {
    routeName () {
      const {name} = this.$route
      return this.capitalizeFirstLetter(name)
    }
  },
  data () {
    return {
      searchText: '',
      searchItem: [{ bs_name: 'No results found' }],
    }
  },
  methods: {
    capitalizeFirstLetter (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    toggleSidebar () {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
    },
    hideSidebar () {
      this.$sidebar.displaySidebar(false)
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
      },
      search () {
        this.$emit('searchBase', this.searchText)
      }
  }
}

</script>

<style>
</style>

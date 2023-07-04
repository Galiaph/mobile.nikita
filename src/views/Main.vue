<template>
  <div class="wrapper">
    <side-bar title="САЛЬДОМЕТР">
      <sidebar-link to="/view/dashboard">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/view/map">
        <i class="nc-icon nc-pin-3"></i>
        <p>Map</p>
      </sidebar-link>
    </side-bar>
    <div class="main-panel">
      <top-navbar/>
      <dashboard-content :baseStationsArr="baseStationsGroup" @clickButtonM="clickButtonM" />
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SidebarPlugin/SideBar.vue'
import SidebarLink from '@/components/SidebarPlugin/SidebarLink.vue'
import DashboardContent from '@/components/ContentItem.vue'
import TopNavbar from '@/components/TopNavbar.vue'
import axios from 'axios'

export default {
  name: 'MainApp',
  components: {
    SideBar,
    SidebarLink,
    DashboardContent,
    TopNavbar
  },
  data: () => ({
    baseStationsGroup: []
  }),
  methods: {
    toggleSidebar () {
      if (this.$sidebar.showSidebar) {
        console.log('TopNavbar -> toggleSidebar')
        this.$sidebar.displaySidebar(false)
      }
    },
    clickButtonM() {
      this.getBaseStationById(1)
    },
    async getBaseStationById (id) {
        const resp = await axios.get(`http://151.0.10.245:5001/bs/${id}`)
        this.baseStationsGroup = this.baseStationsGroup.concat(resp.data.filter(item => {
          item.show = true
          if (item.bs_status == 1) {
            item.bs_comment += '\nstandart: '
            if (item.bs_2g)
              item.bs_comment += '2G '
            if (item.bs_3g)
              item.bs_comment += '3G '
            if (item.bs_4g)
              item.bs_comment += '4G '
          }
          return this.baseStationsGroup['bs_name'] === item.bs_name ? false : true
        }))
      },
  },
  async mounted () {
    this.getBaseStationById(1)
  }
}
</script>

<style>
/* #app {
  width: 100%;
}
.cnt {
  width: 100%;
  height: 93%;
  position: absolute;
}
.ymap-container {
  height: 100%;
}
.dropdown-con {
  position: absolute;
}
.dropdown-menu-con {
  display: block;
} */
</style>
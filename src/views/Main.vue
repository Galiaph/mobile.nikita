<template>
  <div class="wrapper">
    <side-bar title="САЛЬДОМЕТР">
      <mobile-menu name="content" :baseStationsArr="baseStationsGroup" @searchBase="searchBase($event)"/>
      <sidebar-link to="/view/dashboard">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/view/building">
        <i class="nc-icon nc-settings-90"></i>
        <p>Стройка</p>
      </sidebar-link>
      <sidebar-link to="/view/alarm">
        <i class="nc-icon nc-preferences-circle-rotate"></i>
        <p>АВР БС</p>
      </sidebar-link>
      <sidebar-link to="/view/faiberalarm">
        <i class="nc-icon nc-vector"></i>
        <p>Обрывы ВОЛС</p>
      </sidebar-link>
      <sidebar-link to="/view/map">
        <i class="nc-icon nc-pin-3"></i>
        <p>Карта</p>
      </sidebar-link>
    </side-bar>
    <div class="main-panel">
      <top-navbar :baseStationsArr="baseStationsGroup" @searchBase="searchBase($event)" />
      <dashboard-content 
        :baseStationsArr="baseStationsGroup"
        @clickButtonM="clickButtonM($event)"
        @clickButtonK="clickButtonK($event)"
        @clickButtonP="clickButtonP($event)"
        @click="toggleSidebar"
        :coords="coords"
        :zoom="zoom" />
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SidebarPlugin/SideBar.vue'
import SidebarLink from '@/components/SidebarPlugin/SidebarLink.vue'
import DashboardContent from '@/components/ContentItem.vue'
import MobileMenu from '@/components/MobileMenu.vue'
import TopNavbar from '@/components/TopNavbar.vue'
import axios from 'axios'
// import BaseDropdown from '@/components/BaseDropdown.vue'

export default {
  name: 'MainApp',
  components: {
    SideBar,
    SidebarLink,
    DashboardContent,
    TopNavbar,
    MobileMenu,
    // BaseDropdown
  },
  data: () => ({
    baseStationsGroup: [],
    coords: [46.63, 32.62],
    zoom: 12
  }),
  methods: {
    toggleSidebar () {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false)
      }
    },
    clickButtonM(event) {
      if (event) {
        this.getBaseStationById(1)
      } else {
        this.delBaseStationById(1)
      }
    },
    clickButtonK(event) {
      if (event) {
        this.getBaseStationById(2)
      } else {
        this.delBaseStationById(2)
      }
    },
    clickButtonP(event) {
      if (event) {
        this.getBaseStationById(3)
      } else {
        this.delBaseStationById(3)
      }
    },
    async getBaseStationById (id) {
        const resp = await axios.get(`http://151.0.10.245:5001/bs/${id}`)
        this.baseStationsGroup = this.baseStationsGroup.concat(resp.data.filter(item => {
          item.show = true
          if (item.station == null) {
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
      delBaseStationById (id) {
        this.baseStationsGroup = this.baseStationsGroup.filter(item => item.bs_operator != id)
      },
      searchBase (event) {
        const val = this.baseStationsGroup.filter(item => item.bs_name == event)[0]

        if (val) {
          this.coords = [val.bs_latitude, val.bs_longitude]
          this.zoom = 17
        }
      },
  },
  async mounted () {
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
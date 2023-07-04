<template>
  <div class="wrapper">
    <side-bar>
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
      <dashboard-content />
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SidebarPlugin/SideBar.vue'
import SidebarLink from '@/components/SidebarPlugin/SidebarLink.vue'
import DashboardContent from '@/components/ContentItem.vue'
import TopNavbar from '@/components/TopNavbar.vue'
// import axios from 'axios'

export default {
  name: 'App',
  components: {
    SideBar,
    SidebarLink,
    DashboardContent,
    TopNavbar
  },
  data: () => ({
  }),
  methods: {
    toggleSidebar () {
      if (this.$sidebar.showSidebar) {
        console.log('TopNavbar -> toggleSidebar')
        this.$sidebar.displaySidebar(false)
      }
    }
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
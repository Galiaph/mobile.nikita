<template>
  <div class="wrapper">
    <side-bar>
      <sidebar-link to="/view/dashboard">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/view/profile">
        <i class="nc-icon nc-circle-09"></i>
        <p>User Profile</p>
      </sidebar-link>
      <sidebar-link to="/view/map">
        <i class="nc-icon nc-pin-3"></i>
        <p>Maps</p>
      </sidebar-link>
    </side-bar>
    <div class="main-panel">
      <dashboard-content />
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SidebarPlugin/SideBar.vue'
import SidebarLink from '@/components/SidebarPlugin/SidebarLink.vue'
import DashboardContent from '@/components/ContentItem.vue'
// import axios from 'axios'

export default {
  name: 'App',
  components: {
    SideBar,
    SidebarLink,
    DashboardContent
  },
  data: () => ({
  }),
  methods: {
    // toggleSidebar () {
    //   if (this.$sidebar.showSidebar) {
    //     this.$sidebar.displaySidebar(false)
    //   }
    // }
  },
    mounted: async function () {
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
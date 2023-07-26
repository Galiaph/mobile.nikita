<template>
  <div class="sidebar"
       :style="sidebarStyle"
       :data-color="backgroundColor"
       :data-image="backgroundImage">
    <div class="sidebar-wrapper">
      <div class="logo">
        <a class="logo-mini">
            <div class="logo-img">
                <img src="/img/logo.jpg" alt="logo">
            </div>
        </a>
         <a class="simple-text logo-normal">
          {{title}}
         </a>
      </div>

      <slot name="content"></slot>
      <ul class="nav nav-main__links">
        <!--By default vue-router adds an active class to each route link. This way the links are colored when clicked-->
        <slot>
          <sidebar-link v-for="(link,index) in sidebarLinks"
                        :key="link.name + index"
                        :to="link.path"
                        :link="link">
            <i :class="link.icon"></i>
            <p>{{link.name}}</p>
          </sidebar-link>
        </slot>
      </ul>
      <ul class="nav nav-bottom" v-if="$slots['bottom-links']">
        <slot name="bottom-links"></slot>
      </ul>
    </div>
  </div>
</template>

<script>
import SidebarLink from './SidebarLink.vue'

export default {
  components: {
    SidebarLink
  },
  props: {
    title: {
      type: String,
      default: 'Title'
    },
    backgroundColor: {
      type: String,
      default: 'black',
      validator: (value) => {
        let acceptedValues = ['', 'blue', 'azure', 'green', 'orange', 'red', 'purple', 'black']
        return acceptedValues.indexOf(value) !== -1
      }
    },
    backgroundImage: {
      type: String,
      default: '/img/sidebar.jpg'
    },
    activeColor: {
      type: String,
      default: 'success',
      validator: (value) => {
        let acceptedValues = ['primary', 'info', 'success', 'warning', 'danger']
        return acceptedValues.indexOf(value) !== -1
      }
    },
    sidebarLinks: {
      type: Array,
      default: () => []
    },
    autoClose: {
      type: Boolean,
      default: true
    }
  },
  provide () {
    return {
      autoClose: this.autoClose
    }
  },
  computed: {
    sidebarStyle () {
      return {
        backgroundImage: `url(${this.backgroundImage})`
      }
    }
  }
}
</script>

<style>
.sidebar .nav .nav-item .nav-link i {
    font-size: 28px;
    margin-right: 15px;
    width: 30px;
    text-align: left;
    vertical-align: middle;
    float: left
}
.sidebar .nav .nav-item .nav-link:hover {
    background: hsla(0,0%,100%,.13);
    opacity: 1
}
</style>

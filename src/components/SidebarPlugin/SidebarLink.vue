<template>
  <li v-bind="$attrs" class="nav-item" @click="hideSidebar">
    <router-link class="nav-link" v-bind="$attrs">
      <slot>
        <i v-if="link.icon" :class="link.icon"></i>
        <p>{{link.name}}</p>
      </slot>
    </router-link>
  </li>
</template>
<script>
  export default {
    inheritAttrs: false,
    inject: {
      autoClose: {
        default: true
      }
    },
    props: {
      link: {
        type: [String, Object],
        default: () => {
          return {
            name: '',
            path: '',
            icon: ''
          }
        }
      },
      tag: {
        type: String,
        default: 'router-link'
      }
    },
    methods: {
      // <component :is="tag"
      //        @click="hideSidebar"
      // hideSidebar () {
      //   if (this.autoClose && this.$sidebar && this.$sidebar.showSidebar === true) {
      //     this.$sidebar.displaySidebar(false)
      //   }
      // }
    }
  }
</script>
<style>
</style>

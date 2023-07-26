<template>
  <li class="dropdown nav-item"
      :class="{show: isOpen}"
      aria-haspopup="true"
      :aria-expanded="isOpen"
      @click="toggleDropDown"
      v-click-outside="closeDropDown">

    <a class="nav-link dropdown-toggle"
       data-toggle="dropdown">
      <slot name="title">
        <i :class="icon"></i>
        <span class="no-icon">{{title}}</span>
      </slot>
    </a>
    <div class="dropdown-menu show" v-show="isOpen">
      <slot></slot>
    </div>
  </li>
</template>
<script>
  export default {
    name: 'BaseDropdown',
    props: {
      title: String,
      icon: String
    },
    data () {
      return {
        isOpen: false
      }
    },
    methods: {
      toggleDropDown () {
        this.isOpen = !this.isOpen
        this.$emit('change', this.isOpen)
      },
      closeDropDown () {
        this.isOpen = false
        this.$emit('change', this.isOpen)
      }
    }
  }
</script>
<style scoped>
  .dropdown .dropdown-toggle{
    cursor: pointer;
  }
</style>

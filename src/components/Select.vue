<template>
  <div class="el-select select-primary el-select--large">
    <div class="el-input el-input--large el-input--suffix">
      <input v-model="selectInput" type="text" readonly="readonly" autocomplete="off" :placeholder="placeholder" class="el-input__inner" @click.prevent="toggleDropDown">
        <span class="el-input__suffix">
          <span class="el-input__suffix-inner">
            <i class="el-select__caret el-input__icon el-icon-arrow-up" :class="{ 'is-reverse': isOpen }" @click.prevent="toggleDropDown"></i>
          </span>
        </span>
    </div>
    <div class="el-select-dropdown el-popper" v-show="isOpen" style="min-width: 202px; transform-origin: center top; z-index: 2021; position: absolute; left: 0px;" x-placement="bottom-start">
      <div class="el-scrollbar">
        <div class="el-select-dropdown__wrap el-scrollbar__wrap el-scrollbar__wrap--hidden-default">
          <ul class="el-scrollbar__view el-select-dropdown__list">
            <li v-for="item in itemList" :key="item" @click="closeDropDown(item)" :class="{ 'selected': item.isSelected }" class="el-select-dropdown__item select-danger">
              <span>{{ item.name }}</span>
            </li>
          </ul>
        </div>
        <div class="el-scrollbar__bar is-horizontal">
          <div class="el-scrollbar__thumb" style="transform: translateX(0%);"></div>
        </div>
        <div class="el-scrollbar__bar is-vertical">
          <div class="el-scrollbar__thumb" style="transform: translateY(0%);"></div>
        </div>
      </div>
      <div x-arrow="" class="popper__arrow" style="left: 35px;"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectInput',
  props: {
    placeholder: {
      type: String,
      default: 'Single Select'
    },
    itemList: {
      type: Array
    },
    startSelect: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      isOpen: false,
      select: null,
      selectInput: ''
    }
  },
  methods: {
    toggleDropDown () {
      this.isOpen = !this.isOpen
      // this.$emit('change', this.isOpen)
    },
    closeDropDown (e) {
      if (this.select)
        this.select.isSelected = false

      e.isSelected = true
      this.select = e
      this.isOpen = false
      this.selectInput = this.select.name
      this.$emit('change', e)
    }
  },
  created () {
    this.select = this.itemList[this.startSelect]
    this.selectInput = this.select.name
  }
}
</script>

<style>

</style>
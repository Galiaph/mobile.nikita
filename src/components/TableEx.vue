<template>
  <div class="card" :class="[type && `card-${type}`]">
    <div class="card-content row">
      <div class="col-sm-6" v-if="$slots.counter">
        <slot name="counter">
        </slot>
      </div>
      <div class="col-sm-6" v-if="$slots.search">
        <slot name="search">
        </slot>
      </div>
    </div>
    <table class="table">
      <thead>
        <slot name="columns">
          <tr>
            <th v-for="column in columns" :key="column">{{column['name']}}</th>
          </tr>
        </slot>
      </thead>
      <tbody>
      <tr v-for="(item, index) in data" :key="index">
        <slot :row="item">
          <td v-for="column in columns" :key="column" >
            {{ itemValue(item, column) }}
            </td>
        </slot>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'l-table2',
  props: {
    columns: Array,
    data: Array,
    type: {
      type: String,
      description: "Card type (e.g primary/danger etc)"
    }
  },
  methods: {
    hasValue (item, column) {
      return item[column.toLowerCase()] !== 'undefined'
    },
    itemValue (item, column) {
      return item[column['data'].toLowerCase()]
    }
  }
}
</script>

<style>
</style>

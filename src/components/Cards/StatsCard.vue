<template>
  <card class="card-stats">
    <template #default>
      <div class="row">
        <div class="col-5">
          <div class="icon-big">
              <slot name="header"></slot>
          </div>
        </div>
        <div class="col-7">
          <div class="numbers">
            <slot name="content"></slot>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="stats">
        <hr/>
       <slot name="footer"></slot>
      </div>
    </template>
  </card>
</template>

<script>
import Card from './Card.vue'

export default {
  name: 'stats-card',
  components: {
    Card
  }
}
</script>

<style>

</style>

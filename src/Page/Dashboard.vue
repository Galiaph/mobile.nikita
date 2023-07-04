<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-3 col-md-6">
          <stats-card>
            <template #header>
              <i class="nc-icon nc-settings-90 text-success"></i>
            </template>
            <template #content>
              <p class="card-category">Стройка завершена</p>
              <h4 class="card-title">30%</h4>
            </template>
            <template #footer>
              <hr/>
              <font-awesome-icon icon="fa fa-refresh"/>Обновлено вчера
            </template>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <template #header>
              <i class="nc-icon nc-vector text-danger"></i>
            </template>
            <template #content>
              <p class="card-category">Обрывов магистралей</p>
              <h4 class="card-title">10</h4>
            </template>
            <template #footer>
              <hr/>
              <font-awesome-icon icon="fa-regular fa-calendar"/>За последнюю неделю
            </template>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <template #header>
              <i class="nc-icon nc-favourite-28 text-primary"></i>
            </template>
            <template #content>
              <p class="card-category">Поднятых базовых станций</p>
              <h4 class="card-title">+4</h4>
            </template>
            <template #footer>
              <hr/>
              <font-awesome-icon icon="fa-regular fa-clock"/>За сегодня
            </template>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <template #header>
              <i class="nc-icon nc-fav-remove text-danger"></i>
            </template>
            <template #content>
              <p class="card-category">Не работающих базовых станций</p>
              <h4 class="card-title">83</h4>
            </template>
            <template #footer>
              <hr/>
              <font-awesome-icon icon="fa fa-refresh"/>Обновлено вчера
            </template>
          </stats-card>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <chart-card>
            <template #header>
              <h4 class="card-title">Динамика лежащих сайтов</h4>
              <p class="card-category">Количество по полю лежат</p>
            </template>
            <template #footer>
              <hr>
              <div class="stats">
                <font-awesome-icon icon="fa-regular fa-calendar"/>За последние 12 дней
              </div>
            </template>
          </chart-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StatsCard from '@/components/Cards/StatsCard.vue'
import ChartCard from '@/components/Cards/ChartCard.vue'

export default {
  // eslint-disable-next-line
  name: 'Dashboard',
  components: {
    StatsCard,
    ChartCard
  },
}
</script>

<style>
div .stats svg {
  margin-right: 4px;
}
</style>
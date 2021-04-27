<template>
  <div class="index">
    <div class="card">
      <card></card>
      <charts></charts>
    </div>
  </div>
</template>

<script>
import card from '@/components/card.vue';
import charts from '@/components/charts.vue';

export default {
  name: 'index',
  components: {
    card,
    charts,
  },
};
</script>

<style scoped>

</style>

<template>
  <section class="section" v-show="!empty">
    <v-divider></v-divider>
    <h2 class="section-title">{{ title }}</h2>
    <div class="section-content">
      <TaskCard
        v-for="card in cards"
        :key="card.title"
        :card="card"
        :editable="editable"
      />
    </div>
  </section>
</template>

<script>
import TaskCard from "./TaskCard.vue";

export default {
  components: {
    TaskCard
  },
  props: {
    title: String,
    cards: Array,
    editable: Boolean
  },
  computed: {
    empty: function() {
      return this.cards.filter(c => !c.empty).length === 0;
    }
  }
};
</script>

<style scoped>
.section {
  margin-bottom: 1rem;
}
.section-title {
  margin-top: 1rem;
}
.section-content {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
}
.v-card {
  margin: 1rem;
  width: 20em;
}
</style>

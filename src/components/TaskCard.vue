<template>
  <v-card>
    <div class="item-card-header">
      <img
        :class="['item', { editable }, { completed }]"
        :src="getSrc()"
        :alt="icon"
        :title="icon"
      />
      <span class="subheading" :class="{ 'green--text': completed }">
        {{ title }}
      </span>
      <v-progress-circular
        :value="100 * completed"
        :rotate="270"
        :class="{ 'green--text': completed }"
      >
        <v-icon v-if="completed" :class="[{ 'green--text': completed }]">
          done
        </v-icon>
      </v-progress-circular>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    card: Object,
    editable: Boolean
  },
  data() {
    return {
      title: this.card.title,
      icon: this.card.icon,
      items: this.card.items,
      completionCriteria: this.card.criteria,
      completed: 1
    };
  },
  methods: {
    getSrc() {
      return require(`@/assets/img/${this.src}`);
    }
  },
  computed: {
    src: function() {
      return this.icon.toLowerCase().replace(/ /g, "_") + ".png";
    }
  },
  mounted: function() {
    let matchCount;
    if (this.completionCriteria == "all") {
      matchCount = this.items.length;
    } else {
      matchCount = parseInt(this.completionCriteria.substring(4));
    }

    let matches = 0;
    for (const item of this.items) {
      if (this.$store.getters.isUnlocked({
          editable: this.editable,
          item: item
        })) {
        matches++;
      }
      if (matches >= matchCount) {
        this.completed = 1;
        return;
      }
    }
    this.completed = 0;
  }
};
</script>

<style scoped>
.item-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-weight: 400;
}
.grid-horizontal {
  display: inline-grid;
  grid-gap: 10px;
  grid-auto-flow: row;
  grid-template-rows: repeat(auto-fit, 1fr);
}
.grid-h2 {
  grid-template-columns: repeat(2, 1fr);
}
</style>

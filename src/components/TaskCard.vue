<template>
  <v-card v-on="editable ? { click } : {}">
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
    <div class="grid-horizontal grid-h2">
      <TaskTag
        v-for="tag in tags"
        :key="tag.id"
        :tag="tag"
        :editable="editable"
      />
    </div>
  </v-card>
</template>

<script>
export default {
  components: {
    TaskTag: () => import("./TaskTag.vue")
  },
  props: {
    card: Object,
    editable: Boolean
  },
  data() {
    return {
      title: this.card.title,
      icon: this.card.icon,
      tags: this.card.tags,
      completed: 1
    };
  },
  methods: {
    click() {
      if (!this.completed) {
        this.completed = 1;
      } else {
        this.completed = 0;
      }
    },
    getSrc() {
      return require(`@/assets/img/${this.src}`);
    }
  },
  computed: {
    src: function() {
      return this.icon.toLowerCase().replace(/ /g, "_") + ".png";
    }
  // }, TODO fix this to work with new completion logic
  // mounted: function() {
  //   this.completed = this.$store.getters.isUnlocked({
  //         editable: this.editable,
  //         item: this.item.id
  //       }
  //     );
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

<template>
  <v-menu left :close-on-content-click="false" offset-y>
    <v-btn slot="activator" icon>
      <v-icon>settings</v-icon>
    </v-btn>
    <v-list class="menu-list">
      <v-list-tile>
        <v-switch
          v-model="onlyUnlocked"
          label="Hide unlocked items"
          color="primary"
          :hide-details="true"
        ></v-switch>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  computed: {
    onlyUnlocked: {
      get() {
        return this.$store.getters.hideUnlocked;
      },
      set() {
        this.$store.dispatch("toggleUnlocked");
      }
    }
  }
};
</script>

<style scoped>
.menu-list {
  padding: 0 0 1.25em 0;
}
</style>

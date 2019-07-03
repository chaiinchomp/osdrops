<template>
  <v-chip small=true>
      {{ name }}
  </v-chip>
</template>

<script>
export default {
  props: {
    tag: String,
    editable: Boolean
  },
  data() {
    return {
      id: this.tag.id,
      name: this.tag.name
    };
  }
};
</script>

<style scoped>
@supports not (grid-auto-flow: row) {
  .item {
    margin: 0.5rem;
  }
}
</style>

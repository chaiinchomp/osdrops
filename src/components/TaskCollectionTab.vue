<template>
  <div class="text-xs-center">
    <v-container>
      <template v-if="!editable && rsn !== ''">
        <h2 class="primary--text">{{ rsn }}</h2>
      </template>
      <TaskSection
        v-for="(section, title) in collection"
        :title="title"
        :cards="section"
        :editable="editable"
        :key="title"
      />
      <template v-if="editable">
        <DialogBinary
          :cardText="'Remove all items?'"
          :btnText="'Remove all items'"
          :action="'Remove'"
          :snackText="'All items removed'"
          @confirm="clearStorage"
        />
        <DialogShare />
      </template>
      <template v-else>
        <DialogBinary
          :cardText="'Replace your log with this one?'"
          :btnText="'Replace Log'"
          :action="'Replace'"
          :snackText="'Log Replaced'"
          @confirm="replace"
        />
      </template>
    </v-container>
    <BackToTop />
  </div>
</template>

<script>
import TaskSection from "./TaskSection.vue";
import BackToTop from "./BackToTop.vue";
import DialogBinary from "./DialogBinary.vue";
import DialogShare from "./DialogShare.vue";
import { mapActions } from "vuex";

export default {
  components: {
    DialogBinary,
    DialogShare,
    TaskSection,
    BackToTop
  },
  props: {
    collection: Object,
    rsn: String,
    editable: Boolean
  },
  computed: {
    empty: function() {
      return this.cards.filter(c => !c.empty).length === 0;
    }
  },
  methods: {
    ...mapActions(["clear", "addItem", "setSessionData", "replaceLog"]),
    clearStorage: function() {
      this.clear();
    },
    replace: function() {
      this.replaceLog();
    }
  }
};
</script>

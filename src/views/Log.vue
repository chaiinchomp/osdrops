<template>
  <div class="text-xs-center">
    <v-container>
      <template v-if="!editable && rsn !== ''">
        <h2 class="primary--text">{{ rsn }} Collection Log</h2>
      </template>
      <ItemSearch />
      <template v-if="compact">
        <ItemSection :cards="cards" :editable="editable" :compact="compact" />
      </template>
      <template v-else>
          <ItemSection
            v-for="(section, title) in diariesData"
            :title="title"
            :cards="section"
            :editable="editable"
            :key="title"
          />
          <ItemSection
            v-for="(section, title) in capesData"
            :title="title"
            :cards="section"
            :editable="editable"
            :key="title"
          />
          <ItemSection
            v-for="(section, title) in otherData"
            :title="title"
            :cards="section"
            :editable="editable"
            :key="title"
          />
          <ItemSection
            v-for="(section, title) in logBosses"
            :title="title"
            :cards="section"
            :editable="editable"
            :key="title"
          />
          <ItemSection
            v-for="(section, title) in logClues"
            :title="title"
            :cards="section"
            :editable="editable"
            :key="title"
          />
          <ItemSection
            v-for="(section, title) in logMinigames"
            :title="title"
            :cards="section"
            :editable="editable"
            :key="title"
          />
          <ItemSection
            v-for="(section, title) in logRaids"
            :title="title"
            :cards="section"
            :editable="editable"
            :key="title"
          />
          <ItemSection
            v-for="(section, title) in logOther"
            :title="title"
            :cards="section"
            :editable="editable"
            :key="title"
          />
      </template>
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
import ItemSection from "@/components/ItemSection.vue";
import ItemSearch from "@/components/ItemSearch.vue";
import BackToTop from "@/components/BackToTop.vue";
import DialogBinary from "@/components/DialogBinary.vue";
import DialogShare from "@/components/DialogShare.vue";
import capesData from "@/assets/json/capes-data.json";
import diariesData from "@/assets/json/diaries-data.json";
import otherData from "@/assets/json/other-achievements-data.json";
import logBosses from "@/assets/json/log-bosses.json";
import logClues from "@/assets/json/log-clues.json";
import logMinigames from "@/assets/json/log-minigames.json";
import logOther from "@/assets/json/log-other.json";
import logRaids from "@/assets/json/log-raids.json";
import { mapActions } from "vuex";

export default {
  components: {
    DialogBinary,
    DialogShare,
    ItemSection,
    ItemSearch,
    BackToTop
  },
  data: () => ({
    capesData: capesData,
    diariesData: diariesData,
    otherData: otherData,
    logBosses: logBosses,
    logClues: logClues,
    logMinigames: logMinigames,
    logOther: logOther,
    logRaids: logRaids,
    rsn: "",
    editable: !window.location.href.includes("/log"),
    cards: []
  }),
  methods: {
    ...mapActions(["clear", "addItem", "setSessionData", "replaceLog"]),
    clearStorage: function() {
      this.clear();
    },
    replace: function() {
      this.replaceLog();
    }
  },
  computed: {
    compact: function() {
      return this.$store.getters.isCompactTheme;
    }
  },
  created: function() {
    this.dataSets = [
        capesData, diariesData
    ]

    this.cards = []
    for (const itemData of this.dataSets) {
        this.cards.concat.apply([], Object.values(itemData));
    }
    if (!this.editable) {
      if (this.$route.query.items) {
        let tempItems = {};
        const items = this.$route.query.items.split(".");
        for (const key of items) {
          tempItems[key] = "";
        }

        this.setSessionData({
          items: tempItems
        });
      }
      if (this.$route.query.rsn) {
        this.rsn = this.$route.query.rsn.endsWith("s")
          ? this.$route.query.rsn + "'"
          : this.$route.query.rsn + "'s";
      }
      window.history.pushState(
        {},
        document.title,
        window.location.href.split("?")[0]
      );
    }
  }
};
</script>

<style>
.item {
  opacity: 0.3;
}
.unlocked {
  opacity: 1;
}
</style>

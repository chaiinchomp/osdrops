<template>
  <div class="text-xs-center">
    <v-container>
      <template v-if="!editable && rsn !== ''">
        <h2 class="main-color--text--darker">{{ rsn }} Collection Log</h2>
      </template>
      <ItemSearch />
      <ItemSection
        v-for="(section, title) in diariesData"
        :title="title"
        :cards="section"
        :editable="editable"
        :key="title"
      />
      <ItemSection
        v-for="(section, title) in questsData"
        :title="title"
        :cards="section"
        :editable="editable"
        :key="title"
      />
      <ItemSection
        v-for="(section, title) in combatData"
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
        v-for="(section, title) in collectiblesData"
        :title="title"
        :cards="section"
        :editable="editable"
        :key="title"
      />
      <ItemSection
        v-for="(section, title) in constructionData"
        :title="title"
        :cards="section"
        :editable="editable"
        :key="title"
      />
      <ItemSection
        v-for="(section, title) in jewelry"
        :title="title"
        :cards="section"
        :editable="editable"
        :key="title"
      />
      <ItemSection
        v-for="(section, title) in minigamesData"
        :title="title"
        :cards="section"
        :editable="editable"
        :key="title"
      />
      <ItemSection
        v-for="(section, title) in petsData"
        :title="title"
        :cards="section"
        :editable="editable"
        :key="title"
      />
      <ClueSection
        v-for="(section, title) in cluesData"
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
import ItemSection from "@/components/ItemSection.vue";
import ClueSection from "@/components/ClueSection.vue";
import ItemSearch from "@/components/ItemSearch.vue";
import BackToTop from "@/components/BackToTop.vue";
import DialogBinary from "@/components/DialogBinary.vue";
import DialogShare from "@/components/DialogShare.vue";
import capesData from "@/assets/json/capes-data.json";
import collectiblesData from "@/assets/json/collectibles-data.json";
import combatData from "@/assets/json/combat-data.json";
import constructionData from "@/assets/json/construction-data.json";
import diariesData from "@/assets/json/diaries-data.json";
import jewelryData from "@/assets/json/jewelry-data.json";
import minigamesData from "@/assets/json/minigames-data.json";
import petsData from "@/assets/json/pets-data.json";
import questsData from "@/assets/json/quests-data.json";
import cluesData from "@/assets/json/clues-data.json";
import { mapActions } from "vuex";

export default {
  components: {
    DialogBinary,
    DialogShare,
    ItemSection,
    ClueSection,
    ItemSearch,
    BackToTop
  },
  data: () => ({
    capesData: capesData,
    collectiblesData: collectiblesData,
    combatData: combatData,
    constructionData: constructionData,
    diariesData: diariesData,
    jewelryData: jewelryData,
    minigamesData: minigamesData,
    petsData: petsData,
    cluesData: cluesData,
    questsData:questsData,
    rsn: "",
    editable: !window.location.href.includes("/log")
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
  created: function() {
    if (!this.editable) {
      if (this.$route.query.items && this.$route.query.clues) {
        let tempItems = {};
        const items = this.$route.query.items.split(".");
        for (const key of items) {
          tempItems[key] = "";
        }

        const tempClues = {};
        const paramClues = this.$route.query.clues.split(".");
        const diff = ["Easy", "Medium", "Hard", "Elite", "Master"];
        diff.forEach((key, i) => {
          tempClues[key] = paramClues[i];
        });

        this.setSessionData({
          items: tempItems,
          clues: tempClues
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

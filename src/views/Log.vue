<template>
  <div>
    <tabs :options="{ defaultTabHash: 'account' }">
      <tab id="account" name="Account">
        <div class="text-xs-center">
            <v-container>
              <template v-if="!editable && rsn !== ''">
                <h2 class="primary--text">{{ rsn }}</h2>
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
      </tab>
      <tab id="collection" name="Collection Log">
        <div class="text-xs-center">
            <v-container>
              <template v-if="!editable && rsn !== ''">
                <h2 class="primary--text">{{ rsn }} Collection Log</h2>
              </template>
              <ItemSearch />
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
      </tab>
      <tab id="other" name="Tasks">
        Coming soon !
      </tab>
    </tabs>
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
.tabs-component {
  margin: 4em 0;
}
.tabs-component-tabs {
  border: 0;
  border-radius: 6px;
  margin-bottom: 5px;
}
@media (min-width: 700px) {
  .tabs-component-tabs {
    border: 0;
    align-items: stretch;
    display: flex;
    justify-content: flex-start;
    margin-bottom: -1px;
  }
}
.tabs-component-tab {
  color: #999;
  font-size: 14px;
  font-weight: 600;
  margin-right: 0;
  list-style: none;
  border-bottom: none;
}
.tabs-component-tab:hover {
  color: #666;
}
.tabs-component-tab.is-active {
  color: #fff;
}
.tabs-component-tab.is-disabled * {
  color: #cdcdcd;
  cursor: not-allowed !important;
}
@media (min-width: 700px) {
  .tabs-component-tab {
    background-color: #222;
    border: 0;
    border-radius: 3px 3px 0 0;
    margin-right: .5em;
    transform: translateY(2px);
    transition: transform .3s ease;
  }
  .tabs-component-tab.is-active {
    border-bottom: 0;
    z-index: 2;
    transform: translateY(0);
  }
}
.tabs-component-tab-a {
  align-items: center;
  color: inherit;
  display: flex;
  padding: .75em 1em;
  text-decoration: none;
}
.tabs-component-panels {
  padding: 4em 0;
}
@media (min-width: 700px) {
  .tabs-component-panels {
    border-top-left-radius: 0;
    background-color: #222;
    border: 0;
    border-radius: 6px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .05);
    padding: 4em 2em;
  }
}
</style>

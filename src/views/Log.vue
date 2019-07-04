<template>
  <div>
    <tabs :options="{ defaultTabHash: 'account' }">
      <tab id="account" name="Account">
        <ItemCollectionTab
          :collection="logAccount"
          :editable="editable"
          :rsn="rsn"
        />
      </tab>
      <tab id="bosses" name="Bosses">
        <ItemCollectionTab
          :collection="logBosses"
          :editable="editable"
          :rsn="rsn"
        />
      </tab>
      <tab id="raids" name="Raids">
        <ItemCollectionTab
          :collection="logRaids"
          :editable="editable"
          :rsn="rsn"
        />
      </tab>
      <tab id="clues" name="Clues">
        <ItemCollectionTab
          :collection="logClues"
          :editable="editable"
          :rsn="rsn"
        />
      </tab>
      <tab id="minigames" name="Minigames">
        <ItemCollectionTab
          :collection="logMinigames"
          :editable="editable"
          :rsn="rsn"
        />
      </tab>
      <tab id="other" name="Other">
        <ItemCollectionTab
          :collection="logOther"
          :editable="editable"
          :rsn="rsn"
        />
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
import ItemCollectionTab from "@/components/ItemCollectionTab.vue";
import logAccount from "@/assets/json/account-data.json";
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
    BackToTop,
    ItemCollectionTab
  },
  data: () => ({
    logAccount: logAccount,
    logBosses: logBosses,
    logClues: logClues,
    logMinigames: logMinigames,
    logOther: logOther,
    logRaids: logRaids,
    rsn: "",
    editable: !window.location.href.includes("/log"),
  }),
  created: function() {
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
.completed {
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
    margin-right: 0.5em;
    transform: translateY(2px);
    transition: transform 0.3s ease;
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
  padding: 0.75em 1em;
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
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
    padding: 4em 2em;
  }
}
</style>

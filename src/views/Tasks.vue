<template>
  <div>
    <tabs :options="{ defaultTabHash: 'account' }">
      <tab id="easy" name="Easy">
        <TaskCollectionTab
          :collection="tasksEasy"
          :editable="editable"
          :rsn="rsn"
        />
      </tab>
      <tab id="medium" name="Medium">
        <TaskCollectionTab
          :collection="tasksMedium"
          :editable="editable"
          :rsn="rsn"
        />
      </tab>
      <tab id="hard" name="Hard">
        <TaskCollectionTab
          :collection="tasksHard"
          :editable="editable"
          :rsn="rsn"
        />
      </tab>
      <tab id="elite" name="Elite">
        <TaskCollectionTab
          :collection="tasksElite"
          :editable="editable"
          :rsn="rsn"
        />
      </tab>
      <tab id="master" name="Master">
        <TaskCollectionTab
          :collection="tasksMaster"
          :editable="editable"
          :rsn="rsn"
        />
      </tab>
      <tab id="god" name="God">
        <TaskCollectionTab
          :collection="tasksGod"
          :editable="editable"
          :rsn="rsn"
        />
      </tab>
    </tabs>
  </div>
</template>

<script>
import TaskCollectionTab from "@/components/TaskCollectionTab.vue";
import tasksEasy from "@/assets/json/tasks-easy.json";
import tasksMedium from "@/assets/json/tasks-medium.json";
import tasksHard from "@/assets/json/tasks-hard.json";
import tasksElite from "@/assets/json/tasks-elite.json";
import tasksMaster from "@/assets/json/tasks-master.json";
import tasksGod from "@/assets/json/tasks-god.json";

export default {
  components: {
    TaskCollectionTab
  },
  data: () => ({
    tasksEasy: tasksEasy,
    tasksMedium: tasksMedium,
    tasksHard: tasksHard,
    tasksElite: tasksElite,
    tasksMaster: tasksMaster,
    tasksGod: tasksGod,
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

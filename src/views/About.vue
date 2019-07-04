<template>
  <v-container class="text-xs-center">
    <v-layout justify-center>
      <v-flex xs12 sm10 md6>
        <v-card>
          <div class="card-header">
            <span class="headline">About</span>
          </div>
          <p class="subheading">
            OS Tracker is an online collection log and task tracking website for Old School Runescape, built off the excellent 
            <a
              class="blue--text"
              href="https://osdrops.com/"
              target="_blank"
              >OS Drops</a>
            website made by 
            <a
              class="blue--text"
              href="https://github.com/rdsa/osdrops"
              target="_blank"
              >RDSA on GitHub</a>.
          </p>
        </v-card>
        <v-card>
          <p class="headline">
            What's different about OS Tracker?
          </p>
          <p class="subheading">
            OS Tracker is:
            <ul>
                <li>
                    Heavily focused on tracking completion of the ingame Collection Log.
                </li>
                <li>
                    Categorized and organized to match the format Collection Log's format. Everything there is represented here, to make updating your log simple.
                </li>
                <li> 
                    Contains a complete list of tasks corresponding to Collection Log items, categorized by difficulty and type, to help you decide what to tackle next.
                </li>
                <li> 
                    COMING SOON - Has a task generator inspired by Tedious's
                    <a
                    class="blue--text"
                    href="https://www.youtube.com/playlist?list=PLfaYojI_alovHQi7Z_LsThv-MRG_VH10q"
                    target="_blank"
                    >Generate Task Ironman Series</a>
                    on Youtube.
                </li>
            </ul>
          </p>
        </v-card>
        <v-card>
          <p class="subheading">
            Project made with Vue.js and hosted on GitHub pages. Source code is available on
            <a
              class="blue--text"
              href="https://github.com/chaiinchomp/osdrops"
              target="_blank"
              >GitHub</a>.
          </p>
          <p class="subheading">
            Item images from the
            <a
              class="blue--text"
              href="https://oldschool.runescape.wiki"
              target="_blank"
              >OSRS Wiki</a>.
          </p>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style scoped>
p {
  text-align: center;
}
</style>
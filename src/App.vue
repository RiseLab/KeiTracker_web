<template>
    <v-app id="app">
        <v-navigation-drawer v-model="drawer"
                             app
                             clipped>
            <v-list dense>
                <v-list-item link
                             v-for="(link, id) in links"
                             @click="drawer = false"
                             :key="id"
                             :to="link.to">
                    <v-list-item-action>
                        <v-icon>mdi-{{ link.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>{{ link.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app clipped-left hide-on-scroll>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <img alt=""
                 class="mr-2 ml-1"
                 src="@/assets/keitracker-logo-round.png">
            <v-toolbar-title>KeiTracker</v-toolbar-title>
            <v-spacer />
            <v-switch v-model="darkTheme"
                      color="grey"
                      class="mt-7 mr-n2"
                      @change="switchTheme"
                      :inset="true">
                <span slot="prepend" class="mt-1 mr-2">
                    {{ darkTheme ? 'Dark' : 'Light' }}
                </span>
            </v-switch>
        </v-app-bar>

        <v-content class="px-0">
            <v-container class="fill-height" fluid>
                <router-view />
            </v-container>
        </v-content>

        <v-footer app elevation="16" height="60">
            <span>&copy; 2019</span>
            <v-spacer />
            <span class="mr-3">
                {{ language | toUppercase }}
            </span>
            <div class="flag-icon-background"
                 :class="`flag-icon-${language}`"
                 style="height: 30px; width: 40px; box-shadow: 0 0 2px #212121;" />
        </v-footer>
    </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    drawer: false,
    links: [
      { title: 'Map', icon: 'map', to: '/' },
      { title: 'Privacy Policy', icon: 'police-badge-outline', to: '/privacy-policy' },
      { title: 'Terms and Conditions', icon: 'file-document-box-outline', to: '/terms-and-conditions' }
    ],
    darkTheme: false,
    language: 'us'
  }),
  filters: {
    toUppercase: function (value) {
      return value.toUpperCase()
    }
  },
  created () {
    this.switchTheme()
  },
  methods: {
    switchTheme () {
      this.$vuetify.theme.dark = this.darkTheme
    }
  }
}
</script>

<style>

</style>

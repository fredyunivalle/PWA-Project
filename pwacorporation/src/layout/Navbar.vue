<template>
   <v-app id="app">
      <template v-if="!$route.path.includes('login')">
         <v-navigation-drawer v-model="drawer" fixed app>
           <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              Application
            </v-list-item-title>
            <v-list-item-subtitle>
              PWA corporation
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
            <v-list dense nav>
              <v-list-item
              v-for="item in items"
              :key="item.title"
              :to="item.path"
              link
              >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title @click="drawer = false;" :route="item.path">{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            </v-list>
         </v-navigation-drawer>
         <v-toolbar color="primary" dark fixed dense>
            <v-app-bar-nav-icon
               @click.stop="drawer = !drawer;"
            ></v-app-bar-nav-icon>
            <v-toolbar-title>Application</v-toolbar-title>
         </v-toolbar>
      </template>
      <v-content>
         <keep-alive :include="['Login']">
            <router-view></router-view>
         </keep-alive>
      </v-content>
   </v-app>
</template>

<script>
  export default {
    name: 'Navbar',
    data () {
      return {
        drawer: false,
        items: [
          { title: 'Users', icon: 'mdi-account-tie', path: '/users' },
          { title: 'Clients', icon: 'mdi-account-circle', path: '/client' },
          { title: 'Projects', icon: 'mdi-anchor', path: '/project' },
          { title: 'Reports', icon: 'mdi-chart-bar', path: '/reports' },
        ],
        right: null,
      }
    },
  }
</script>
<template>
  <v-app>
    <v-app-bar app color="light" dark>
      <div class="d-flex align-center">
        <h3>
          IMPOSSIBLE HOTEL
        </h3>
      </div>
      <v-spacer />
      <v-btn color="success" class="mr-2" to="/log">Log In</v-btn>
      <v-btn color="error" @click="logout">Log Out</v-btn>
    </v-app-bar>

    <v-main>
      <router-view class="mb-10" />
    </v-main>

    <v-footer padless dark color="light">
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>Impossible Hotel</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import { auth } from "@/plugins/firebaseConfig.js";
export default {
  name: "App",
  data: () => ({}),
  methods: {
    logout() {
      auth
        .signOut()
        .then(() => {
          alert("Your ID is Sign Out");
        })
        .catch(error => {
          console.log(error);
          alert("Something was wrong!");
        });
    }
  }
};
</script>

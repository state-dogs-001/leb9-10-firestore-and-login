<template>
  <v-container>
    <h1>ACOUNT PAGE</h1>
    <br />
    <v-row>
      <v-col
        ><h3>
          Hello <strong>{{ user }} </strong>
        </h3></v-col
      >
    </v-row>
  </v-container>
</template>

<script>
// import { db } from "@/plugins/firebaseConfig.js";
import { auth } from "@/plugins/firebaseConfig.js";
export default {
  data: () => ({
    dataList: [],
    user: ""
  }),
  beforeCreate() {
    auth.onAuthStateChanged(user => {
      if (user != null) {
        this.user = user.email;
      } else {
        this.$router.replace("/log");
      }
    });
  }
};
</script>

<style></style>

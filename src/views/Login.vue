<template>
  <v-container>
    <v-card solo style="margin-top: 40px; background-color: #E7E7E7">
      <v-container>
        <v-row>
          <v-col cols="12">
            <label>
              <strong style="font-size: 50px; margin-left: 25px">Login</strong>
              <v-icon
                style="color: black; font-size: 60px; margin-bottom: 30px; margin-left: 10px"
              >
                mdi-account
              </v-icon>
            </label>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="email"
              :error-messages="emailErrors"
              label="E-mail"
              solo
              required
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              :error-messages="passwordErrors"
              label="Password"
              solo
              @click:append="show = !show"
              required
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <p>If you don't have any account <a href="/Reg">Click</a></p>
          </v-col>
          <v-col cols="12" class="text-center mb-4">
            <v-btn @click="login" class="mr-2" color="success">LOG IN</v-btn>
            <v-btn @click="reset" color="error">RESET</v-btn>
          </v-col>
          <v-col class="text-center mb-3" cols="12">
            <p>or sign with</p>
            <v-btn class="mx-2" fab dark color="indigo" @click="facebook">
              <v-icon dark>
                mdi-facebook
              </v-icon>
            </v-btn>
            <v-btn class="mx-2" fab dark color="error" @click="google">
              <v-icon dark>
                mdi-google
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import firebase from "firebase/app";
import { auth } from "@/plugins/firebaseConfig.js";
import { validationMixin } from "vuelidate";
import { required, email, minLength } from "vuelidate/lib/validators";
export default {
  data: () => ({
    email: "",
    password: "",
    show: false,
    user: ""
  }),
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(6) }
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("Password must have at least 6 letters");
      !this.$v.password.required && errors.push("Password is required");
      return errors;
    }
  },
  beforeCreate() {
    auth.onAuthStateChanged(user => {
      if (user != null) {
        this.$router.replace("/user");
      }
    });
  },
  methods: {
    facebook() {
      var provider = new firebase.auth.FacebookAuthProvider();
      auth
        .signInWithPopup(provider)
        .then(result => {
          /** @type {firebase.auth.OAuthCredential} */
          console.log(result);
          this.user = result.user.email;
          alert(this.user + " : Log in Success");
          this.$router.replace("/user");
        })
        .catch(error => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
          console.log("errorCode = " + errorCode);
          console.log("errorMessage = " + errorMessage);
          console.log("emailError = " + email);
          console.log("credentialError = " + credential);
        });
    },
    google() {
      var provider = new firebase.auth.GoogleAuthProvider();
      auth
        .signInWithPopup(provider)
        .then(result => {
          /** @type {firebase.auth.OAuthCredential} */
          console.log(result);
          this.user = result.user.email;
          alert(this.user + " : Log in Success");
          this.$router.replace("/user");
        })
        .catch(error => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
          console.log("errorCode = " + errorCode);
          console.log("errorMessage = " + errorMessage);
          console.log("emailError = " + email);
          console.log("credentialError = " + credential);
        });
    },
    login() {
      auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          console.log(user);
          alert(this.email + " : Log in Success");
          this.$router.replace("/user");
        })
        .catch(error => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
        });
    },
    reset() {
      this.$v.$reset();
      this.email = "";
      this.password = "";
    }
  }
};
</script>

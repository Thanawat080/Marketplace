<template>
  <div class="container">
    <br />
    <center>
      Sign in or
      <router-link to="/register">
        create an account
      </router-link>
    </center>
    <br>
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <div class="box">
          <div class="field">
            <label class="label">Username</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Username"
                v-model="username"/>
            </div>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input class="input" type="password" placeholder="********" v-model="password"/>
            </div>
          </div>

          <button class="button is-primary" @click="cf_login">Sign in</button>
        </div>
      </div>
    </div>
    <br>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    cf_login() {
      axios
        .post("http://localhost:3000/login", {
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          if (res.data === "success") {
            axios
              .get("http://localhost:3000/login")
              .then((res) => {
                localStorage.setItem("userId", res.data.id);
                localStorage.setItem("type", res.data.usertype);
                this.$emit("auth-change");
                this.$router.push({ name: "Home" });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

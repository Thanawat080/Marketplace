<template>
  <div id="app">
    <nav class="navbar is-transparent is-fixed-top is-warning">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" style="color: black">
            <i class="fas fa-2x fa-shopping-cart"></i><b>MARKET</b>
          </a>
          <div
            class="navbar-burger"
            data-target="navbarExampleTransparentExample"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div id="navbarExampleTransparentExample" class="navbar-menu">
          <div class="navbar-start">
            <router-link class="navbar-item" to="/"><i class="fas fa-home"></i>{{ "\xa0" }}Home</router-link>
            <router-link class="navbar-item" to="/RecommendStore"
              ><i class="fas fa-star"></i>{{ "\xa0" }}Recommend Stores</router-link
            >
          </div>

          <div class="navbar-end">
            <!-- navbar items -->
            <div class="navbar-item">
              <router-link
                class="navbar-item"
                to="/seller"
                v-if="user.usertype == 'seller'"
                ><i class="fas fa-plus-circle"></i>{{ "\xa0" }}Seller</router-link
              >
              <router-link
                class="navbar-item"
                to="/mainadmin"
                v-if="user.usertype == 'owner_marketplace'"
                ><i class="fas fa-user-cog"></i>{{ "\xa0" }}Admin</router-link
              >

              <div class="field is-grouped">
                <p class="control">
                  <router-link
                    class="bd-tw-button button"
                    to="/login"
                    v-if="!user.id"
                    ><i class="fas fa-sign-in-alt"></i
                    >{{ "\xa0" }}Login</router-link
                  >
                </p>
                <p class="control">
                  <router-link
                    class="bd-tw-button button"
                    to="/register"
                    v-if="!user.id"
                    ><i class="fas fa-user-plus"></i
                    >{{ "\xa0" }}Register</router-link
                  >
                </p>
              </div>

              <router-link
                class="navbar-item"
                to="/checkout"
                v-if="user.usertype == 'buyer'"
                ><a style="color: black">
                  <span class="fas fa-shopping-cart"></span></a
                >{{ "\xa0" }}{{ count }}
              </router-link>
              <div class="navbar-item has-dropdown is-hoverable" v-if="user.id">
                <a class="navbar-link">
                  <i class="fas fa-user"></i>{{ "\xa0" }}{{ user.f_name }}
                </a>

                <div class="navbar-dropdown">
                  <router-link class="navbar-item" to="/profile"
                    ><i class="fas fa-user"></i>{{ "\xa0" }}Profile</router-link
                  >
                  <a class="navbar-item"><i class="fas fa-question"></i>{{ "\xa0" }}Help </a>
                  <hr class="navbar-divider" />
                  <a
                    class="navbar-item"
                    style="text-decoration: none"
                    @click="logout"
                    ><i class="fas fa-sign-out-alt"></i>{{ "\xa0" }}Logout</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <br /><br /><br />

    <router-view :key="$route.fullPath" @auth-change="onAuthChange" />
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>MarketPlace</strong>
        </p>
      </div>
    </footer>
  </div>
</template>
<script>
document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach((el) => {
      el.addEventListener("click", () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});

import axios from "axios";
export default {
  data() {
    return {
      count: 0,
      user: {},
    };
  },
  methods: {
    onAuthChange() {
      const id = localStorage.getItem("userId");
      if (id) {
        this.getUser();
      }
    },
    getUser() {
      axios.get("http://localhost:3000/login").then((res) => {
        this.user = res.data;
      });
    },
    logout() {
      axios
        .delete("http://localhost:3000/logout")
        .then(() => {
          localStorage.removeItem("userId");
          localStorage.removeItem("type");
          this.user = {};
          this.$router.push({ name: "login" });
        })
        .catch((eer) => console.log(eer));
    },
  },
  mounted() {
    this.onAuthChange();
  },
};
</script>

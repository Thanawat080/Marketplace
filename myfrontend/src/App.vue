<template>
  <div id="app">
    <div class="container">
      <nav class="navbar is-transparent">
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
            <router-link class="navbar-item" to="/">Home</router-link>
          </div>

          <div class="navbar-end">
            <!-- navbar items -->
            <router-link class="navbar-item" to="/seller" v-if='user.usertype == "seller"'>seller</router-link>
            <router-link class="navbar-item" to="/mainadmin" v-if='user.usertype == "owner_marketplace"'>admin</router-link>
            <router-link class="card-footer-item navbar-item" to="/login"
              v-if='!user.id'>login</router-link
            >
            <router-link class="card-footer-item navbar-item" to="/register"
               v-if='!user.id'>Register</router-link
            >
            <router-link class="card-footer-item navbar-item" to="/checkout"
              ><i class="fas fa-shopping-cart"></i>{{'\xa0'}}{{ count }}</router-link
            >
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link"> <i class="fas fa-user"></i>{{'\xa0'}} </a>

              <div class="navbar-dropdown">
                <router-link class="navbar-item" to="/profile"
                  >Profile</router-link
                >
                <a class="navbar-item"> Help </a>
                <hr class="navbar-divider" />
                <router-link class="navbar-item" to="/login" style="text-decoration: none" >Logout</router-link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>

    <router-view :key="$route.fullPath" @auth-change="onAuthChange"/>
    <footer class="footer fix">
      <div class="content has-text-centered">
        <p>
          <strong>MarketPlace</strong>
        </p>
      </div>
    </footer>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      count: 0,
      user: {}
    };
  },
  methods:{
    onAuthChange(){
      const token = localStorage.getItem('userId')
      if (token) {
        this.getUser()
      }
    },
    getUser(){
      axios.get('http://localhost:3000/login').then(res => {
        this.user = res.data
      })
    }
  }
};
</script>

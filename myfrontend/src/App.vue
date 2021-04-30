<template>
  <div id="app">

    <div class="container">
      <nav class="navbar is-transparent">
        <div class="navbar-brand">
          <a class="navbar-item" style="color: black;">
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
            <a class="navbar-item" href="http://localhost:8080/"> Home </a>
          </div>

          <div class="navbar-end">
            <!-- navbar items -->
            <router-link class="navbar-item" to="/seller">seller</router-link>
            <router-link class="navbar-item" to="/mainadmin">admin</router-link>
            <router-link class="card-footer-item navbar-item" to="/login"
              >login</router-link
            >
            <router-link class="card-footer-item navbar-item" to="/register"
              >Register</router-link
            >
            <router-link class="card-footer-item navbar-item" to="/checkout"
              ><i class="fas fa-shopping-cart"></i>&nbsp;{{
                count
              }}</router-link
            >
            <div class="navbar-item has-dropdown is-hoverable">

              <router-link class="navbar-link" to="/profile"
              ><i class="fas fa-user"></i>&nbsp;</router-link
            >
              <div class="navbar-dropdown is-boxed">
                <a
                  class="navbar-item"
                  href="https://bulma.io/documentation/overview/start/"
                >
                  help
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>

    <router-view :key="$route.fullPath" />
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
export default {
  data() {
    return {
      count: 0,
    };
  },
};
</script>
<template>
  <div id="app">
           <div class="navbar-menu">
            <div class="navbar-start">
                <!-- navbar items -->
                <router-link class="card-footer-item navbar-item mininav" to="/">Home</router-link>
            </div>

            <div class="navbar-end">
                <!-- navbar items -->
                <a class="navbar-item mininav" href="help.html">
                    help
                </a>
                <router-link class="navbar-item mininav" to="/seller">seller</router-link>
                <a class="navbar-item mininav" href="Admin/index.html">
                    Admin
                </a>
                <router-link class="card-footer-item navbar-item mininav" to="/login">login</router-link>
                <router-link class="card-footer-item navbar-item mininav" to="/register">Register</router-link>
                <a class="navbar-item mininav">
                    <i class="fas fa-shopping-cart"></i>&nbsp;0
                </a>
                <router-link class="card-footer-item navbar-item mininav" to="/profile"><i class="fas fa-user"></i>&nbsp;</router-link>
            </div>
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

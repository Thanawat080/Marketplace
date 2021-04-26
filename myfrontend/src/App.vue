<template>
  <div id="app">
           <div class="navbar-menu">
            <div class="navbar-start">
                <!-- navbar items -->
                <router-link to="/"><img src="./assets/Market.png" alt="" style="width:150px;"></router-link>
            </div>
            

            <div class="navbar-end">
                <!-- navbar items -->
                <a class="navbar-item mininav" href="help.html">
                    help
                </a>
                <router-link class="navbar-item mininav" to="/seller">seller</router-link>
                <router-link class="navbar-item mininav" to="/mainadmin">admin</router-link>
                <router-link class="card-footer-item navbar-item mininav" to="/login">login</router-link>
                <router-link class="card-footer-item navbar-item mininav" to="/register">Register</router-link>
                <a class="navbar-item mininav">
                    <i class="fas fa-shopping-cart"></i>&nbsp;{{count}}
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
<script>
export default {
    data(){
        return{
            count: 0
        }
    }
}
</script>
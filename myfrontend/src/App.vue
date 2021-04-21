<template>
  <div id="app">
    <div class="navbar-menu">
      <div class="navbar-start">
        <!-- navbar items -->
      </div>

      <div class="navbar-end">
        <!-- navbar items -->
        <a class="navbar-item mininav" href="help.html"> help </a>
        <a class="navbar-item mininav" href="Seller/index.html"> Seller </a>
        <a class="navbar-item mininav" href="Admin/index.html"> Admin </a>
        <router-link class="navbar-item mininav" to="/login">sign in</router-link>
        <router-link class="navbar-item mininav" to="/register">register</router-link>
      </div>
    </div>
        <!-- <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item" href="https://bulma.io">
                    Market
                </a>

                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false"
                    data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" class="navbar-menu">
                <input class="input is-primary" type="text" placeholder="Search">
                &nbsp;
                <button class="button is-primary">Search</button>
                &nbsp;
                <div class="select">
                    <select>
                        <option>All categories</option>
                        <option>X</option>
                    </select>
                </div>
         </div>
        </nav> -->
    <router-view :key="$route.fullPath" />
  </div>
</template>
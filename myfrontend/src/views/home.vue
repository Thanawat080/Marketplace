<template>
  <div>
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item" href="https://bulma.io">
                    <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
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
        </nav>
            <div class="container is-max-desktop">
                <br>
            <div class="is-multiline columns is-variable is-2">
                <!-- Start สินค้า -->
                <div class="column is-one-quarter" v-for="product in product" :key="product.id">
                    <a href="order.html">
                        <div class="card">
                            <div class="card-image">
                                <figure class="image is-1by1">
                                       <img style="height: 120px" :src="'http://localhost:3000/'+product.category_name"  alt="Placeholder image" />
                                       </figure>
                            </div>
                            <div class="card-content">
                                <div class="media">
                                    <div class="media-content">
                                        <p id="title" class="title is-4">{{product.p_name}}</p>
                                        <p class="subtitle is-6 has-text-danger">{{product.price}} บาท</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>

                <!-- End สินค้า -->
            </div>
        </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
        product: null,
    };
  },
  created() {
      
    axios
      .get("http://localhost:3000/index")
      .then((response) => {
        this.product = response.data
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
</style>
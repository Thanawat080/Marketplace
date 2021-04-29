<template>
  <div>
      <div class="container">
        <div class="columns">
          <div class="column is-three-fifths is-offset-one-fifth">
            <input class="input is-primary" type="text" placeholder="Search" v-model="search" style="width:550px;"/>
            &nbsp;
            <button class="button is-primary" @click="clickSearch">Search</button>
            &nbsp;
            <div class="select" style="width: 150px">
              <select @change="category" v-model="select_type_product">
                <option value=''>All categories</option>
                <option v-for='value in categorys' :key='value.id'>{{value.category_name}}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    <br><br>
    <div class="container">
      <div class="columns">
        <div class="column is-three-fifths is-offset-one-fifth">
          <div v-if="detail_seller.length < 2">
            <div v-for="seller in detail_seller" :key="seller.store_name">
              <router-link :to="`/store_seller/${seller.id}`"
                ><img
                  :src="'http://localhost:3000' + seller.store_picture"
                  style="width: 800px; height: 240px"
              /></router-link>
            </div>
          </div>
          <div id="slideshow" v-else>
            <div v-for="seller in detail_seller" :key="seller.store_name">
              <router-link :to="`/store_seller/${seller.id}`"
                ><img
                  :src="'http://localhost:3000' + seller.store_picture"
                  style="width: 800px; height: 240px"
              /></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container is-max-desktop">
      <div class="is-multiline columns is-variable is-2">
        <!-- Start สินค้า -->
        <div
          class="column is-one-quarter"
          v-for="product in product"
          :key="product.id"
        >
          <router-link :to="`/order/${product.id}`"
            ><a>
              <div class="card">
                <div class="card-image">
                  <figure class="image is-1by1">
                    <img
                      style="height: 120px"
                      :src="'http://localhost:3000' + product.picture"
                      alt="Placeholder image"
                    />
                  </figure>
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-content">
                      <p id="title" class="title is-4">{{ product.p_name }}</p>
                      <p class="subtitle is-6 has-text-danger">
                        {{ product.price }} บาท
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </a></router-link
          >
        </div>
        <!-- End สินค้า -->
      </div>
    </div>

    <div id="modal" class="modal" :class="isactive">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <!-- รายละเอียด Event -->
          <p>New Event: {{this.event_name}}</p>
           <p>ลดราคา: {{this.discount}} %</p>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="isactive = !isactive"></button>
    </div>

    <br />
  </div>
</template>
<script>
import $ from "jquery";
$("#slideshow > div:gt(0)").hide();
setInterval(function () {
  $("#slideshow > div:first")
    .fadeOut(1000)
    .next()
    .fadeIn(1000)
    .end()
    .appendTo("#slideshow");
}, 5000);
import axios from "axios";
export default {
  data() {
    return {
      product: null,
      search: "",
      keep_all_product: [],
      detail_seller: [],
      select_type_product: "",
      isactive:false,
      event_name:'',
      discount:'',
      categorys: null,
    };
  },
  created() {
      axios
      .get("http://localhost:3000/category")
      .then((res) => {
        this.categorys = res.data.name
      })
      .catch((err) => {
         console.log(err);
      });
      axios
      .get("http://localhost:3000/event")
      .then((res) => {
        if(res.data.length == 1){
          this.isactive = 'is-active'
          this.event_name = res.data[0].event_name
          this.discount = res.data[0].discount
        }
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("http://localhost:3000/index")
      .then((response) => {
        this.product = response.data;
        this.keep_all_product = response.data;
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("http://localhost:3000/index/seller/store")
      .then((response) => {
        this.detail_seller = response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    clickSearch() {
      axios
        .post("http://localhost:3000/search", {
          search: this.search,
        })
        .then((response) => {
          if (this.search === "" || this.search === null) {
            this.product = this.keep_all_product;
          } else {
            this.product = response.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    selectProduct(value) {
      console.log(value);
    },
    category() {
      axios
        .post("http://localhost:3000/search/type", {
          search_type: this.select_type_product,
        })
        .then((response) => {
          if (
            this.select_type_product === "" ||
            this.select_type_product === null ||
            this.select_type_product === "All categories"
          ) {
            this.product = this.keep_all_product;
          } else {
            this.product = response.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
#slideshow {
  position: relative;
  width: 800px;
  height: 240px;
}
#slideshow > div {
  position: absolute;
}
</style>
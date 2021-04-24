<template>
         <div class="container is-max-desktop">
             <br>
            <div class="is-multiline columns is-variable notification is-order">
                <div class="column is-half">

                    <div class="w3-content w3-display-container" style="height:450px; width: 450px;">
                        <img class="mySlides"
                           :src="'http://localhost:3000' + product.picture">
                        <img class="mySlides"
                            :src="'http://localhost:3000' + product.picture">
                        <img class="mySlides"
                           :src="'http://localhost:3000' + product.picture">
                           

                        <div class="w3-center w3-container w3-section w3-large w3-text-white w3-display-bottommiddle"
                            style="width:100%">
                            <div class="w3-left w3-hover-text-khaki" onclick="plusDivs(-1)">
                                <font color="red">&#10094;</font>
                            </div>
                            <div class="w3-right w3-hover-text-khaki" onclick="plusDivs(1)">
                                <font color="red">&#10095;</font>
                            </div>
                            <span class="w3-badge demo w3-border w3-transparent w3-hover-white"
                                onclick="currentDiv(1)"></span>
                            <span class="w3-badge demo w3-border w3-transparent w3-hover-white"
                                onclick="currentDiv(2)"></span>
                            <span class="w3-badge demo w3-border w3-transparent w3-hover-white"
                                onclick="currentDiv(3)"></span>
                        </div>
                    </div>

                </div>
                <div class="column is-half">
                    <br>
                    <p id="title" class="title is-4">{{product.p_name}}</p>
                    <span class="tag is-success">Price : {{product.price}} Baht</span>
                    <!-- <span class="tag is-warning is-light">Sold : 1</span> -->
                    <br><br>
                    <p>รายละเอียด</p>
                    <br>
                    Quantity : <input class="input is-primary is-small" type="text" v-model="product.quantity" style="width: 40px;">
                    <br><br>
                    <button class="button is-primary"><i class="fas fa-cart-plus"></i> Add to cart</button>
                </div>
            </div>
                <hr>
             <article class="media">
                    <figure class="media-left">
                        <p class="image is-64x64">
                            <img src="https://bulma.io/images/placeholders/128x128.png">
                        </p>
                    </figure>
                    <div class="media-content">
                        <div class="content">
                            <p>
                                <strong>John Smith</strong> <small>31m</small>
                                <br>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu
                                pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis
                                feugiat facilisis.
                            </p>
                        </div>
                    </div>
                </article>
        </div>
</template>

 <script>
import axios from "axios";

export default {
  data() {
    return {
        product:{}

    };
  },
  created(){
      this.getproduct(this.$route.params.productId)
  },
  methods: {
    getproduct(id){
        axios.get(`http://localhost:3000/getproduct1/${id}`)
        .then((res)=>{
        this.product = res.data
        console.log(this.product)
      })
      .catch((eer)=>{console.log(eer)});
    }
  },

};
</script>
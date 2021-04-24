<template>
         <div class="container is-max-desktop">
             <br>
            <div class="is-multiline columns is-variable notification is-order">
                <div class="column is-half">

                    <div class="w3-content w3-display-container" style="height:450px; width: 450px;">

                        <img class="mySlides"
                            src="https://static.trueplookpanya.com/tppy/member/m_557500_560000/559381/cms/images/Photo%2C%20Picture%2C%20Image%20%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B9%80%E0%B8%AB%E0%B8%A5%E0%B9%88%E0%B8%B2%E0%B8%99%E0%B8%B5%E0%B9%89%20%E0%B8%95%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%81%E0%B8%B1%E0%B8%99%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B9%84%E0%B8%A3%202.jpg">
                        <img class="mySlides"
                            src="https://www.bangkokframe.com/image/data/portfolio/Big%20Picture%20Framing%202018/GiantFrame0009.jpg">
                        <img class="mySlides"
                            src="data:image/jpeg;base64,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">

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
        axios.get(`http://localhost:3000/getproduct/${id}`)
        .then((res)=>{
        this.product = res.data
        console.log(this.product)
      })
      .catch((eer)=>{console.log(eer)});
    }
  },

};
</script>
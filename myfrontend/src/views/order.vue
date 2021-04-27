<template>
  <div class="container is-max-desktop">
    <br />
    <div class="is-multiline columns is-variable notification is-order">
      <div class="column is-half">

        <ul class="slides">
          <input type="radio" name="radio-btn" id="img-1" checked />
          <li class="slide-container">
            <div class="slide">
              <img
                 :src="'http://localhost:3000' + product.picture"
              />
            </div>
            <div class="nav">
              <label for="img-6" class="prev"
                ><i class="fas fa-chevron-circle-left fa-3x"></i
              ></label>
              <label for="img-2" class="next"
                ><i class="fas fa-chevron-circle-right fa-3x"></i
              ></label>
            </div>
          </li>

          <input type="radio" name="radio-btn" id="img-2" />
          <li class="slide-container">
            <div class="slide">
              <img
                 :src="'http://localhost:3000' + product.picture"
              />
            </div>
            <div class="nav">
              <label for="img-1" class="prev"
                ><i class="fas fa-chevron-circle-left fa-3x"></i
              ></label>
              <label for="img-3" class="next"
                ><i class="fas fa-chevron-circle-right fa-3x"></i
              ></label>
            </div>
          </li>

          <input type="radio" name="radio-btn" id="img-3" />
          <li class="slide-container" >
            <div class="slide">
              <img
                 :src="'http://localhost:3000' + product.picture" 
              />
            </div>
            <div class="nav">
              <label for="img-2" class="prev"
                ><i class="fas fa-chevron-circle-left fa-3x"></i
              ></label>
              <label for="img-4" class="next"
                ><i class="fas fa-chevron-circle-right fa-3x"></i
              ></label>
            </div>
          </li>

          <li class="nav-dots">
            <label for="img-1" class="nav-dot" id="img-dot-1"></label>
            <label for="img-2" class="nav-dot" id="img-dot-2"></label>
            <label for="img-3" class="nav-dot" id="img-dot-3"></label>
          </li>
        </ul>

      </div>
      <div class="column is-half">
        <br />
        <p id="title" class="title is-4">{{ product.p_name }}</p>
        <span class="tag is-success">Price : {{ product.price }} Baht</span>
        <!-- <span class="tag is-warning is-light">Sold : 1</span> -->
        <br /><br />
        <p>รายละเอียด</p>
        <br />
        Quantity :
        <input
          class="input is-primary is-small"
          type="text"
          v-model="quantity"
          style="width: 40px"
        />
        <br /><br />
        <button class="button is-primary" @click="addToCart">
          <i class="fas fa-cart-plus"></i> Add to cart
        </button>
      </div>
    </div>
    <hr />
  </div>
</template>

 <script>
import axios from "axios";
export default {
  data() {
    return {
      product: {},
      quantity: 1,
    };
  },
  created() {
    this.getproduct(this.$route.params.productId);
  },
  methods: {
    getproduct(id) {
      axios
        .get(`http://localhost:3000/getproduct1/${id}`)
        .then((res) => {
          this.product = res.data;
          console.log(this.product);
        })
        .catch((eer) => {
          console.log(eer);
        });
    },
    addToCart(){
      if(this.quantity > this.product.quantity){
        alert("This product have only " + this.product.quantity + "piece")
      }
      else{
        this.$parent._data.count++
        axios.put(`http://localhost:3000/addorder/${this.$route.params.productId}`,{
          quantity: this.quantity,
          price: this.product.price
        })
        .then(()=>{
          axios
          .post(`http://localhost:3000/product/${this.$route.params.productId}`,{
            quantity: this.product.quantity - this.quantity
          })
          .then((res) => {
            console.log(res)
          })
          .catch((eer) => {
            console.log(eer);
          });
          this.$router.push({ name: "Home" });
        })
        .catch((eer) => {console.log(eer)})
      }
      
    }
  },
};
</script>
<style>
.slides {
      width: 426.666666667px;
      margin: 0 auto;
      position: relative;
      display: block;
    }

    .slides input {
      display: none;
    }

    .slide-container {
      display: block;
    }

    .slide {
      top: 0;
      opacity: 0;
      display: block;
      position: absolute;
      transform: scale(0);
      transition: all 0.7s ease-in-out;
      height: 240px;
    }

    .slide img {
      width: 100%;
      height: 100%;
      display: block;
    }

    .nav label {
      display: none;
      position: absolute;
      cursor: pointer;
      color: rgba(105, 105, 105, 0.959);
      text-align: center;
      margin-top: 29%;
    }

    .nav label:hover {
      color: #000;
    }

    .nav .next {
      right: 5px;
    }

    .nav .prev {
      left: 5px;
    }

    input:checked+.slide-container .slide {
      opacity: 1;
      transform: scale(1);
      transition: opacity 1s ease-in-out;
    }

    input:checked+.slide-container .nav label {
      display: block;
    }

    .nav-dots {
      width: 100%;
      height: 11px;
      display: block;
      position: absolute;
      text-align: center;
      margin-top: 63%;
    }

    .nav-dots .nav-dot {
      width: 11px;
      height: 11px;
      margin: 0 4px;
      position: relative;
      border-radius: 100%;
      display: inline-block;
      background-color: rgba(0, 0, 0, 0.6);
    }

    .nav-dots .nav-dot:hover {
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.8);
    }

    input#img-1:checked~.nav-dots label#img-dot-1,
    input#img-2:checked~.nav-dots label#img-dot-2,
    input#img-3:checked~.nav-dots label#img-dot-3,
    input#img-4:checked~.nav-dots label#img-dot-4,
    input#img-5:checked~.nav-dots label#img-dot-5,
    input#img-6:checked~.nav-dots label#img-dot-6 {
      background: rgba(0, 0, 0, 0.8);
    }
</style>
<template>
  <div class="container is-max-desktop">
    <br />
    <div class="is-multiline columns is-variable notification is-order">
      <div class="column is-half">

        <ul class="slides">
          <label v-for="(value, index) in picture" :key="value.picture_no">
          <input type="radio" name="radio-btn" :id="'img-'+(index+1)" checked />
          <li class="slide-container">
            <div class="slide">
              <img
                 :src="'http://localhost:3000' + value.picture"
              />
            </div>
            
          </li></label>

          <li class="nav-dots" >
            <label v-for="(value, index) in picture" :key="value.picture_no">
            <label :for="'img-'+(index+1)" class="nav-dot" :id="'img-dot-'+(index+1)"></label></label>
          </li>
        </ul>

      </div>
      <div class="column is-half">
        <br />
        <p id="title" class="title is-4">{{ product.p_name }}</p>
        <span class="tag is-success">Price : {{ product.price }} Baht</span>
        <span class="tag is-warning is-light" style="margin-left:20px;">In stock : {{product.quantity}}</span>
        <span class="tag is-warning is-danger" style="margin-left:20px;">Sold : {{sold}}</span>
        <br /><br />
        <p>รายละเอียด : {{product.description}}</p>
        <br />
        Quantity : 
        <input
          class="input is-primary is-small"
          type="number"
          v-model="quantity"
          style="width: 55px"
        />
        <br /><br />
        <button class="button is-primary" @click="addToCart">
          <i class="fas fa-cart-plus"></i>{{'\xa0'}}Add to cart
        </button>
        
           <router-link :to="`/store_seller/${product.store_id}`" style="text-decoration: none;"><button class="button is-info " style="margin-left:50px;" >
          <i class="fas fa-store"></i>{{'\xa0'}}Go to the store page
        </button></router-link>
      </div>
    </div>
    <br>
  </div>
</template>

 <script>
import axios from "axios";
export default {
  data() {
    return {
      product: {},
      picture:[],
      quantity: 1,
      sold:'',
    };
  },
  created() {
    this.getproduct(this.$route.params.productId);
    this.getpicture(this.$route.params.productId);
    this.getSold(this.$route.params.productId);
  },
  methods: {
    getSold(id){
         axios.get(`http://localhost:3000/sold/${id}`)
        .then((res) => {
          this.sold = res.data[0].count
          console.log(res.data)
        })
        .catch((eer) => {
          console.log(eer);
        });
    },
    getpicture(id){
        axios
        .get(`http://localhost:3000/picture/${id}`)
        .then((res) => {
          this.picture = res.data;
          console.log(this.product);
        })
        .catch((eer) => {
          console.log(eer);
        });
    },
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
        axios.put(`http://localhost:3000/addorder/${this.$route.params.productId}`,{
          quantity: this.quantity,
          price: this.product.price
        })
        .then((res)=>{
          if(res.data == 'new product'){
            this.$parent._data.count++
          }
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
        .catch((eer) => {
          if(eer == 'Error: Request failed with status code 403'){
            alert("You are not buyer")
            this.$router.push({ name: "Home" });
          }
          else if(eer == 'Error: Request failed with status code 401'){
            alert("You are not Login")
            this.$router.push({ name: "login" });
          }
          else{
            console.log('f')
          }
          
          })
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
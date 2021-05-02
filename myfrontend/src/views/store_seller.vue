<template>
         <div class="container is-max-desktop">
             <br>
             <br>
            <div class="columns">
                <div class="column is-one-quarter">
                    <div class="card">
                        <header class="card-header">
                            <p class="card-header-title">
                                {{store_name}}
                            </p>
                        </header>
                        <div class="card-image">
                            <figure class="image is-2by2">
                                <img :src="'http://localhost:3000' + picture"
                                    alt="Placeholder image">
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="content">
                              <p><font size="2">ประเภทร้านค้า : {{this.store_type}}</font></p>
                              <p><font size="2">สถานะร้าน : เปิด</font></p>
                              <p><font size="2">จำนวนสินค้า : {{count_product}}</font></p>
                              <span v-show="this.status" style="color:green;"><i class="fas fa-check" style="color:green;"></i> ยืนยันตัวตนแล้ว</span>
                            </div>
                            <button class="button is-small is-danger" @click="report">Report Store</button>
                          </div>
                    </div>
                </div>
                <div class="column is-three-quarters">
                    <div class="is-multiline columns is-variable is-2">

                        <!-- Start สินค้า -->
                        <div class="column is-one-third" v-for='store_product in seller_store_product' :key='store_product.id'>
                            <router-link :to="`/order/${store_product.id}`"><a href="order.html">
                                <div class="card">
                                    <div class="card-image">
                                        <figure class="image is-1by1"><img :src="'http://localhost:3000' + store_product.picture"/></figure>
                                    </div>
                                    <div class="card-content">
                                        <div class="media">
                                            <div class="media-content">
                                                <p id="title" class="title is-4">{{store_product.p_name}}</p>
                                                <p class="subtitle is-6 has-text-danger">{{store_product.price}} บาท</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a></router-link> 
                        </div>
                    </div>
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
      seller_store_product:null,
      store_name:'',
      count_product:0,
      store_type:'',
      id:'',
      status:null,
      picture:'',
    };
  },
  created() {
    this.getseller_store_product(this.$route.params.sellerId);
      axios.post(`http://localhost:3000/checkstatus`,{
        id:this.$route.params.sellerId
      })
        .then((res) => {
          this.status = res.data.status
        })
        .catch((eer) => {
          console.log(eer);
        });
  },
  methods: {
    getseller_store_product(id) {
      axios
        .get(`http://localhost:3000/store/product/${id}`)
        .then((res) => {
          this.id = res.data[0].id
            if(res.data[0].price != null){
          this.seller_store_product = res.data;
          this.count_product = res.data.length
          }else{
          this.count_product = 0
          this.store_name =  res.data[0].store_name}
          this.store_type = res.data[0].subscription_type
          this.picture = res.data[0].store_picture
        })
        .catch((eer) => {
          console.log(eer);
        });
    },report(){
      axios.put(`http://localhost:3000/report`,{
        id:this.$route.params.sellerId
      })
        .then((res) => {
      
          alert(res.data)

        })
        .catch((eer) => {
          console.log(eer);
        });
    },
  },
};
</script>

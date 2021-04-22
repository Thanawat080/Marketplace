<template>
    <div class="container is-max-desktop">
            <br><br>
            <div class="columns">
                <div class="column is-one-third">
                    <aside class="menu">
                        <p class="menu-label">
                            หน้าหลัก
                        </p>
                        <ul class="menu-list">
                            <li><a href="index.html">หน้าหลัก</a></li>
                            <li><a href="rent.html">เช่าเปิดร้าน</a></li>
                            <li>
                            <router-link class="navbar-item mininav" to="/seller/addstore">กรอกข้อมูลร้านค้า</router-link>
                            </li>
                        </ul>
                        <p class="menu-label">
                            สินค้า
                        </p>
                        <ul class="menu-list">
                            <router-link class="navbar-item mininav" to="/seller/addproduct">เพิ่มสินค้า</router-link>
                            <router-link class="navbar-item mininav" to="/seller/edit">แก้ไขสินค้า</router-link>
                        </ul>
                    </aside>
                </div>
                <div class="column is-two-thirds notification is-primary is-light">
                    <div class="message-header">
                        <p>เพิ่มสินค้า</p>
                    </div>
                    <br>
                    <div class="column is-full">
                        
                        <div class="file is-info is-boxed aligncenter">
                            <label class="file-label">
                              <input class="file-input" type="file" name="resume" accept="image/png, image/jpeg, image/webp"
        @change="selectImages"> 
                              <span class="file-cta">
                                <span class="file-icon">
                                  <i class="fas fa-cloud-upload-alt"></i>
                                </span>
                                <span class="file-label">
                                  Upload pic…
                                </span>
                              </span>
                            </label>
                          </div>

                        ชื่อสินค้า<input class="input" type="text" placeholder="ชื่อสินค้า" v-model="product_name">
                        <div class="columns">
                            <div class="column">
                                ราคา<input class="input" type="text" placeholder="ราคา" v-model="price">
                            </div>
                            <div class="column">
                                ราคาโปรโมชั่น *ใส่หรือไม่ใส่ก็ได้*<input class="input" type="text" placeholder="ราคาโปรโมชั่น" v-model="promotionPrice">
                            </div>
                        </div>
                        จำนวน<input class="input" type="number" placeholder="จำนวน" v-model="quantity">
                        
                        รายละเอียดสินค้า<textarea class="textarea" placeholder="รายละเอียดสินค้า" rows="5" v-model="description"></textarea>
                        <br>
                        <div class="select is-primary">
                            <select v-model="categoryType">
                              <option v-for="value in category" :key="value.id">{{value.category_name}}</option>
                            </select>
                          </div>
                        <hr>
                        <button class="button is-warning" @click="addproduct">เพิ่ม</button>

                    </div>
                </div>
            </div>

        </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      pic:'',
      product_name:'',
      description:'',
      price: '',
      quantity:'',
      promotionPrice: 0,
      category: [],
      categoryType:''
    };
  },
  methods:{
    selectImages(event){
        this.pic = event.target.files;
    },
    getcategory(){
      axios
      .get("http://localhost:3000/category")
      .then((res) => {
        this.category = res.data.name
      })
      .catch((err) => {
         console.log(err);
      });
    },
    addproduct(){
      let formData = new FormData();
      formData.append("pame", this.product_name);
      formData.append("description", this.description);
      formData.append("price", this.price);
      formData.append("promoprice", this.promotionPrice);
      formData.append("category", this.categoryType);
      formData.append("quantity", this.quantity)
      this.pic.forEach((value) => {
        formData.append("Pic", value);
      });
      axios
      .put("http://localhost:3000/addproduct", formData)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
         console.log(err);
      });
      
    }
  },
  created(){
      this.getcategory()
  }
};
</script>
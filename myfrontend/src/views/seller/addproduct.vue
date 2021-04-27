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
                            <router-link to="/seller">หน้าหลัก</router-link>
                            <li>
                            <router-link to="/seller/addstore">กรอกข้อมูลร้านค้า</router-link>
                            </li>
                        </ul>
                        <p class="menu-label">
                            สินค้า
                        </p>
                        <ul class="menu-list">
                            <router-link to="/seller/addproduct">เพิ่มสินค้า</router-link>
                            <router-link to="/seller/edit">แก้ไขสินค้า</router-link>
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
                              <input class="file-input" multiple type="file" name="resume" accept="image/png, image/jpeg, image/webp"
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
                         <div v-if="pic" class="columns is-multiline">
                            <div v-for="(image) in pic" :key="image.id" class="column is-one-quarter">
                              <div class="card">
                                <div class="card-image">
                                  <figure class="image is-4by3">
                                    <img :src="showSelectImage(image)" alt="Placeholder image" />
                                  </figure>
                                </div>
                              </div>
                            </div>
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
        console.log(this.pic)
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
      
    },
    showSelectImage(image) {
      // for preview only
      return URL.createObjectURL(image);
    }
  },
  created(){
      this.getcategory()
  }
};
</script>
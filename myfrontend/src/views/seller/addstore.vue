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
                        <p>สร้างร้านค้า</p>
                    </div>
                    <br>
                    <p>รูปโปรไฟล์ร้าน</p>
                    <div class="columns">    
                        <div class="column is-three-fifths">
                          <label class="file-label">
                            <input class="file-input" type="file" name="resume">
                            <span class="file-cta">
                                <span class="file-icon">
                                    <i class="fas fa-upload"></i>
                                </span>
                                <span class="file-label">
                                    Choose a file…
                                </span>
                            </span>
                              <input class="file-input" type="file" name="resume" accept="image/png, image/jpeg, image/webp" @change="selectImages"> 
                        </label>
                            ชื่อร้าน<input class="input" type="text" placeholder="ชื่อร้าน" v-model="store_name">
                            รายละเอียดร้านค้า<textarea class="textarea" placeholder="รายละเอียดร้านค้า" rows="5" v-model="store_detail"></textarea>
                            <p>ประเภทการเช่า</p>
                            <div class="select is-primary">
                                <select v-model='rent_type'>
                                    <option>Select dropdown</option>
                                    <option>free</option>
                                    <option>normal</option>
                                    <option>epic</option>
                                </select>
                            </div><hr>
                            <button class="button is-warning" @click="addstore">บันทึก</button>
                        </div>
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
      store_name:'',
      store_detail:'',
      rent_type: '',
      pic:'',
    };
  },
  methods:{
    selectImages(event){
        this.pic = event.target.files;
    },
    addstore(){
        let formData = new FormData();
        this.pic.forEach((value) => {
        formData.append("Pic", value);
      });
        formData.append("storename", this.store_name);
        formData.append("description", this.store_detail);
        formData.append("rent_type", this.rent_type);
      axios
      .put("http://localhost:3000/addstore",formData)
      .then((res) => {
          alert("Add store is success.")
          this.rent_type = ''
          this.store_detail = ''
          this.store_name = ''
          this.pic = ''
        console.log(res)
      })
      .catch((err) => {
          alert("1 user can add 1 store.")
         console.log(err);
      });
    }
  }
};
</script>
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
                        <p>ยืนยันตัวตนเพื่อเปิดร้าน</p>
                    </div>
                    <br>
                    บัตรประชาชน<div class="file has-name">
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
                    </div>
                    เลขบัตรประชาชน<input class="input" type="text" placeholder="เลขบัตรประชาชน" v-model="idcard_number">
                    <hr>
                    <button class="button is-warning" @click='confirm'>ยืนยันตัวตน</button>
                </div>
            </div>

        </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      idcard_number: "",
      pic: "",
    };
  },
  methods: {
    selectImages(event){
        this.pic = event.target.files;
    },
    confirm() {
      let formData = new FormData();
      formData.append("cardId", this.idcard_number);
     this.pic.forEach((value) => {
        formData.append("Pic", value);
      });
      axios
        .put("http://localhost:3000/addcheck/openstore", formData)
        .then((res) => {
          console.log(res)
          alert("Fill in the information successfully, waiting for confirmation from admin.")
          this.pic = ''
          this.idcard_number = ''
        })
        .catch((err) => {
          console.log(err);
        });

    },
  },
};
</script>
<template>
  <div class="container is-max-desktop">
    <br /><br />
    <div class="columns">
      <div class="column is-one-third">
        <aside class="menu">
          <p class="menu-label">หน้าหลัก</p>
          <ul class="menu-list">
            <router-link to="/seller">หน้าหลัก</router-link>
            <li>
              <router-link to="/seller/addstore">กรอกข้อมูลร้านค้า</router-link>
            </li>
          </ul>
          <p class="menu-label">สินค้า</p>
          <ul class="menu-list">
            <router-link to="/seller/addproduct">เพิ่มสินค้า</router-link>
            <router-link to="/seller/edit">แก้ไขสินค้า</router-link>
          </ul>
        </aside>
      </div>

      <div class="column is-two-thirds notification is-primary is-light" >
        <div class="message-header" >
          <p>สร้างร้านค้า</p>
        </div>
        <br />
        <form class="box" v-show='store_name_show == ""'>
          <div class="field">
            <label class="file-label">
              <input class="file-input" type="file" name="resume" />
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label"> รูปโปรไฟล์ร้าน </span>
              </span>
              <input
                class="file-input"
                type="file"
                name="resume"
                accept="image/png, image/jpeg, image/webp"
                @change="selectImages"
              />
            </label>
          </div>

          <div class="field">
            <label class="label">ชื่อร้านค้า</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="ชื่อร้าน"
                v-model="store_name"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">รายละเอียดร้านค้า</label>
            <div class="control">
              <textarea
                class="textarea"
                placeholder="รายละเอียดร้านค้า"
                rows="5"
                v-model="store_detail"
              ></textarea>
            </div>
          </div>

          <div class="field">
            <label class="label">ประเภทการเช่า</label>
            <div class="control">
              <div class="select is-primary">
                <select v-model="rent_type">
                  <option>Select dropdown</option>
                  <option>free</option>
                  <option>normal</option>
                  <option>epic</option>
                </select>
              </div>
            </div>
          </div>

          <hr />

          <button class="button is-warning" @click="addstore">บันทึก</button>
        </form>

        <div class="box" v-show="store_name_show != ''">
          <img  :src="'http://localhost:3000' + store_pic_show" />
          <p>ชื่อร้าน : {{store_name_show}}</p>
          <p>รายละเอียด : {{store_detail_show}}</p>
          <p>ประเภทการเช่า : {{store_type_show}}</p>
        </div>
      </div>
    </div>

    <div class="modal">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">แก้ไขร้านค้า</p>
          <button class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <!-- Content ... -->
          <form class="box">
          <div class="field">
            <label class="file-label">
              <input class="file-input" type="file" name="resume" />
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label"> รูปโปรไฟล์ร้าน </span>
              </span>
              <input
                class="file-input"
                type="file"
                name="resume"
                accept="image/png, image/jpeg, image/webp"
                @change="selectImages"
              />
            </label>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="ชื่อร้าน"
                v-model="store_name"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">รายละเอียดร้านค้า</label>
            <div class="control">
              <textarea
                class="textarea"
                placeholder="รายละเอียดร้านค้า"
                rows="5"
                v-model="store_detail"
              ></textarea>
            </div>
          </div>

          <div class="field">
            <label class="label">ประเภทการเช่า</label>
            <div class="control">
              <div class="select is-primary">
                <select v-model="rent_type">
                  <option>Select dropdown</option>
                  <option>free</option>
                  <option>normal</option>
                  <option>epic</option>
                </select>
              </div>
            </div>
          </div>

          <hr />

          <button class="button is-warning" @click="addstore">บันทึก</button>
        </form>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success">Save changes</button>
          <button class="button">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      store_name: "",
      store_detail: "",
      rent_type: "",
      pic: "",
      store_pic_show:'',
      store_name_show:'',
      store_detail_show:'',
      store_type_show:'',
    };
  },
  methods: {
    selectImages(event) {
      this.pic = event.target.files;
    },
    addstore() {
      let formData = new FormData();
      this.pic.forEach((value) => {
        formData.append("Pic", value);
      });
      formData.append("storename", this.store_name);
      formData.append("description", this.store_detail);
      formData.append("rent_type", this.rent_type);
      axios
        .put("http://localhost:3000/addstore", formData)
        .then((res) => {
          alert("Add store is success.");
          this.rent_type = "";
          this.store_detail = "";
          this.store_name = "";
          this.pic = "";
          console.log(res.data)
        })
        .catch((err) => {
          alert("1 user can add 1 store.");
          console.log(err);
        });
        this.getdeatilstore()
    },getdeatilstore(){
        axios
        .get("http://localhost:3000/detail/store1")
        .then((res) => {
            this.store_name_show = res.data[0].store_name
            this.store_detail_show = res.data[0].description
            this.store_type_show = res.data[0].subscription_type
            this.store_pic_show = res.data[0].store_picture
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },created(){
        this.getdeatilstore()
    },
};
</script>
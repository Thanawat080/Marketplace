<template>
  <div class="container is-max-desktop">
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

      <div class="column is-two-thirds notification is-primary is-light">
        <div class="message-header">
          <p>สร้างร้านค้า</p>
        </div>
        <div class="box" v-show="store_name_show == ''">
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
                v-model="$v.store_name.$model"
                :class="{ 'is-danger': $v.store_name.$error }"
              />
            </div>
            <template v-if="$v.store_name.$error">
              <p class="help is-danger" v-if="!$v.store_name.required">
                This field is required
              </p>
            </template>
          </div>

          <div class="field">
            <label class="label">รายละเอียดร้านค้า</label>
            <div class="control">
              <textarea
                class="textarea"
                placeholder="รายละเอียดร้านค้า"
                rows="5"
                v-model="$v.store_detail.$model"
                :class="{ 'is-danger': $v.store_detail.$error }"
              ></textarea>
            </div>
            <template v-if="$v.store_detail.$error">
              <p class="help is-danger" v-if="!$v.store_detail.required">
                This field is required
              </p>
            </template>
          </div>

          <div class="field">
            <label class="label">ประเภทการเช่า</label>
            <div class="control">
              <div
                :class="{ 'select is-danger': $v.rent_type.$error }"
                class="select is-primary"
                style="width: 1000px"
              >
                <select v-model="$v.rent_type.$model" style="width: 1000px">
                  <option>Select dropdown</option>
                  <option>free</option>
                  <option>normal</option>
                  <option>epic</option>
                </select>
              </div>
            </div>
            <template v-if="$v.rent_type.$error">
              <p class="help is-danger" v-if="!$v.rent_type.required">
                This field is required
              </p>
              <p class="help is-danger" v-if="!$v.rent_type.rent_type">
                Invalid type must be select free type or normal type or epic
                type
              </p>
            </template>
          </div>
          <button class="button is-warning" @click="addstore">บันทึก</button>
        </div>

        <div class="box" v-show="store_name_show != ''">
          <img :src="'http://localhost:3000' + store_pic_show" />
          <p>ชื่อร้าน : {{ store_name_show }}</p>
          <p>รายละเอียด : {{ store_detail_show }}</p>
          <p>ประเภทการเช่า : {{ store_type_show }}</p>
        </div>
      </div>
    </div>
    <br>
  </div>
</template>

<script>
import axios from "axios";
import { required } from "vuelidate/lib/validators";

function rent_type(value) {
  if (value == "free" || value == "epic" || value == "normal") {
    return true;
  }
  return false;
}

export default {
  data() {
    return {
      store_name: "",
      store_detail: "",
      rent_type: "",
      pic: "",
      store_pic_show: "",
      store_name_show: "",
      store_detail_show: "",
      store_type_show: "",
    };
  },
  validations: {
    store_name: {
      required,
    },
    store_detail: {
      required,
    },
    rent_type: {
      required,
      rent_type: rent_type,
    },
  },
  methods: {
    selectImages(event) {
      this.pic = event.target.files;
    },
    addstore() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let formData = new FormData();
        this.pic.forEach((value) => {
          formData.append("Pic", value);
        });
        formData.append("storename", this.store_name);
        formData.append("description", this.store_detail);
        formData.append("rent_type", this.rent_type);
        axios
          .put("http://localhost:3000/addstore", formData)
          .then(() => {
            alert("Add store is success.");
            this.rent_type = "";
            this.store_detail = "";
            this.store_name = "";
            this.pic = "";
            this.getdeatilstore();
          })
          .catch((err) => {
            alert("1 user can add 1 store.");
            console.log(err);
          });
      } else {
        console.log("Invalid data");
      }
    },
    getdeatilstore() {
      axios
        .get("http://localhost:3000/detail/store1")
        .then((res) => {
          this.store_name_show = res.data[0].store_name;
          this.store_detail_show = res.data[0].description;
          this.store_type_show = res.data[0].subscription_type;
          this.store_pic_show = res.data[0].store_picture;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getdeatilstore();
  },
};
</script>
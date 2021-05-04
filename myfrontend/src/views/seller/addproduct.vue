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
      <div class="column is-two-thirds notification is-primary is-light">
        <div class="message-header">
          <p>เพิ่มสินค้า</p>
        </div>
        <br />
        <div class="column is-full">
          <div class="file is-info is-boxed aligncenter">
            <label class="file-label">
              <input
                class="file-input"
                multiple
                type="file"
                name="resume"
                accept="image/png, image/jpeg, image/webp"
                @change="selectImages"
              />
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-cloud-upload-alt"></i>
                </span>
                <span class="file-label"> Upload pic… </span>
              </span>
            </label>
          </div>

          ชื่อสินค้า<input
            class="input"
            type="text"
            placeholder="ชื่อสินค้า"
            v-model="$v.product_name.$model"
            :class="{ 'is-danger': $v.product_name.$error }"
          />
          <template v-if="$v.product_name.$error">
            <p class="help is-danger" v-if="!$v.product_name.required">
              This field is required
            </p>
          </template>
          <div class="columns">
            <div class="column">
              ราคา<input
                class="input"
                type="text"
                placeholder="ราคา"
                v-model="$v.price1.$model"
                :class="{ 'is-danger': $v.price1.$error }"
              />
              <template v-if="$v.price1.$error">
                <p class="help is-danger" v-if="!$v.price1.required">
                  This field is required
                </p>
                <p class="help is-danger" v-if="!$v.price1.price1">
                  Prices are numeric and less than 1 million.
                </p>
              </template>
            </div>
          </div>
          จำนวน<input
            class="input"
            type="number"
            placeholder="จำนวน"
            v-model="$v.quantity.$model"
            :class="{ 'is-danger': $v.quantity.$error }"
          />
          <template v-if="$v.quantity.$error">
            <p class="help is-danger" v-if="!$v.quantity.required">
              This field is required
            </p>
          </template>
          รายละเอียดสินค้า<textarea
            class="textarea"
            placeholder="รายละเอียดสินค้า"
            rows="5"
            v-model="$v.description.$model"
            :class="{ 'is-danger': $v.description.$error }"
          ></textarea>
          <template v-if="$v.description.$error">
            <p class="help is-danger" v-if="!$v.description.required">
              This field is required
            </p>
          </template>
          <br />
          <div
            :class="{ 'select is-danger': $v.categoryType.$error }"
            class="select is-primary"
            style="width: 1000px"
          >
            <select v-model="$v.categoryType.$model" style="width: 1000px">
              <option v-for="value in category" :key="value.id">
                {{ value.category_name }}
              </option>
            </select>
            <template v-if="$v.categoryType.$error">
              <p class="help is-danger" v-if="!$v.categoryType.required">
                This field is required
              </p>
            </template>
          </div>
          <hr />
          <button class="button is-warning" @click="addproduct">เพิ่ม</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { required, maxLength, numeric } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      pic: "",
      product_name: "",
      description: "",
      price1: "",
      quantity: "",
      category: [],
      categoryType: "",
    };
  },
  validations: {
    product_name: {
      required,
    },
    description: {
      required,
    },
    price1: {
      required,
      maxLength: maxLength(6),
      numeric,
    },
    quantity: {
      required,
    },
    categoryType: {
      required,
    },
  },
  methods: {
    selectImages(event) {
      this.pic = event.target.files;
    },
    getcategory() {
      axios
        .get("http://localhost:3000/category")
        .then((res) => {
          this.category = res.data.name;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addproduct() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let formData = new FormData();
        formData.append("pame", this.product_name);
        formData.append("description", this.description);
        formData.append("price", this.price1);
        formData.append("category", this.categoryType);
        formData.append("quantity", this.quantity);
        this.pic.forEach((value) => {
          formData.append("Pic", value);
        });
        axios
          .put("http://localhost:3000/addproduct", formData)
          .then((res) => {
            console.log(res);
            this.product_name = "";
            this.description = "";
            this.price1 = "";
            this.categoryType = "";
            this.quantity = "";
            this.pic = "";
            alert("Successfully added new products!");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  created() {
    this.getcategory();
  },
};
</script>
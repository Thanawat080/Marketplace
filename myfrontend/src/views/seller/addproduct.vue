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
          <p>เพิ่มสินค้า</p>
        </div>
        <div class="box">
          <div class="field">
            <label class="file-label">
              <input class="file-input" type="file" name="resume" />
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label"> รูปสินค้า เลือกได้มากกว่า 1 </span>
              </span>
              <input
                class="file-input"
                multiple
                type="file"
                name="resume"
                accept="image/png, image/jpeg, image/webp"
                @change="selectImages"
              />
            </label>
          </div>
          <div class="field">
            <label class="label">ชื่อสินค้า</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="ชื่อสินค้า"
                v-model="$v.product_name.$model"
                :class="{ 'is-danger': $v.product_name.$error }"
              />
            </div>
            <template v-if="$v.product_name.$error">
              <p class="help is-danger" v-if="!$v.product_name.required">
                This field is required
              </p>
            </template>
          </div>
          <div class="field">
            <label class="label">ราคา</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="ราคา"
                v-model="$v.price1.$model"
                :class="{ 'is-danger': $v.price1.$error }"
              />
            </div>
              <template v-if="$v.price1.$error">
                <p class="help is-danger" v-if="!$v.price1.required">
                  This field is required
                </p>
                <p class="help is-danger" v-if="!$v.price1.price1">
                  Prices are numeric and less than 1 million.
                </p>
              </template>
          </div>
          <div class="field">
            <label class="label">จำนวน</label>
            <div class="control">
              <input
            class="input"
            type="number"
            placeholder="จำนวน"
            v-model="$v.quantity.$model"
            :class="{ 'is-danger': $v.quantity.$error }"
          />
            </div>
          <template v-if="$v.quantity.$error">
            <p class="help is-danger" v-if="!$v.quantity.required">
              This field is required
            </p>
          </template>
          </div>
          <div class="field">
            <label class="label">รายละเอียด</label>
            <div class="control">
              <textarea
            class="textarea"
            placeholder="รายละเอียดสินค้า"
            rows="5"
            v-model="$v.description.$model"
            :class="{ 'is-danger': $v.description.$error }"
          ></textarea>
            </div>
          <template v-if="$v.description.$error">
            <p class="help is-danger" v-if="!$v.description.required">
              This field is required
            </p>
          </template>
          </div>
          <div class="field">
            <label class="label">ประเภทสินค้า</label>
            <div class="control">
              <div
            :class="{ 'select is-danger': $v.categoryType.$error }"
            class="select is-primary"
            style="width: 1000px"
          >
            <select v-model="$v.categoryType.$model" style="width: 1000px">
              <option value>เลือกประเภท</option>
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
            </div>
          </div>
          <button class="button is-warning" @click="addproduct">เพิ่ม</button>
        </div>
      </div>
    </div>
    <br>
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
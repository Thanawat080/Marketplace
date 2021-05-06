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
          <p>ยืนยันตัวตนเพื่อเปิดร้าน</p>
        </div>
        <div class="box">
          <div class="field">
            <label class="file-label">
              <input class="file-input" type="file" name="resume" />
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label"> รูปบัตรประชาชน </span>
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
            <label class="label">เลขบัตรประชาชน</label>
            <div class="control">
              <input
                class="input"
                type="number"
                placeholder="เลขบัตรประชาชน"
                v-model="$v.idcard_number.$model"
                :class="{ 'is-danger': $v.idcard_number.$error }"
              />
            </div>
            <template v-if="$v.idcard_number.$error">
              <p class="help is-danger" v-if="!$v.idcard_number.required">
                This field is required
              </p>
              <p class="help is-danger" v-if="!$v.idcard_number.idcard_number">
                The ID card number must be 13 numbers.
              </p>
            </template>
          </div>
          <button class="button is-warning" @click="confirm">
            ยืนยันตัวตน
          </button>
        </div>
      </div>
    </div>
    <br>
  </div>
</template>


<script>
import axios from "axios";
import {
  required,
  minLength,
  maxLength,
  numeric,
} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      idcard_number: "",
      pic: "",
    };
  },
  validations: {
    idcard_number: {
      required,
      minLength: minLength(13),
      maxLength: maxLength(13),
      numeric,
    },
  },
  methods: {
    selectImages(event) {
      this.pic = event.target.files;
    },
    confirm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let formData = new FormData();
        formData.append("cardId", this.idcard_number);
        this.pic.forEach((value) => {
          formData.append("Pic", value);
        });
        axios
          .put("http://localhost:3000/addcheck/openstore", formData)
          .then((res) => {
            console.log(res);
            alert(
              "Fill in the information successfully, waiting for confirmation from admin."
            );
            this.pic = "";
            this.idcard_number = "";
          })
          .catch((err) => {
            alert("CardId is required or Does not meet the conditions");
            console.log(err);
          });
      } else {
        console.log("CardId is required or Does not meet the conditions");
      }
    },
  },
};
</script>
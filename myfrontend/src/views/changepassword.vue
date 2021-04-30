<template>
  <div class="container is-max-desktop">
    <br /><br />
    <div class="columns">
      <div class="column is-one-third">
        <aside class="menu">
          <p class="menu-label">หน้าหลัก</p>
          <ul class="menu-list">
            <li>
              <router-link class="card-footer-item" to="/profile"
                >หน้าหลัก</router-link
              >
            </li>
            <li>
              <router-link class="card-footer-item" to="/changepassword"
                >แก้ไขรหัส</router-link
              >
            </li>
          </ul>
          <p class="menu-label">ประวัติ</p>
          <ul class="menu-list">
            <li>
              <router-link class="card-footer-item" to="/history"
                >ประวัติการซื้อ</router-link
              >
            </li>
          </ul>
        </aside>
      </div>
      <div class="column is-two-thirds notification is-primary is-light">
        <div class="message-header">
          <p>แก้ไขรหัสผ่าน</p>
        </div>
        <div class="column is-full">
          <form class="box">
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
            class="input"
            type="text"
            placeholder="รหัสผ่านเก่า"
            v-model="password"
          />
              </div>
            </div>

            <div class="field">
              <label class="label">Comfirm Password</label>
              <div class="control">
                <input
            class="input"
            type="text"
            placeholder="ยืนยันรหัสผ่านเก่า"
            v-model="cf_password"
          />
              </div>
            </div>

            <div class="field">
              <label class="label">New Password</label>
              <div class="control">
                <input
            class="input"
            type="text"
            placeholder="รหัสผ่านใหม่"
            v-model="new_password"
          />
              </div>
            </div>

             <button class="button is-warning" @click="savePassword">แก้ไขรหัสผ่าน</button>
          </form>
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
      password: "",
      cf_password: "",
      new_password: "",
    };
  },
  methods: {
    savePassword() {
      if (this.password == this.cf_password) {
        console.log("test");
        axios
          .put("http://localhost:3000/changepassword", {
            password: this.new_password,
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      this.password = "";
      this.cf_password = "";
      this.new_password = "";
    },
  },
};
</script>

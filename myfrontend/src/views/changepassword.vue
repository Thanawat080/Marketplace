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
                            <li><router-link class="card-footer-item" to="/profile">หน้าหลัก</router-link></li>
                            <li><router-link class="card-footer-item" to="/changepassword">แก้ไขรหัส</router-link></li>
                        </ul>
                        <p class="menu-label">
                            ประวัติ
                        </p>
                        <ul class="menu-list">
                            <li><router-link class="card-footer-item" to="/history">ประวัติการซื้อ</router-link></li>
                        </ul>
                    </aside>
                </div>
                <div class="column is-two-thirds notification is-primary is-light">
                    <div class="message-header">
                        <p>แก้ไขรหัสผ่าน</p>
                    </div>
                    <br>
                    <div class="column is-full">

                        <input class="input" type="text" placeholder="รหัสผ่านเก่า" v-model="password">
                        <br><br>
                        <input class="input" type="text" placeholder="ยืนยันรหัสผ่านเก่า" v-model="cf_password">
                        <br><br>
                        <input class="input" type="text" placeholder="รหัสผ่านใหม่" v-model="new_password">
                        <br><br>
                        <button class="button is-warning" @click="savePassword">แก้ไขรหัสผ่าน</button>
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
        password:'',
        cf_password:'',
        new_password:'',

    };
  },
  methods: {
    savePassword(){
        if(this.password == this.cf_password){
            console.log("test")
        axios
        .put("http://localhost:3000/changepassword",{
          password:this.new_password,
      })
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });

        }
        this.password = ''
        this.cf_password = ''
        this.new_password = ''
    }
  },

};
</script>
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
                            <li><a href="history.html">ประวัติการซื้อ</a></li>
                        </ul>
                    </aside>
                </div>
                <div class="column is-two-thirds notification is-primary is-light">
                    <div class="message-header">
                        <p>ข้อมูล</p>
                    </div>
                    <br>
                    <div class="column is-full">
                        <div class="columns">
                            <div class="column is-one-third">
                                <figure class="image is-128x128">
                                    <img src="https://bulma.io/images/placeholders/128x128.png">
                                </figure>
                            </div>
                            <div class="column is-one-third">
                                <p >Name : {{f_name}}</p>
                                <p style="margin-top:10px;">LastName : {{l_name}}</p>
                                <p style="margin-top:10px;">Phone : {{phone_number}}</p>
                                <p style="margin-top:10px;">Username : {{username}}</p>
                                <p style="margin-top:10px;">Email : {{email}}</p>
                                <br>
                                <button class="button is-warning" @click="togglemodal">แก้ไขข้อมูล</button>
                                <br>
                                <a @click="logout">Logout</a>
                            </div>
                        </div>

                        <div class="modal" v-bind:class='isActive'>
                            <div class="modal-background"></div>
                            <div class="modal-card">
                                <header class="modal-card-head">
                                    <p class="modal-card-title">แก้ไขข้อมูล</p>
                                    <button class="delete" aria-label="close" @click="isActive = !isActive"></button>
                                </header>
                                <section class="modal-card-body">
                                    <!-- Content ... -->
                                    <input class="input" type="text" placeholder="Name" v-model="newf_name"><br><br>
                                    <input class="input" type="text" placeholder="LastName" v-model="newl_name"><br><br>
                                    <input class="input" type="text" placeholder="Phone" v-model="newphone_number"><br><br>
                                    <input class="input" type="text" placeholder="Email" v-model="newemail"><br><br>
                                    <input class="input" type="text" placeholder="Username" disabled v-model="newusername">
                                </section>
                                <footer class="modal-card-foot">
                                    <button class="button is-success" @click="saveChange">บันทึก</button>
                                    <button class="button" @click="isActive = !isActive">ยกเลิก</button>
                                </footer>
                            </div>
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
      f_name: "",
      l_name: "",
      phone_number: "",
      username: "",
      email:"",
      isActive: 'false',
      newf_name: "",
      newl_name: "",
      newphone_number: "",
      newusername: "",
      newemail:"",

    };
  },
  methods: {
    saveChange(){
      axios
      .put("http://localhost:3000/profile",{
          f_name:this.newf_name,
          l_name:this.newl_name,
          email:this.newemail,
          phone_number:this.newphone_number

      })

      .then((res) => {
        this.f_name = this.newf_name
        this.l_name = this.newl_name
        this.phone_number = this.newphone_number
        this.email = this.newemail
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
      this.isActive =  'false'
    },
    togglemodal(){
      this.isActive =  'is-active'
       this.newf_name = this.f_name
       this.newl_name = this.l_name
       this.newphone_number = this.phone_number
       this.newusername = this.username
       this.newemail = this.email
    },
    logout(){
        axios.delete("http://localhost:3000/logout")
        .then((res) => {
            console.log(res)
            this.f_name = ''
            this.l_name = ''
            this.phone_number = ''
            this.username = ''
            this.email = ''
        })
        .catch((eer) => console.log(eer))
    }
  },
  created() {
    axios
      .get("http://localhost:3000/login")
      .then((res) => {
       console.log(res.data)
       this.f_name = res.data.f_name
       this.l_name = res.data.l_name
       this.phone_number = res.data.phone_number
       this.username = res.data.username
       this.email = res.data.email
      })
      .catch((err) => {
        console.log(err);
      });
  },

};
</script>
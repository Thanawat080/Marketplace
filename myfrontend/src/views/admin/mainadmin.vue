<template>
  <div class="container is-max-desktop">
    <br /><br />
    <div class="columns">
      <div class="column is-one-third">
        <aside class="menu">
          <p class="menu-label">จัดการ</p>
          <ul class="menu-list">
            <router-link to="/mainadmin"><li>จัดการร้าน</li></router-link>
            <li><a href="event.html">จัดการกิจกรรม</a></li>
          </ul>
        </aside>
      </div>
      <div class="column is-two-thirds notification is-primary is-light">
        <div class="message-header">
          <p>จัดการร้าน</p>
        </div>
        <br />
        <table
          class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
          style="width: 100%"
        >
          <!-- Your table content -->
          <tbody >
            <tr v-for='(store,index) in stores' :key='store.id'>       
              <th>{{index+1}}</th>
              <td style="width: 25%">{{store.store_name}}</td>
              <td style="width: 25%">Report : {{store.reportnumber}}</td>
              <td style="width: 25%">
                <button class="button is-warning" @click="precon(store.seller_id)">ยืนยันตัวตน</button>
                <div v-if="seller_status == null"><span v-show="store.status" style="color:green;"><i class="fas fa-check" style="color:green;"></i> ยืนยันตัวตนแล้ว</span></div>
                <div v-else><span v-show="seller_status" style="color:green;"><i class="fas fa-check" style="color:green;"></i> ยืนยันตัวตนแล้ว</span></div>
              </td>
              <td style="width: 25%">
                <!-- <button class="button is-danger" @click="deletestore(store.id)">ลบร้านค้า</button> -->
              </td>
            </tr>
          </tbody>
        </table>

        <div class="modal" v-bind:class='isActive'>
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">ยืนยันตัวตน</p>
              <button class="delete" aria-label="close" @click="isActive = !isActive"></button>
            </header>
            <section class="modal-card-body">
              <!-- Content ... -->
              <center>
                <img
                 :src="'http://localhost:3000' + picidcard"
                />
                <p>เลขบัตรประชาชน :  {{idcard}} </p>
              </center>
            </section>
            <footer class="modal-card-foot">
              <button class="button is-success" @click="confirm">ยืนยัน</button>
              <button class="button" @click="cancle">ปฎิเสธ</button>
            </footer>
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
      stores:null,
      isActive: false,
      getid:'',
      idcard:'',
      picidcard:'',
      seller_status:null
    };
  },
  methods: {
    // deletestore(id){
    //    axios
    //     .delete(`http://localhost:3000/admin/deletestore/${id}`)
    //     .then((res) => {
    //       alert(res.data)
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    precon(id){
      this.getid = id
      this.isActive = 'is-active'
      axios
        .post("http://localhost:3000/admin/getseller", {
          id: this.getid,
        })
        .then((res) => {
          this.idcard = res.data.cardId
          this.picidcard = res.data.cardId_pic
        })
        .catch((err) => {
          console.log(err);
        });
    },
    confirm() {
      this.isActive = 'false'
      axios
        .post("http://localhost:3000/admin/status/true",{
          id: this.getid,
        })
        .then((res) => {
          alert("Confirmed success")
          this.seller_status = res.data.status
        })
        .catch((err) => {
          console.log(err);
        });
    },
      cancle() {
      this.isActive = 'false'
      axios
        .post("http://localhost:3000/admin/status/false",{
          id: this.getid,
        })
        .then((res) => {
          alert("Cancle success")
          this.seller_status = res.data.status     
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
    created() {
      axios
      .get("http://localhost:3000/admin/main")
      .then((response) => {
        this.stores = response.data
        console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
      });

  },
};
</script>

<template>
  <div class="container is-max-desktop">
    <br /><br />
    <div class="columns">
      <div class="column is-one-third">
        <aside class="menu">
          <p class="menu-label">จัดการ</p>
          <ul class="menu-list">
            <li><a href="index.html">จัดการร้าน</a></li>
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
          <tbody>
            <tr>
              <th>1</th>
              <td style="width: 25%">ชื่อร้าน</td>
              <td style="width: 25%">Report : 0</td>
              <td style="width: 25%">
                <button class="button is-warning">ยืนยันตัวตน</button
                ><button class="button is-warning" disabled>
                  ยืนยันตัวตนสำเร็จ
                </button>
              </td>
              <td style="width: 25%">
                <button class="button is-danger">ลบร้านค้า</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="modal">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">ยืนยันตัวตน</p>
              <button class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
              <!-- Content ... -->
              <center>
                <img
                  src="https://www.snnleasing.com/images/credit/namecard.png"
                />
                <p>เลขบัตรประชาชน : {{ ID - Card }}</p>
              </center>
            </section>
            <footer class="modal-card-foot">
              <button class="button is-success">ยืนยัน</button>
              <button class="button">ปฎิเสธ</button>
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
      username: "",
      password: "",
    };
  },
  methods: {
    cf_login() {
      axios
        .post("http://localhost:3000/login", {
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          if (res.data === "success") {
            axios
              .get("http://localhost:3000/login")
              .then(() => {
                this.$router.push({ name: "Home" });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

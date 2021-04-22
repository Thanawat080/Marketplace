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
                            <li><a href="index.html">หน้าหลัก</a></li>
                            <li><a href="rent.html">เช่าเปิดร้าน</a></li>
                            <li>
                            <router-link class="navbar-item mininav" to="/seller/addstore">กรอกข้อมูลร้านค้า</router-link>
                            </li>
                        </ul>
                        <p class="menu-label">
                            สินค้า
                        </p>
                        <ul class="menu-list">
                            <router-link class="navbar-item mininav" to="/seller/addproduct">เพิ่มสินค้า</router-link>
                            <router-link class="navbar-item mininav" to="/seller/edit">แก้ไขสินค้า</router-link>
                        </ul>
                    </aside>
                </div>

                <div class="column is-two-thirds notification is-primary is-light">
                    <div class="message-header">
                        <p>แก้ไขและลบสินค้า</p>
                    </div>
                    <br>
                    <div class="column is-full">
                        <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
                            style="width: 100%;">
                            <!-- Your table content -->
                            <tbody>
                                <tr>
                                    <th>1</th>
                                    <td style="width: 100%;">Test</td>
                                    <td><button class="button is-warning">แก้ไข</button></td>
                                    <td><button class="button is-danger">ลบสินค้า</button></td>
                                </tr>
                            </tbody>
                        </table>

                        <div class="modal">
                            <div class="modal-background"></div>
                            <div class="modal-card">
                                <header class="modal-card-head">
                                    <p class="modal-card-title">ลบสินค้า</p>
                                    <button class="delete" aria-label="close"></button>
                                </header>
                                <footer class="modal-card-foot">
                                    <button class="button is-danger">ลบ</button>
                                    <button class="button">ยกเลิก</button>
                                </footer>
                            </div>
                        </div>

                        <div class="modal is-active-">
                            <div class="modal-background"></div>
                            <div class="modal-card">
                              <header class="modal-card-head">
                                <p class="modal-card-title">แก้ไขสินค้า</p>
                                <button class="delete" aria-label="close"></button>
                              </header>
                              <section class="modal-card-body">
                                <!-- Content ... -->
                                <div class="column is-full">
                        
                                    <div class="file is-info is-boxed aligncenter">
                                        <label class="file-label">
                                          <input class="file-input" type="file" name="resume">
                                          <span class="file-cta">
                                            <span class="file-icon">
                                              <i class="fas fa-cloud-upload-alt"></i>
                                            </span>
                                            <span class="file-label">
                                              Upload pic…
                                            </span>
                                          </span>
                                        </label>
                                      </div>
            
                                    ชื่อสินค้า<input class="input" type="text" placeholder="ชื่อสินค้า">
                                    <div class="columns">
                                        <div class="column">
                                            ราคา<input class="input" type="text" placeholder="ราคา">
                                        </div>
                                        <div class="column">
                                            ราคาโปรโมชั่น *ใส่หรือไม่ใส่ก็ได้*<input class="input" type="text" placeholder="ราคาโปรโมชั่น">
                                        </div>
                                    </div>
                                    รายละเอียดสินค้า<textarea class="textarea" placeholder="รายละเอียดสินค้า" rows="5"></textarea>
                                    <br>
                                    <div class="select is-primary">
                                        <select>
                                          <option>Select categories</option>
                                          <option>XXX</option>
                                        </select>
                                      </div>
            
                                </div>
                              </section>
                              <footer class="modal-card-foot">
                                <button class="button is-success">ยืนยัน</button>
                                <button class="button">ยกเลิก</button>
                              </footer>
                            </div>
                          </div>

                    </div>
                </div>

            </div>

        </div>
</template>
<script>
// import axios from "axios";
export default {
  data() {
    return {
      product:[]
    };
  },
//   created(){
//       this.getproduct()
//   },
//   methods:{
//     addstore(){
//       axios
//       .put("http://localhost:3000/addstore",{
//           storename: this.store_name,
//           description: this.store_detail,
//           rent_type: this.rent_type
//       })
//       .then((res) => {
//         console.log(res)
//       })
//       .catch((err) => {
//          console.log(err);
//       });
//     }
//   }
};
</script>
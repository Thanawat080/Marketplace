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
                            <router-link to="/seller">หน้าหลัก</router-link>
                            <li>
                            <router-link  to="/seller/addstore">กรอกข้อมูลร้านค้า</router-link>
                            </li>
                        </ul>
                        <p class="menu-label">
                            สินค้า
                        </p>
                        <ul class="menu-list">
                            <router-link  to="/seller/addproduct">เพิ่มสินค้า</router-link>
                            <router-link  to="/seller/edit">แก้ไขสินค้า</router-link>
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
                                  <td>ลำดับ</td>
                                  <td>ชื่อสินค้า</td>
                                  <td>จำนวนคงเหลือ</td>
                                  <td></td>
                                  <td></td>
                                </tr>
                                <tr v-for='(value, index) in product' :key='value.id'>
                                    <th>{{index+1}}</th>
                                    <td style="width: 70%;">{{value.p_name}}</td>
                                    <td style="width: 100%;">{{value.quantity}}</td>
                                    <td><button class="button is-warning" @click="editproduct(value.id)">แก้ไข</button></td>
                                    <td><button class="button is-danger" @click="deleteproduct(value.id)">ลบสินค้า</button></td>
                                </tr>
                            </tbody>
                        </table>

                        <div class="modal" :class="{'is-active': deletestatus}">
                            <div class="modal-background"></div>
                            <div class="modal-card">
                                <header class="modal-card-head">
                                    <p class="modal-card-title">ลบสินค้า</p>
                                    <button class="delete" aria-label="close" @click="deletestatus = false"></button>
                                </header>
                                <footer class="modal-card-foot">
                                    <button class="button is-danger" @click="confirmDelete">ลบ</button>
                                    <button class="button" @click="deletestatus = false">ยกเลิก</button>
                                </footer>
                            </div>
                        </div>

                        <div class="modal" :class="{'is-active': editstatus}">
                            <div class="modal-background"></div>
                            <div class="modal-card">
                              <header class="modal-card-head">
                                <p class="modal-card-title">แก้ไขสินค้า</p>
                                <button class="delete" aria-label="close" @click="(editstatus = false)"></button>
                              </header>
                              <section class="modal-card-body ">
                                <!-- Content ... -->
                                <div class="column is-full">
            
                                    ชื่อสินค้า<input class="input" type="text" placeholder="ชื่อสินค้า" v-model="productEdit.p_name">
                                    <div class="columns">
                                        <div class="column">
                                            ราคา<input class="input" type="text" placeholder="ราคา" v-model="productEdit.price">
                                            <span style="color:red;">**ราคาที่แสดงเป็นราคาที่คิดกับeventในช่วงเวลานั้นๆ**</span>
                                        </div>
                                    </div>
                                    จำนวน<input class="input" type="number" placeholder="จำนวน" v-model="productEdit.quantity">
                                    รายละเอียดสินค้า<textarea class="textarea" placeholder="รายละเอียดสินค้า" rows="5" v-model="productEdit.description"></textarea>
                                    <br>
                                    <div class="select is-primary">
                                        <select v-model="category_name">
                                          <option v-for='value in category' :key='value.id'>{{value.category_name}}</option>
                                        </select>
                                      </div>
            
                                </div>
                              </section>
                              <footer class="modal-card-foot">
                                <button class="button is-success" @click='confirmEdit'>ยืนยัน</button>
                                <button class="button" @click="editstatus = false">ยกเลิก</button>
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
      product:[],
      deletestatus: false,
      idproduct:'',
      editstatus: false,
      category: [],
      productEdit:{},
      category_name: ''
    };
  },
  mounted(){
      this.getp()
      axios
      .get("http://localhost:3000/category")
      .then((res) => {
        this.category = res.data.name
      })
      .catch((err) => {
         console.log(err);
      });
  },
  methods:{
    getp(){
      axios
      .get("http://localhost:3000/getproduct")
      .then((res) => {
        this.product = res.data
        console.log(res.data)
      })
      .catch((err) => {
         console.log(err);
      });
    },
    deleteproduct(id){
      this.deletestatus = true
      this.idproduct = id
      console.log(id)
    },
    confirmDelete(){
      axios.delete(`http://localhost:3000/deleteproduct/${this.idproduct}`)
      .then((res)=>{
        console.log(res)
        this.getp()
        this.deletestatus = false
      }).catch((eer)=>{console.log(eer);});
    },
    editproduct(id){
      this.editstatus = true
      axios.get(`http://localhost:3000/getproduct/${id}`)
      .then((res)=>{
        console.log(res.data)
        this.productEdit = res.data
      })
      .catch((eer)=>{console.log(eer)});
    },
    confirmEdit(){
      axios.post(`http://localhost:3000/editproduct/${this.productEdit.id}`,{
        p_name: this.productEdit.p_name,
        price: this.productEdit.price,
        description: this.productEdit.description,
        quantity: this.productEdit.quantity,
        category: this.category_name
      })
      .then((res)=>{
        console.log(res)
        this.editstatus = false
        this.getp()
      })
      .catch((eer)=>{console.log(eer)});
      
    }
  }
};
</script>
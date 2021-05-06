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
          <p>แก้ไขและลบสินค้า</p>
        </div>
        <div class="column is-full box">
          <table
            class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
            style="width: 100%"
          >
            <!-- Your table content -->
            <tbody>
              <tr>
                <td>ลำดับ</td>
                <td>ชื่อสินค้า</td>
                <td>จำนวนคงเหลือ</td>
                <td>แก้ไข</td>
                <td>ลบ</td>
              </tr>
              <tr v-for="(value, index) in product" :key="value.id">
                <th>{{ index + 1 }}</th>
                <td style="width: 70%">{{ value.p_name }}</td>
                <td style="width: 100%">{{ value.quantity }}</td>
                <td>
                  <button
                    class="button is-warning"
                    @click="editproduct(value.id)"
                  >
                    แก้ไข
                  </button>
                </td>
                <td>
                  <button
                    class="button is-danger"
                    @click="deleteproduct(value.id)"
                  >
                    ลบสินค้า
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="modal" :class="{ 'is-active': deletestatus }">
            <div class="modal-background"></div>
            <div class="modal-card">
              <header class="modal-card-head">
                <p class="modal-card-title">ลบสินค้า</p>
                <button
                  class="delete"
                  aria-label="close"
                  @click="deletestatus = false"
                ></button>
              </header>
              <footer class="modal-card-foot">
                <button class="button is-danger" @click="confirmDelete">
                  ลบ
                </button>
                <button class="button" @click="deletestatus = false">
                  ยกเลิก
                </button>
              </footer>
            </div>
          </div>

          <div class="modal" :class="{ 'is-active': editstatus }">
            <div class="modal-background"></div>
            <div class="modal-card">
              <header class="modal-card-head">
                <p class="modal-card-title">แก้ไขสินค้า</p>
                <button
                  class="delete"
                  aria-label="close"
                  @click="editstatus = false"
                ></button>
              </header>
              <section class="modal-card-body">
                <!-- Content ... -->
                <div class="column is-full">
                  ชื่อสินค้า<input
                    class="input"
                    type="text"
                    placeholder="ชื่อสินค้า"
                    v-model="$v.p_name.$model"
                    :class="{ 'is-danger': $v.p_name.$error }"
                  />
                  <template v-if="$v.p_name.$error">
                    <p class="help is-danger" v-if="!$v.p_name.required">
                      This field is required
                    </p>
                  </template>
                  <div class="columns">
                    <div class="column">
                      ราคา<input
                        class="input"
                        type="text"
                        placeholder="ราคา"
                        v-model="$v.price.$model"
                        :class="{ 'is-danger': $v.price.$error }"
                      />
                      <template v-if="$v.price.$error">
                        <p class="help is-danger" v-if="!$v.price.required">
                          This field is required
                        </p>
                        <p class="help is-danger" v-if="!$v.price.price1">
                          Prices are numeric and less than 1 million.
                        </p>
                      </template>
                      <span style="color: red"
                        >**ราคาที่แสดงเป็นราคาที่คิดกับeventในช่วงเวลานั้นๆ**</span
                      >
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
                    :class="{ 'select is-danger': $v.category.$error }"
                    class="select is-primary"
                    style="width: 1000px"
                  >
                    <select v-model="$v.category.$model" style="width: 1000px">
                      <option v-for="value in categorys" :key="value.id">
                        {{ value.category_name }}
                      </option>
                    </select>
                    <template v-if="$v.category.$error">
                      <p class="help is-danger" v-if="!$v.category.required">
                        This field is required
                      </p>
                    </template>
                  </div>
                </div>
              </section>
              <footer class="modal-card-foot">
                <button class="button is-success" @click="confirmEdit">
                  ยืนยัน
                </button>
                <button class="button" @click="editstatus = false">
                  ยกเลิก
                </button>
              </footer>
            </div>
          </div>
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
  maxLength,
  numeric,
} from "vuelidate/lib/validators";
export default {
  data() {
    return {
      product: [],
      id:0,
      deletestatus: false,
      idproduct: "",
      editstatus: false,
      categorys: [],
      category_name: "",
      p_name: "",
      description: "",
      price: "",
      quantity: "",
      category: "",
    };
  },
  validations: {
    p_name: {
      required,
    },
    description: {
      required,
    },
    price: {
      required,
      maxLength: maxLength(6),
      numeric,
    },
    quantity: {
      required,
    },
    category: {
      required,
    },
  },
  mounted() {
    this.reset()
    this.getp()
  },
  methods: {
    reset() {
      axios
        .get("http://localhost:3000/category")
        .then((res) => {
          this.categorys = res.data.name;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getp() {
      axios
        .get("http://localhost:3000/getproduct")
        .then((res) => {
          this.product = res.data;
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteproduct(id) {
      this.deletestatus = true;
      this.idproduct = id;
      console.log(id);
    },
    confirmDelete() {
      axios
        .delete(`http://localhost:3000/deleteproduct/${this.idproduct}`)
        .then((res) => {
          console.log(res);
          this.getp();
          this.deletestatus = false;
        })
        .catch((eer) => {
          console.log(eer);
        });
    },
    editproduct(id) {
      this.editstatus = true;
      this.id = id 
      axios
        .get(`http://localhost:3000/getproduct/${id}`)
        .then((res) => {
          console.log(res.data);
          this.p_name = res.data.p_name;
          this.description = res.data.description;
          this.price = res.data.price;
          this.quantity = res.data.quantity;
        })
        .catch((eer) => {
          console.log(eer);
        });
    },
    confirmEdit() {
      axios
        .post(`http://localhost:3000/editproduct/${this.id}`, {
          p_name: this.p_name,
          price: this.price,
          description: this.description,
          quantity: this.quantity,
          category: this.category,
        })
        .then((res) => {
          this.getp()
          this.getp()
          console.log(res);
          this.editstatus = false;
 
        })
        .catch((eer) => {
          console.log(eer);
        });
    },
  },
};
</script>
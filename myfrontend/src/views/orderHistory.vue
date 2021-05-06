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
                        <p>ประวัติการซื้อ</p>
                    </div>
                    <div class="column is-full box">
                            <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
                                style="width: 100%;">
                                <!-- Your table content -->
                                <thead>
                                    <tr>
                                        <th>ลำดับ</th>
                                        <th>เวลา</th>
                                        <th>ราคารวม</th>
                                        <th>รายละเอียด</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(value, index) in history" :key="value.order_id" v-show="value.date != null">
                                        <th>{{index + 1}}</th>
                                        <td style="width: 50%;">{{value.date}}</td>
                                        <td>{{value.order_price}} บาท</td>
                                        <td style="width: 1%;"><button class="button is-info" @click="info(value.order_id)">รายละเอียด</button></td>
                                    </tr>
                                </tbody>
                            </table>

                    </div>
                </div>
            </div>
            <div class="modal" :class="isactive">
                <div class="modal-background"></div>
                    <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">รายละเอียดการสั่งซื้อ</p>
                        <button class="delete" aria-label="close" @click="isactive = !isactive"></button>
                    </header>
                <section class="modal-card-body">
                    <!-- Content ... -->
                    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
                            style="width: 100%;">
                            <!-- Your table content -->
                            <thead>
                                <tr>
                                    <th style="text-align: center;">ชื่อสินค้า</th>
                                    <th style="text-align: center;">จำนวน</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="value in products" :key="value.id">
                                    <td style="text-align: center;">{{value.p_name}}</td>
                                    <td style="text-align: center;">{{value.quantity}}</td>
                                </tr>
                            </tbody>
                        </table>
                </section>
            </div>
        </div>         
     </div> 
</template>

<script>
import axios from "axios";
export default {
    
    data(){
        return{
            history: [],
            products:[],
            isactive:false,
        }
    },
    created(){
        this.gethistory()
    },
    methods:{
        gethistory(){
             axios.get("http://localhost:3000/orderhistory")
            .then((res) => {
                this.history = res.data
            })
            .catch((err) => {
                console.log(err);
            });
        },info(order_id){
            this.isactive = 'is-active'
            axios.post(`http://localhost:3000/info/${order_id}`)
            .then((res) => {
                this.products = res.data
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }
}
</script>
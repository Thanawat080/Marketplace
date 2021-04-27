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
                    <br>
                    <div class="column is-full">

                        <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
                            style="width: 100%;">
                            <!-- Your table content -->
                            <tbody>
                                <tr v-for="(value, index) in history" :key="value.order_id" v-show="value.date != null">
                                    <th>{{index + 1}}</th>
                                    <td style="width: 50%;">{{value.date}}</td>
                                    <td>{{value.order_price}} บาท</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
     </div>
</template>

<script>
import axios from "axios";
export default {
    
    data(){
        return{
            history: []
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
        }
    }
}
</script>
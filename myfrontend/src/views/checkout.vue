<template>
    <div class="container is-max-desktop">
                <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth" style="width: 100%;">
                    <!-- Your table content -->
                    <tbody>
                        <tr v-for='value in orderdetail' :key="value.id">
                            <td style="width: 20%;">{{value.p_name}}</td>
                            <td style="width: 20%;">{{value.quantity}}</td>
                            <td style="width: 20%;">{{value.total_price}}</td>
                        </tr>
                    </tbody>
                </table>
                กรอกที่อยู่
                <textarea class="textarea" placeholder="กรอกที่อยู่" v-model="address"></textarea>
                <br>
                วิธีการจัดส่ง&nbsp;
                <div class="control">
                    <label class="radio">
                        <input type="radio" name="foobar">
                        Ems
                    </label>
                    <label class="radio">
                        <input type="radio" name="foobar" checked>
                        Kerry
                    </label>
                </div>
                <br>
                <button class="button is-success" @click="checkout">สั่งซื้อ</button>
        </div>
</template>

<script>
import axios from "axios";
export default {   
    data(){
        return{
            orderdetail: '',
            address: ''
        }
    },
    created(){
        this.getcheckout()
    },
    methods:{
        getcheckout(){
            axios.get(`http://localhost:3000/checkout`)
            .then((res) => {
                this.orderdetail = res.data
                console.log(this.orderdetail) 
            })
            .catch((eer) => {
                console.log(eer);
            });
        },
        checkout(){
            axios.post(`http://localhost:3000/order/${this.orderdetail[0].order_id}`,{
                address: this.address
            })
            .then((res) => {
                alert(res.data)
                axios.put(`http://localhost:3000/order`)
                .then(() => {
                    console.log('test')
                })
                .catch((eer) => {
                    console.log(eer);
                });
                this.$router.push({ name: "Home" });
                this.$parent._data.count = 0
            })
            .catch((eer) => {
                console.log(eer);
            });
        }
    }
}
</script>
<template>
    <div class="container">
        <br>
        <h1 class="title">Register</h1>
        <p class="aligncenter">Create an account or &nbsp;<router-link to="/login">sign in to</router-link>
        <br>
        <br>

        <div class="columns aligncenter">
            <div class="column is-4">
                <input class="input is-primary" type="text" placeholder="First Name" v-model="f_name">
            </div>
        </div>

        <div class="columns aligncenter">
            <div class="column is-4">
                <input class="input is-primary" type="text" placeholder="Last Name" v-model="l_name">
            </div>
        </div>

        <div class="columns aligncenter">
            <div class="column is-4">
                <input class="input is-primary" type="text" placeholder="User Name" v-model="username">
            </div>
        </div>

        <div class="columns aligncenter">
            <div class="column is-4">
                <input class="input is-primary" type="text" placeholder="Password" v-model="password">
            </div>
        </div>

        <div class="columns aligncenter">
            <div class="column is-4">
                <input class="input is-primary" type="text" placeholder="Confirm Password">
            </div>
        </div>

        <div class="columns aligncenter">
            <div class="column is-4">
                <input class="input is-primary" type="text" placeholder="Email" v-model="email">
            </div>
        </div>

        <div class="columns aligncenter">
            <div class="column is-4">
                <input class="input is-primary" type="text" placeholder="Phone number" v-model="phoneNum">
            </div>
        </div>

        <div class="columns aligncenter">
            <div class="control">
                <div class="select">
                    <select v-model="usertype">
                        <option>Select dropdown</option>
                        <option>Buyer</option>
                        <option>Seller</option>
                        <option>Owner_Marketplace</option>
                    </select>
                </div>
            </div>
        </div>

        <center><button class="button is-primary" @click="cf_register">Register</button></center>
        <br>

    </div>

</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
        f_name: '',
        l_name: '',
        username: '',
        password: '',
        email: '',
        phoneNum: '',
        usertype: '',
    };
  },
  methods:{
      cf_register(){  
        axios.post("http://localhost:3000/register", {
          f_name: this.f_name,
          l_name: this.l_name,
          username: this.username,
          password: this.password,
          email: this.email,
          phone_number: this.phoneNum,
          usertype: this.usertype
        })
        .then(() => {
            if(this.usertype == 'Buyer'){axios.post("http://localhost:3000/register/buyer")
            .then(()=>{this.$router.push({name: 'login'})})
            .catch((err) => {console.log(err);})}
            if(this.usertype == 'Seller'){axios.post("http://localhost:3000/register/seller")
            .then(()=>{this.$router.push({name: 'login'})})
            .catch((err) => {console.log(err);})}
            if(this.usertype == 'Owner_Marketplace'){axios.post("http://localhost:3000/register/owner_marketplace")
            .then(()=>{this.$router.push({name: 'login'})})
            .catch((err) => {console.log(err);})}
        })
        .catch((err) => {
          console.log(err);
        });
      }
  }
};
</script>

<style scoped>
</style>
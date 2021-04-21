<template>
  <div class="container">
        <br>
        <h1 class="title">Sign in</h1>
        <p class="aligncenter">Sign in to  or&nbsp;<a href="">create an account</a></p>
        <br>

        <div class="columns aligncenter">
            <div class="column is-4">
                <input class="input is-primary" type="text" placeholder="Username" v-model="username">
            </div>
        </div>

        <div class="columns aligncenter">
            <div class="column is-4">
                <input class="input is-primary" type="text" placeholder="Password" v-model="password">
            </div>
        </div>


        <center><button class="button is-primary" @click="cf_login">Login</button></center>

    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
      return {
          username:'',
          password:''
      }
    }, 
    methods:{
      cf_login(){  
        axios.post("http://localhost:3000/login", {
          username: this.username,
          password: this.password,
        })
      .then((res) => {
  
            axios
              .get("http://localhost:3000/login")
              .then(() => {
                this.$router.push({ name: "Home" });
              })
              .catch((err) => {
                console.log(err);
              });
   

        console.log(res.data)
 

      })
        .catch((err) => {
          console.log(err);
        });
      },
 
  }
  }

</script>

<style scoped>
</style>
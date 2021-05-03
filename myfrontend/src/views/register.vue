<template>
  <div class="container">
    <br />
    <h1 class="title">Register</h1>
    <p class="aligncenter">
      Create an account or &nbsp;<router-link to="/login"
        >sign in to</router-link
      >
      <br />
      <br />
    </p>
         <center><div class="field column is-4">
            <div class="control has-icons-left">
              <input  v-model="$v.f_name.$model" :class="{'is-danger': $v.f_name.$error}" class="input is-primary" placeholder="First Name" type="text" />
                <span class="icon is-small is-left">
                <i class="fas fa-file-signature"></i>
              </span>
            </div>
              <template v-if="$v.f_name.$error">
              <p class="help is-danger" v-if="!$v.f_name.required">This field is required</p>
              <p class="help is-danger" v-if="!$v.f_name.f_name">Invalid FirstName at least 5 characters</p>
              </template>
          </div></center>

         <center><div class="field column is-4">
            <div class="control has-icons-left">
              <input  v-model="$v.l_name.$model" :class="{'is-danger': $v.l_name.$error}" class="input is-primary" placeholder="Last Name" type="text" />
            <span class="icon is-small is-left">
                <i class="fas fa-file-signature"></i>
              </span>
            </div>
              <template v-if="$v.l_name.$error">
              <p class="help is-danger" v-if="!$v.l_name.required">This field is required</p>
              <p class="help is-danger" v-if="!$v.l_name.l_name">Invalid LastName at least 5 characters</p>
              </template>
          </div></center>
          

         <center><div class="field column is-4">
            <div class="control has-icons-left">
              <input  v-model="$v.username.$model" :class="{'is-danger': $v.username.$error}" class="input is-primary" placeholder="UserName" type="text" />
               <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </div>
              <template v-if="$v.username.$error">
              <p class="help is-danger" v-if="!$v.username.required">This field is required</p>
              <p class="help is-danger" v-if="!$v.username.username">Invalid username at least 5 characters</p>
              </template>
          </div></center>


         <center><div class="field column is-4">
            <div class="control has-icons-left">
              <input  v-model="$v.password.$model" :class="{'is-danger': $v.password.$error}" class="input is-primary" placeholder="Password" type="text" />
               <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </div>
              <template v-if="$v.password.$error">
              <p class="help is-danger" v-if="!$v.password.required">This field is required</p>
              <p class="help is-danger" v-if="!$v.password.password">Invalid password at least 8 characters and Must have lowercase, uppercase, numbers</p>
              </template>
          </div></center>


        <center><div class="field column is-4">
            <div class="control has-icons-left">
              <input  v-model="$v.confirm_password.$model" :class="{'is-danger': $v.confirm_password.$error}" class="input is-primary" placeholder="ConfirmPassword" type="text" />
               <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </div>
              <template v-if="$v.confirm_password.$error">
              <p class="help is-danger" v-if="!$v.confirm_password.required">This field is required</p>
              <p class="help is-danger" v-if="!$v.confirm_password.confirm_password">Invalid ConfirmPassword Must be the same as password</p>
              </template>
          </div></center>


        <center><div class="field column is-4">
            <div class="control has-icons-left">
              <input  v-model="$v.email.$model" :class="{'is-danger': $v.email.$error}" class="input is-primary" placeholder="Email" type="text" />
               <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </div>
              <template v-if="$v.email.$error">
              <p class="help is-danger" v-if="!$v.email.required">This field is required</p>
              <p class="help is-danger" v-if="!$v.email.email">Invalid Email Must be the same as the form of Email</p>
              </template>
          </div></center>

        <center><div class="field column is-4">
            <div class="control has-icons-left">
              <input  v-model="$v.phoneNum.$model" :class="{'is-danger': $v.phoneNum.$error}" class="input is-primary" placeholder="Phone" type="text" />
               <span class="icon is-small is-left">
                <i class="fas fa-mobile"></i>
              </span>
            </div>
              <template v-if="$v.phoneNum.$error">
              <p class="help is-danger" v-if="!$v.phoneNum.required">This field is required</p>
              <p class="help is-danger" v-if="!$v.phoneNum.phoneNum">Invalid phone number, there must be 10 numbers and 0 is the first number</p>
              </template>
        </div></center>

        <center><div class="field column is-4">
            <div :class="{'select is-danger': $v.usertype.$error}" class="select is-primary" style="width:1000px;">
              <select v-model="$v.usertype.$model" style="width:1000px;"> 
                <option>Select dropdown</option>
                <option value="buyer">buyer</option>
                <option value="seller">seller</option>
              </select>
            </div>
              <template v-if="$v.usertype.$error">
              <p class="help is-danger" v-if="!$v.usertype.usertype">Invalid usertype must be select buyer type or seller type</p>
              </template>
        </div></center>



    <center>
      <button class="button is-primary" @click="cf_register">Register</button>
    </center>
    <br />
  </div>
</template>

<script>
import axios from "axios";
import { required, email, minLength, sameAs, maxLength } from "vuelidate/lib/validators";

function phoneNum(value) {
    return !!value.match(/0[0-9]{9}/);
}

function complexPassword(value) {
  if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
    return false;
  }
  return true;
}

function usertype(value) {
  if(value == "buyer" || value == "seller") {
    return true;
  }
  return false;
}

export default {
  data() {
    return {
      f_name: "",
      l_name: "",
      username: "",
      password: "",
      email: "",
      phoneNum: "",
      usertype: "",
      confirm_password:"",
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    usertype: {
      required,
      usertype: usertype
    },
    phoneNum: {
      required: required,
      phoneNum: phoneNum,
      maxLength: maxLength(10)
    },
    password: {
      required: required,
      minLength: minLength(8),
      complex: complexPassword,
    },
    confirm_password: {
      sameAs: sameAs("password"),
    },
    username: {
      required: required,
      minLength: minLength(5),
    },
    f_name: {
      required: required,
      minLength: minLength(5)
    },
    l_name: {
      required: required,
      minLength: minLength(5)
    },
  },
  methods: {
      cf_register() {
         this.$v.$touch();
        if (!this.$v.$invalid) {
         let data = {
          confirm_password: this.confirm_password,
          f_name: this.f_name,
          l_name: this.l_name,
          username: this.username,
          password: this.password,
          email: this.email,
          phone_number: this.phoneNum,
          usertype: this.usertype,
         }

     axios
        .post("http://localhost:3000/register",data)
        .then(() => {
          if (this.usertype == "buyer") {
            axios
              .post("http://localhost:3000/register/buyer")
              .then(() => {
                this.$router.push({ name: "login" });
              })
              .catch((err) => {
                console.log(err);
              });
          }
          if (this.usertype == "seller") {
            axios
              .post("http://localhost:3000/register/seller")
              .then(() => {
                this.$router.push({ name: "login" });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    
        } 
        },
    }
};
</script>

<style scoped>
</style>



 
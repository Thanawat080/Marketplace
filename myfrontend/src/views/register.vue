<template>
  <div class="container">
    <br />
    <center>
      Create an account or
      <router-link to="/login" >
        sign in
      </router-link>
    </center>
    <br>
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <div class="box">
          <div class="field">
            <label class="label">First Name</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="First Name"
                v-model="$v.f_name.$model" :class="{'is-danger': $v.f_name.$error}"/>
            </div>
            <template v-if="$v.f_name.$error">
              <p class="help is-danger" v-if="!$v.f_name.required">This field is required</p>
              <p class="help is-danger" v-if="!$v.f_name.f_name">Invalid FirstName at least 5 characters</p>
              </template>
          </div>

          <div class="field">
            <label class="label">Last Name</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Last Name"
                v-model="$v.l_name.$model" :class="{'is-danger': $v.l_name.$error}"/>
            </div>
            <template v-if="$v.l_name.$error">
              <p class="help is-danger" v-if="!$v.l_name.required">This field is required</p>
              <p class="help is-danger" v-if="!$v.l_name.l_name">Invalid LastName at least 5 characters</p>
              </template>
          </div>

          <div class="field">
            <label class="label">Username</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Username"
                v-model="$v.username.$model" :class="{'is-danger': $v.username.$error}"/>
            </div>
            <template v-if="$v.username.$error">
              <p class="help is-danger" v-if="!$v.username.required">This field is required</p>
              <p class="help is-danger" v-if="!$v.username.username">Invalid username at least 5 characters</p>
              </template>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input class="input" type="password" placeholder="********" v-model="$v.password.$model" :class="{'is-danger': $v.password.$error}"/>
            </div>
            <template v-if="$v.password.$error">
              <p class="help is-danger" v-if="!$v.password.required">This field is required</p>
              <p class="help is-danger" v-if="!$v.password.password">Invalid password at least 8 characters and Must have lowercase, uppercase, numbers</p>
              </template>
          </div>

          <div class="field">
            <label class="label">Confirm Password</label>
            <div class="control">
              <input class="input" type="password" placeholder="********" v-model="$v.confirm_password.$model" :class="{'is-danger': $v.confirm_password.$error}"/>
            </div>
            <template v-if="$v.confirm_password.$error">
              <p class="help is-danger" v-if="!$v.confirm_password.required">This field is required</p>
              <p class="help is-danger" v-if="!$v.confirm_password.confirm_password">Invalid ConfirmPassword Must be the same as password</p>
              </template>
          </div>

          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input class="input" type="email" placeholder="Email" v-model="$v.email.$model" :class="{'is-danger': $v.email.$error}"/>
            </div>
            <template v-if="$v.email.$error">
              <p class="help is-danger" v-if="!$v.email.required">This field is required</p>
              <p class="help is-danger" v-if="!$v.email.email">Invalid Email Must be the same as the form of Email</p>
              </template>
          </div>

          <div class="field">
            <label class="label">Phone</label>
            <div class="control">
              <input class="input" type="text" placeholder="0XX-XXX-XXXX" v-model="$v.phoneNum.$model" :class="{'is-danger': $v.phoneNum.$error}"/>
            </div>
            <template v-if="$v.phoneNum.$error">
              <p class="help is-danger" v-if="!$v.phoneNum.required">This field is required</p>
              <p class="help is-danger" v-if="!$v.phoneNum.phoneNum">Invalid phone number, there must be 10 numbers and 0 is the first number</p>
              </template>
          </div>

          <div class="field">
            <label class="label">Status</label>
            <div class="control">
              <div class="select">
                <select v-model="$v.usertype.$model">
                  <option value>Select Status</option>
                  <option value="buyer">buyer</option>
                  <option value="seller">seller</option>
                </select>
              </div>
            </div>
            <template v-if="$v.usertype.$error">
              <p class="help is-danger" v-if="!$v.usertype.usertype">Invalid usertype must be select buyer type or seller type</p>
              </template>
          </div>

          <button class="button is-primary" @click="cf_register">Register</button>
        </div>
      </div>
    </div>
    <br>
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



 

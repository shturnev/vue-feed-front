<template>
  <div class="login-cont">

    {{$store.state.ttt}}


    <div :class="show ? 'form-cont show' : 'form-cont'">

      <transition
        duration="300"
        mode="out-in"
        enter-active-class="animated fadeIn"
        leave-active-class="animated zoomOut"
      >
        <div v-if="!login" key="one">
          <input v-model="email" type="text" placeholder="Email">
          <input v-model="pass" type="password" placeholder="Password">
          <button @click="get_login">Login</button>
        </div>
        <div v-else key="two">
          <a href="#"><i class="material-icons">exposure_plus_1</i></a>
          <button class="mt-10" @click="login = false">Logout</button>
        </div>
      </transition>
    </div>
    <a href="#" class="tymbler" @click.prevent="show = !show">
      <i class="material-icons" v-text="show ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"></i></a>

  </div>
</template>

<script>
  export default {
    name: "login-cont",
    data(){
      return {
        show: false,
        login: false,
        email: null,
        pass: null
      }
    },
    methods: {
      get_login(){
        let url = "https://vue-feed-api.makenow.com.ua/api/";

        let body = {
          method_name: "client_get",
          m: 2,
          email: this.email,
          pass: this.pass,
          public_key: "fd0defd4701f2d1e18a9a311a0f2339035f0ba6439eee009ec947000adbcf67a"
        }

        this.$http.post(url, body).then(res => {
          console.log("всё ок", res);
        }, err => {
          console.log("всё плохо", err);
        });

      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/styles/settings";

  .login-cont{
    position: absolute;
    right: 10%;

    .form-cont{
      width: 250px;
      height: 150px;
      background-color: #fff;
      border: 1px solid $green;
      border-top: 0;
      border-radius: 0 0 5px 5px;
      box-sizing: border-box;
      margin-top: -150px;
      transition: all 0.5s ease;

      &.show{
        margin-top: 0;
      }
      &>div{
        height: inherit;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      input{
        width: 85%;
        padding: 5px 10px;
        box-sizing: border-box;
        font-size: 14px;
        color: $green;

        border: 1px solid $green;
        background-color:#fff;
        outline: none;
        margin-bottom: 10px;
      }
      button{
        padding: 5px 20px;
        font-size: 14px;
        color: $green;
        background-color: white;
        border: 1px solid $green;
        border-radius: 3px;
        cursor: pointer;
        outline: none;

        &:hover{
          background-color: $green;
          color: white;
        }
      }
      a{
        color: $green;
        text-decoration:none;

        i{
          font-size: 38px;
        }

        &:hover{
          color: $green_light;
        }
      }
    }
    .tymbler{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 25px;
      width: 55px;
      text-decoration: none;
      color: $green;
      background-color:#fff;
      border: 1px solid $green;
      border-top: 0;
      border-radius: 0 0 5px 5px;
      margin: -1px auto 0;

      i{
        font-size: 28px;
      }

      &:hover{
        i{
          font-size: 30px;
        }
      }

    }
  }

</style>
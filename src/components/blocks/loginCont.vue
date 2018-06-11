<template>
  <div class="login-cont">

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
          <router-link to="/add"><i class="material-icons">exposure_plus_1</i></router-link>
          <button class="mt-10" @click="logout">Logout</button>
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
        email: null,
        pass: null
      }
    },
    computed:{
      login(){
        return this.$store.state.private_key;
      }
    },
    methods: {
      get_login(){

        let body = {
          method_name: "client_get",
          m: 2,
          email: this.email,
          pass: this.pass,
        }

        this.$store.dispatch("api", body).then(res => {
          console.log(res);
          if(!res.response){
            alert('Такого пользователя нет');
            return false;
          }
          let key = res.response[0].private_key;
          this.$store.commit('set', ['private_key', key]);
          localStorage.setItem('private_key', key);
        }, err =>{
          alert(err);
          localStorage.removeItem('private_key');
          this.$store.commit('set', ['private_key', null]);
        });

      },
      logout(){
        localStorage.removeItem('private_key');
        this.$store.commit('set', ['private_key', null]);
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
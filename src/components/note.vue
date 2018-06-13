<template>
  <div>
    <div style="height: 100px;"></div>
    <a href="#" @click.prevent="$router.back()" class="return-link"><i class="material-icons">reply</i> Вернуться</a>
    <div style="height: 100px;"></div>

    <div v-if="note">
      <div class="title">
        {{note.title ? note.title : '***'}}
        <sup v-if="note.protected"><i class="material-icons" style="font-size: 18px;">https</i></sup>
      </div>
      <div class="text" v-html="note.text"></div>

      <div class="adm-buttons mt-55" v-if="auth">
        <router-link :to="`/edit/${note.id}`"><i class="material-icons">mode_edit</i></router-link>
        <a href="" @click.prevent="delete_note"><i class="material-icons">delete</i></a>
        <a href="" @click.prevent="set_up"><i class="material-icons">flight</i></a>
      </div>
    </div>


  </div>
</template>

<script>
  export default {
    name: "note",
    data(){
      return{
        note: null
      }
    },
    computed: {
      auth(){ return this.$store.state.private_key; }
    },
    watch:{
      auth: 'get_note',
    },
    methods:{
      get_note(){
        let body = {
          method_name: "feed_get",
          m: 1,
          id: this.$route.params.id,
          private_key: this.$store.state.private_key,
        }

        this.$store.dispatch("api", body).then(res => {
          if(!res.response){
            this.note = null;
          }
          else
          {
            this.note = res.response;
          }
        }, err => {
          alert(err);
        });
      },
      delete_note(){
        if(!confirm("Удалить?")){ return false; }

        let body = {
          method_name: "feed_delete",
          private_key: this.auth,
          id: this.note.id
        }

        this.$store.dispatch("api", body).then(res => {
          if(res.response){
            this.$router.go(-1)
          }
        }, err => {
          alert(err)
        });
      },
      set_up(){
        if(!confirm("Поднять?")){ return false; }

        let body = {
          method_name: "feed_up",
          private_key: this.auth,
          id: this.note.id
        }

        this.$store.dispatch("api", body).then(res => {
          if(res.response){
            alert("Всё ок")
          }
        }, err => {
          alert(err)
        });
      },

    },
    created(){
      this.get_note();
    }

  }
</script>

<style scoped lang="scss">
  @import "../assets/styles/settings";

  .title{
    font-size: 26px;
    color: $green;
    display:block;
    margin-bottom: 15px;
  }

  .text{
    font-size: 16px;
    line-height: 1.5;
    position: relative;

    a{
      color: $green;

      &:hover{
        color: $green_light;
      }
    }
    img{
      max-width: 100%;
    }
    &.closed{
      overflow: hidden;
      max-height: 180px;

      &:after{
        content: '';
        display:block;
        left: 0;
        bottom: 0;
        position: absolute;
        width: 100%;
        height: 50px;
        background: linear-gradient(to bottom, rgba(white, 0), $bgc);
      }
    }
  }
  .adm-buttons{
    text-align: center;

    a{
      display: inline-block;
      margin: 0 10px;
      color: #414141;

      &:hover{
        color: $green_light;
      }

      i{
        font-size: 28px;
      }
    }
  }


</style>
<template>
  <div>
    <div style="height: 100px;"></div>

    <a href="#" @click.prevent="$router.back()" class="return-link"><i class="material-icons">reply</i> Вернуться</a>
    <br><br>
    <input type="text" placeholder="title" v-model="title">

    <br>
    <br>
    <switches v-model="protected" type-bold="true" :color="protected ? 'green' : 'red'"></switches>

    <br><br>
    <vue-ckeditor v-model="text"></vue-ckeditor>
    <br><br>
    <div style="text-align: right;">
      <button @click="send_form" v-text="$route.params.id ? 'Редактировать' : 'Добавить'"></button>
    </div>

    <div style="height: 100px;"></div>

  </div>
</template>

<script>
  import Switches from 'vue-switches';

  export default {
    name: "add_edit_note",
    components: {Switches},
    data(){
      return {
        protected: false,
        text: "",
        title: "",
      }
    },
    methods:{
      send_form(){
        if(!this.$route.params.id){
          this.add();
        }
        else{
          this.edit();
        }
      },
      add(){
        let body = {
          method_name: "feed_add",
          private_key: this.$store.state.private_key,
          title: this.title,
          text: this.text,
          protected: this.protected
        }

        this.$store.dispatch('api', body).then(res => {
          if(res.response.id){
            this.$router.push("/");
          }
        }, err => {
          alert(err);
        });

      },
      edit(){
        let body = {
          method_name: "feed_edit",
          private_key: this.$store.state.private_key,
          title: this.title,
          text: this.text,
          id: this.$route.params.id,
          protected: this.protected
        }

        this.$store.dispatch('api', body).then(res => {
          this.$router.go(-1);
        }, err => {
          alert(err)
        });
      },
      get_item(id){
        let body = {
          method_name: "feed_get",
          m: 1,
          id,
          private_key: this.$store.state.private_key
        }

        this.$store.dispatch('api', body).then(res => {
          if(!res.response){
            alert("Ошибка: пустой ответ от сервера");
            return false;
          }

          this.title = res.response.title;
          this.text = res.response.text;
          this.protected = res.response.protected;

          console.log(res);
        }, err => {
          alert(err);
        });

      }
    },
    created(){
      if(this.$route.params.id){
        this.get_item(this.$route.params.id);
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/styles/settings";

  input{
    display:block;
    width: 100%;
    padding: 10px 10px;
    border: 1px solid $green;
    border-radius: 5px;
    outline: none;
    box-sizing: border-box;
    font-size: 16px;
  }

  button{
    -webkit-appearance: none;
    outline: none;
    padding: 10px 25px;
    border: 1px solid $green;
    font-size: 14px;
    color: $green;
    background-color: transparent;
    border-radius: 5px;
    cursor: pointer;

    &:hover{
      background-color: $green;
      color: white;
    }
  }
</style>
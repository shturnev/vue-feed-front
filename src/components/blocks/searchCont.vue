<template>
  <div class="search-cont">
    <input @keyup.enter="set_search" type="text" placeholder="search" v-model="search_str">
    <button @click="set_search"><i class="material-icons">search</i></button>
  </div>
</template>

<script>
  export default {
    name: "search-cont",
    data(){
      return{
        search_str: null
      }
    },
    computed:{
      search:{
        get(){
          return this.$store.state.search;
        },
        set(data){
          this.$store.commit('set', ['search', data]);
        }
      }
    },
    methods: {
      set_search(){
        this.search = this.search_str;
      }
    },
    created(){
      this.search_str = this.search;
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/styles/settings";

  .search-cont{
    display: flex;
    height: 40px;

    input{
      flex: 1;
      padding: 6px 10px;
      font-size: 14px;
      color: $green;
      outline: none;
      border: 1px solid $green;
      border-right: 0;
      border-radius: 5px 0 0 5px;
    }
    button{
      -webkit-appearance: none;
      width: 50px;
      background:white;
      border: 1px solid $green;
      border-left: 0;
      border-radius: 0 5px 5px 0;
      outline: none;
      color: $green;
      cursor: pointer;

      i{
        font-size: 28px;
      }
      &:hover{
        background-color: $green_light;
        color: white;
      }

    }
  }
</style>
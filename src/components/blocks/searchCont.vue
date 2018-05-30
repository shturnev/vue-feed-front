<template>
  <div class="search-cont">
    <input type="text" placeholder="search">
    <button><i class="material-icons">search</i></button>
  </div>
</template>

<script>
  export default {
    name: "search-cont"
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
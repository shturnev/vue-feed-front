<template>
  <ul v-if="stack">
    <li v-if="stack.first">
      <router-link :to="url + '?page=1'"><i class="material-icons">skip_previous</i></router-link>
    </li>
    <li v-if="stack.prev">
      <router-link :to="url + '?page=' + stack.prev"><i class="material-icons" style="transform: rotate(-180deg)">play_arrow</i></router-link>
    </li>
    <li v-for="i in stack.left">
      <router-link :to="url + '?page=' + i">{{i}}</router-link>
    </li>
    <li>
      <span>{{stack.center}}</span>
    </li>
    <li v-for="i in stack.right">
      <router-link :to="url + '?page=' + i">{{i}}</router-link>
    </li>
    <li v-if="stack.next">
      <router-link :to="url + '?page=' + stack.next"><i class="material-icons">play_arrow</i></router-link>
    </li>
    <li v-if="stack.last != stack.center">
      <router-link :to="url + '?page=' + stack.last"><i class="material-icons">skip_next</i></router-link>
    </li>

  </ul>
</template>

<script>
  export default {
    name: "pagination",
    props: ['stack', 'url'],
    computed: {
      page(){ return this.$route.query.page; }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/styles/settings";

  ul{
    list-style: none;
    margin: 0;
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    li{
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 3px;

      a{
        display:block;
        padding: 6px 10px;
        font-size: 16px;
        color: #414141;
        text-decoration: none;
        border-radius: 3px;

        i{
          font-size: 18px;
          vertical-align: middle;
        }

        &:hover{
          background-color: $green;
          color: white;
        }
      }
      span{
        padding: 6px 10px;
        color: white;
        background-color: $green;
        border-radius: 3px;
      }
    }
  }
</style>
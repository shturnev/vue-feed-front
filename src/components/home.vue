<template>
  <div>
    <div style="height: 100px;"></div>
    <searchCont />
    <div style="height: 100px;"></div>


    <ul class="notes" v-if="notes">
      <li v-for="note, index in notes">
        <router-link :to="`/${note.id}`" class="title">
          {{note.title ? note.title : '***'}}
          <sup v-if="note.protected"><i class="material-icons" style="font-size: 18px;">https</i></sup>
        </router-link>
        <div :class="note.tymbler ? 'item-cont' : 'item-cont closed'" v-html="note.text"></div>
        <div :class="note.tymbler ? 'tymbler active' : 'tymbler'" @click="set_tymbler(index)">
          <svg xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="0" x2="50%" y2="28"></line>
            <line x1="50%" y1="28" x2="100%" y2="0"></line>
          </svg>
        </div>
        <div class="adm-buttons mt-15" v-if="auth">
          <router-link :to="`/edit/${note.id}`"><i class="material-icons">mode_edit</i></router-link>
          <a href="" @click.prevent="delete_note(index)"><i class="material-icons">delete</i></a>
          <a href="" @click.prevent="set_up(index)"><i class="material-icons">flight</i></a>
        </div>
      </li>
    </ul>

    <div style="height: 100px;"></div>

    <div style="text-align: center;" v-if="stack">
      <pagination :stack="stack" url="/" />
    </div>


  </div>
</template>

<script>
  import searchCont from './blocks/searchCont';
  import pagination from './blocks/pagination';

  export default {
    name: "home",
    components: {searchCont, pagination},
    data(){
      return {
        notes: null,
        stack: null
      }
    },
    computed: {
      search(){ return this.$store.state.search; },
      auth(){ return this.$store.state.private_key; },
      page(){ return this.$route.query.page; }
    },
    watch:{
      search: 'get_notes',
      auth: 'get_notes',
      page: 'get_notes',
    },
    methods: {
      get_notes(){
        let body = {
          method_name: "feed_get",
          m: 2,
          limit: 2,
          page: this.$route.query.page,
          private_key: this.$store.state.private_key,
          search: this.search
        }

        this.$store.dispatch("api", body).then(res => {
          if(!res.response){
            this.notes = null;
            this.stack = null;
          }
          else
          {
            this.notes = res.response.items;
            this.stack = res.response.stack;
          }
        }, err => {
          alert(err);
        });
      },
      set_tymbler(i){
        let val = !this.notes[i].tymbler;
        this.$set(this.notes[i], 'tymbler', val);
      },
      delete_note(i){
        if(!confirm("Удалить?")){ return false; }

        let body = {
          method_name: "feed_delete",
          private_key: this.auth,
          id: this.notes[i].id
        }

        this.$store.dispatch("api", body).then(res => {
          if(res.response){
            this.notes.splice(i, 1);
          }
        }, err => {
          alert(err)
        });
      },
      set_up(i){
        if(!confirm("Поднять?")){ return false; }

        let body = {
          method_name: "feed_up",
          private_key: this.auth,
          id: this.notes[i].id
        }

        this.$store.dispatch("api", body).then(res => {
          if(res.response){
            this.get_notes()
          }
        }, err => {
          alert(err)
        });
      },

    },
    created(){
      this.get_notes();
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/styles/settings";

  .notes{
    list-style: none;
    padding: 0;
    margin: 0;

    &>li{
      .title{
        font-size: 26px;
        color: $green;
        display:block;
        margin-bottom: 15px;

        &:hover{
          color: $green_light;
        }
      }
      .item-cont{
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
      .tymbler{
        max-width: 650px;
        margin: 20px auto 0 auto;
        display: flex;
        height: 50px;
        cursor: pointer;
        opacity: 0.7;

        &:hover{
          opacity: 1;
        }
        svg{
          flex: 1;
          height: inherit;
          stroke-width: 1px;
          stroke: #414141;

        }
        &.active{
          svg{
            transform: rotate(-180deg);
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
    }
  }

</style>
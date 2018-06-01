<template>
  <div>
    {{$store.state.ttt}}
    <div style="height: 100px;"></div>
    <searchCont />
    <div style="height: 100px;"></div>


    <ul class="notes">
      <li>
        <a href="#" class="title">Lorem ipsum dolor.</a>
        <div class="item-cont closed">
          <ul>
            <li v-for="i in 50">
              <a href="#">Lorem ipsum dolor sit amet.</a>
            </li>

          </ul>
        </div>
        <div class="tymbler">
          <svg xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="0" x2="50%" y2="28"></line>
            <line x1="50%" y1="28" x2="100%" y2="0"></line>
          </svg>
        </div>
        <div class="adm-buttons mt-15">
          <a href="#"><i class="material-icons">mode_edit</i></a>
          <a href="#"><i class="material-icons">delete</i></a>
          <a href="#"><i class="material-icons">flight</i></a>
        </div>
      </li>
    </ul>


  </div>
</template>

<script>
  import searchCont from './blocks/searchCont';

  export default {
    name: "home",
    components: {searchCont}
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
        color: green;
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
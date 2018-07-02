<template>
  <div id="app">
    <loginCont />

    <transition mode="out-in"
                duration="300"
                leave-active-class="animated fadeOut" enter-active-class="animated fadeIn">
     <router-view/>
    </transition>

  </div>
</template>

<script>
  import loginCont from './components/blocks/loginCont';

export default {
  name: 'App',
  components: {loginCont}
}
</script>

<style >

</style>

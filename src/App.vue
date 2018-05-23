<template>
  <div id="app">
    <loginCont />
    <router-view/>
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

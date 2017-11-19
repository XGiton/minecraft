<template>
  <div id="app">
    <div class="layout-nav">
      <HeaderComponent></HeaderComponent>
    </div>
    <div class="layout-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import HeaderComponent from './components/Header'
export default {
  name: 'app',

  components: {
    HeaderComponent
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

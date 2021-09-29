<template>
  <div id="app">
    <HelloWorld />
    <HelloWorld />
  </div>
</template>

<script>
import axios from "axios";
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data:()=>({
     users:[]
  }),
  async created() {
     const {data} = await axios.get("http://localhost:3000/users");
     console.log('Data Is',data)  
     
     }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
   display: flex;
    justify-content: space-evenly;
}
</style>

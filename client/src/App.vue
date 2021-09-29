<template>
  <div id="app">
    <HelloWorld v-for="user in mockedUsers" :key=user.deviceId :user-details="user" />
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
     mockedUsers:[{"username":"yonarbel","deviceId":"22715","imageUrl":"yonatana","displayName":"Yonatan Arbel",age:34},{"username":"danielk","deviceId":"22968","imageUrl":"daniel","displayName":"Daniel Keler",age:36}]
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

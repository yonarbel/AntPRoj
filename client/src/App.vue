<template>
  <div id="app">
    <HelloWorld
      v-for="user in mockedUsers"
      :current-heart-beat-details="heartBeat[user.deviceId]"
      :key="user.deviceId"
      :user-details="user"
    />
  </div>
</template>

<script>
import axios from "axios";
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  data: () => ({
    heartBeat: {},
    mockedUsers: [
      {
        username: "yonarbel",
        deviceId: "22715",
        imageUrl: "yonatana",
        displayName: "Yonatan Arbel",
        age: 34,
      },
      {
        username: "danielk",
        deviceId: "22968",
        imageUrl: "daniel",
        displayName: "Daniel Keler",
        age: 36,
      },
    ],
  }),
  async created() {
    const { data } = await axios.get("/api/users");
    console.log("Data Is", data);
    this.$options.sockets.onmessage = ({ data }) => {
      const { DeviceID, ComputedHeartRate } = JSON.parse(data);
      this.$set(this.heartBeat, DeviceID, {ComputedHeartRate,timestamp:Date.now()});
    };
  },
};
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

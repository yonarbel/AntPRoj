<template>
  <div class="hello">
    <label>Current HeartRate</label>
    <input type="number" v-model="currentVal" />
    <br/>
     <label>Current age</label>
     <input type="number" min="18" v-model="age" />
     <br/>
    
    Val is {{ currentVal }}<br/>
    Effort in percent: {{parsedVal}} <br/>
    Your MHR is: {{MHR}}
    <vue-speedometer
      :needleHeightRatio="0.7"
      :maxValue="100"
      :minValue="25"
      :height="180"
      :maxSegmentLabels="5"
      :segments="3"
      :currentValueText="currentEffortText"
      :customSegmentStops="[25, 50, 70, 90, 100]"
      :segmentColors="['#1fcaff', '#1b94bb', '#f38f26', '#ff240c', 'yellow']"
      :value="parsedVal"
      :customSegmentLabels="[
        {
          text: 'Very light',
          position: 'INSIDE',
          fontSize: '12px',
          color: '#fff',
        },
        {
          text: 'Light',
          position: 'INSIDE',
          color: '#fff',
          fontSize: '12px',
        },
        {
          text: 'Moderate',
          position: 'INSIDE',
          color: '#fff',
          fontSize: '12px',
        },
        {
          text: 'Hard',
          position: 'INSIDE',
          color: '#fff',
          fontSize: '12px',
        },
      ]"
      textColor="black"
    />
     <img src="../assets/yonatana.jpeg" />
  </div>
</template>

<script>
import VueSpeedometer from "vue-speedometer";
export default {
  name: "HelloWorld",
  components: { VueSpeedometer },
  props: {
    userDetails: Object,
  },
  data: () => ({
    currentVal: 55,
    age:16,
    
  }),
  created() {
    
  },
  computed: {
    parsedVal() {
      if(this.currentVal < 50) return 25;
      return parseInt(100 * (this.currentVal / this.MHR));
    },
    MHR(){
       return 220 - this.age;
    },
    currentEffortText() {
      if (this.parsedVal < 50) return "Still resting ah?";
      if (this.parsedVal < 70) return "Looks like someone is warming up!";
      if (this.parsedVal < 90) return "You are on the burn calories zone!";
       if (this.parsedVal > 90 &&  this.parsedVal < 100) return "Someone is working on stamina!";
      return "Slow down tiger! take it easy";
    },
  },
};
</script>

<style scoped>
img {
    width: 130px;
    border-radius: 50%;
}

</style>
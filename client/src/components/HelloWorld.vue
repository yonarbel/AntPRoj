<template>
  <div class="widget" :class="{'is-available':isAvailable}">
    Your MHR is: {{ MHR }}
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
    <img :src="require(`@/assets/${userDetails.imageUrl}.jpeg`)" />
    <small>{{ userDetails.displayName }} ({{ userDetails.deviceId }})</small>
    <div class="center">
      <div class="pulse"></div>
      Current Heart Rate: {{ currentHeartBeat }}
    </div>
    <div class="center">
      <div>Effort Level (%):</div>
      {{ parsedVal }}
    </div>
  </div>
</template>

<script>
import VueSpeedometer from "vue-speedometer";
export default {
  name: "HelloWorld",
  components: { VueSpeedometer },
  props: {
    userDetails: Object,
    currentHeartBeatDetails: { type: Object, default: () => ({}) },
  },
  data: () => ({
    age: 16,
  }),
  created() {},
  computed: {
    parsedVal() {
      if (this.currentHeartBeat < 50) return 25;
      return parseInt(100 * (this.currentHeartBeat / this.MHR));
    },
    MHR() {
      return 220 - this.userDetails.age;
    },
    currentEffortText() {
      if (this.parsedVal < 50) return "Still resting ah?";
      if (this.parsedVal < 70) return "Looks like someone is warming up!";
      if (this.parsedVal < 90) return "You are on the burn calories zone!";
      if (this.parsedVal > 90 && this.parsedVal < 100)
        return "Someone is working on stamina!";
      return "Slow down tiger! take it easy";
    },
    currentHeartBeat() {
      if (!this.currentHeartBeatDetails["ComputedHeartRate"]) return 0;
      return this.currentHeartBeatDetails["ComputedHeartRate"];
    },
    isAvailable() {
      return this.currentHeartBeat > 0;
    },
  },
};
</script>

<style scoped >
img {
  width: 130px;
  border-radius: 50%;
}
small {
  display: block;
}

.pulse {
  width: 15px;
  height: 15px;
  background: #ff6d4a;
  border-radius: 50%;
  color: #fff;
  font-size: 2px;
  text-align: center;
  line-height: 25px;
  font-family: sans-serif;
  text-transform: uppercase;
  animation: animate-pulse 3s linear infinite;
  cursor: pointer;
  margin-right: 12px;
}
@keyframes animate-pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 109, 74, 0.7), 0 0 0 0 rgba(255, 109, 74, 0.7);
  }
  40% {
    box-shadow: 0 0 0 10px rgba(255, 109, 74, 0),
      0 0 0 0 rgba(255, 109, 74, 0.7);
  }
  80% {
    box-shadow: 0 0 0 10px rgba(255, 109, 74, 0),
      0 0 0 5px rgba(255, 109, 74, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 109, 74, 0), 0 0 0 5x rgba(255, 109, 74, 0);
  }
}
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.widget {
    opacity: 0.3;
    transition: opacity 0.25s ease-in;
}

.widget.is-available{
    opacity: 1 !important;
}
</style>
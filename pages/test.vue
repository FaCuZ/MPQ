<template>
  <div id="app" width="100%">
    <button @click="generateChart">Generate Chart</button>
    <div ref="chart" width="100%" margin="auto"></div>
    <p><NLink to="/" class="button--grey">Back home</NLink></p>
  </div>
</template>

<script>
import bb, { line, areaSpline } from "billboard.js";
import "~/assets/Insight.css";
export default {
  asyncData() {
    return {
      name: process.server ? "server" : "client",
    };
  },
  async mounted() {
    if (!process.server) {
      console.log("Generating chart with typescript");
      await this.$nextTick();
      var chart = bb.generate({
        bindto: this.$refs.chart,
        data: {
          columns: [
            ["data1", 30, 200, 100, 170, 150, 250],
            ["data2", 130, 100, 140, 35, 110, 50],
          ],
          types: {
            data1: line(),
            data2: areaSpline(),
          },
          colors: {
            data1: "red",
            data2: "green",
          },
        },
      });
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
  width: 500px;
  margin: auto;
}

a,
button {
  color: #4fc08d;
}

button {
  background: none;
  border: solid 1px;
  border-radius: 2em;
  font: inherit;
  padding: 0.75em 2em;
}
</style>


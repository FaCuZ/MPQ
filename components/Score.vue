<template>
	<div id="donutChart"></div>
</template>

<script>
import bb, { donut } from "billboard.js";

export default {
	props: {
		title: {
			type: String,
			required: true
		},
		value: {
			type: Number,
			required: true
		}
	},
	async mounted() {
		bb.generate({
			components: true,
			data: {
				type: donut(),
				columns: [
					["Score", this.value],
					["Remains",1-this.value]
				],
				colors: {
					Score: "#1CA5B8",
					Remains: "#E6E6E6",
				},
				/*onclick: function(d, i) { // TODO sacar o usar para algo
					console.log("onclick", d, i);
				},
				onover: function(d, i) {  // TODO sacar o usar para algo
					console.log("onover", d, i);
				},
				onout: function(d, i) {  // TODO sacar o usar para algo
					console.log("onout", d, i);
				},*/
			},
			bindto: "#donutChart",
			legend: {
				show: false
			},
			size: {
				height: 150,
				width: 150,
			},
			donut: {
				title: this.title+"\n" + parseInt(this.value*100) + "%",
				width: 16,
				label:{
					show: false
				}
			}
		});
	}
}
</script>


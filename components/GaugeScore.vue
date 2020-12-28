<template>
	<div :id=name></div>
</template>

<script>
import bb, { gauge } from "billboard.js";

export default {
	props: {
		title: {
			type: String,
			required: true
		},
		value: {
			type: Number,
			required: true
		},
		name: {
			type: String,
			required: true
		},
	},
	async mounted() {
		bb.generate({
			components: true,
			data: {
				type: gauge(),
				columns: [["score", parseInt(this.value*100)]],
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
			bindto: "#"+this.name,
			gauge: { width: 40 },
			legend: { show: false },
			title: { text: this.title },
			color: { pattern: ["#1CA5B8"] },

		});
	}
}
</script>


<style scoped>
.bb text{
	font-size: 16px !important;
}
</style>


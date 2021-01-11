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
			let percent = this.value

			let scoreGen = bb.generate({
				components: true,
				data: {
					type: donut(),
					columns: [
						["Score", 0],
						["Remains",100]
					],
					colors: {
						Score: "#1CA5B8",
						Remains: "#E6E6E6"
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
				transition: { duration: 2000 },
				bindto: "#donutChart",
				legend: { show: false },
				size: {
					height: 150,
					width: 150,
				},
				donut: {
					title: this.title+"\n" + parseInt(this.value*100) + "%",
					width: 18,
					label: { show: false }
				},
			});

			setTimeout(function() {
				scoreGen.load({
					columns: [
						["Score", percent],
						["Remains",1-percent]
					],
				})
			}, 100, percent)



		}
	}
</script>


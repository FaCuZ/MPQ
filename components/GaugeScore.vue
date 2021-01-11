<template>
	<div class="gauge-container">
		<div :id=name @click="isModalActive=true"></div>
		<a class="hints-link" @click="isModalActive=true">5 hints</a>

		<b-modal v-model="isModalActive" :width="640" scroll="keep" class="gauge-modal">
			<div class="card">
				<div class="card-content">
					<section class="hero is-primary">
						<div class="hero-body">
							<div class="container">
								<h1 class="title">{{ title }}</h1>
								<h2 class="subtitle">{{ group }}</h2>
							</div>
						</div>
					</section>

					<div class="results">

						<div class="columns is-multiline">
							<div class="column is-4 is-vcentered result-score">
								<div class="result-score-subtitle">Score:</div>
								<div class="result-score-value">{{ parseInt(value * 100) }}%</div>
							</div>
							<div class="column">
								<ul>
									<li><b>Count:</b> 54654</li>
									<li><b>Views:</b> 23</li>
									<li><b>Blebla:</b> 1334</li>
								</ul>
							</div>
						</div>

						<div class="content">
							<h3>Recommendations</h3>
							<ul>
								<li>Les recomiendo que hagan estoy</li>
								<li>Les recomiendo que hagan y esto</li>
								<li>Les recomiendo que hagan ademas de esto</li>
								<li>Les recomiendo que hagan nada</li>
							</ul>
						</div>

					</div>

				</div>
			</div>
		</b-modal>



	</div>
</template>

<script>
	import bb, { gauge } from "billboard.js";

	export default {
		props: {
			group: {
				type: String,
				required: true
			},
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
		data() {
			return {
				isModalActive: false
			}
		},
		async mounted() {
			let gaugeGen = bb.generate({
				components: true,
				data: {
					type: gauge(),
					columns: [["score", 0]],
				},
				transition: {
					duration: 2000
				},
				bindto: "#"+this.name,
				gauge: { width: 40 },
				legend: { show: false },
				title: { text: this.title },
				color: { pattern: ["#1CA5B8"] },

			})

			let percent = parseInt(this.value*100)

			setTimeout(function() {
				gaugeGen.load({
					columns: [["score",  percent]]
				})
			}, 100,  percent)
		},
		// },
		// async mounted() {
		// 	let percent = parseInt(this.value*100)

		// 	let gaugeGen = bb.generate({
		// 		components: true,
		// 		data: {
		// 			type: gauge(),
		// 			columns: [["score", 0]],
		// 		},
		// 		transition: {
		// 			duration: 2000
		// 		},
		// 		bindto: "#"+this.name,
		// 		gauge: { width: 40 },
		// 		legend: { show: false },
		// 		title: { text: this.title },
		// 		color: { pattern: ["#1CA5B8"] },

		// 	});


		// 	setTimeout(function() {
		// 		gaugeGen.load({
		// 			columns: [["score", percent]]
		// 		})
		// 	}, 100, percent)
		// },
	}
</script>


<style lang="scss" scoped>
	.gauge-container{
		text-align: center;

		.gauge-modal {
			text-align: left;
		}

		.bb {
			margin-bottom: 4px;
			text{
				font-size: 16px !important;
			}
		}



		.result-score-value {
			font-size: 4rem;
			font-weight: bolder;
			line-height: 65px !important;
		}

		.results {
			margin-bottom: 24px;
			padding: 24px;


			.result-score {
				text-align: center;
			}

		}

		.card-content {
			padding: 0px !important;
		}

		.hero-body {
			padding: 1.5rem 1.5rem;
		}
	}
</style>


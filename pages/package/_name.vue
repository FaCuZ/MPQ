<template>
	<section class="section">
		<h1 class="title">
			{{ title }}
			<span class="tag">{{ json.collected.metadata.version }}</span>
		</h1>
		<h2 class="subtitle">{{ json.collected.metadata.description }}</h2>

		<div class="columns is-gapless is-multiline">
		<!-- <ble name="gauge-1" title="Commits Frequency" :value=score.final></ble> -->
			<div class="column is-one-quarter final-score">
				<Score title="Score" :value=score.final></Score>
			</div>
			<div class="column">
				<ul class="progress-list is-vcentered">
					<li class="progress-line">
						<b-field label="Maintenance" horizontal>
							<b-progress type="is-primary" :value=score.detail.maintenance*100 format="percent" show-value></b-progress>
						</b-field>
					</li>
					<li class="progress-line">
						<b-field label="Popularity" horizontal>
							<b-progress type="is-primary" :value=score.detail.popularity*100 format="percent" show-value></b-progress>
						</b-field>
					</li>
					<li class="progress-line">
						<b-field label="Quality" horizontal >
							<b-progress type="is-primary" :value=score.detail.quality*100 format="percent" show-value></b-progress>
						</b-field>
					</li>
				</ul>
			</div>
		</div>

		<h1 class="title">Maintenace</h1>
		<div class="columns is-gapless">
			<div class="column is-one-quarter">
				<GaugeScore name="gauge1" title="Releases Frequency" :value=json.evaluation.maintenance.releasesFrequency></GaugeScore>
			</div>
			<div class="column is-one-quarter">
				<GaugeScore name="gauge2" title="Commits Frequency" :value=json.evaluation.maintenance.commitsFrequency></GaugeScore>
			</div>
			<div class="column is-one-quarter">
				<GaugeScore name="gauge3" title="Open Issues" :value=json.evaluation.maintenance.openIssues></GaugeScore>
			</div>
			<div class="column is-one-quarter">
				<GaugeScore name="gauge4" title="Issues Distribution" :value=json.evaluation.maintenance.issuesDistribution></GaugeScore>
			</div>
		</div>

		<h1 class="title">Quality</h1>
		<div class="columns is-gapless">
			<div class="column is-one-quarter">
				<GaugeScore name="gauge5" title="Carefulness" :value=json.evaluation.quality.carefulness></GaugeScore>
			</div>
			<div class="column is-one-quarter">
				<GaugeScore name="gauge6" title="Tests" :value=json.evaluation.quality.tests></GaugeScore>
			</div>
			<div class="column is-one-quarter">
				<GaugeScore name="gauge7" title="Health" :value=json.evaluation.quality.health></GaugeScore>
			</div>
			<div class="column is-one-quarter">
				<GaugeScore name="gauge8" title="Branding" :value=json.evaluation.quality.branding></GaugeScore>
			</div>
		</div>


		<br/><br/><NuxtLink to="/">Home page</NuxtLink>
	</section>
</template>


<script>
export default {
	scrollToTop: true,
	data() {
		return {
			json: [],
			score: [],
			name: '',
			title: ''
		}
	},
	async asyncData({ params, $http }) {
		const json = await fetch(`https://api.npms.io/v2/package/${params.name}`).then(res => res.json())

		const score = json.score
		const title = json.collected.metadata.name

		return { json, score, title }
	},
}


</script>


<style scoped>
#donutChart {
    margin: 0 auto;
    padding: 0%;
    text-align: center;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 150px;
}

.progress-list {
	min-height: 150px;
	padding: 20px;
}
.progress-line {
    margin-bottom: 15px;
}

.field {
	align-items: center !important;
}

.title {
	text-transform: capitalize;
}

</style>

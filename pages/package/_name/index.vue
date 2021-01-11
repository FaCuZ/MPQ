<template>
	<section class="section-score">
		<div class="block block-title">
			<h1 class="title">
				{{ metadata.title }}
				<span class="tag">{{ metadata.version }}</span>
			</h1>
			<h2 class="subtitle">{{ metadata.description }}</h2>

			<div class="columns is-gapless is-multiline">
				<div class="column is-one-quarter final-score">
					<Score title="Score" :value=score.final :key=force></Score>
				</div>
				<div class="column">
					<ul class="progress-list is-vcentered">
						<li class="progress-line">
							<b-field label="Maintenance" horizontal>
								<b-progress type="is-primary" :value=score.maintenance format="percent" show-value></b-progress>
							</b-field>
						</li>
						<li class="progress-line">
							<b-field label="Popularity" horizontal>
								<b-progress type="is-primary" :value=score.popularity format="percent" show-value></b-progress>
							</b-field>
						</li>
						<li class="progress-line">
							<b-field label="Quality" horizontal >
								<b-progress type="is-primary" :value=score.quality format="percent" show-value></b-progress>
							</b-field>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<div class="block-score">
			<h1 class="title">Maintenace</h1>
			<div class="columns is-gapless">
				<div class="column is-one-quarter">
					<GaugeScore name="gauge1" group="Maintenance" title="Releases Frequency" :value=evaluation.maintenance.releasesFrequency :key=force></GaugeScore>
				</div>
				<div class="column is-one-quarter">
					<GaugeScore name="gauge2" group="Maintenance" title="Commits Frequency" :value=evaluation.maintenance.commitsFrequency :key=force></GaugeScore>
				</div>
				<div class="column is-one-quarter">
					<GaugeScore name="gauge3" group="Maintenance" title="Open Issues" :value=evaluation.maintenance.openIssues :key=force></GaugeScore>
				</div>
				<div class="column is-one-quarter">
					<GaugeScore name="gauge4" group="Maintenance" title="Issues Distribution" :value=evaluation.maintenance.issuesDistribution :key=force></GaugeScore>
				</div>
			</div>
		</div>

		<div class="block-score">
			<h1 class="title">Popularity</h1>
			<div class="columns is-gapless">
				<div class="column is-one-quarter">
					<KpiScore name="kpi1" group="Popularity" title="Community Interest" :value=evaluation.popularity.communityInterest :key=force></KpiScore>
				</div>
				<div class="column is-one-quarter">
					<KpiScore name="kpi2" group="Popularity" title="Downloads Count" :value=evaluation.popularity.downloadsCount :key=force></KpiScore>
				</div>
				<div class="column is-one-quarter">
					<KpiScore name="kpi3" group="Popularity" title="Downloads Acceleration" :value=evaluation.popularity.downloadsAcceleration :key=force></KpiScore>
				</div>
				<div class="column is-one-quarter">
					<KpiScore name="kpi4" group="Popularity" title="Dependents Count" :value=evaluation.popularity.dependentsCount :key=force></KpiScore>
				</div>
			</div>
		</div>

		<div class="block-score">
			<h1 class="title">Quality</h1>
			<div class="columns is-gapless">
				<div class="column is-one-quarter">
					<GaugeScore name="gauge5" group="Quality" title="Carefulness" :value=evaluation.quality.carefulness :key=force></GaugeScore>
				</div>
				<div class="column is-one-quarter">
					<GaugeScore name="gauge6" group="Quality" title="Tests" :value=evaluation.quality.tests :key=force></GaugeScore>
				</div>
				<div class="column is-one-quarter">
					<GaugeScore name="gauge7" group="Quality" title="Health" :value=evaluation.quality.health :key=force></GaugeScore>
				</div>
				<div class="column is-one-quarter">
					<GaugeScore name="gauge8" group="Quality" title="Branding" :value=evaluation.quality.branding :key=force></GaugeScore>
				</div>
			</div>
		</div>

	<FooterScore></FooterScore>

	</section>
</template>


<script>
	import { mapGetters, mapActions } from 'vuex'

	export default {
		layout: 'score',
		scrollToTop: true,
		computed: {
			...mapGetters('npms', ['json', 'force', 'metadata', 'score', 'evaluation'])
		},
		methods: {
			...mapActions("npms", ['change']),
		},
		created() {
			// TODO ver porque carga 2 veces (1 en ssr)
			this.change(this.$route.params.name)
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

</style>

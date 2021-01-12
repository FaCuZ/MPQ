<template>
	<section class="section-score">
		<div class="block block-title">
			<h1 class="title">
				{{ metadata.title }}
				<span class="tag">{{ metadata.version }}</span>
			</h1>
			<h2 class="subtitle">{{ metadata.description }}</h2>
		</div>

		<!-- <b-tabs type="is-toggle" position="is-centered" class="block"> -->
		<!-- <b-tabs type="is-boxed" position="is-centered" class="block"> -->
		<b-tabs type="is-boxed">
			<b-tab-item label="Readme" icon="text-box-outline">
				<div class="markdown-body" v-html=metadata.readme></div>
			</b-tab-item>
			<b-tab-item label="Changelog" icon="book-clock-outline">
				list of change
			</b-tab-item>
			<b-tab-item label="Dependencies" icon="package-variant">

				<h1 class="title">
					Dependencies <b-tag type="is-primary">{{ metadata.dependencies.length }}</b-tag>
				</h1>
				<ul>
					<li v-for="(item, index) in metadata.dependencies" :key="index" class="li-dep">
						<n-link :to="'/package/'+item.name">
							<b-icon icon="package-variant-closed"  size="is-small" label='nombre'></b-icon>
							<span> {{ item.name }} <em>- {{ item.version }}</em></span>
						</n-link>
					</li>
				</ul>

				<br/>

				<h1 class="title">
					Developer dependencies <b-tag type="is-primary">{{ metadata.devDependencies.length }}</b-tag>
				</h1>
				<ul>
					<li v-for="(item, index) in metadata.devDependencies" :key="index" class="li-dep">
						<n-link :to="'/package/'+item.name">
							<b-icon icon="package-variant-closed" size="is-small" label='nombre'></b-icon>
							<span> {{ item.name }} <em>- {{ item.version }}</em></span>
						</n-link>
					</li>
				</ul>
			</b-tab-item>
			<b-tab-item label="Licence" icon="file-check-outline">
				licencia
			</b-tab-item>
		</b-tabs>


		<FooterScore></FooterScore>
	</section>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'

	export default {
		layout: 'score',
		scrollToTop: true,
		computed: {
			...mapGetters('npms', ['metadata']),
		},
		methods: {
			...mapActions("npms", ['change']),
		},
		created() {
			this.change(this.$route.params.name)
			console.log(this.metadata.title)
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

	.block-score {
		padding: 1rem;
		padding-bottom: 4rem;
	}

	.block-title {
		padding: 1rem;
		background-color: #F5F5F5;
		border-radius: 0px 0px 5px 5px;
	}

	.section {
		padding: 0rem 1.5rem !important;
		background-color: #FAFAFA;
		min-height: 100vh;
		/* padding-bottom: 60px !important; */

	}
</style>

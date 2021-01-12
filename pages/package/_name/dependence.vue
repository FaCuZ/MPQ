<template>
	<section class="section-score">
		<div class="block block-title">
			<h1 class="title">
				{{ metadata.title }}
				<span class="tag">{{ metadata.version }}</span>
			</h1>
			<h2 class="subtitle">{{ metadata.description }}</h2>
		</div>

		<h1 class="title">
			Dependencies
		</h1>
		<ul>
			<li v-for="(item, index) in metadata.dependencies" :key="index">
				<n-link to="/">
					<b-icon icon="package"></b-icon> {{ item.name }} - {{ item.version }}
				</n-link>
			</li>
		</ul>

		<br/>

		<h1 class="title">
			Developer dependencies
		</h1>
		<ul>
			<li v-for="(item, index) in metadata.devDependencies" :key="index">
				<n-link to="/">
					<b-icon icon="package"></b-icon> {{ item.name }} - {{ item.version }}
				</n-link>
			</li>
		</ul>

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
		},
	}
</script>

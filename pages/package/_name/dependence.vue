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
			Listado de dependencias
		</h1>

		<ul>
			<li>Grafo de dependencias</li>
			<li>Listado de dependencias directas</li>
			<li>Listado de dependencias de desarrollo</li>
			<li>Listado de dependencias indirectas</li>
		</ul>
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

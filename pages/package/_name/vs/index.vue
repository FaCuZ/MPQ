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
			Comparar (selector de paquete para comprar)
		</h1>

		<ul>
			<li>Seleccione un paquete para Comparar</li>
			<li>Por defecto el paquete</li>
			<li>Sugerencias de paquetes a comprar</li>
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

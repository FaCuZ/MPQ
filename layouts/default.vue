<template>
	<section class="main-content columns">
		<div class="container column is-10">
			<nuxt />
		</div>
	</section>
</template>

<script>
export default {
	data () {
		return {
			items: [
				{
					title: 'Home',
					icon: 'home',
					to: { name: 'index' }
				},
				{
					title: 'Inspire',
					icon: 'lightbulb',
					to: { name: 'inspire' }
				}
			]
		}
	}
}
</script>


<style lang="scss">

</style>


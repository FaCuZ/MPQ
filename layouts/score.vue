<template>
	<div class="sidebar-page">
		<section class="sidebar-layout">
			<Sidebar :key=this.$route.params.name></Sidebar>

			<div class="main-content-score">
				<nuxt />
			</div>
		</section>
	</div>
</template>


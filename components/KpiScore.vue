<template>
	<div class="kpi">
		{{ title }}
		<div class="title title-kpi">
			{{ kpi }}

		</div>
	</div>
</template>

<style scoped>
	.kpi{
		text-align: center;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		fill: #555;
		font-size: 16px;
	}

	.title-kpi{
		font-size: 3rem;
	}
</style>

<script>
	import sn from 'short-number'

	export default {
		data () {
			return {
				kpi: sn(this.value)
			}
		},
		props: {
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
	}
</script>


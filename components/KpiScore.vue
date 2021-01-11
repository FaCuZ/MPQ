<template>
	<div class="kpi">
		{{ title }}
		<div class="title title-kpi">{{ kpi }}</div>
		<a href="/" class="hints-link">5 hints</a>
	</div>
</template>

<script>
	import sn from 'short-number'

	export default {
		data () {
			return {
				kpi: sn(parseFloat(this.value.toFixed(2)))
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
		}
	}
</script>


<style scoped>
	.kpi{
		text-align: center;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		fill: #555;
		font-size: 16px;
		margin-bottom: 4px;
	}

	.title-kpi{
		font-size: 3rem;
		font-variant-numeric: tabular-nums;
		font-weight: bolder;
	}
</style>
